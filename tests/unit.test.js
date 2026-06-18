/**
 * EBBC-OpenData — Unit Tests
 * Tests pure helper functions isolated from Express/data loading.
 * Runner: node:test (Node ≥ v18)
 *
 * Run: npm test:unit  or  node --test tests/unit.test.js
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';

// ─── Copy of helpers (mirror of server.js so we can test them in isolation) ───

function normalizeTitle(title) {
  if (!title) return '';
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');
}

function parseList(str) {
  if (!str || typeof str !== 'string') return [];
  const cleanStr = str.trim();
  if (
    cleanStr.toUpperCase() === 'N/A' ||
    cleanStr.toUpperCase() === 'N/O' ||
    cleanStr === ''
  ) {
    return [];
  }
  let normalized = cleanStr.replace(/\s+e\s+/gi, ', ');
  return normalized
    .split(/[,;\/]/)
    .map(item => item.trim())
    .filter(item => item && item.toUpperCase() !== 'N/A' && item.toUpperCase() !== 'N/O');
}

// ─── normalizeTitle ────────────────────────────────────────────────────────────

describe('normalizeTitle()', () => {
  test('retorna string vazia para entrada nula', () => {
    assert.equal(normalizeTitle(null), '');
    assert.equal(normalizeTitle(undefined), '');
    assert.equal(normalizeTitle(''), '');
  });

  test('converte para minúsculas', () => {
    assert.equal(normalizeTitle('HELLO WORLD'), 'helloworld');
  });

  test('remove acentos e diacríticos', () => {
    assert.equal(normalizeTitle('Bibliometria e Cientometria'), 'bibliometriaecientometria');
    assert.equal(normalizeTitle('Análise Exploratória'), 'analiseexploratoria');
    assert.equal(normalizeTitle('Pesquisa Científica'), 'pesquisacientifica');
  });

  test('remove caracteres não alfanuméricos', () => {
    assert.equal(normalizeTitle('Hello, World! (2024)'), 'helloworld2024');
    assert.equal(normalizeTitle('DOI: 10.1234/test'), 'doi101234test');
  });

  test('mantém números', () => {
    assert.equal(normalizeTitle('EBBC 2024'), 'ebbc2024');
  });

  test('produz o mesmo resultado independente de espaços extras', () => {
    const a = normalizeTitle('  Análise   de Redes  ');
    const b = normalizeTitle('Análise de Redes');
    assert.equal(a, b);
  });

  test('é idempotente', () => {
    const once = normalizeTitle('Bibliometria');
    assert.equal(normalizeTitle(once), once);
  });
});

// ─── parseList ─────────────────────────────────────────────────────────────────

describe('parseList()', () => {
  test('retorna array vazio para entrada nula/undefined/vazia', () => {
    assert.deepEqual(parseList(null), []);
    assert.deepEqual(parseList(undefined), []);
    assert.deepEqual(parseList(''), []);
  });

  test('retorna array vazio para N/A e N/O', () => {
    assert.deepEqual(parseList('N/A'), []);
    assert.deepEqual(parseList('n/a'), []);
    assert.deepEqual(parseList('N/O'), []);
    assert.deepEqual(parseList('n/o'), []);
  });

  test('divide por vírgula', () => {
    assert.deepEqual(parseList('Python, R, SPSS'), ['Python', 'R', 'SPSS']);
  });

  test('divide por ponto e vírgula', () => {
    assert.deepEqual(parseList('Scopus; Web of Science'), ['Scopus', 'Web of Science']);
  });

  test('divide por barra (quando não é N/A ou N/O)', () => {
    // Barra separa itens normais
    assert.deepEqual(parseList('coleta/análise'), ['coleta', 'análise']);
  });

  test('substitui " e " por vírgula antes de dividir', () => {
    const result = parseList('Python e R e Gephi');
    assert.deepEqual(result, ['Python', 'R', 'Gephi']);
  });

  test('remove espaços extras de cada item', () => {
    assert.deepEqual(parseList('  Python  ,  R  '), ['Python', 'R']);
  });

  // NOTA: este é um comportamento conhecido do código atual.
  // parseList divide por "/" ANTES de filtrar N/A, então "N/A" inline
  // é dividido em ["N", "A"] em vez de ser removido como unidade.
  // O teste abaixo documenta o comportamento real (não o ideal).
  test('comportamento real: N/A inline é dividido em ["N","A"] (limitação conhecida)', () => {
    const result = parseList('Python, N/A, R');
    assert.deepEqual(result, ['Python', 'N', 'A', 'R']);
  });

  test('N/A como única entrada retorna array vazio (caso correto)', () => {
    assert.deepEqual(parseList('N/A'), []);
    assert.deepEqual(parseList('N/O'), []);
  });

  test('lida com string de item único', () => {
    assert.deepEqual(parseList('VOSviewer'), ['VOSviewer']);
  });

  test('retorna array vazio para entrada não-string', () => {
    assert.deepEqual(parseList(42), []);
    assert.deepEqual(parseList([]), []);
    assert.deepEqual(parseList({}), []);
  });
});
