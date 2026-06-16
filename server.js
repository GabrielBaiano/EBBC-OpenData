import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for public API access
app.use(cors());
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Togglable Security Layer: API Key Validation via Bearer Token
app.use((req, res, next) => {
  if (process.env.REQUIRE_API_KEY === 'true') {
    // Only protect REST API endpoints (let the dashboard web assets load freely)
    if (req.path.startsWith('/api/')) {
      const authHeader = req.headers['authorization'];
      const expectedToken = process.env.API_KEY || 'ebbc_secret_key_2026';
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ 
          error: 'Não autorizado. Cabeçalho de autorização Bearer ausente ou inválido.' 
        });
      }
      
      const token = authHeader.split(' ')[1];
      if (token !== expectedToken) {
        return res.status(401).json({ 
          error: 'Não autorizado. Token de API incorreto.' 
        });
      }
    }
  }
  next();
});

// -------------------------------------------------------------
// Helper Functions for Data Processing
// -------------------------------------------------------------

// Normalize titles for robust cache mapping
function normalizeTitle(title) {
  if (!title) return '';
  return title
    .toLowerCase()
    .normalize('NFD') // Decompose combined characters (accents)
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9]/g, ''); // Keep only alphanumeric characters
}

// Parse comma/semicolon/slash separated lists into clean arrays
function parseList(str) {
  if (!str || typeof str !== 'string') return [];
  const cleanStr = str.trim();
  if (cleanStr.toUpperCase() === 'N/A' || cleanStr.toUpperCase() === 'N/O' || cleanStr === '') {
    return [];
  }
  
  // Replace Portuguese " e " (and) with a comma for splitting
  let normalized = cleanStr.replace(/\s+e\s+/gi, ', ');
  
  return normalized
    .split(/[,;\/]/)
    .map(item => item.trim())
    .filter(item => item && item.toUpperCase() !== 'N/A' && item.toUpperCase() !== 'N/O');
}

// -------------------------------------------------------------
// Load and Enrich Datasets
// -------------------------------------------------------------
let articles = [];

function loadData() {
  const years = [2012, 2014, 2016, 2018, 2020, 2022, 2024];
  let tempArticles = [];
  
  years.forEach(year => {
    const dataPath = path.join(__dirname, 'data', `ebbc_${year}_data.json`);
    const cachePath = path.join(__dirname, 'data', `ebbc_${year}_abstracts_cache.json`);
    
    if (!fs.existsSync(dataPath)) {
      console.warn(`Warning: Data file not found: ${dataPath}`);
      return;
    }
    
    let rawData = [];
    try {
      rawData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    } catch (e) {
      console.error(`Error parsing JSON from ${dataPath}:`, e);
      return;
    }
    
    let cacheData = {};
    if (fs.existsSync(cachePath)) {
      try {
        cacheData = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
      } catch (e) {
        console.error(`Error parsing JSON from cache ${cachePath}:`, e);
      }
    }
    
    rawData.forEach(item => {
      // Clean DOI
      let doi = (item.DOI || '').trim();
      
      // Attempt to map abstract from cache:
      // Try by exact DOI first, then by normalized title
      let abstract = null;
      if (doi && cacheData[doi]) {
        abstract = cacheData[doi];
      } else {
        const normTitle = normalizeTitle(item.Título);
        if (normTitle && cacheData[normTitle]) {
          abstract = cacheData[normTitle];
        }
      }
      
      // Clean up abstract string if it contains odd formatting
      if (typeof abstract === 'string') {
        abstract = abstract.trim();
      }
      
      const cleanTitle = (item.Título || '').trim();
      
      // Normalize columns to a clean developer-friendly API structure
      tempArticles.push({
        doi: doi || null,
        title: cleanTitle,
        year: year,
        authors: parseList(item.Autoria),
        keywords: parseList(item['Palavras-chave']),
        tools: parseList(item['Ferramenta utilizada']),
        identifies_tool: (item['Identifica a ferramenta?'] || 'N/A').trim(),
        usage_stages: parseList(item['Onde usou (coleta dos dados, análise dos dados ou visualização - gerar gráficos)']),
        data_sources: parseList(item['Fonte de coleta de dados (da onde o pesquisador tirou a informação?)']),
        abstract: abstract,
        is_refined: !!item._refined
      });
    });
  });
  
  articles = tempArticles;
  console.log(`Loaded and enriched ${articles.length} articles from EBBC 2012 to 2024.`);
}

// Initial load
loadData();

// -------------------------------------------------------------
// API Endpoints
// -------------------------------------------------------------

/**
 * GET /api/articles
 * Query parameters:
 *  - search: General text search (title, authors, keywords, tools, data sources, abstract)
 *  - year: Filter by year (e.g. "2020" or "2020,2024")
 *  - author: Filter by author name (substring)
 *  - tool: Filter by software tool used (substring/exact)
 *  - source: Filter by data collection source (substring/exact)
 *  - stage: Filter by usage stage (coleta, analise, visualizacao)
 *  - has_tool: Filter articles that use at least one tool ("true" or "false")
 *  - limit: Number of items to return (default: 20)
 *  - offset: Number of items to skip (default: 0)
 *  - sort: Sort by field ("year", "title", "doi") (default: "title")
 *  - order: Sort order ("asc", "desc") (default: "asc")
 */
app.get('/api/articles', (req, res) => {
  let filtered = [...articles];
  
  // 1. Filter by Year
  if (req.query.year) {
    const years = req.query.year.split(',').map(y => parseInt(y.trim())).filter(y => !isNaN(y));
    if (years.length > 0) {
      filtered = filtered.filter(art => years.includes(art.year));
    }
  }
  
  // 2. Filter by Author
  if (req.query.author) {
    const authorQuery = req.query.author.toLowerCase();
    filtered = filtered.filter(art => 
      art.authors.some(auth => auth.toLowerCase().includes(authorQuery))
    );
  }
  
  // 3. Filter by Tool
  if (req.query.tool) {
    const toolQuery = req.query.tool.toLowerCase();
    filtered = filtered.filter(art => 
      art.tools.some(t => t.toLowerCase().includes(toolQuery))
    );
  }
  
  // 4. Filter by Source
  if (req.query.source) {
    const sourceQuery = req.query.source.toLowerCase();
    filtered = filtered.filter(art => 
      art.data_sources.some(s => s.toLowerCase().includes(sourceQuery))
    );
  }
  
  // 5. Filter by Usage Stage
  if (req.query.stage) {
    const stageQuery = req.query.stage.toLowerCase();
    filtered = filtered.filter(art => 
      art.usage_stages.some(s => s.toLowerCase().includes(stageQuery))
    );
  }
  
  // 6. Filter by whether it has tools
  if (req.query.has_tool) {
    const hasToolVal = req.query.has_tool.toLowerCase();
    if (hasToolVal === 'true' || hasToolVal === '1') {
      filtered = filtered.filter(art => art.tools.length > 0);
    } else if (hasToolVal === 'false' || hasToolVal === '0') {
      filtered = filtered.filter(art => art.tools.length === 0);
    }
  }
  
  // 7. General Text Search (searches in Title, Authors, Keywords, Tools, Data Sources, Abstract)
  if (req.query.search) {
    const query = req.query.search.toLowerCase();
    filtered = filtered.filter(art => {
      const inTitle = art.title.toLowerCase().includes(query);
      const inAbstract = art.abstract ? art.abstract.toLowerCase().includes(query) : false;
      const inAuthors = art.authors.some(auth => auth.toLowerCase().includes(query));
      const inKeywords = art.keywords.some(k => k.toLowerCase().includes(query));
      const inTools = art.tools.some(t => t.toLowerCase().includes(query));
      const inSources = art.data_sources.some(s => s.toLowerCase().includes(query));
      
      return inTitle || inAbstract || inAuthors || inKeywords || inTools || inSources;
    });
  }
  
  // 8. Sorting
  const sortField = req.query.sort || 'title';
  const sortOrder = (req.query.order || 'asc').toLowerCase() === 'desc' ? -1 : 1;
  
  filtered.sort((a, b) => {
    let valA = a[sortField];
    let valB = b[sortField];
    
    // Handle null values
    if (valA === null || valA === undefined) valA = '';
    if (valB === null || valB === undefined) valB = '';
    
    // String comparison
    if (typeof valA === 'string' && typeof valB === 'string') {
      return valA.localeCompare(valB, 'pt', { sensitivity: 'base' }) * sortOrder;
    }
    
    // Numeric comparison
    if (valA < valB) return -1 * sortOrder;
    if (valA > valB) return 1 * sortOrder;
    return 0;
  });
  
  // 9. Pagination
  const total = filtered.length;
  const limit = parseInt(req.query.limit) || 20;
  const offset = parseInt(req.query.offset) || 0;
  
  const paginatedResults = filtered.slice(offset, offset + limit);
  
  res.json({
    total: articles.length,
    filteredCount: total,
    limit,
    offset,
    results: paginatedResults
  });
});

/**
 * GET /api/articles/stats
 * Returns aggregated statistics of the dataset
 */
app.get('/api/articles/stats', (req, res) => {
  const stats = {
    totalArticles: articles.length,
    byYear: {},
    toolUsageCount: 0,
    topTools: {},
    topSources: {},
    topAuthors: {},
    usageStages: {
      'coleta de dados': 0,
      'análise dos dados': 0,
      'visualização': 0
    }
  };
  
  articles.forEach(art => {
    // 1. By Year
    stats.byYear[art.year] = (stats.byYear[art.year] || 0) + 1;
    
    // 2. Tool usage
    if (art.tools.length > 0) {
      stats.toolUsageCount++;
      art.tools.forEach(tool => {
        // Standardize tool names for better grouping (e.g. Python, R)
        let normalizedTool = tool.trim();
        // Capitalize common tools nicely
        const lowerTool = normalizedTool.toLowerCase();
        if (lowerTool === 'python') normalizedTool = 'Python';
        else if (lowerTool === 'r') normalizedTool = 'R';
        else if (lowerTool === 'spss') normalizedTool = 'SPSS';
        else if (lowerTool === 'gephi') normalizedTool = 'Gephi';
        else if (lowerTool === 'vosviewer') normalizedTool = 'VOSviewer';
        else if (lowerTool === 'excel') normalizedTool = 'Microsoft Excel';
        else if (lowerTool === 'latteslab') normalizedTool = 'LattesLab';
        else if (lowerTool === 'scriptlattes') normalizedTool = 'scriptLattes';
        else if (lowerTool === 'bibliometrix') normalizedTool = 'Bibliometrix';
        else if (lowerTool === 'stata') normalizedTool = 'Stata';
        
        stats.topTools[normalizedTool] = (stats.topTools[normalizedTool] || 0) + 1;
      });
    }
    
    // 3. Data Sources
    art.data_sources.forEach(source => {
      let normalizedSource = source.trim();
      const lowerSource = normalizedSource.toLowerCase();
      
      // Standardize common database names
      if (lowerSource === 'scopus') normalizedSource = 'Scopus';
      else if (lowerSource === 'web of science' || lowerSource === 'wos') normalizedSource = 'Web of Science';
      else if (lowerSource === 'google academico' || lowerSource === 'google scholar' || lowerSource === 'google acadêmico') normalizedSource = 'Google Acadêmico';
      else if (lowerSource === 'scielo') normalizedSource = 'SciELO';
      else if (lowerSource === 'lattes' || lowerSource === 'plataforma lattes') normalizedSource = 'Plataforma Lattes';
      else if (lowerSource === 'brapci') normalizedSource = 'BRAPCI';
      else if (lowerSource === 'sucupira' || lowerSource === 'plataforma sucupira') normalizedSource = 'Plataforma Sucupira';
      else if (lowerSource === 'dimensions') normalizedSource = 'Dimensions';
      else if (lowerSource === 'cnpq') normalizedSource = 'CNPq';
      
      stats.topSources[normalizedSource] = (stats.topSources[normalizedSource] || 0) + 1;
    });
    
    // 4. Authors
    art.authors.forEach(author => {
      const cleanAuthor = author.trim();
      if (cleanAuthor) {
        stats.topAuthors[cleanAuthor] = (stats.topAuthors[cleanAuthor] || 0) + 1;
      }
    });
    
    // 5. Usage Stages
    art.usage_stages.forEach(stage => {
      const s = stage.toLowerCase();
      if (s.includes('coleta')) {
        stats.usageStages['coleta de dados']++;
      }
      if (s.includes('análise') || s.includes('analise')) {
        stats.usageStages['análise dos dados']++;
      }
      if (s.includes('visualização') || s.includes('visualizacao') || s.includes('gráfico') || s.includes('grafico')) {
        stats.usageStages['visualização']++;
      }
    });
  });
  
  // Sort and convert top collections to arrays of { name, count }
  const getSortedArray = (obj, limit = 10) => {
    return Object.entries(obj)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  };
  
  stats.topTools = getSortedArray(stats.topTools, 15);
  stats.topSources = getSortedArray(stats.topSources, 15);
  stats.topAuthors = getSortedArray(stats.topAuthors, 15);
  stats.toolUsagePercentage = parseFloat(((stats.toolUsageCount / stats.totalArticles) * 100).toFixed(2));
  
  res.json(stats);
});

/**
 * GET /api/articles/export
 * Exports filtered articles as CSV or JSON
 */
app.get('/api/articles/export', (req, res) => {
  let filtered = [...articles];
  
  // Apply all filters (same as search endpoint, but without limits)
  if (req.query.year) {
    const years = req.query.year.split(',').map(y => parseInt(y.trim())).filter(y => !isNaN(y));
    if (years.length > 0) {
      filtered = filtered.filter(art => years.includes(art.year));
    }
  }
  
  if (req.query.author) {
    const authorQuery = req.query.author.toLowerCase();
    filtered = filtered.filter(art => 
      art.authors.some(auth => auth.toLowerCase().includes(authorQuery))
    );
  }
  
  if (req.query.tool) {
    const toolQuery = req.query.tool.toLowerCase();
    filtered = filtered.filter(art => 
      art.tools.some(t => t.toLowerCase().includes(toolQuery))
    );
  }
  
  if (req.query.source) {
    const sourceQuery = req.query.source.toLowerCase();
    filtered = filtered.filter(art => 
      art.data_sources.some(s => s.toLowerCase().includes(sourceQuery))
    );
  }
  
  if (req.query.stage) {
    const stageQuery = req.query.stage.toLowerCase();
    filtered = filtered.filter(art => 
      art.usage_stages.some(s => s.toLowerCase().includes(stageQuery))
    );
  }
  
  if (req.query.has_tool) {
    const hasToolVal = req.query.has_tool.toLowerCase();
    if (hasToolVal === 'true' || hasToolVal === '1') {
      filtered = filtered.filter(art => art.tools.length > 0);
    } else if (hasToolVal === 'false' || hasToolVal === '0') {
      filtered = filtered.filter(art => art.tools.length === 0);
    }
  }
  
  if (req.query.search) {
    const query = req.query.search.toLowerCase();
    filtered = filtered.filter(art => {
      const inTitle = art.title.toLowerCase().includes(query);
      const inAbstract = art.abstract ? art.abstract.toLowerCase().includes(query) : false;
      const inAuthors = art.authors.some(auth => auth.toLowerCase().includes(query));
      const inKeywords = art.keywords.some(k => k.toLowerCase().includes(query));
      const inTools = art.tools.some(t => t.toLowerCase().includes(query));
      const inSources = art.data_sources.some(s => s.toLowerCase().includes(query));
      
      return inTitle || inAbstract || inAuthors || inKeywords || inTools || inSources;
    });
  }
  
  const format = (req.query.format || 'json').toLowerCase();
  
  if (format === 'csv') {
    // Build CSV
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename=ebbc_proceedings_export.csv');
    
    // BOM for Excel UTF-8 display compatibility
    res.write('\uFEFF');
    
    const headers = [
      'DOI',
      'Ano',
      'Título',
      'Autoria',
      'Palavras-chave',
      'Ferramenta utilizada',
      'Identifica a ferramenta',
      'Onde usou',
      'Fonte de coleta de dados',
      'Resumo (Abstract)'
    ];
    
    // Write headers
    res.write(headers.map(h => `"${h.replace(/"/g, '""')}"`).join(',') + '\n');
    
    filtered.forEach(art => {
      const row = [
        art.doi || '',
        art.year,
        art.title,
        art.authors.join(', '),
        art.keywords.join(', '),
        art.tools.join(', '),
        art.identifies_tool,
        art.usage_stages.join(', '),
        art.data_sources.join(', '),
        art.abstract || ''
      ];
      
      res.write(row.map(val => {
        const strVal = String(val);
        return `"${strVal.replace(/"/g, '""')}"`;
      }).join(',') + '\n');
    });
    
    return res.end();
  } else {
    // Default JSON export
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename=ebbc_proceedings_export.json');
    return res.json(filtered);
  }
});

// Helper for dynamic DOI matching
function findArticleByDoi(reqDoi) {
  if (!reqDoi) return null;
  const cleanDoi = reqDoi.trim().toLowerCase();
  return articles.find(art => {
    if (!art.doi) return false;
    const itemDoi = art.doi.toLowerCase();
    return (
      itemDoi === cleanDoi ||
      itemDoi.includes(cleanDoi) ||
      cleanDoi.includes(itemDoi) ||
      normalizeTitle(art.title) === normalizeTitle(cleanDoi)
    );
  });
}

/**
 * GET /api/articles/doi/*
 * Matches raw, unencoded DOIs with slashes (e.g. /api/articles/doi/https://doi.org/10.22477.111)
 */
app.get(/^\/api\/articles\/doi\/(.+)$/, (req, res) => {
  const reqDoi = req.params[0];
  const article = findArticleByDoi(reqDoi);
  if (!article) {
    return res.status(404).json({ error: `Article with DOI or title match '${reqDoi}' not found.` });
  }
  res.json(article);
});

/**
 * GET /api/articles/:doi
 * Matches encoded DOIs (e.g. /api/articles/https%3A%2F%2Fdoi.org%2F10.22477.111) or simple path params
 */
app.get('/api/articles/:doi', (req, res) => {
  const reqDoi = req.params.doi;
  const article = findArticleByDoi(reqDoi);
  if (!article) {
    return res.status(404).json({ error: `Article with DOI or title match '${reqDoi}' not found.` });
  }
  res.json(article);
});

// Start Server
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 EBBC OpenData API listening at http://localhost:${PORT}`);
  console.log(`Documentation and Dashboard available at the root URL.`);
  console.log(`=======================================================`);
});

export default app;
