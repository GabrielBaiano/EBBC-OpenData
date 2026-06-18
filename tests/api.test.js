/**
 * EBBC-OpenData — Integration Tests (API endpoints)
 * Spins up the Express app and fires real HTTP requests.
 * Runner: node:test  |  Run: npm test:api  or  node --test tests/api.test.js
 *
 * Dependencies: none beyond what's already in package.json
 */

import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';

// ─── Import the Express app ────────────────────────────────────────────────────
// server.js exports `default app` and also calls app.listen(),
// so we just import it and talk to the already-listening server.
import app from '../server.js';

const BASE = `http://localhost:${process.env.PORT || 3000}`;

/** Simple wrapper around http.get that returns { status, body } */
function get(path) {
  return new Promise((resolve, reject) => {
    http
      .get(`${BASE}${path}`, res => {
        let raw = '';
        res.on('data', chunk => (raw += chunk));
        res.on('end', () => {
          let body;
          try {
            body = JSON.parse(raw);
          } catch {
            body = raw;
          }
          resolve({ status: res.statusCode, headers: res.headers, body });
        });
      })
      .on('error', reject);
  });
}

// ─── /api/articles ─────────────────────────────────────────────────────────────

describe('GET /api/articles', () => {
  test('responde com 200 e estrutura correta', async () => {
    const { status, body } = await get('/api/articles');
    assert.equal(status, 200);
    assert.ok(typeof body.total === 'number', 'total deve ser número');
    assert.ok(typeof body.filteredCount === 'number');
    assert.ok(typeof body.limit === 'number');
    assert.ok(typeof body.offset === 'number');
    assert.ok(Array.isArray(body.results), 'results deve ser array');
  });

  test('retorna no máximo 20 artigos por padrão (limit default)', async () => {
    const { body } = await get('/api/articles');
    assert.ok(body.results.length <= 20);
  });

  test('limit e offset funcionam corretamente', async () => {
    const page1 = await get('/api/articles?limit=5&offset=0');
    const page2 = await get('/api/articles?limit=5&offset=5');
    assert.equal(page1.body.results.length, 5);
    assert.equal(page2.body.results.length, 5);
    // As duas páginas não podem ter o mesmo primeiro elemento
    assert.notDeepEqual(page1.body.results[0], page2.body.results[0]);
  });

  test('filtro por ano retorna apenas artigos do ano solicitado', async () => {
    const { body } = await get('/api/articles?year=2020&limit=100');
    assert.ok(body.results.length > 0, 'deve ter artigos de 2020');
    body.results.forEach(art => {
      assert.equal(art.year, 2020, `artigo "${art.title}" não é de 2020`);
    });
  });

  test('filtro por múltiplos anos (year=2020,2022)', async () => {
    const { body } = await get('/api/articles?year=2020,2022&limit=200');
    assert.ok(body.results.length > 0);
    body.results.forEach(art => {
      assert.ok([2020, 2022].includes(art.year), `ano ${art.year} inesperado`);
    });
  });

  test('filtro por ferramenta (tool) retorna artigos que contém a ferramenta', async () => {
    const { body } = await get('/api/articles?tool=vosviewer&limit=50');
    body.results.forEach(art => {
      const hasIt = art.tools.some(t => t.toLowerCase().includes('vosviewer'));
      assert.ok(hasIt, `artigo "${art.title}" não contém vosviewer em tools`);
    });
  });

  test('filtro has_tool=true retorna apenas artigos com ferramentas', async () => {
    const { body } = await get('/api/articles?has_tool=true&limit=100');
    body.results.forEach(art => {
      assert.ok(art.tools.length > 0, `artigo "${art.title}" não tem ferramentas`);
    });
  });

  test('filtro has_tool=false retorna apenas artigos sem ferramentas', async () => {
    const { body } = await get('/api/articles?has_tool=false&limit=100');
    body.results.forEach(art => {
      assert.equal(art.tools.length, 0, `artigo "${art.title}" tem ferramentas inesperadas`);
    });
  });

  test('busca geral (search) filtra por termo', async () => {
    const { body } = await get('/api/articles?search=bibliometri&limit=50');
    assert.ok(body.results.length > 0, 'deve encontrar artigos com "bibliometri"');
    body.results.forEach(art => {
      const text = [
        art.title,
        art.abstract || '',
        ...art.authors,
        ...art.keywords,
        ...art.tools,
        ...art.data_sources,
      ]
        .join(' ')
        .toLowerCase();
      assert.ok(text.includes('bibliometri'), `artigo "${art.title}" não contém o termo`);
    });
  });

  test('busca sem resultados retorna array vazio com filteredCount=0', async () => {
    const { body } = await get('/api/articles?search=xyzabc123naoexiste');
    assert.equal(body.filteredCount, 0);
    assert.deepEqual(body.results, []);
  });

  test('ordenação por year desc funciona', async () => {
    const { body } = await get('/api/articles?sort=year&order=desc&limit=50');
    for (let i = 1; i < body.results.length; i++) {
      assert.ok(
        body.results[i - 1].year >= body.results[i].year,
        `ordem desc violada: ${body.results[i - 1].year} < ${body.results[i].year}`
      );
    }
  });

  test('cada artigo tem os campos obrigatórios da API', async () => {
    const { body } = await get('/api/articles?limit=20');
    const required = ['doi', 'title', 'year', 'authors', 'keywords', 'tools', 'data_sources'];
    body.results.forEach(art => {
      required.forEach(field => {
        assert.ok(Object.hasOwn(art, field), `campo "${field}" ausente em "${art.title}"`);
      });
      assert.ok(Array.isArray(art.authors), 'authors deve ser array');
      assert.ok(Array.isArray(art.keywords), 'keywords deve ser array');
      assert.ok(Array.isArray(art.tools), 'tools deve ser array');
      assert.ok(Array.isArray(art.data_sources), 'data_sources deve ser array');
    });
  });

  test('total reflete a contagem GLOBAL (não filtrada)', async () => {
    const all = await get('/api/articles?limit=1');
    const filtered = await get('/api/articles?year=2024&limit=1');
    // total deve ser igual ao dataset completo
    assert.equal(all.body.total, filtered.body.total);
    // filteredCount pode diferir
    assert.ok(filtered.body.filteredCount <= all.body.total);
  });
});

// ─── /api/articles/stats ───────────────────────────────────────────────────────

describe('GET /api/articles/stats', () => {
  test('responde com 200', async () => {
    const { status } = await get('/api/articles/stats');
    assert.equal(status, 200);
  });

  test('contém os campos esperados', async () => {
    const { body } = await get('/api/articles/stats');
    const keys = ['totalArticles', 'byYear', 'toolUsageCount', 'topTools', 'topSources', 'topAuthors', 'usageStages', 'toolUsagePercentage'];
    keys.forEach(k => assert.ok(Object.hasOwn(body, k), `campo "${k}" ausente em stats`));
  });

  test('totalArticles é positivo', async () => {
    const { body } = await get('/api/articles/stats');
    assert.ok(body.totalArticles > 0);
  });

  test('byYear contém todos os anos esperados (2012–2024)', async () => {
    const { body } = await get('/api/articles/stats');
    const expectedYears = [2012, 2014, 2016, 2018, 2020, 2022, 2024];
    expectedYears.forEach(y => {
      assert.ok(Object.hasOwn(body.byYear, String(y)), `ano ${y} ausente em byYear`);
      assert.ok(body.byYear[y] > 0, `byYear[${y}] deve ser positivo`);
    });
  });

  test('topTools é array com { name, count }', async () => {
    const { body } = await get('/api/articles/stats');
    assert.ok(Array.isArray(body.topTools));
    if (body.topTools.length > 0) {
      const first = body.topTools[0];
      assert.ok(typeof first.name === 'string');
      assert.ok(typeof first.count === 'number' && first.count > 0);
    }
  });

  test('topTools está ordenado por count decrescente', async () => {
    const { body } = await get('/api/articles/stats');
    for (let i = 1; i < body.topTools.length; i++) {
      assert.ok(
        body.topTools[i - 1].count >= body.topTools[i].count,
        'topTools não está em ordem decrescente'
      );
    }
  });

  test('toolUsagePercentage é número entre 0 e 100', async () => {
    const { body } = await get('/api/articles/stats');
    assert.ok(body.toolUsagePercentage >= 0 && body.toolUsagePercentage <= 100);
  });

  test('usageStages contém coleta de dados, análise dos dados e visualização', async () => {
    const { body } = await get('/api/articles/stats');
    assert.ok(Object.hasOwn(body.usageStages, 'coleta de dados'));
    assert.ok(Object.hasOwn(body.usageStages, 'análise dos dados'));
    assert.ok(Object.hasOwn(body.usageStages, 'visualização'));
  });

  test('soma de byYear é igual a totalArticles', async () => {
    const { body } = await get('/api/articles/stats');
    const sum = Object.values(body.byYear).reduce((a, b) => a + b, 0);
    assert.equal(sum, body.totalArticles);
  });
});

// ─── /api/articles/export ─────────────────────────────────────────────────────

describe('GET /api/articles/export', () => {
  test('export JSON retorna 200 com Content-Type application/json', async () => {
    const { status, headers } = await get('/api/articles/export?format=json');
    assert.equal(status, 200);
    assert.ok(headers['content-type'].includes('application/json'));
  });

  test('export JSON retorna array de artigos', async () => {
    const { body } = await get('/api/articles/export?format=json');
    assert.ok(Array.isArray(body));
    assert.ok(body.length > 0);
  });

  test('export CSV retorna 200 com Content-Type text/csv', async () => {
    const { status, headers } = await get('/api/articles/export?format=csv');
    assert.equal(status, 200);
    assert.ok(headers['content-type'].toLowerCase().includes('text/csv'));
  });

  test('export CSV tem cabeçalho com colunas esperadas', async () => {
    const { body } = await get('/api/articles/export?format=csv');
    assert.ok(typeof body === 'string');
    // BOM + header
    const firstLine = body.replace(/^\uFEFF/, '').split('\n')[0];
    ['DOI', 'Ano', 'Título', 'Autoria', 'Resumo (Abstract)'].forEach(col => {
      assert.ok(firstLine.includes(col), `coluna "${col}" não encontrada no CSV`);
    });
  });

  test('export CSV filtrado por ano contém apenas artigos do ano', async () => {
    const { body } = await get('/api/articles/export?format=json&year=2012');
    assert.ok(Array.isArray(body));
    body.forEach(art => assert.equal(art.year, 2012));
  });

  test('export default (sem format) retorna JSON', async () => {
    const { headers } = await get('/api/articles/export');
    assert.ok(headers['content-type'].includes('application/json'));
  });
});

// ─── /api/articles/doi/* ──────────────────────────────────────────────────────

describe('GET /api/articles/doi/*', () => {
  // First, fetch a valid DOI from the dataset to use in tests
  let validDoi;

  before(async () => {
    const { body } = await get('/api/articles?limit=200');
    const withDoi = body.results.find(a => a.doi && a.doi.trim() !== '');
    if (withDoi) validDoi = withDoi.doi;
  });

  test('DOI válido retorna 200 com o artigo correto', async () => {
    if (!validDoi) {
      console.warn('  Nenhum DOI disponível — pulando teste de DOI válido');
      return;
    }
    const encoded = encodeURIComponent(validDoi);
    const { status, body } = await get(`/api/articles/doi/${encoded}`);
    assert.equal(status, 200);
    assert.ok(body.doi, 'artigo deve ter campo doi');
  });

  test('DOI inexistente retorna 404', async () => {
    const { status, body } = await get('/api/articles/doi/10.99999%2Fnot.a.real.doi');
    assert.equal(status, 404);
    assert.ok(body.error, 'deve ter mensagem de erro');
  });

  test('busca via query param ?value= funciona', async () => {
    if (!validDoi) {
      console.warn('  Nenhum DOI disponível — pulando teste de query param');
      return;
    }
    const encoded = encodeURIComponent(validDoi);
    const { status } = await get(`/api/articles/doi?value=${encoded}`);
    assert.equal(status, 200);
  });
});

// ─── /api/articles/:doi (path-encoded) ────────────────────────────────────────

describe('GET /api/articles/:doi (percent-encoded)', () => {
  let validDoi;

  before(async () => {
    const { body } = await get('/api/articles?limit=200');
    const withDoi = body.results.find(a => a.doi && a.doi.trim() !== '');
    if (withDoi) validDoi = withDoi.doi;
  });

  test('DOI percent-encoded retorna 200', async () => {
    if (!validDoi) return;
    const encoded = encodeURIComponent(validDoi);
    const { status } = await get(`/api/articles/${encoded}`);
    assert.equal(status, 200);
  });

  test('DOI inexistente retorna 404', async () => {
    const { status, body } = await get('/api/articles/doi%3A10.99999%2Ffake');
    assert.equal(status, 404);
    assert.ok(body.error);
  });
});

// ─── Integridade dos dados carregados ─────────────────────────────────────────

describe('Integridade dos dados carregados', () => {
  test('dataset não está vazio', async () => {
    const { body } = await get('/api/articles/stats');
    assert.ok(body.totalArticles > 0, 'Nenhum artigo carregado!');
  });

  test('todos os artigos têm título não-vazio', async () => {
    const { body } = await get('/api/articles?limit=9999');
    body.results.forEach(art => {
      assert.ok(art.title && art.title.trim() !== '', `artigo sem título: ${JSON.stringify(art)}`);
    });
  });

  test('todos os artigos têm year em [2012,2014,2016,2018,2020,2022,2024]', async () => {
    const { body } = await get('/api/articles?limit=9999');
    const validYears = new Set([2012, 2014, 2016, 2018, 2020, 2022, 2024]);
    body.results.forEach(art => {
      assert.ok(validYears.has(art.year), `ano inválido ${art.year} em "${art.title}"`);
    });
  });

  test('authors, keywords, tools, data_sources sempre são arrays', async () => {
    const { body } = await get('/api/articles?limit=9999');
    body.results.forEach(art => {
      assert.ok(Array.isArray(art.authors));
      assert.ok(Array.isArray(art.keywords));
      assert.ok(Array.isArray(art.tools));
      assert.ok(Array.isArray(art.data_sources));
    });
  });

  // 4 duplicatas conhecidas existentes nos dados fonte (CSVs originais).
  // O teste falha APENAS se novas duplicatas além dessas aparecerem.
  const KNOWN_DUPES = new Set([
    '2022::análise das coautorias entre brasil e demais países em hanseníase: um olhar a partir do instituto lauro de souza lima',
    '2014::análise de cocitação de autores: uma aplicação em estudos de indexação',
    '2012::noções de bourdieu articuladas à análise de redes sociais e à bibliometria: construção de uma hipótese',
    '2014::pesquisadores da universidade federal do rio de janeiro, uso do porta capes e desempenho na ciência',
  ]);

  test('duplicatas conhecidas no dataset estão documentadas (4 conhecidas)', async () => {
    const { body } = await get('/api/articles?limit=9999');
    const seen = new Set();
    const dupes = [];
    body.results.forEach(art => {
      const key = `${art.year}::${art.title.toLowerCase().trim()}`;
      if (seen.has(key)) dupes.push(key);
      seen.add(key);
    });
    // Verifica se há apenas as duplicatas conhecidas
    const unexpected = dupes.filter(d => !KNOWN_DUPES.has(d));
    assert.equal(
      unexpected.length,
      0,
      `Novas duplicatas inesperadas encontradas:\n${unexpected.join('\n')}`
    );
    // Verifica se todas as duplicatas conhecidas ainda existem (regressão)
    KNOWN_DUPES.forEach(known => {
      assert.ok(dupes.includes(known), `Duplicata conhecida sumiu do dataset: "${known}"`);
    });
  });
});

// ─── CORS ────────────────────────────────────────────────────────────────────

describe('Cabeçalhos CORS', () => {
  test('respostas da API incluem Access-Control-Allow-Origin', async () => {
    const { headers } = await get('/api/articles?limit=1');
    assert.ok(
      headers['access-control-allow-origin'],
      'Cabeçalho CORS ausente'
    );
  });
});

// ─── Dashboard estático ───────────────────────────────────────────────────────

describe('Servindo arquivos estáticos (dashboard)', () => {
  test('GET / retorna 200 com HTML', async () => {
    const { status, headers } = await get('/');
    assert.equal(status, 200);
    assert.ok(headers['content-type'].includes('text/html'));
  });

  test('GET /style.css retorna 200 com CSS', async () => {
    const { status, headers } = await get('/style.css');
    assert.equal(status, 200);
    assert.ok(headers['content-type'].includes('css'));
  });

  test('GET /app.js retorna 200 com JavaScript', async () => {
    const { status, headers } = await get('/app.js');
    assert.equal(status, 200);
    assert.ok(
      headers['content-type'].includes('javascript') ||
      headers['content-type'].includes('text/plain'),
      `content-type inesperado: ${headers['content-type']}`
    );
  });
});
