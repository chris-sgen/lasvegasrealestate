(function () {
  'use strict';
  var doc = document, root = doc.documentElement;
  root.classList.add('js');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var $ = function (s, c) { return (c || doc).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || doc).querySelectorAll(s)); };
  var sheet = $('link[rel="stylesheet"][href*="assets/css/"]');
  var siteRoot = sheet ? sheet.href.slice(0, sheet.href.indexOf('assets/css/')) : '/';
  var fromRoot = function (u) { return u && u.charAt(0) === '/' ? siteRoot + u.slice(1) : u; };
  var header = $('[data-header]');
  if (header) {
    var ticking = false;
    var onScroll = function () {
      ticking = false;
      var y = window.scrollY;
      header.classList.toggle('is-stuck', y > 8);
      header.classList.toggle('is-compact', y > 220);
    };
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
    onScroll();
  }
  var panels = $$('details.menu__item--panel');
  var closePanels = function (except) { panels.forEach(function (d) { if (d !== except && d.open) d.open = false; }); };
  var canHover = window.matchMedia('(hover: hover) and (pointer: fine)');
  panels.forEach(function (d) {
    var timer = 0;
    d.addEventListener('toggle', function () { if (d.open) closePanels(d); });
    d.addEventListener('pointerenter', function (e) { if (!canHover.matches || e.pointerType !== 'mouse') return; clearTimeout(timer); timer = setTimeout(function () { d.open = true; }, 90); });
    d.addEventListener('pointerleave', function (e) { if (!canHover.matches || e.pointerType !== 'mouse') return; clearTimeout(timer); timer = setTimeout(function () { if (!d.contains(doc.activeElement) || doc.activeElement === $('summary', d)) d.open = false; }, 220); });
    d.addEventListener('focusout', function (e) { if (e.relatedTarget && !d.contains(e.relatedTarget)) d.open = false; });
  });
  doc.addEventListener('click', function (e) { if (!e.target.closest('details.menu__item--panel')) closePanels(); });
  doc.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var open = panels.filter(function (d) { return d.open; })[0];
    if (open) { open.open = false; var s = $('summary', open); if (s) s.focus(); }
  });
  var menu = $('.menu');
  var fetchPanelPictures = function () {
    if (!menu || getComputedStyle(menu).display === 'none' || (navigator.connection && navigator.connection.saveData)) return;
    $$('[data-panel] img[loading="lazy"]').forEach(function (img) { img.loading = 'eager'; });
  };
  if (doc.readyState === 'complete') fetchPanelPictures(); else window.addEventListener('load', fetchPanelPictures);
  if (menu) menu.addEventListener('pointerenter', fetchPanelPictures);
  var drawer = $('[data-drawer]');
  var opener = $('[data-drawer-open]');
  if (drawer && opener) {
    var lastFocus = null;
    var focusables = function () { return $$('a[href], button, summary, input', drawer).filter(function (el) { return el.offsetParent !== null; }); };
    var close = function () {
      drawer.hidden = true;
      opener.setAttribute('aria-expanded', 'false');
      doc.body.style.overflow = '';
      if (lastFocus) lastFocus.focus();
    };
    var open = function () {
      lastFocus = doc.activeElement;
      drawer.hidden = false;
      opener.setAttribute('aria-expanded', 'true');
      doc.body.style.overflow = 'hidden';
      var f = focusables();
      if (f.length) f[0].focus();
    };
    opener.setAttribute('role', 'button');
    opener.addEventListener('click', function (e) { e.preventDefault(); open(); });
    opener.addEventListener('keydown', function (e) { if (e.key === ' ') { e.preventDefault(); open(); } });
    $$('[data-drawer-close]', drawer).forEach(function (b) { b.addEventListener('click', close); });
    drawer.addEventListener('click', function (e) { if (e.target === drawer) close(); });
    drawer.addEventListener('click', function (e) { var a = e.target.closest('a[href]'); if (a && a.hash && a.pathname === location.pathname) close(); });
    drawer.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { close(); return; }
      if (e.key !== 'Tab') return;
      var f = focusables();
      if (!f.length) return;
      if (e.shiftKey && doc.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && doc.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    });
    window.matchMedia('(min-width: 83em)').addEventListener('change', function (m) { if (m.matches && !drawer.hidden) close(); });
  }
  var focusSearch = function () {
    if (location.hash !== '#listing-search') return;
    var f = doc.getElementById('listing-search');
    var input = f && $('input[type="text"], input[type="search"]', f);
    if (input) setTimeout(function () { input.focus({ preventScroll: true }); }, 350);
  };
  window.addEventListener('hashchange', focusSearch);
  focusSearch();
  var here = $('.termbar .is-current');
  if (here) {
    var row = here.closest('.termbar__list');
    if (row && row.scrollWidth > row.clientWidth) row.scrollLeft = Math.max(0, here.getBoundingClientRect().left - row.getBoundingClientRect().left - 16);
  }
  var tocLinks = $$('.toc__list a');
  if (tocLinks.length && 'IntersectionObserver' in window) {
    var byId = {};
    tocLinks.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var seen = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        tocLinks.forEach(function (a) { a.classList.remove('is-current'); });
        var a = byId[en.target.id];
        if (a) a.classList.add('is-current');
      });
    }, { rootMargin: '-20% 0px -65% 0px' });
    Object.keys(byId).forEach(function (id) { var el = doc.getElementById(id); if (el) seen.observe(el); });
  }
  $$('.video[data-video]').forEach(function (box) {
    var link = $('.video__link', box);
    if (!link) return;
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var f = doc.createElement('iframe');
      f.setAttribute('referrerpolicy', 'strict-origin'); f.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(box.getAttribute('data-video')) + '?autoplay=1&rel=0';
      f.title = ($('.video__label', box) || link).textContent.trim();
      f.allow = 'autoplay; encrypted-media; picture-in-picture';
      f.allowFullscreen = true;
      f.referrerPolicy = 'strict-origin';
      box.innerHTML = '';
      box.appendChild(f);
      f.focus();
    });
  });
  if (!reduce.matches && 'IntersectionObserver' in window) {
    var targets = $$('.band__head, .cards > .card, .posts > .post-card, .links > .link-card, .tiles:not(.tiles--scroll) > .tile, .types > .type, .split__copy, .logos > .logo, .seen > .seen__item, .faq > .faq__item, .rail-card, .toc, .statement, .city__head, .cta__copy, .tabset > .tabset__item, .chapter, .post-nav, .termbar, .aside__side, .listings, .footer__col');
    var doors = $$('.split__media, .cta__side, .film, .video, .band--map .map');
    var lines = $$('.dim');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        if (en.target.rvInner) Array.prototype.forEach.call(en.target.querySelectorAll('img[loading="lazy"], iframe[loading="lazy"]'), function (im) { im.loading = 'eager'; });
        (en.target.rvInner || en.target).classList.add('is-in'); io.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    var vh = window.innerHeight;
    targets.forEach(function (el) {
      if (el.getBoundingClientRect().top < vh * 0.9) return;
      var i = Array.prototype.indexOf.call(el.parentElement.children, el);
      el.style.setProperty('--i', String(Math.min(i % 6, 5)));
      el.classList.add('rv');
      io.observe(el);
    });
    doors.forEach(function (el) { if (el.getBoundingClientRect().top < vh * 0.9) return; el.rvInner = el.firstElementChild || el; if (el.rvInner === el) return; el.rvInner.classList.add('rv-door'); io.observe(el); });
    lines.forEach(function (el) { if (el.closest('.hero') || el.getBoundingClientRect().top < vh * 0.9) return; el.classList.add('rv-line'); io.observe(el); });
  }
  var loops = $$('.loop[data-loop]');
  if (loops.length) {
    var saver = navigator.connection && navigator.connection.saveData;
    var started = new WeakMap();
    var start = function (box) {
      if (started.has(box) || reduce.matches || saver) return;
      var v = doc.createElement('video');
      v.muted = true; v.defaultMuted = true; v.loop = true; v.playsInline = true; v.autoplay = true; v.preload = 'auto';
      v.setAttribute('muted', ''); v.setAttribute('playsinline', ''); v.setAttribute('aria-hidden', 'true'); v.setAttribute('tabindex', '-1');
      v.disablePictureInPicture = true; v.disableRemotePlayback = true;
      v.setAttribute('controlslist', 'nodownload nofullscreen noremoteplayback');
      var small = window.matchMedia('(max-width: 48em)').matches && box.getAttribute('data-loop-small');
      v.src = fromRoot(small || box.getAttribute('data-loop'));
      v.addEventListener('playing', function () { box.classList.add('is-playing'); });
      v.addEventListener('pause', function () { if (box.getAttribute('data-visible') === '1' && !reduce.matches) { var p = v.play(); if (p && p.catch) p.catch(function () {}); } });
      box.appendChild(v);
      started.set(box, v);
      var p = v.play();
      if (p && p.catch) p.catch(function () { v.removeAttribute('src'); v.load(); box.classList.remove('is-playing'); });
    };
    var vis = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var box = en.target;
        box.setAttribute('data-visible', en.isIntersecting ? '1' : '0');
        if (en.isIntersecting) { start(box); var v = started.get(box); if (v && v.paused) { var p = v.play(); if (p && p.catch) p.catch(function () {}); } }
        else { var w = started.get(box); if (w && !w.paused) w.pause(); }
      });
    }, { rootMargin: '200px 0px' });
    loops.forEach(function (b) { vis.observe(b); });
    reduce.addEventListener('change', function () {
      loops.forEach(function (box) { var v = started.get(box); if (!v) return; if (reduce.matches) { v.pause(); box.classList.remove('is-playing'); } else { var p = v.play(); if (p && p.catch) p.catch(function () {}); } });
    });
  }
  $$('.listings[data-listings]').forEach(function (box) {
    var fb = box.nextElementSibling;
    if (!fb || !fb.classList.contains('listings__fallback')) return;
    var drawn = function () { return !!box.querySelector('.IDX-showcaseTable, [id^="IDX-showcaseGallery"], .IDX-showcaseCell'); };
    var settle = function () { var d = drawn(); fb.hidden = d; box.classList.toggle('is-empty', !d); };
    setTimeout(settle, 4000);
    if ('MutationObserver' in window) new MutationObserver(function () { if (drawn()) settle(); }).observe(box, { childList: true, subtree: true });
  });
})();
(function () {
  'use strict';
  var slice = function (list) { return Array.prototype.slice.call(list); };
  var each = function (list, fn) { Array.prototype.forEach.call(list, fn); };
  var forms = slice(document.querySelectorAll('form[data-form]'));
  var searches = slice(document.querySelectorAll('form[data-lsearch]'));
  if (!forms.length && !searches.length) return;
  function named(form, name) {
    var out = [], i;
    if (!name) return out;
    for (i = 0; i < form.elements.length; i++) if (form.elements[i].name === name) out.push(form.elements[i]);
    return out;
  }
  function reveal(el) {
    if (!el || !el.scrollIntoView) return;
    try { el.scrollIntoView({ block: 'nearest', behavior: 'instant' }); } catch (e) { el.scrollIntoView(false); }
  }
  function hiddenInput(name, value) {
    var el = document.createElement('input');
    el.type = 'hidden';
    el.name = name;
    el.value = value;
    return el;
  }
  function initSearch(form) {
    var sync = [];
    var garage = named(form, 'parkingspaces')[0];
    if (garage && !named(form, 'amin_garage').length) {
      var min = hiddenInput('amin_garage', '0'), max = hiddenInput('amax_garage', '0');
      garage.parentNode.insertBefore(max, garage.nextSibling);
      garage.parentNode.insertBefore(min, max);
      var setGarage = function () {
        var v = garage.value;
        if (v === '3+') { min.value = '3'; max.value = ''; }
        else if (v === '2') { min.value = '2'; max.value = '2'; }
        else if (v === '1') { min.value = '1'; max.value = '1'; }
        else { min.value = '0'; max.value = '0'; }
      };
      garage.addEventListener('change', setGarage);
      setGarage();
      sync.push(setGarage);
    }
    var type = named(form, 'pt')[0], boxes = named(form, 'a_propSubType[]');
    if (type && type.tagName === 'SELECT' && boxes.length) {
      var row = boxes[0].closest('[data-lsearch-row]');
      var setType = function (changed) {
        var shown = type.value === '1';
        if (changed || !shown) boxes.forEach(function (b) { b.checked = false; });
        if (row) row.hidden = !shown;
      };
      type.addEventListener('change', function () { setType(true); });
      setType(false);
      sync.push(function () { setType(false); });
    }
    var panel = form.querySelector('details');
    function answered(el) {
      if (el.type === 'hidden' || el.type === 'submit' || el.disabled) return false;
      if (el.type === 'checkbox' || el.type === 'radio') return el.checked !== el.defaultChecked;
      if (el.tagName === 'SELECT') { var start = 0; slice(el.options).forEach(function (o, i) { if (o.defaultSelected) start = i; }); return el.selectedIndex !== start; }
      return el.value !== el.defaultValue;
    }
    function step(opening) {
      sync.forEach(function (fn) { fn(); });
      if (opening && panel && !panel.open && slice(panel.querySelectorAll('input, select, textarea')).some(answered)) panel.open = true;
    }
    form.addEventListener('submit', function () { step(false); });
    form.setAttribute('data-lsearch-ready', '');
    return function () { step(true); };
  }
  function showNotice(form) {
    var status = form.querySelector('[data-form-status]'), tpl = form.querySelector('template[data-form-notice]');
    if (!status || !tpl) return;
    status.textContent = '';
    status.appendChild(tpl.content.cloneNode(true));
    reveal(status);
    if (!status.querySelector('a[href^="tel:"]')) {
      var tel = document.querySelector('a[href^="tel:"]');
      if (tel) {
        var a = document.createElement('a');
        a.setAttribute('href', tel.getAttribute('href'));
        a.textContent = tel.getAttribute('href').replace(/^tel:\s*/, '');
        status.appendChild(document.createTextNode(' '));
        status.appendChild(a);
      }
    }
  }
  function phoneDigits(el) {
    var digits = el.value.replace(/[^0-9]/g, ''), slots = (el.getAttribute('data-mask').match(/9/g) || []).length;
    if (digits.length === slots + 1 && digits.charAt(0) === '1') digits = digits.slice(1);
    return digits.length === slots ? digits : '';
  }
  function shapePhone(el) {
    var digits = phoneDigits(el), k = 0;
    if (digits) el.value = el.getAttribute('data-mask').replace(/9/g, function () { return digits.charAt(k++); });
  }
  function shapeProblem(el) {
    var v = String(el.value).trim();
    if (!v) return '';
    if (el.getAttribute('data-format') === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return el.getAttribute('data-msg') || '';
    if (el.hasAttribute('data-mask') && !phoneDigits(el)) return el.getAttribute('data-msg') || '';
    return '';
  }
  function problems(form) {
    var out = [], required = form.getAttribute('data-msg-required') || '';
    each(form.querySelectorAll('input, select, textarea'), function (el) {
      var box, wrong;
      if (el.disabled || el.type === 'hidden') return;
      box = el.closest('[data-field]');
      if (!box) return;
      if (el.type === 'file') {
        wrong = el.getAttribute('data-upload-problem');
        if (wrong) out.push({ el: el, box: box, text: wrong, shape: true });
        else if (el.required && !(el.files && el.files.length)) out.push({ el: el, box: box, text: required, shape: false });
        return;
      }
      if (!String(el.value).trim()) { if (el.required) out.push({ el: el, box: box, text: required, shape: false }); return; }
      wrong = shapeProblem(el);
      if (wrong) out.push({ el: el, box: box, text: wrong, shape: true });
    });
    return out;
  }
  function describe(el, id, on) {
    if (!el) return;
    var ids = (el.getAttribute('aria-describedby') || '').split(/\s+/).filter(function (x) { return x && x !== id; });
    if (on) ids.push(id);
    if (ids.length) el.setAttribute('aria-describedby', ids.join(' ')); else el.removeAttribute('aria-describedby');
  }
  function clearBox(form, box) {
    var msg = box.querySelector('[data-form-error]');
    if (!msg) return;
    each(box.querySelectorAll('[aria-describedby]'), function (el) { describe(el, msg.id, false); });
    each(box.querySelectorAll('[aria-invalid]'), function (el) { el.removeAttribute('aria-invalid'); });
    box.classList.remove('is-invalid');
    var summary = form.querySelector('[data-form-summary]');
    var item = summary && summary.querySelector('[data-for-error="' + msg.id + '"]');
    if (item) item.parentNode.removeChild(item);
    msg.parentNode.removeChild(msg);
    if (summary && !summary.querySelector('li')) { summary.hidden = true; summary.textContent = ''; }
  }
  function lineOf(p) {
    var label = p.box.getAttribute('data-label') || '';
    return p.shape ? label + ': ' + p.text : label;
  }
  function showProblems(form, list) {
    each(form.querySelectorAll('.is-invalid'), function (box) { clearBox(form, box); });
    var summary = form.querySelector('[data-form-summary]');
    var title = document.createElement('p'), ul = document.createElement('ul');
    title.className = 'form__summary-title';
    title.id = (form.id || 'form') + '-summary-title';
    title.textContent = form.getAttribute(list.some(function (p) { return p.shape; }) ? 'data-msg-check' : 'data-msg-summary') || '';
    list.forEach(function (p) {
      var id = p.el.id + '-error';
      var said = p.box.querySelector('[data-upload-said]');
      if (said) said.parentNode.removeChild(said);
      var msg = document.createElement('p');
      msg.className = 'field__error';
      msg.id = id;
      msg.setAttribute('data-form-error', '');
      msg.textContent = p.text;
      p.box.appendChild(msg);
      p.box.classList.add('is-invalid');
      describe(p.el, id, true);
      p.el.setAttribute('aria-invalid', 'true');
      var li = document.createElement('li'), a = document.createElement('a');
      li.setAttribute('data-for-error', id);
      a.setAttribute('href', '#' + p.el.id);
      a.textContent = lineOf(p);
      li.appendChild(a);
      ul.appendChild(li);
    });
    if (!summary) { list[0].el.focus(); reveal(list[0].box); return; }
    summary.textContent = '';
    summary.appendChild(title);
    summary.appendChild(ul);
    summary.setAttribute('role', 'group');
    summary.setAttribute('aria-labelledby', title.id);
    summary.hidden = false;
    summary.focus();
    reveal(summary);
  }
  function refresh(form) {
    if (!form.querySelector('.is-invalid')) return;
    var now = problems(form);
    each(form.querySelectorAll('.is-invalid'), function (box) {
      var p = now.filter(function (x) { return x.box === box; })[0], msg = box.querySelector('[data-form-error]');
      if (!p) { clearBox(form, box); return; }
      if (!msg || msg.textContent === p.text) return;
      msg.textContent = p.text;
      var link = form.querySelector('[data-form-summary] [data-for-error="' + msg.id + '"] a');
      if (link) link.textContent = lineOf(p);
    });
  }
  function initCounter(el) {
    var max = Number(el.getAttribute('maxlength')), format = el.getAttribute('data-counter');
    if (!max || !format || !el.id) return;
    var note = document.createElement('p');
    note.className = 'field__note field__count';
    note.id = el.id + '-count';
    var write = function () { note.textContent = format.replace('#input', String(el.value.length)).replace('#max', String(max)); };
    el.parentNode.insertBefore(note, el.nextSibling);
    describe(el, note.id, true);
    el.addEventListener('input', write);
    write();
  }
  function initUpload(box) {
    var input = box.querySelector('input[type=file]'), pick = box.querySelector('[data-upload-pick]'), list = box.querySelector('[data-upload-list]');
    var field = box.closest('[data-field]') || box;
    if (!input || !list) return;
    if (pick) pick.hidden = false;
    box.classList.add('is-enhanced');
    var maxFiles = Number(input.getAttribute('data-max-files')) || 0, maxBytes = Number(input.getAttribute('data-max-bytes')) || 0;
    var kinds = (input.getAttribute('accept') || '').toLowerCase().split(',').map(function (s) { return s.trim(); }).filter(Boolean);
    var removeWords = input.getAttribute('data-msg-remove') || '';
    var settable = (function () { try { return !!new DataTransfer().items; } catch (e) { return false; } })();
    function hold(files) {
      var dt = new DataTransfer();
      files.forEach(function (f) { dt.items.add(f); });
      input.files = dt.files;
    }
    function refusal(f, n) {
      var name = String(f.name || '').toLowerCase();
      if (kinds.length && !kinds.some(function (k) { return name.slice(-k.length) === k; })) return input.getAttribute('data-msg-type') || '';
      if (maxBytes && f.size > maxBytes) return input.getAttribute('data-msg-size') || '';
      if (maxFiles && n >= maxFiles) return input.getAttribute('data-msg-count') || '';
      return '';
    }
    function say(lines) {
      var old = field.querySelector('[data-upload-said]');
      if (old) old.parentNode.removeChild(old);
      if (!lines.length) return;
      var msg = document.createElement('p');
      msg.className = 'field__error';
      msg.setAttribute('data-upload-said', '');
      msg.setAttribute('role', 'alert');
      lines.forEach(function (t) { var s = document.createElement('span'); s.textContent = t; msg.appendChild(s); });
      field.appendChild(msg);
    }
    function show() {
      var files = slice(input.files || []);
      list.textContent = '';
      files.forEach(function (f, i) {
        var li = document.createElement('li'), name = document.createElement('span');
        name.className = 'upload__name';
        name.id = input.id + '-file-' + (i + 1);
        name.textContent = f.name;
        li.appendChild(name);
        if (settable && removeWords) {
          var b = document.createElement('button');
          b.type = 'button';
          b.className = 'upload__remove';
          b.textContent = removeWords;
          b.setAttribute('aria-describedby', name.id);
          b.addEventListener('click', function () {
            var rest = slice(input.files || []).filter(function (x, k) { return k !== i; });
            hold(rest);
            taken();
            var next = list.querySelectorAll('button')[Math.min(i, rest.length - 1)];
            (next || input).focus();
          });
          li.appendChild(b);
        }
        list.appendChild(li);
      });
      list.hidden = !list.firstChild;
    }
    function taken() {
      var kept = [], lines = [];
      slice(input.files || []).forEach(function (f) {
        var why = refusal(f, kept.length);
        if (why) lines.push(f.name + ' - ' + why); else kept.push(f);
      });
      if (lines.length && settable) hold(kept);
      if (lines.length && !settable) input.setAttribute('data-upload-problem', lines[0]); else input.removeAttribute('data-upload-problem');
      say(lines);
      show();
    }
    input.addEventListener('change', taken);
    each(['dragenter', 'dragover'], function (n) { box.addEventListener(n, function () { box.classList.add('is-over'); }); });
    each(['dragleave', 'drop', 'dragend'], function (n) { box.addEventListener(n, function () { box.classList.remove('is-over'); }); });
    show();
  }
  function init(form) {
    each(form.querySelectorAll('[data-form-wake]'), function (b) { b.disabled = false; b.removeAttribute('aria-describedby'); });
    each(form.querySelectorAll('[data-form-offline]'), function (p) { p.hidden = true; });
    each(form.querySelectorAll('textarea[data-counter]'), initCounter);
    each(form.querySelectorAll('[data-upload]'), initUpload);
    form.setAttribute('data-form-ready', '');
    function changed() { refresh(form); }
    form.addEventListener('input', changed);
    form.addEventListener('change', changed);
    form.addEventListener('change', function (ev) {
      var el = ev.target;
      if (el && el.hasAttribute && el.hasAttribute('data-mask')) shapePhone(el);
    });
    form.addEventListener('click', function (ev) {
      var a = ev.target && ev.target.closest ? ev.target.closest('[data-form-summary] a') : null;
      if (!a) return;
      var target = document.getElementById((a.getAttribute('href') || '').slice(1));
      if (!target) return;
      ev.preventDefault();
      target.focus();
    });
    form.addEventListener('submit', function (ev) {
      var button = form.querySelector('button[type=submit]');
      if (!button || button.hidden || button.disabled) { ev.preventDefault(); return; }
      each(form.querySelectorAll('[data-mask]'), function (el) { if (!el.disabled) shapePhone(el); });
      var list = problems(form);
      if (list.length) { ev.preventDefault(); showProblems(form, list); return; }
      each(form.querySelectorAll('.is-invalid'), function (box) { clearBox(form, box); });
      if (form.hasAttribute('data-connected')) return;
      ev.preventDefault();
      showNotice(form);
    });
  }
  forms.forEach(init);
  var resync = searches.map(initSearch);
  window.addEventListener('pageshow', function () { resync.forEach(function (fn) { fn(); }); });
})();
(function () {
  'use strict';
  var region = document.querySelector('[data-search-results]');
  if (!region) return;
  var statusEl = region.querySelector('[data-search-status]');
  var listEl = region.querySelector('[data-search-list]');
  if (!statusEl || !listEl) return;
  var moreEl = region.querySelector('[data-search-more]');
  var browseEl = document.querySelector('[data-search-browse]');
  var form = document.querySelector('[data-search-form]');
  var field = form ? form.querySelector('input[name="q"]') : null;
  var PAGE = 20;
  var MAX_QUERY = 120;
  var MAX_WORDS = 10;
  var TITLE = 5, NAME = 4, HEAD = 3, OFTEN = 2, BODY = 1;
  var STOP = {};
  (region.getAttribute('data-stop') || '').split(' ').forEach(function (w) { if (w) STOP['$' + w] = 1; });
  var chr = String.fromCharCode;
  var APOS_CHARS = chr(0x27) + chr(0x60) + chr(0xb4) + chr(0x2bc) + chr(0x2018) + chr(0x2019) + chr(0x201b) + chr(0x2032);
  var APOS = new RegExp('[' + APOS_CHARS + ']', 'g');
  var MARKS = new RegExp('[' + chr(0x300) + '-' + chr(0x36f) + ']', 'g');
  var NONWORD, CHUNK;
  try {
    NONWORD = new RegExp('[^\\p{L}\\p{N}]+', 'gu');
    CHUNK = new RegExp('[\\p{L}\\p{N}' + APOS_CHARS + ']+', 'gu');
  } catch (e) {
    NONWORD = /[^a-z0-9]+/g;
    CHUNK = new RegExp('[A-Za-z0-9' + APOS_CHARS + ']+', 'g');
  }
  function fold(s) {
    s = String(s == null ? '' : s);
    if (s.normalize) s = s.normalize('NFD');
    s = s.toLowerCase();
    s = s.replace(APOS, '');
    s = s.replace(MARKS, '');
    return s.replace(NONWORD, ' ').replace(/ +/g, ' ').replace(/^ | $/g, '');
  }
  function singular(w) {
    var n = w.length;
    if (n < 4 || w.charAt(n - 1) !== 's') return w;
    if (/(ss|us|is)$/.test(w)) return w;
    if (/ies$/.test(w) && n > 4) return w.slice(0, n - 3) + 'y';
    if (/(ses|xes|zes|ches|shes)$/.test(w)) return w.slice(0, n - 2);
    return w.slice(0, n - 1);
  }
  function singularAll(s) { return s.split(' ').map(singular).join(' '); }
  function plural(w) { return w.length >= 4 && /[^aeiou]y$/.test(w) ? w.slice(0, w.length - 1) + 'ies' : ''; }
  var entries = null;
  var loading = null;
  var siteBase = (function () {
    var m = /^(.*\/)search(?:\/(?:index\.html)?)?$/.exec(location.pathname);
    return m ? m[1] : '/';
  })();
  function withBase(path) {
    path = String(path || '');
    if (path.charAt(0) !== '/' || siteBase === '/' || path.indexOf(siteBase) === 0) return path;
    return siteBase + path.slice(1);
  }
  function strings(list) { var out = []; if (list instanceof Array) for (var i = 0; i < list.length; i++) out.push(fold(list[i])); return out; }
  function prepare(list) {
    var out = [];
    for (var i = 0; i < list.length; i++) {
      var e = list[i];
      if (!e || typeof e.u !== 'string' || typeof e.t !== 'string') continue;
      var t = fold(e.t), names = strings(e.k), heads = strings(e.h);
      out.push({
        e: e, t: t, names: names,
        T: ' ' + t + ' ',
        K: ' ' + names.join(' | ') + ' ',
        H: ' ' + heads.join(' | ') + ' ',
        X: ' ' + (typeof e.x === 'string' ? e.x : '') + ' ',
        Y: ' ' + (typeof e.y === 'string' ? e.y : '') + ' ' + fold(e.d) + ' ',
        tSing: singularAll(t), namesSing: names.map(singularAll),
        size: t.replace(/ /g, '').length
      });
    }
    return out;
  }
  function load() {
    if (entries) return Promise.resolve(entries);
    if (loading) return loading;
    var url = withBase(region.getAttribute('data-index') || '');
    if (!url || typeof fetch !== 'function') return Promise.reject(new Error('no index'));
    loading = fetch(url, { credentials: 'same-origin' }).then(function (r) {
      if (!r.ok) throw new Error('index: HTTP ' + r.status);
      return r.json();
    }).then(function (list) {
      if (!(list instanceof Array)) throw new Error('index: not a list');
      entries = prepare(list);
      return entries;
    });
    loading.catch(function () { loading = null; });
    return loading;
  }
  function starts(F, w) { return F.indexOf(' ' + w) !== -1; }
  function whole(F, w) { return F.indexOf(' ' + w + ' ') !== -1; }
  function joined(F, w) {
    var words = F.split(' ');
    for (var i = 0; i < words.length - 1; i++) {
      if (!words[i] || words[i] === '|' || words[i].length >= w.length || w.indexOf(words[i]) !== 0) continue;
      var acc = words[i], j = i + 1;
      while (j < words.length && words[j] && words[j] !== '|' && acc.length < w.length) acc += words[j++];
      if (acc.indexOf(w) === 0) return true;
    }
    return false;
  }
  function findWord(p, w) {
    var fields = [[p.T, TITLE], [p.K, NAME], [p.H, HEAD], [p.X, OFTEN], [p.Y, BODY]], i;
    var best = { tier: 0, weak: 0 };
    var test = w.length < 3 ? whole : starts;
    for (i = 0; i < fields.length; i++) if (test(fields[i][0], w)) { best = { tier: fields[i][1], weak: 0 }; break; }
    if (w.length < 3) return best;
    var other = singular(w) !== w ? singular(w) : plural(w);
    if (other) for (i = 0; i < fields.length && fields[i][1] > best.tier; i++) if (starts(fields[i][0], other)) return { tier: fields[i][1], weak: 1 };
    for (i = 0; i < 3 && fields[i][1] > best.tier; i++) if (joined(fields[i][0], w)) return { tier: fields[i][1], weak: 1 };
    return best;
  }
  function parse(raw) {
    var f = fold(String(raw == null ? '' : raw).slice(0, MAX_QUERY));
    var all = f ? f.split(' ').slice(0, MAX_WORDS) : [];
    var words = [], seen = {}, asked = 0, i;
    for (i = 0; i < all.length; i++) {
      if (all[i].length < 2 || seen['$' + all[i]]) continue;
      seen['$' + all[i]] = 1;
      words.push({ w: all[i], i: i, must: !STOP['$' + all[i]] });
      if (!STOP['$' + all[i]]) asked++;
    }
    if (!asked) for (i = 0; i < words.length; i++) words[i].must = true;
    return { folded: f, all: all, words: words, phrase: words.map(function (x) { return x.w; }).join(' ') };
  }
  function named(title, names, typed, asked) {
    return title === typed || title === asked || names.indexOf(typed) !== -1 || names.indexOf(asked) !== -1;
  }
  function search(q) {
    var results = [];
    if (!q.words.length || !entries) return results;
    var asked = q.phrase;
    var typedSing = singularAll(q.folded), askedSing = singularAll(asked);
    for (var n = 0; n < entries.length; n++) {
      var p = entries[n], tier = 0, fine = 0, ok = true, inTitle = 0;
      for (var i = 0; i < q.words.length; i++) {
        var x = q.words[i], w = x.w;
        var m = findWord(p, w);
        if (!m.tier) {
          var next = x.i + 1 < q.all.length ? findWord(p, w + q.all[x.i + 1]) : null;
          var prev = x.i > 0 ? findWord(p, q.all[x.i - 1] + w) : null;
          var pair = next && next.tier && !next.weak ? next : prev && prev.tier && !prev.weak ? prev : null;
          if (pair) m = { tier: pair.tier, weak: 1 };
        }
        if (!m.tier) { if (x.must) { ok = false; break; } continue; }
        tier += m.tier;
        if (m.tier === TITLE) inTitle += w.length;
        if (m.weak) fine -= 3;
      }
      if (!ok) continue;
      if (q.words.length > 1) {
        var ph = ' ' + q.phrase;
        var where = p.T.indexOf(ph) !== -1 ? 30 : p.K.indexOf(ph) !== -1 ? 24 : p.H.indexOf(ph) !== -1 ? 12 : 0;
        if (where) { tier += 2 * (q.words.length - 1); fine += where; }
      }
      if (inTitle) fine += Math.round(20 * Math.min(1, inTitle / Math.max(1, p.size)));
      if (p.T.indexOf(' ' + q.words[0].w) === 0) fine += 6;
      if (p.e.p) fine -= 4;
      var exact = named(p.t, p.names, q.folded, asked) ? 2 : named(p.tSing, p.namesSing, typedSing, askedSing) ? 1 : 0;
      results.push({ e: p.e, exact: exact, tier: tier, fine: fine });
    }
    results.sort(byRank);
    return results;
  }
  function byRank(a, b) {
    return (b.exact - a.exact) || (b.tier - a.tier) || (b.fine - a.fine)
      || (a.e.t.length - b.e.t.length) || (a.e.u < b.e.u ? -1 : a.e.u > b.e.u ? 1 : 0);
  }
  var vocabulary = null;
  var inNames = null;
  function words() {
    if (vocabulary) return vocabulary;
    vocabulary = {}; inNames = {};
    for (var n = 0; n < entries.length; n++) {
      var p = entries[n], seen = {}, names = (p.T + p.K).split(' '), list = names.concat((p.H + p.X + p.Y).split(' '));
      for (var i = 0; i < list.length; i++) {
        var w = list[i];
        if (w.length < 4) continue;
        if (i < names.length) inNames['$' + w] = 1;
        if (seen['$' + w]) continue;
        seen['$' + w] = 1;
        vocabulary['$' + w] = (vocabulary['$' + w] || 0) + 1;
      }
    }
    return vocabulary;
  }
  function distance(a, b, max) {
    var la = a.length, lb = b.length, i, j;
    if (Math.abs(la - lb) > max) return max + 1;
    var prev2 = null, prev = [], cur;
    for (j = 0; j <= lb; j++) prev[j] = j;
    for (i = 1; i <= la; i++) {
      cur = [i];
      var best = cur[0];
      for (j = 1; j <= lb; j++) {
        var cost = a.charCodeAt(i - 1) === b.charCodeAt(j - 1) ? 0 : 1;
        var v = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
        if (prev2 && i > 1 && j > 1 && a.charCodeAt(i - 1) === b.charCodeAt(j - 2) && a.charCodeAt(i - 2) === b.charCodeAt(j - 1)) v = Math.min(v, prev2[j - 2] + 1);
        cur[j] = v;
        if (v < best) best = v;
      }
      if (best > max) return max + 1;
      prev2 = prev; prev = cur;
    }
    return prev[lb];
  }
  function anywhere(w) {
    for (var n = 0; n < entries.length; n++) if (findWord(entries[n], w).tier) return true;
    return false;
  }
  function nearest(w) {
    if (w.length < 5) return '';
    var max = w.length >= 8 ? 2 : 1, voc = words(), best = '', bestD = max + 1, bestN = 0;
    for (var key in voc) {
      var cand = key.slice(1);
      var d = distance(w, cand, max);
      if (d > max) continue;
      var n = voc[key] + (inNames[key] ? 1e7 : 0) + (cand.charAt(0) === w.charAt(0) ? 1e6 : 0);
      if (d < bestD || (d === bestD && n > bestN)) { best = cand; bestD = d; bestN = n; }
    }
    return best;
  }
  function respell(q) {
    var out = [], changed = false;
    for (var i = 0; i < q.all.length; i++) {
      var w = q.all[i], near = '';
      if (w.length >= 5 && !STOP['$' + w] && !anywhere(w)) near = nearest(w);
      if (near) changed = true;
      out.push(near || w);
    }
    return changed ? out.join(' ') : '';
  }
  function hit(chunk, q) {
    var f = fold(chunk);
    if (!f) return false;
    for (var i = 0; i < q.words.length; i++) {
      var w = q.words[i].w, s = singular(w), pl = plural(w);
      if (!q.words[i].must) continue;
      if (w.length < 3) { if (f === w) return true; continue; }
      if (f.indexOf(w) === 0 || f.indexOf(s) === 0 || (pl && f.indexOf(pl) === 0)) return true;
    }
    return false;
  }
  function mark(parent, text, q) {
    text = String(text == null ? '' : text);
    var last = 0, m;
    CHUNK.lastIndex = 0;
    while ((m = CHUNK.exec(text))) {
      if (!m[0]) { CHUNK.lastIndex++; continue; }
      if (!hit(m[0], q)) continue;
      if (m.index > last) parent.appendChild(document.createTextNode(text.slice(last, m.index)));
      var el = document.createElement('mark');
      el.textContent = m[0];
      parent.appendChild(el);
      last = m.index + m[0].length;
    }
    if (last < text.length) parent.appendChild(document.createTextNode(text.slice(last)));
  }
  function item(r, q) {
    var e = r.e;
    var li = document.createElement('li');
    li.className = 'search-result';
    if (e.s) {
      var sec = document.createElement('p');
      sec.className = 'search-result__section';
      sec.textContent = e.s;
      li.appendChild(sec);
    }
    var h = document.createElement('h2');
    h.className = 'search-result__title';
    var a = document.createElement('a');
    a.className = 'search-result__link';
    a.setAttribute('href', withBase(e.u));
    mark(a, e.t, q);
    h.appendChild(a);
    li.appendChild(h);
    if (e.d) {
      var sum = document.createElement('p');
      sum.className = 'search-result__summary';
      mark(sum, e.d, q);
      li.appendChild(sum);
    }
    return li;
  }
  var shown = { q: null, results: [], drawn: 0 };
  function drawMore(focus) {
    var from = shown.drawn, to = Math.min(shown.results.length, from + PAGE), first = null;
    for (var i = from; i < to; i++) {
      var li = item(shown.results[i], shown.q);
      if (!first) first = li.querySelector('a');
      listEl.appendChild(li);
    }
    shown.drawn = to;
    if (moreEl) moreEl.hidden = shown.drawn >= shown.results.length;
    if (focus && first) first.focus();
  }
  function msg(name) { return region.getAttribute('data-msg-' + name) || ''; }
  function say(text) { if (statusEl.textContent !== text) statusEl.textContent = text; }
  function fill(text, n, typed, used) {
    var put = { n: String(n), q: typed, c: used };
    return text.replace(/\{(n|q|c)\}/g, function (all, key) { return put[key]; });
  }
  function show(state, raw, found) {
    var label = String(raw == null ? '' : raw).replace(/\s+/g, ' ').replace(/^ | $/g, '');
    if (label.length > 80) label = label.slice(0, 80) + '…';
    var results = (found && found.results) || [];
    var used = (found && found.respelled) || '';
    while (listEl.firstChild) listEl.removeChild(listEl.firstChild);
    shown = { q: found ? found.q : null, results: results, drawn: 0 };
    if (state === 'results') {
      say(fill(msg((results.length === 1 ? 'one' : 'many') + (used ? '-corrected' : '')), results.length, label, used));
      listEl.hidden = false;
      drawMore(false);
    } else {
      listEl.hidden = true;
      if (moreEl) moreEl.hidden = true;
      say(state === 'none' ? fill(msg('none'), 0, label, '') : msg(state === 'error' ? 'failed' : state));
    }
    if (browseEl) browseEl.hidden = state === 'results';
    region.setAttribute('data-state', state);
    region.setAttribute('data-query', label);
    region.setAttribute('data-used', used);
    region.setAttribute('data-count', String(results.length));
  }
  var current = null;
  function readQuery() {
    try { return new URLSearchParams(location.search).get('q') || ''; } catch (e) { return ''; }
  }
  function writeQuery(raw) {
    try {
      var url = location.pathname + (raw ? '?q=' + encodeURIComponent(raw).replace(/%20/g, '+') : '') + location.hash;
      if (url !== location.pathname + location.search + location.hash) history.replaceState(history.state, '', url);
    } catch (e) {   }
  }
  function run(raw, opts) {
    raw = String(raw == null ? '' : raw).slice(0, MAX_QUERY);
    var trimmed = raw.replace(/\s+/g, ' ').replace(/^ | $/g, '');
    current = trimmed;
    if (!opts || opts.write !== false) writeQuery(trimmed);
    if (!trimmed) { show('empty', ''); return; }
    if (!entries) {
      show('loading', trimmed);
      load().then(function () { if (current === trimmed) run(trimmed, { write: false }); }, function () { if (current === trimmed) show('error', trimmed); });
      return;
    }
    var found;
    try {
      var q = parse(trimmed);
      found = { q: q, results: search(q), respelled: '' };
      if (!found.results.length && q.words.length) {
        var again = respell(q);
        if (again) { var q2 = parse(again), r2 = search(q2); if (r2.length) found = { q: q2, results: r2, respelled: again }; }
      }
    } catch (e) { show('error', trimmed); return; }
    show(found.results.length ? 'results' : 'none', trimmed, found);
  }
  var timer = null;
  if (form && field) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      clearTimeout(timer);
      run(field.value);
    });
    field.addEventListener('input', function () {
      clearTimeout(timer);
      timer = setTimeout(function () { run(field.value); }, 220);
    });
    field.addEventListener('focus', function () { load().catch(function () {}); }, { once: true });
  }
  if (moreEl) moreEl.addEventListener('click', function (ev) { if (ev.target && ev.target.closest && ev.target.closest('button')) drawMore(true); });
  window.addEventListener('popstate', function () {
    var q = readQuery();
    if (field) field.value = q;
    run(q, { write: false });
  });
  var first = readQuery().slice(0, MAX_QUERY);
  if (field && first) field.value = first;
  run(first, { write: false });
})();
