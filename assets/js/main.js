(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* cabeçalho */
  const hdr = $('[data-hdr]');
  const setH = () => document.documentElement.style.setProperty('--hdr-h', hdr.getBoundingClientRect().bottom + 'px');
  const onScroll = () => { hdr.classList.toggle('is-stuck', scrollY > 40); setH(); };
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', setH);
  onScroll();

  /* menu móvel */
  const btn = $('[data-menu-btn]');
  const panel = $('[data-menu]');
  const close = () => { btn.setAttribute('aria-expanded', 'false'); panel.classList.remove('is-open'); document.body.style.overflow = ''; };
  btn?.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') !== 'true';
    setH();
    btn.setAttribute('aria-expanded', String(open));
    panel.classList.toggle('is-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

  /* pesquisa no catálogo */
  const root = document.documentElement.dataset.root || './';
  let index;
  const load = () => (index ||= fetch(root + 'assets/data/search.json').then((r) => r.json()));
  const norm = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const find = async (q) => {
    const terms = norm(q).split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    const data = await load();
    return data
      .map((it) => {
        const t = norm(it.t), d = norm(it.d);
        let score = 0;
        for (const w of terms) {
          if (t.startsWith(w)) score += 3;
          else if (t.includes(w)) score += 2;
          else if (d.includes(w)) score += 1;
          else return null;
        }
        return { ...it, score };
      })
      .filter(Boolean)
      .sort((a, b) => b.score - a.score || a.t.length - b.t.length)
      .slice(0, 12);
  };
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  $$('[data-finder]:not([data-finder-page])').forEach((form) => {
    const input = $('input', form);
    const list = $('.finder__res', form);
    let sel = -1, items = [];
    const render = () => {
      list.innerHTML = items.map((it, i) => `<li><a role="option" id="fr-${i}" href="${root + it.u}" aria-selected="${i === sel}">${esc(it.t)}<small>${esc(it.d)}</small></a></li>`).join('');
      list.hidden = !items.length;
      input.setAttribute('aria-expanded', String(!!items.length));
    };
    input.addEventListener('focus', load, { once: true });
    input.addEventListener('input', async () => { items = (await find(input.value)).slice(0, 7); sel = -1; render(); });
    input.addEventListener('keydown', (e) => {
      if (!items.length) return;
      if (e.key === 'ArrowDown') { sel = (sel + 1) % items.length; render(); e.preventDefault(); }
      if (e.key === 'ArrowUp') { sel = (sel - 1 + items.length) % items.length; render(); e.preventDefault(); }
      if (e.key === 'Enter' && sel > -1) { location.href = root + items[sel].u; e.preventDefault(); }
    });
    document.addEventListener('click', (e) => { if (!form.contains(e.target)) { items = []; render(); } });
  });

  const resList = $('[data-results]');
  if (resList) {
    const q = new URLSearchParams(location.search).get('q') || '';
    const input = $('[data-finder-page] input');
    input.value = q;
    const run = async (v) => {
      const r = await find(v);
      resList.innerHTML = r.map((it) => `<li><a href="${root + it.u}"><strong>${esc(it.t)}</strong><span>${esc(it.d)}</span></a></li>`).join('');
      $('[data-results-empty]').hidden = !!r.length || !v;
    };
    run(q);
    $('[data-finder-page]').addEventListener('submit', (e) => { e.preventDefault(); history.replaceState(null, '', '?q=' + encodeURIComponent(input.value)); run(input.value); });
  }

  /* formulário de contacto → cliente de email */
  const cf = $('[data-cform]');
  cf?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!cf.reportValidity()) return;
    const f = new FormData(cf);
    const body = `Nome: ${f.get('nome')}\nTelefone: ${f.get('telefone')}\nEmail: ${f.get('email')}\n\n${f.get('mensagem')}`;
    location.href = `${cf.action.split('?')[0]}?subject=${encodeURIComponent(f.get('assunto') + ' — site Fercold')}&body=${encodeURIComponent(body)}`;
    $('[data-cform-msg]').textContent = 'O seu programa de email abriu com o pedido preenchido. Basta enviar.';
  });
})();
