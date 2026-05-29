/* ════════════════════════════════════════════
   CALCULADORA FINANCEIRA — main.js
   Autor: João Maciel
   ════════════════════════════════════════════ */

/* ── Helpers gerais ─────────────────────────────────────────────────── */

/** Atalho para document.getElementById */
const $ = id => document.getElementById(id);

/** Formata número como moeda R$ */
const fmt = n => Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
}).format(n);

/** Formata número com 4 casas decimais (vírgula BR) */
const fmtN = n => n.toFixed(4).replace('.', ',');

/** Formata número como percentual com 2 casas */
const fmtPct = n => n.toFixed(2).replace('.', ',') + '%';


/* ── Exibição de resultado / erro ───────────────────────────────────── */

function showResult(boxId, errId, html) {
  $(errId).classList.remove('show');
  const box = $(boxId);
  box.innerHTML = html;
  box.classList.add('show');
}

function showError(errId, boxId) {
  $(errId).classList.add('show');
  $(boxId).classList.remove('show');
}

/**
 * Monta o HTML do card de resultado.
 * @param {Array}  items   - [{ label, value, cls? }]
 * @param {string} formula - texto da fórmula aplicada
 */
function resultHTML(items, formula) {
  const cells = items.map(({ label, value, cls }) => `
    <div class="result-item">
      <div class="r-label">${label}</div>
      <div class="r-value ${cls || ''}">${value}</div>
    </div>
  `).join('');

  return `
    <div class="result-header">✅ Resultado</div>
    <div class="result-grid">${cells}</div>
    <div class="formula-strip">
      <div class="formula-title">Fórmula aplicada</div>
      <code>${formula}</code>
    </div>
  `;
}


/* ── Navegação entre abas ───────────────────────────────────────────── */

function switchTab(id, btn) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  $('panel-' + id).classList.add('active');
  btn.classList.add('active');
}

function openAbout() {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  $('panel-sobre').classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}


/* ── Estado dos subtipos ────────────────────────────────────────────── */

let descType = 1;
let pctType  = 1;
let r3Type   = 1;


/* ── Porcentagem — troca de subtipo ────────────────────────────────── */

function setPct(n, btn) {
  pctType = n;
  [1, 2, 3].forEach(i => {
    $('pct' + i).style.display = i === n ? 'block' : 'none';
  });
  document.querySelectorAll('#panel-pct .sub-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  $('pct-result').classList.remove('show');
  $('pct-error').classList.remove('show');
}


/* ── Desconto — troca de subtipo ────────────────────────────────────── */

function setDesc(n, btn) {
  descType = n;
  document.querySelectorAll('#panel-desc .sub-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  $('desc-result').classList.remove('show');
  $('desc-error').classList.remove('show');
}


/* ── Regra de Três — troca de subtipo ───────────────────────────────── */

function setR3(n, btn) {
  r3Type = n;
  $('r3-simple').style.display = n === 1 ? 'block' : 'none';
  $('r3-comp').style.display   = n === 2 ? 'block' : 'none';
  document.querySelectorAll('#panel-r3 .sub-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  $('r3-result').classList.remove('show');
  $('r3-error').classList.remove('show');
}


/* ══════════════════════════════════════════
   CÁLCULOS
   ══════════════════════════════════════════ */

/* ── Porcentagem ────────────────────────────────────────────────────── */

function calcPct(t) {
  if (t === 1) {
    const v  = parseFloat($('pct1-valor').value);
    const tx = parseFloat($('pct1-taxa').value);
    if (isNaN(v) || isNaN(tx)) { showError('pct-error', 'pct-result'); return; }

    const res = (v * tx) / 100;
    showResult('pct-result', 'pct-error', resultHTML([
      { label: 'Valor Total',   value: fmt(v),      cls: 'tertiary'  },
      { label: 'Taxa Aplicada', value: fmtPct(tx),  cls: 'secondary' },
      { label: `${tx}% de ${v}`, value: fmt(res) },
    ], `resultado = (${v} × ${tx}) ÷ 100 = ${res.toFixed(2)}`));

  } else if (t === 2) {
    const parte = parseFloat($('pct2-parte').value);
    const total = parseFloat($('pct2-total').value);
    if (isNaN(parte) || isNaN(total) || total <= 0) { showError('pct-error', 'pct-result'); return; }

    const res = (parte / total) * 100;
    showResult('pct-result', 'pct-error', resultHTML([
      { label: 'Valor Parcial', value: fmt(parte), cls: 'tertiary'  },
      { label: 'Valor Total',   value: fmt(total), cls: 'secondary' },
      { label: 'Percentual',    value: fmtPct(res) },
    ], `% = (${parte} ÷ ${total}) × 100 = ${res.toFixed(2)}%`));

  } else {
    const v  = parseFloat($('pct3-valor').value);
    const tx = parseFloat($('pct3-taxa').value);
    if (isNaN(v) || isNaN(tx)) { showError('pct-error', 'pct-result'); return; }

    const res  = v + (v * tx / 100);
    const tipo = tx >= 0 ? 'Aumento' : 'Desconto';
    showResult('pct-result', 'pct-error', resultHTML([
      { label: 'Valor Original', value: fmt(v),                    cls: 'tertiary'  },
      { label: tipo,             value: fmt(Math.abs(v * tx / 100)), cls: 'secondary' },
      { label: 'Valor Final',    value: fmt(res) },
    ], `resultado = ${v} + (${v} × ${tx} ÷ 100) = ${res.toFixed(2)}`));
  }
}


/* ── Juros Simples ──────────────────────────────────────────────────── */

function calcJS() {
  const c = parseFloat($('js-capital').value);
  const i = parseFloat($('js-taxa').value);
  const t = parseFloat($('js-tempo').value);

  if (isNaN(c) || isNaN(i) || isNaN(t) || c <= 0 || i <= 0 || t <= 0) {
    showError('js-error', 'js-result');
    return;
  }

  const j     = c * (i / 100) * t;
  const total = c + j;
  showResult('js-result', 'js-error', resultHTML([
    { label: 'Capital Inicial', value: fmt(c),     cls: 'tertiary'  },
    { label: 'Juros Gerados',   value: fmt(j),     cls: 'secondary' },
    { label: 'Montante Total',  value: fmt(total) },
  ], `J = C × i × t = ${c} × ${(i / 100).toFixed(4)} × ${t} = ${j.toFixed(2)}`));
}


/* ── Juros Compostos ────────────────────────────────────────────────── */

function calcJC() {
  const c = parseFloat($('jc-capital').value);
  const i = parseFloat($('jc-taxa').value);
  const t = parseFloat($('jc-tempo').value);

  if (isNaN(c) || isNaN(i) || isNaN(t) || c <= 0 || i <= 0 || t <= 0) {
    showError('jc-error', 'jc-result');
    return;
  }

  const total = c * (1 + i / 100) ** t;
  const j     = total - c;
  showResult('jc-result', 'jc-error', resultHTML([
    { label: 'Capital Inicial', value: fmt(c),     cls: 'tertiary'  },
    { label: 'Juros Gerados',   value: fmt(j),     cls: 'secondary' },
    { label: 'Montante Total',  value: fmt(total) },
  ], `M = ${c} × (1 + ${fmtPct(i)})^${t} = ${total.toFixed(2)}`));
}


/* ── Desconto ───────────────────────────────────────────────────────── */

function calcDesc() {
  const v  = parseFloat($('desc-valor').value);
  const tx = parseFloat($('desc-taxa').value);
  if (isNaN(v) || isNaN(tx) || v <= 0 || tx <= 0) { showError('desc-error', 'desc-result'); return; }

  let desc, final, formula;

  if (descType === 1) {
    // Desconto Comercial — % sobre o valor original
    desc    = v * (tx / 100);
    final   = v - desc;
    formula = `D = ${v} × ${(tx / 100).toFixed(4)} = ${desc.toFixed(2)}  |  Final = ${v} - ${desc.toFixed(2)} = ${final.toFixed(2)}`;
  } else {
    // Desconto Racional — % sobre o valor final
    final   = v / (1 + tx / 100);
    desc    = v - final;
    formula = `Final = ${v} ÷ (1 + ${(tx / 100).toFixed(4)}) = ${final.toFixed(2)}`;
  }

  showResult('desc-result', 'desc-error', resultHTML([
    { label: 'Valor Original', value: fmt(v),     cls: 'tertiary'  },
    { label: 'Desconto',       value: fmt(desc),  cls: 'secondary' },
    { label: 'Valor Final',    value: fmt(final) },
  ], formula));
}


/* ── Regra de Três ──────────────────────────────────────────────────── */

function calcR3(t) {
  if (t === 1) {
    // Simples: se A → B, então C → X
    const a = parseFloat($('r3s-a').value);
    const b = parseFloat($('r3s-b').value);
    const c = parseFloat($('r3s-c').value);
    if (isNaN(a) || isNaN(b) || isNaN(c) || a === 0) { showError('r3-error', 'r3-result'); return; }

    const x = (b * c) / a;
    showResult('r3-result', 'r3-error', resultHTML([
      { label: 'A',            value: fmtN(a), cls: 'tertiary'  },
      { label: 'B',            value: fmtN(b), cls: 'secondary' },
      { label: 'C',            value: fmtN(c), cls: 'secondary' },
      { label: 'X (resultado)', value: x.toFixed(4).replace('.', ',') },
    ], `X = (B × C) ÷ A = (${b} × ${c}) ÷ ${a} = ${x.toFixed(4)}`));

  } else {
    // Composta: duas grandezas afetando um resultado
    const a1  = parseFloat($('r3c-a1').value);
    const b1  = parseFloat($('r3c-b1').value);
    const a2  = parseFloat($('r3c-a2').value);
    const b2  = parseFloat($('r3c-b2').value);
    const res = parseFloat($('r3c-res').value);
    if ([a1, b1, a2, b2, res].some(isNaN) || a1 === 0 || a2 === 0) { showError('r3-error', 'r3-result'); return; }

    const x = (a2 * b2 * res) / (a1 * b1);
    showResult('r3-result', 'r3-error', resultHTML([
      { label: 'Grandeza 1 (A→B)', value: `${a1} → ${b1}`,   cls: 'tertiary'  },
      { label: 'Grandeza 2 (A→B)', value: `${a2} → ${b2}`,   cls: 'secondary' },
      { label: 'Resultado Dado',   value: String(res),         cls: 'secondary' },
      { label: 'X (resultado)',    value: x.toFixed(4).replace('.', ',') },
    ], `X = (${a2} × ${b2} × ${res}) ÷ (${a1} × ${b1}) = ${x.toFixed(4)}`));
  }
}


/* ══════════════════════════════════════════
   EVENTOS GLOBAIS
   ══════════════════════════════════════════ */

/** Calcular com Enter quando o foco está em um input */
document.addEventListener('keydown', e => {
  if (e.key !== 'Enter') return;
  const active = document.querySelector('.panel.active');
  if (!active) return;
  const btn = active.querySelector('.calc-btn');
  if (btn && document.activeElement.tagName === 'INPUT') btn.click();
});

/** Paralaxe suave no orb do fundo */
document.addEventListener('mousemove', e => {
  const orbA = document.querySelector('.glow-orb.a');
  if (!orbA) return;
  orbA.style.transform = `translate(${e.clientX * 0.02}px, ${e.clientY * 0.02}px)`;
});

/* ── Light / Dark Mode ── */
function toggleTheme() {
  const isLight = document.body.classList.toggle('light');
  document.getElementById('theme-toggle').textContent = isLight ? '☀️' : '🌙';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  document.querySelector('meta[name="theme-color"]')
    .setAttribute('content', isLight ? '#f0f4f8' : '#0d1117');
}

// Aplica o tema salvo assim que a página carrega
(function applyStoredTheme() {
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light');
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.textContent = '☀️';
    document.querySelector('meta[name="theme-color"]')
      .setAttribute('content', '#f0f4f8');
  }
})();