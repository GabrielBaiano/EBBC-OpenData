// ==========================================================================
// EBBC OPENDATA - FRONTEND CONTROLLER
// ==========================================================================

const TRANSLATIONS = {
  pt: {
    pageTitle: "EBBC OpenData - API Pública e Painel de Metadados",
    "landing-subtitle": "Mapeamento Metodológico e Infraestrutura de Softwares nos Anais do EBBC (2012-2024)",
    "landing-developed-by": "Desenvolvido por Gabriel Gama",
    "feat-dash-title": "Painel Cientométrico",
    "feat-dash-desc": "Estatísticas consolidadas e gráficos sobre a adoção de softwares e fontes de dados na pesquisa brasileira.",
    "feat-exp-title": "Explorador de Dados",
    "feat-exp-desc": "Busca de artigos e filtros cruzados por autor, ferramenta utilizada e etapa metodológica.",
    "feat-api-title": "API Pública & Sandbox",
    "feat-api-desc": "Endpoints RESTful completos com simulação direta no navegador para pesquisadores e desenvolvedores.",
    "landing-about": "O <strong>EBBC OpenData</strong> é uma iniciativa dedicada à promoção da <strong>Ciência Aberta</strong>. Utilizando técnicas avançadas de curadoria e extração automatizada de metadados assistida por IA, o projeto visa facilitar o estudo do desenvolvimento científico nacional na área de Bibliometria e Cientometria.",
    "btn-enter": "Entrar e Usar",
    "header-subtitle": "API Aberta e Curadoria Metodológica dos Anais",
    "open-science": "Ciência Aberta",
    "tab-stats": "Painel de Estatísticas",
    "tab-explorer": "Explorador de Dados",
    "tab-docs": "Documentação da API",
    "stat-total-title": "Total de Artigos",
    "stat-total-footer": "2012 a 2024",
    "stat-tools-title": "Adoção de Ferramentas",
    "stat-tools-footer": "Processados por IA",
    "stat-sources-title": "Fontes Mapeadas",
    "stat-sources-footer": "Bancos de dados e portais",
    "stat-authors-title": "Pesquisadores",
    "stat-authors-footer": "Autores nos anais",
    "toolbar-title": "Personalizar Visualização",
    "toolbar-palette": "Paleta:",
    "palette-apple": "Apple Minimalist",
    "palette-mono": "Monocromático Sleek",
    "palette-neon": "Neon Cyberpunk",
    "palette-pastel": "Pastel Suave",
    "toolbar-type": "Tipo de Gráfico:",
    "type-bar": "Barras / Colunas",
    "type-line": "Linhas / Conexões",
    "type-radar": "Radar (Teia)",
    "chart-years-title": "Publicações por Edição",
    "chart-tools-title": "Top Softwares & Ferramentas Utilizadas",
    "chart-sources-title": "Principais Fontes de Coleta de Dados",
    "chart-stages-title": "Etapas de Uso Metodológico",
    "filters-title": "Filtros de Busca",
    "filters-clear": "Limpar",
    "filters-search-label": "Busca Textual",
    "filters-search-placeholder": "Título, autor, resumo, palavra-chave...",
    "filters-editions": "Edições do EBBC",
    "filters-tool-label": "Filtrar por Ferramenta",
    "filters-all-tools": "Todas as ferramentas",
    "filters-source-label": "Fonte de Coleta de Dados",
    "filters-all-sources": "Todas as fontes",
    "filters-stage-label": "Etapa Metodológica",
    "filters-any-stage": "Qualquer etapa",
    "stage-coleta": "Coleta de Dados",
    "stage-analise": "Análise de Dados",
    "stage-visualizacao": "Visualização de Dados",
    "filters-has-tool": "Apenas artigos que usam ferramentas",
    "filters-sort-label": "Ordenar por",
    "sort-title": "Título",
    "sort-year": "Ano de Edição",
    "sort-doi": "DOI",
    "sort-dir-title": "Alternar Ordem",
    "export-title": "Exportar Resultados",
    "docs-sidebar-title": "Endpoints",
    "docs-link-intro": "Introdução",
    "sb-label-search": "Busca:",
    "sb-label-year": "Ano:",
    "sb-label-tool": "Ferramenta:",
    "sb-label-limit": "Limite:",
    "sb-btn-send": "Enviar Requisição",
    "sb-label-url": "URL Requisitada:",
    "sb-label-snippet": "Exemplo de Código:",
    "sb-placeholder-search": "Ex: cientometria",
    "sb-placeholder-year": "Ex: 2024",
    "sb-placeholder-tool": "Ex: R",
    "sb-label-doi": "DOI do Artigo:",
    "dl-json": "Baixar JSON (EBBC 2024)",
    "dl-csv": "Baixar CSV (EBBC 2024)",
    "footer-tagline": "Iniciativa para a promoção da Ciência Aberta em Bibliometria no Brasil.",
    "footer-lattes": "Currículo Lattes",
    "footer-copyright": "Desenvolvido por Gabriel Gama",
    "footer-credit": "para a comunidade acadêmica",
    "modal-abstract-title": "Resumo (Abstract)",
    "modal-tools-title": "Ferramentas Utilizadas",
    "modal-stages-title": "Etapas Metodológicas de Uso",
    "modal-sources-title": "Fontes de Coleta de Dados",
    "modal-keywords-title": "Palavras-chave",
    "modal-doi-label": "DOI:",
    // Dynamic messages:
    loadingArticles: "Carregando dados do servidor...",
    noArticlesFound: "Nenhum artigo encontrado com os filtros selecionados.",
    loadError: "Ocorreu um erro ao carregar os dados. Verifique a conexão com a API.",
    toolUsageCountPattern: "{count} artigos utilizaram softwares",
    emptyAbstract: "Resumo deste artigo não foi indexado no cache do OJS/DOI.",
    emptyTools: "Nenhuma ferramenta detectada",
    emptySources: "N/A",
    emptyStages: "N/A",
    emptyKeywords: "Nenhuma palavra-chave",
    sbRespPlaceholder: '{ "Clique em Enviar Requisição para carregar os dados" }',
    sbRespLoading: "Carregando dados...",
    sbRespLoadingStats: "Carregando estatísticas...",
    sbRespLoadingDoi: "Buscando detalhes do artigo...",
    chartPublicationsLabel: "Artigos nos Anais",
    chartFrequencyLabel: "Frequência de Uso",
    chartArticlesLabel: "Artigos",
    coletaLabel: "Coleta de dados",
    analiseLabel: "Análise dos dados",
    visualizacaoLabel: "Visualização"
  },
  en: {
    pageTitle: "EBBC OpenData - Public API and Metadata Dashboard",
    "landing-subtitle": "Methodological Mapping and Software Infrastructure in EBBC Proceedings (2012-2024)",
    "landing-developed-by": "Developed by Gabriel Gama",
    "feat-dash-title": "Scientometric Dashboard",
    "feat-dash-desc": "Consolidated statistics and charts on software adoption and data sources in Brazilian research.",
    "feat-exp-title": "Data Explorer",
    "feat-exp-desc": "Search articles and cross-filter by author, tool utilized, and methodological stage.",
    "feat-api-title": "Public API & Sandbox",
    "feat-api-desc": "Complete RESTful endpoints with browser simulation for researchers and developers.",
    "landing-about": "<strong>EBBC OpenData</strong> is an initiative dedicated to the promotion of <strong>Open Science</strong>. Using advanced AI-assisted curation and automated metadata extraction, the project aims to facilitate the study of national scientific development in the field of Bibliometrics and Scientometrics.",
    "btn-enter": "Enter and Use",
    "header-subtitle": "Open API and Methodological Curation of the Proceedings",
    "open-science": "Open Science",
    "tab-stats": "Statistics Dashboard",
    "tab-explorer": "Data Explorer",
    "tab-docs": "API Documentation",
    "stat-total-title": "Total Articles",
    "stat-total-footer": "2012 to 2024",
    "stat-tools-title": "Software Adoption",
    "stat-tools-footer": "Processed by AI",
    "stat-sources-title": "Mapped Sources",
    "stat-sources-footer": "Databases and portals",
    "stat-authors-title": "Researchers",
    "stat-authors-footer": "Authors in proceedings",
    "toolbar-title": "Customize Visualization",
    "toolbar-palette": "Palette:",
    "palette-apple": "Apple Minimalist",
    "palette-mono": "Sleek Monochrome",
    "palette-neon": "Neon Cyberpunk",
    "palette-pastel": "Soft Pastel",
    "toolbar-type": "Chart Type:",
    "type-bar": "Bars / Columns",
    "type-line": "Lines / Connections",
    "type-radar": "Radar (Web)",
    "chart-years-title": "Publications by Edition",
    "chart-tools-title": "Top Software & Tools Used",
    "chart-sources-title": "Main Data Collection Sources",
    "chart-stages-title": "Methodological Usage Stages",
    "filters-title": "Search Filters",
    "filters-clear": "Clear",
    "filters-search-label": "Text Search",
    "filters-search-placeholder": "Title, author, abstract, keyword...",
    "filters-editions": "EBBC Editions",
    "filters-tool-label": "Filter by Tool",
    "filters-all-tools": "All tools",
    "filters-source-label": "Data Collection Source",
    "filters-all-sources": "All sources",
    "filters-stage-label": "Methodological Stage",
    "filters-any-stage": "Any stage",
    "stage-coleta": "Data Collection",
    "stage-analise": "Data Analysis",
    "stage-visualizacao": "Data Visualization",
    "filters-has-tool": "Only articles using tools",
    "filters-sort-label": "Sort by",
    "sort-title": "Title",
    "sort-year": "Edition Year",
    "sort-doi": "DOI",
    "sort-dir-title": "Toggle Order",
    "export-title": "Export Results",
    "docs-sidebar-title": "Endpoints",
    "docs-link-intro": "Introduction",
    "sb-label-search": "Search:",
    "sb-label-year": "Year:",
    "sb-label-tool": "Tool:",
    "sb-label-limit": "Limit:",
    "sb-btn-send": "Send Request",
    "sb-label-url": "Requested URL:",
    "sb-label-snippet": "Code Example:",
    "sb-placeholder-search": "E.g. scientometrics",
    "sb-placeholder-year": "E.g. 2024",
    "sb-placeholder-tool": "E.g. R",
    "sb-label-doi": "Article DOI:",
    "dl-json": "Download JSON (EBBC 2024)",
    "dl-csv": "Download CSV (EBBC 2024)",
    "footer-tagline": "Initiative for the promotion of Open Science in Bibliometrics in Brazil.",
    "footer-lattes": "Lattes Curriculum",
    "footer-copyright": "Developed by Gabriel Gama",
    "footer-credit": "for the academic community",
    "modal-abstract-title": "Abstract",
    "modal-tools-title": "Software Tools Used",
    "modal-stages-title": "Methodological Usage Stages",
    "modal-sources-title": "Data Collection Sources",
    "modal-keywords-title": "Keywords",
    "modal-doi-label": "DOI:",
    // Dynamic messages:
    loadingArticles: "Loading data from server...",
    noArticlesFound: "No articles found with the selected filters.",
    loadError: "An error occurred while loading data. Verify connection to the API.",
    toolUsageCountPattern: "{count} articles used software",
    emptyAbstract: "Abstract for this article is not indexed in the OJS/DOI cache.",
    emptyTools: "No tools detected",
    emptySources: "N/A",
    emptyStages: "N/A",
    emptyKeywords: "No keywords",
    sbRespPlaceholder: '{ "Click Send Request to load data" }',
    sbRespLoading: "Loading data...",
    sbRespLoadingStats: "Loading statistics...",
    sbRespLoadingDoi: "Fetching article details...",
    chartPublicationsLabel: "Articles in Proceedings",
    chartFrequencyLabel: "Frequency of Use",
    chartArticlesLabel: "Articles",
    coletaLabel: "Data collection",
    analiseLabel: "Data analysis",
    visualizacaoLabel: "Visualization"
  }
};

let currentLang = localStorage.getItem('ebbc_lang') || 'pt';

function initLanguage() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const selectedLang = btn.getAttribute('data-lang');
      applyLanguage(selectedLang);
    });
  });
  applyLanguage(currentLang);
}

function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('ebbc_lang', lang);
  document.body.className = `lang-${lang}`;
  
  document.querySelectorAll('.lang-btn').forEach(btn => {
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  document.title = TRANSLATIONS[lang].pageTitle;
  
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (TRANSLATIONS[lang][key]) {
      if (key === 'landing-about') {
        el.innerHTML = TRANSLATIONS[lang][key];
      } else {
        el.textContent = TRANSLATIONS[lang][key];
      }
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (TRANSLATIONS[lang][key]) {
      el.placeholder = TRANSLATIONS[lang][key];
    }
  });

  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    if (TRANSLATIONS[lang][key]) {
      el.title = TRANSLATIONS[lang][key];
    }
  });
  
  const sandboxPlaceholders = document.querySelectorAll('[data-i18n="sb-resp-placeholder"]');
  sandboxPlaceholders.forEach(el => {
    if (el.textContent.includes('{') || el.textContent.includes('Clique') || el.textContent.includes('Click')) {
      el.textContent = TRANSLATIONS[lang].sbRespPlaceholder;
    }
  });

  if (statsData) {
    updateStatsUI();
  }
  if (articlesData.length > 0) {
    updateArticlesUI();
  }
}

// State Variables
let totalFilteredCount = 0;
let currentFilters = {
  search: '',
  years: ['2012', '2014', '2016', '2018', '2020', '2022', '2024'],
  tool: '',
  source: '',
  stage: '',
  has_tool: false,
  sort: 'title',
  order: 'asc',
  limit: 10,
  offset: 0
};

let statsData = null;
let charts = {};
let currentChartTheme = 'apple';
let currentChartType = 'bar';

// On Load Initialization
document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  initTabs();
  fetchStats();
  fetchArticles();
  initFilterListeners();
  initModalListeners();
  initDocsSidebar();
  
  // Set initial Sandbox URLs
  initSnippetTabs();
  updateSandboxUrls();
  initChartCustomizerListeners();

  // Landing Page Transitions
  const btnEnter = document.getElementById('btn-enter-app');
  const logoLink = document.getElementById('logo-to-landing');
  const landingPage = document.getElementById('landing-page');
  const appWorkspace = document.getElementById('app-workspace');

  if (btnEnter && landingPage && appWorkspace) {
    btnEnter.addEventListener('click', () => {
      landingPage.style.display = 'none';
      appWorkspace.style.display = 'flex';
      // Force Chart.js to adjust to new visible container size
      window.dispatchEvent(new Event('resize'));
    });
  }

  if (logoLink && landingPage && appWorkspace) {
    logoLink.addEventListener('click', () => {
      landingPage.style.display = 'flex';
      appWorkspace.style.display = 'none';
    });
  }
});

// ==========================================================================
// TAB NAVIGATION
// ==========================================================================
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all buttons & panels
      tabBtns.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      // Add active to current
      btn.classList.add('active');
      const targetTab = btn.getAttribute('data-tab');
      document.getElementById(targetTab).classList.add('active');
      
      // If statistics page, recreate charts (Chart.js sizing fix)
      if (targetTab === 'dashboard-tab' && statsData) {
        renderCharts(statsData);
      }
    });
  });
}

// ==========================================================================
// STATS & CHARTS GENERATION
// ==========================================================================
async function fetchStats() {
  try {
    const res = await fetch('/api/articles/stats');
    if (!res.ok) throw new Error('Falha ao buscar estatísticas');
    statsData = await res.json();
    
    updateStatsUI();
  } catch (error) {
    console.error('Error fetching statistics:', error);
  }
}

function updateStatsUI() {
  if (!statsData) return;
  
  // Update metric cards
  const totalEl = document.getElementById('stat-total-articles');
  if (totalEl) totalEl.textContent = statsData.totalArticles;
  
  const pctEl = document.getElementById('stat-tool-percentage');
  if (pctEl) pctEl.textContent = `${statsData.toolUsagePercentage}%`;
  
  const countEl = document.getElementById('stat-tool-count');
  if (countEl) {
    const pattern = TRANSLATIONS[currentLang].toolUsageCountPattern;
    countEl.textContent = pattern.replace('{count}', statsData.toolUsageCount);
  }
  
  const toolsEl = document.getElementById('stat-unique-tools');
  if (toolsEl) toolsEl.textContent = statsData.topTools.length + '+';
  
  const sourcesEl = document.getElementById('stat-unique-sources');
  if (sourcesEl) sourcesEl.textContent = statsData.topSources.length + '+';
  
  const authorsEl = document.getElementById('stat-unique-authors');
  if (authorsEl) authorsEl.textContent = Object.keys(statsData.topAuthors || {}).length || '-';
  
  // Populate select boxes in sidebar
  populateFilterSelects(statsData);
  
  // Render Charts
  renderCharts(statsData);
}

function populateFilterSelects(stats) {
  const toolSelect = document.getElementById('filter-tool');
  const sourceSelect = document.getElementById('filter-source');
  
  // Clear other than first option
  toolSelect.innerHTML = `<option value="">${TRANSLATIONS[currentLang]['filters-all-tools']}</option>`;
  sourceSelect.innerHTML = `<option value="">${TRANSLATIONS[currentLang]['filters-all-sources']}</option>`;
  
  // Populate Tools
  stats.topTools.forEach(t => {
    const opt = document.createElement('option');
    opt.value = t.name;
    opt.textContent = `${t.name} (${t.count})`;
    toolSelect.appendChild(opt);
  });
  
  // Populate Sources
  stats.topSources.forEach(s => {
    const opt = document.createElement('option');
    opt.value = s.name;
    opt.textContent = `${s.name} (${s.count})`;
    sourceSelect.appendChild(opt);
  });
}

function renderCharts(stats) {
  // Chart.js Global Config (Clean Dark Theme)
  Chart.defaults.font.family = "-apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif";
  Chart.defaults.color = '#8e8e93';
  Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.06)';
  
  // Destroy existing charts to prevent overlaps
  Object.values(charts).forEach(chart => chart.destroy());
  charts = {};

  // Palette Cycles
  let colorCycle, borderCycle;
  
  if (currentChartTheme === 'monochrome') {
    colorCycle = [
      'rgba(255, 255, 255, 0.75)',
      'rgba(220, 220, 220, 0.7)',
      'rgba(180, 180, 180, 0.65)',
      'rgba(140, 140, 140, 0.6)',
      'rgba(110, 110, 110, 0.55)',
      'rgba(90, 90, 90, 0.5)',
      'rgba(70, 70, 70, 0.45)',
      'rgba(50, 50, 50, 0.4)'
    ];
    borderCycle = Array(8).fill('rgba(255, 255, 255, 0.85)');
  } else if (currentChartTheme === 'neon') {
    colorCycle = [
      'rgba(255, 0, 127, 0.75)',   // Hot Pink
      'rgba(0, 240, 255, 0.75)',   // Cyan
      'rgba(57, 255, 20, 0.75)',   // Neon Green
      'rgba(189, 0, 255, 0.75)',   // Neon Purple
      'rgba(255, 255, 0, 0.75)',   // Yellow
      'rgba(255, 110, 0, 0.75)',   // Orange
      'rgba(0, 100, 255, 0.75)',   // Blue
      'rgba(255, 0, 0, 0.75)'      // Red
    ];
    borderCycle = [
      '#ff007f', '#00f0ff', '#39ff14', '#bd00ff', '#ffff00', '#ff6e00', '#0064ff', '#ff0000'
    ];
  } else if (currentChartTheme === 'pastel') {
    colorCycle = [
      'rgba(255, 179, 186, 0.75)',  // Pink
      'rgba(255, 223, 186, 0.75)',  // Orange
      'rgba(255, 255, 186, 0.75)',  // Yellow
      'rgba(186, 255, 201, 0.75)',  // Green
      'rgba(186, 225, 255, 0.75)',  // Blue
      'rgba(221, 186, 255, 0.75)',  // Purple
      'rgba(255, 200, 220, 0.75)',  // Soft Rose
      'rgba(200, 255, 240, 0.75)'   // Mint
    ];
    borderCycle = [
      '#ffb3ba', '#ffdfba', '#ffffba', '#baffc9', '#bae1ff', '#ddbaff', '#ffc8dc', '#c8fff0'
    ];
  } else {
    // Apple Minimalist
    colorCycle = [
      'rgba(10, 132, 255, 0.75)',
      'rgba(48, 209, 88, 0.75)',
      'rgba(94, 92, 230, 0.75)',
      'rgba(255, 159, 10, 0.75)',
      'rgba(191, 90, 242, 0.75)',
      'rgba(255, 55, 95, 0.75)',
      'rgba(100, 210, 255, 0.75)',
      'rgba(255, 214, 10, 0.75)'
    ];
    borderCycle = [
      '#0a84ff', '#30d158', '#5e5ce6', '#ff9f0a', '#bf5af2', '#ff375f', '#64d2ff', '#ffd60a'
    ];
  }

  const isRadar = currentChartType === 'radar';
  const isLine = currentChartType === 'line';

  // 1. Chart: Publications by Year
  const ctxYears = document.getElementById('chart-years').getContext('2d');
  charts.years = new Chart(ctxYears, {
    type: currentChartType,
    data: {
      labels: Object.keys(stats.byYear),
      datasets: [{
        label: TRANSLATIONS[currentLang].chartPublicationsLabel,
        data: Object.values(stats.byYear),
        backgroundColor: isLine ? 'rgba(10, 132, 255, 0.15)' : colorCycle.slice(0, Object.keys(stats.byYear).length),
        borderColor: isLine ? '#0a84ff' : borderCycle.slice(0, Object.keys(stats.byYear).length),
        borderWidth: isLine ? 2.5 : 1,
        borderRadius: isLine ? 0 : 4,
        fill: isLine,
        pointBackgroundColor: isLine ? '#0a84ff' : undefined,
        pointRadius: isLine ? 4 : undefined
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: isRadar ? {
        r: {
          angleLines: { color: 'rgba(255, 255, 255, 0.08)' },
          grid: { color: 'rgba(255, 255, 255, 0.08)' },
          pointLabels: { color: '#8e8e93', font: { size: 10 } },
          ticks: { display: false }
        }
      } : {
        y: { 
          beginAtZero: true, 
          ticks: { stepSize: 20 },
          grid: { color: 'rgba(255, 255, 255, 0.05)' }
        },
        x: {
          grid: { display: false }
        }
      }
    }
  });

  // 2. Chart: Top Tools
  const ctxTools = document.getElementById('chart-tools').getContext('2d');
  const topToolsData = stats.topTools.slice(0, 8);
  const toolsIndexAxis = currentChartType === 'bar' ? 'y' : 'x';
  
  charts.tools = new Chart(ctxTools, {
    type: currentChartType,
    data: {
      labels: topToolsData.map(t => t.name),
      datasets: [{
        label: TRANSLATIONS[currentLang].chartFrequencyLabel,
        data: topToolsData.map(t => t.count),
        backgroundColor: isLine ? 'rgba(48, 209, 88, 0.15)' : colorCycle.slice(0, topToolsData.length),
        borderColor: isLine ? '#30d158' : borderCycle.slice(0, topToolsData.length),
        borderWidth: isLine ? 2.5 : 1,
        borderRadius: isLine ? 0 : 3,
        fill: isLine,
        pointBackgroundColor: isLine ? '#30d158' : undefined,
        pointRadius: isLine ? 4 : undefined
      }]
    },
    options: {
      indexAxis: toolsIndexAxis,
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: isRadar ? {
        r: {
          angleLines: { color: 'rgba(255, 255, 255, 0.08)' },
          grid: { color: 'rgba(255, 255, 255, 0.08)' },
          pointLabels: { color: '#8e8e93', font: { size: 10 } },
          ticks: { display: false }
        }
      } : (currentChartType === 'bar' ? {
        x: { 
          beginAtZero: true,
          grid: { color: 'rgba(255, 255, 255, 0.05)' }
        },
        y: {
          grid: { display: false }
        }
      } : {
        y: {
          beginAtZero: true,
          grid: { color: 'rgba(255, 255, 255, 0.05)' }
        },
        x: {
          grid: { display: false }
        }
      })
    }
  });

  // 3. Chart: Data Sources
  const ctxSources = document.getElementById('chart-sources').getContext('2d');
  const topSourcesData = stats.topSources.slice(0, 7);
  charts.sources = new Chart(ctxSources, {
    type: currentChartType,
    data: {
      labels: topSourcesData.map(s => s.name),
      datasets: [{
        label: TRANSLATIONS[currentLang].chartArticlesLabel,
        data: topSourcesData.map(s => s.count),
        backgroundColor: isLine ? 'rgba(94, 92, 230, 0.15)' : colorCycle.slice(3, 3 + topSourcesData.length),
        borderColor: isLine ? '#5e5ce6' : borderCycle.slice(3, 3 + topSourcesData.length),
        borderWidth: isLine ? 2.5 : 1,
        borderRadius: isLine ? 0 : 4,
        fill: isLine,
        pointBackgroundColor: isLine ? '#5e5ce6' : undefined,
        pointRadius: isLine ? 4 : undefined
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: isRadar ? {
        r: {
          angleLines: { color: 'rgba(255, 255, 255, 0.08)' },
          grid: { color: 'rgba(255, 255, 255, 0.08)' },
          pointLabels: { color: '#8e8e93', font: { size: 10 } },
          ticks: { display: false }
        }
      } : {
        y: { 
          beginAtZero: true,
          grid: { color: 'rgba(255, 255, 255, 0.05)' }
        },
        x: {
          grid: { display: false }
        }
      }
    }
  });

  // 4. Chart: Stages
  const ctxStages = document.getElementById('chart-stages').getContext('2d');
  const stagesType = isRadar ? 'polarArea' : 'doughnut';
  
  charts.stages = new Chart(ctxStages, {
    type: stagesType,
    data: {
      labels: Object.keys(stats.usageStages).map(s => {
        const sLower = s.toLowerCase();
        if (sLower.includes('coleta')) return TRANSLATIONS[currentLang].coletaLabel;
        if (sLower.includes('análise') || sLower.includes('analise')) return TRANSLATIONS[currentLang].analiseLabel;
        if (sLower.includes('visualização') || sLower.includes('visualizacao')) return TRANSLATIONS[currentLang].visualizacaoLabel;
        return s;
      }),
      datasets: [{
        data: Object.values(stats.usageStages),
        backgroundColor: currentChartTheme === 'monochrome' ? [
          'rgba(255, 255, 255, 0.85)',
          'rgba(180, 180, 180, 0.7)',
          'rgba(100, 100, 100, 0.55)'
        ] : (currentChartTheme === 'pastel' ? [
          'rgba(255, 179, 186, 0.8)',
          'rgba(186, 225, 255, 0.8)',
          'rgba(186, 255, 201, 0.8)'
        ] : (currentChartTheme === 'neon' ? [
          'rgba(255, 0, 127, 0.8)',
          'rgba(0, 240, 255, 0.8)',
          'rgba(57, 255, 20, 0.8)'
        ] : [
          'rgba(255, 159, 10, 0.75)',
          'rgba(10, 132, 255, 0.75)',
          'rgba(48, 209, 88, 0.75)'
        ])),
        borderColor: '#16161a',
        borderWidth: 3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: { 
            boxWidth: 10, 
            padding: 12,
            color: '#8e8e93'
          }
        }
      },
      cutout: stagesType === 'doughnut' ? '70%' : undefined,
      scales: stagesType === 'polarArea' ? {
        r: {
          grid: { color: 'rgba(255, 255, 255, 0.06)' },
          ticks: { display: false }
        }
      } : undefined
    }
  });
}

function initChartCustomizerListeners() {
  const themeSelect = document.getElementById('chart-theme-select');
  const typeSelect = document.getElementById('chart-type-select');
  
  if (themeSelect) {
    themeSelect.addEventListener('change', (e) => {
      currentChartTheme = e.target.value;
      if (statsData) renderCharts(statsData);
    });
  }
  
  if (typeSelect) {
    typeSelect.addEventListener('change', (e) => {
      currentChartType = e.target.value;
      if (statsData) renderCharts(statsData);
    });
  }
}

// ==========================================================================
// DATA EXPLORER & FILTERS
// ==========================================================================
let articlesData = [];

async function fetchArticles() {
  const container = document.getElementById('articles-list-element');
  container.innerHTML = `
    <div class="loading-state">
      <i class="fa-solid fa-circle-notch fa-spin"></i> ${TRANSLATIONS[currentLang].loadingArticles}
    </div>
  `;
  
  // Build query string
  const params = new URLSearchParams();
  if (currentFilters.search) params.append('search', currentFilters.search);
  if (currentFilters.years.length > 0) params.append('year', currentFilters.years.join(','));
  if (currentFilters.tool) params.append('tool', currentFilters.tool);
  if (currentFilters.source) params.append('source', currentFilters.source);
  if (currentFilters.stage) params.append('stage', currentFilters.stage);
  if (currentFilters.has_tool) params.append('has_tool', 'true');
  
  params.append('sort', currentFilters.sort);
  params.append('order', currentFilters.order);
  params.append('limit', currentFilters.limit);
  params.append('offset', currentFilters.offset);

  try {
    const res = await fetch(`/api/articles?${params.toString()}`);
    if (!res.ok) throw new Error('Erro ao buscar artigos');
    
    const data = await res.json();
    articlesData = data.results;
    totalFilteredCount = data.filteredCount;
    
    updateArticlesUI();
    
    // Update API Sandbox URL dynamically
    updateSandboxUrls();
  } catch (error) {
    console.error('Error fetching articles:', error);
    container.innerHTML = `
      <div class="empty-state">
        <i class="fa-solid fa-circle-exclamation" style="color: var(--color-rose);"></i>
        <p>${TRANSLATIONS[currentLang].loadError}</p>
      </div>
    `;
  }
}

function updateArticlesUI() {
  const startIdx = totalFilteredCount === 0 ? 0 : currentFilters.offset + 1;
  const endIdx = Math.min(currentFilters.offset + currentFilters.limit, totalFilteredCount);
  
  const displayedStr = `${startIdx}-${endIdx}`;
  const countContainer = document.querySelector('.results-count');
  
  if (currentLang === 'en') {
    countContainer.innerHTML = `Showing <span id="displayed-count">${displayedStr}</span> of <span id="filtered-count">${totalFilteredCount}</span> filtered articles`;
  } else {
    countContainer.innerHTML = `Mostrando <span id="displayed-count">${displayedStr}</span> de <span id="filtered-count">${totalFilteredCount}</span> artigos filtrados`;
  }
  
  renderArticlesList(articlesData);
  renderPagination(totalFilteredCount);
}

function renderArticlesList(list) {
  const container = document.getElementById('articles-list-element');
  container.innerHTML = '';
  
  if (list.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <i class="fa-solid fa-folder-open"></i>
        <p>${TRANSLATIONS[currentLang].noArticlesFound}</p>
      </div>
    `;
    return;
  }
  
  list.forEach(art => {
    const card = document.createElement('div');
    card.className = 'article-card';
    card.addEventListener('click', () => openArticleModal(art));
    
    // Build tags badges
    let tagsHTML = '';
    
    art.tools.slice(0, 3).forEach(t => {
      tagsHTML += `<span class="badge-tag tool"><i class="fa-solid fa-screwdriver-wrench"></i> ${t}</span>`;
    });
    
    art.data_sources.slice(0, 3).forEach(s => {
      tagsHTML += `<span class="badge-tag source"><i class="fa-solid fa-database"></i> ${s}</span>`;
    });
    
    art.usage_stages.slice(0, 2).forEach(st => {
      // Translate dynamic stage tags if they correspond to known stages
      let displayStage = st;
      const stLower = st.toLowerCase();
      if (stLower.includes('coleta')) displayStage = currentLang === 'en' ? 'Data collection' : 'Coleta de dados';
      else if (stLower.includes('análise') || stLower.includes('analise')) displayStage = currentLang === 'en' ? 'Data analysis' : 'Análise de dados';
      else if (stLower.includes('visualização') || stLower.includes('visualizacao')) displayStage = currentLang === 'en' ? 'Visualization' : 'Visualização';
      
      tagsHTML += `<span class="badge-tag stage"><i class="fa-solid fa-arrows-split-up-and-left"></i> ${displayStage}</span>`;
    });

    const noDoiText = currentLang === 'en' ? 'No DOI registered' : 'Sem DOI cadastrado';
    const doiSnippet = art.doi ? `<span class="card-doi">${art.doi}</span>` : `<span class="card-doi">${noDoiText}</span>`;
    
    card.innerHTML = `
      <div class="card-header-row">
        <span class="card-year-badge">${art.year}</span>
        ${doiSnippet}
      </div>
      <h3>${art.title}</h3>
      <p class="card-authors">${art.authors.join(', ')}</p>
      <div class="card-tags">${tagsHTML}</div>
    `;
    
    container.appendChild(card);
  });
}

function renderPagination(totalFiltered) {
  const prevBtn = document.getElementById('btn-prev');
  const nextBtn = document.getElementById('btn-next');
  const indicator = document.getElementById('page-indicator');
  
  const totalPages = Math.ceil(totalFiltered / currentFilters.limit) || 1;
  const currentPage = Math.floor(currentFilters.offset / currentFilters.limit) + 1;
  
  if (currentLang === 'en') {
    indicator.textContent = `Page ${currentPage} of ${totalPages}`;
  } else {
    indicator.textContent = `Pág. ${currentPage} de ${totalPages}`;
  }
  
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

// Filter listeners
function initFilterListeners() {
  // Text Search (Debounced)
  let searchTimeout;
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', e => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      currentFilters.search = e.target.value;
      currentFilters.offset = 0; // Reset pagination
      fetchArticles();
    }, 400);
  });
  
  // Year Checkboxes
  const yearChecks = document.querySelectorAll('.filter-year');
  yearChecks.forEach(ch => {
    ch.addEventListener('change', () => {
      const activeYears = [];
      yearChecks.forEach(c => {
        if (c.checked) activeYears.push(c.value);
      });
      currentFilters.years = activeYears;
      currentFilters.offset = 0;
      fetchArticles();
    });
  });
  
  // Tool Select
  document.getElementById('filter-tool').addEventListener('change', e => {
    currentFilters.tool = e.target.value;
    currentFilters.offset = 0;
    fetchArticles();
  });
  
  // Source Select
  document.getElementById('filter-source').addEventListener('change', e => {
    currentFilters.source = e.target.value;
    currentFilters.offset = 0;
    fetchArticles();
  });
  
  // Stage Select
  document.getElementById('filter-stage').addEventListener('change', e => {
    currentFilters.stage = e.target.value;
    currentFilters.offset = 0;
    fetchArticles();
  });
  
  // Has Tool Checkbox
  document.getElementById('filter-has-tool').addEventListener('change', e => {
    currentFilters.has_tool = e.target.checked;
    currentFilters.offset = 0;
    fetchArticles();
  });
  
  // Sort By Select
  document.getElementById('sort-select').addEventListener('change', e => {
    currentFilters.sort = e.target.value;
    fetchArticles();
  });
  
  // Sort Dir Button
  const sortDirBtn = document.getElementById('btn-sort-dir');
  sortDirBtn.addEventListener('click', () => {
    const icon = sortDirBtn.querySelector('i');
    if (currentFilters.order === 'asc') {
      currentFilters.order = 'desc';
      icon.className = 'fa-solid fa-sort-amount-up'; // Sort desc icon
    } else {
      currentFilters.order = 'asc';
      icon.className = 'fa-solid fa-sort-amount-down'; // Sort asc icon
    }
    fetchArticles();
  });
  
  // Clear Filters
  document.getElementById('btn-clear-filters').addEventListener('click', () => {
    // Reset filters object
    currentFilters = {
      search: '',
      years: ['2012', '2014', '2016', '2018', '2020', '2022', '2024'],
      tool: '',
      source: '',
      stage: '',
      has_tool: false,
      sort: 'title',
      order: 'asc',
      limit: 10,
      offset: 0
    };
    
    // Reset inputs in DOM
    searchInput.value = '';
    yearChecks.forEach(c => c.checked = true);
    document.getElementById('filter-tool').value = '';
    document.getElementById('filter-source').value = '';
    document.getElementById('filter-stage').value = '';
    document.getElementById('filter-has-tool').checked = false;
    document.getElementById('sort-select').value = 'title';
    sortDirBtn.querySelector('i').className = 'fa-solid fa-sort-amount-down';
    
    fetchArticles();
  });
  
  // Pagination buttons
  document.getElementById('btn-prev').addEventListener('click', () => {
    if (currentFilters.offset >= currentFilters.limit) {
      currentFilters.offset -= currentFilters.limit;
      fetchArticles();
    }
  });
  
  document.getElementById('btn-next').addEventListener('click', () => {
    currentFilters.offset += currentFilters.limit;
    fetchArticles();
  });
  
  // Exports
  document.getElementById('btn-export-csv').addEventListener('click', () => {
    triggerExport('csv');
  });
  
  document.getElementById('btn-export-json').addEventListener('click', () => {
    triggerExport('json');
  });
}

function triggerExport(format) {
  const params = new URLSearchParams();
  if (currentFilters.search) params.append('search', currentFilters.search);
  if (currentFilters.years.length > 0) params.append('year', currentFilters.years.join(','));
  if (currentFilters.tool) params.append('tool', currentFilters.tool);
  if (currentFilters.source) params.append('source', currentFilters.source);
  if (currentFilters.stage) params.append('stage', currentFilters.stage);
  if (currentFilters.has_tool) params.append('has_tool', 'true');
  
  params.append('format', format);
  
  const url = `/api/articles/export?${params.toString()}`;
  window.open(url, '_blank');
}

// ==========================================================================
// MODAL POPULATION & CONTROL
// ==========================================================================
function initModalListeners() {
  const modal = document.getElementById('article-modal');
  const closeBtn = document.getElementById('btn-close-modal');
  
  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
  });
  
  modal.addEventListener('click', e => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
}

function openArticleModal(art) {
  const modal = document.getElementById('article-modal');
  
  // Set basic details
  document.getElementById('modal-year').textContent = art.year;
  document.getElementById('modal-title').textContent = art.title;
  document.getElementById('modal-authors').textContent = art.authors.join(', ');
  document.getElementById('modal-abstract').textContent = art.abstract || TRANSLATIONS[currentLang].emptyAbstract;
  
  // Tools List
  const toolsList = document.getElementById('modal-tools');
  toolsList.innerHTML = '';
  if (art.tools.length === 0) {
    toolsList.innerHTML = `<span class="text-muted" style="font-size: 0.85rem;">${TRANSLATIONS[currentLang].emptyTools}</span>`;
  } else {
    art.tools.forEach(t => {
      toolsList.innerHTML += `<span class="badge-tag tool"><i class="fa-solid fa-screwdriver-wrench"></i> ${t}</span>`;
    });
  }
  
  // Sources List
  const sourcesList = document.getElementById('modal-sources');
  sourcesList.innerHTML = '';
  if (art.data_sources.length === 0) {
    sourcesList.innerHTML = `<span class="text-muted" style="font-size: 0.85rem;">${TRANSLATIONS[currentLang].emptySources}</span>`;
  } else {
    art.data_sources.forEach(s => {
      sourcesList.innerHTML += `<span class="badge-tag source"><i class="fa-solid fa-database"></i> ${s}</span>`;
    });
  }
  
  // Stages List
  const stagesList = document.getElementById('modal-stages');
  stagesList.innerHTML = '';
  if (art.usage_stages.length === 0) {
    stagesList.innerHTML = `<span class="text-muted" style="font-size: 0.85rem;">${TRANSLATIONS[currentLang].emptyStages}</span>`;
  } else {
    art.usage_stages.forEach(st => {
      // Translate stage string in modal
      let displayStage = st;
      const stLower = st.toLowerCase();
      if (stLower.includes('coleta')) displayStage = currentLang === 'en' ? 'Data collection' : 'Coleta de dados';
      else if (stLower.includes('análise') || stLower.includes('analise')) displayStage = currentLang === 'en' ? 'Data analysis' : 'Análise de dados';
      else if (stLower.includes('visualização') || stLower.includes('visualizacao')) displayStage = currentLang === 'en' ? 'Visualization' : 'Visualização';
      
      stagesList.innerHTML += `<span class="badge-tag stage"><i class="fa-solid fa-arrows-split-up-and-left"></i> ${displayStage}</span>`;
    });
  }
  
  // Keywords List
  const keywordsList = document.getElementById('modal-keywords');
  keywordsList.innerHTML = '';
  if (art.keywords.length === 0) {
    keywordsList.innerHTML = `<span class="text-muted" style="font-size: 0.85rem;">${TRANSLATIONS[currentLang].emptyKeywords}</span>`;
  } else {
    art.keywords.forEach(k => {
      keywordsList.innerHTML += `<span class="badge-pill" style="font-size: 0.75rem;">${k}</span>`;
    });
  }
  
  // DOI Link
  const doiLink = document.getElementById('modal-doi-link');
  if (art.doi) {
    doiLink.href = art.doi;
    doiLink.textContent = art.doi;
    doiLink.style.display = 'inline';
    document.querySelector('.doi-label').style.display = 'inline';
  } else {
    doiLink.style.display = 'none';
    document.querySelector('.doi-label').style.display = 'none';
  }
  
  modal.classList.add('active');
}

// ==========================================================================
// API DOCS SANDBOX
// ==========================================================================
function initDocsSidebar() {
  const links = document.querySelectorAll('.docs-sidebar a');
  const sections = document.querySelectorAll('.doc-section');
  
  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      
      // Update sidebar links
      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      
      // Update content sections
      sections.forEach(sec => sec.classList.remove('active'));
      const targetId = link.getAttribute('href').substring(1);
      document.getElementById(targetId).classList.add('active');
      
      // Scroll to top of docs content
      document.querySelector('.docs-content').scrollTop = 0;
    });
  });
}

// Sandbox Trigger Functions
async function runSandboxArticles() {
  const searchVal = document.getElementById('sb-art-search').value;
  const yearVal = document.getElementById('sb-art-year').value;
  const toolVal = document.getElementById('sb-art-tool').value;
  const limitVal = document.getElementById('sb-art-limit').value || 2;
  
  const params = new URLSearchParams();
  if (searchVal) params.append('search', searchVal);
  if (yearVal) params.append('year', yearVal);
  if (toolVal) params.append('tool', toolVal);
  params.append('limit', limitVal);
  
  const queryUrl = `/api/articles?${params.toString()}`;
  document.getElementById('sb-art-url').textContent = window.location.origin + queryUrl;
  
  const codeBox = document.getElementById('sb-art-resp');
  codeBox.textContent = TRANSLATIONS[currentLang].sbRespLoading;
  
  try {
    const res = await fetch(queryUrl);
    const data = await res.json();
    codeBox.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    codeBox.textContent = `Error: ${err.message}`;
  }
}

async function runSandboxStats() {
  const queryUrl = '/api/articles/stats';
  document.getElementById('sb-stats-url').textContent = window.location.origin + queryUrl;
  
  const codeBox = document.getElementById('sb-stats-resp');
  codeBox.textContent = TRANSLATIONS[currentLang].sbRespLoadingStats;
  
  try {
    const res = await fetch(queryUrl);
    const data = await res.json();
    codeBox.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    codeBox.textContent = `Error: ${err.message}`;
  }
}

async function runSandboxDoi() {
  const doiVal = document.getElementById('sb-doi-val').value;
  const queryUrl = `/api/articles/${encodeURIComponent(doiVal)}`;
  document.getElementById('sb-doi-url').textContent = window.location.origin + queryUrl;
  
  const codeBox = document.getElementById('sb-doi-resp');
  codeBox.textContent = TRANSLATIONS[currentLang].sbRespLoadingDoi;
  
  try {
    const res = await fetch(queryUrl);
    const data = await res.json();
    codeBox.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    codeBox.textContent = `Error: ${err.message}`;
  }
}

function updateSandboxUrls() {
  const origin = window.location.origin;
  
  // Articles Sandbox
  const artSearch = document.getElementById('sb-art-search').value;
  const artYear = document.getElementById('sb-art-year').value;
  const artTool = document.getElementById('sb-art-tool').value;
  const artLimit = document.getElementById('sb-art-limit').value || 2;
  
  const artParams = new URLSearchParams();
  if (artSearch) artParams.append('search', artSearch);
  if (artYear) artParams.append('year', artYear);
  if (artTool) artParams.append('tool', artTool);
  artParams.append('limit', artLimit);
  
  const artUrl = origin + '/api/articles?' + artParams.toString();
  document.getElementById('sb-art-url').textContent = artUrl;
  document.getElementById('sb-art-snippet').textContent = generateSnippetCode(artUrl, activeSnippetLang);
  
  // Stats Sandbox
  const statsUrl = origin + '/api/articles/stats';
  document.getElementById('sb-stats-url').textContent = statsUrl;
  document.getElementById('sb-stats-snippet').textContent = generateSnippetCode(statsUrl, activeSnippetLang);
  
  // DOI Sandbox
  const doiVal = document.getElementById('sb-doi-val').value;
  const doiUrl = origin + `/api/articles/${encodeURIComponent(doiVal)}`;
  document.getElementById('sb-doi-url').textContent = doiUrl;
  document.getElementById('sb-doi-snippet').textContent = generateSnippetCode(doiUrl, activeSnippetLang);
}

let activeSnippetLang = 'js';

function initSnippetTabs() {
  // Bind input updates to update URLs and snippets instantly
  ['sb-art-search', 'sb-art-year', 'sb-art-tool', 'sb-art-limit'].forEach(id => {
    const input = document.getElementById(id);
    if (input) {
      input.addEventListener('input', updateSandboxUrls);
    }
  });
  
  const doiInput = document.getElementById('sb-doi-val');
  if (doiInput) {
    doiInput.addEventListener('input', updateSandboxUrls);
  }

  // Bind tab click events
  document.querySelectorAll('.snippet-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const lang = tab.getAttribute('data-lang');
      activeSnippetLang = lang;
      
      // Update active classes across all snippet tabs
      document.querySelectorAll('.snippet-tab').forEach(t => {
        if (t.getAttribute('data-lang') === lang) {
          t.classList.add('active');
        } else {
          t.classList.remove('active');
        }
      });
      
      // Refresh the snippet text values
      updateSandboxUrls();
    });
  });
}

function generateSnippetCode(url, lang) {
  if (lang === 'js') {
    return `fetch("${url}")
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));`;
  } else if (lang === 'python') {
    return `import requests

url = "${url}"
response = requests.get(url)
data = response.json()
print(data)`;
  } else if (lang === 'curl') {
    return `curl -X GET "${url}"`;
  }
  return '';
}
