(function () {
  'use strict';
  var storage = {
    get: function (key, fallback) { try { return localStorage.getItem(key) || fallback; } catch (e) { return fallback; } },
    set: function (key, value) { try { localStorage.setItem(key, value); } catch (e) {} }
  };
  var root = document.documentElement;
  var toastRegion = document.createElement('div');
  toastRegion.className = 'toast-region';
  toastRegion.setAttribute('aria-live', 'polite');
  document.body.appendChild(toastRegion);

  function toast(message) {
    var item = document.createElement('div');
    item.className = 'toast';
    item.textContent = message;
    toastRegion.appendChild(item);
    window.setTimeout(function () { item.remove(); }, 3600);
  }

  function cartCount() { return Number(storage.get('dogear-cart-count', '2')); }
  function setCartCount(count) {
    var next = Math.max(0, count);
    storage.set('dogear-cart-count', String(next));
    document.querySelectorAll('.icon-btn[href="cart.html"]').forEach(function (link) {
      var badge = link.querySelector('.badge');
      if (badge) { badge.textContent = next; badge.hidden = next === 0; }
      link.setAttribute('aria-label', 'Bag, ' + next + (next === 1 ? ' item' : ' items'));
    });
  }

  var themeButton = document.getElementById('themeToggle');
  function updateThemeControl() {
    if (!themeButton) return;
    var dark = root.getAttribute('data-theme') === 'dark';
    themeButton.setAttribute('aria-pressed', String(dark));
    themeButton.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
  }
  if (themeButton) themeButton.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    storage.set('dogear-theme', next);
    updateThemeControl();
    toast(next === 'dark' ? 'Dark mode is on.' : 'Light mode is on.');
  });
  updateThemeControl();
  setCartCount(cartCount());

  function closeMenu() {
    var menu = document.querySelector('.mobile-menu');
    var trigger = document.querySelector('.menu-btn');
    if (!menu) return;
    menu.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    if (trigger) { trigger.setAttribute('aria-expanded', 'false'); trigger.focus(); }
  }
  var menuButton = document.querySelector('.menu-btn');
  var desktopLinks = document.querySelector('.nav .links');
  var accountLinks = document.querySelector('.nav .auth-actions');
  if (menuButton && desktopLinks) {
    var mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.innerHTML = '<div class="mobile-menu__panel" role="dialog" aria-modal="true" aria-label="Main navigation"><div class="mobile-menu__top"><b>Explore dogear</b><button class="mobile-menu__close" type="button" aria-label="Close menu">×</button></div>' + desktopLinks.outerHTML + (accountLinks ? '<div class="mobile-menu__account">' + accountLinks.outerHTML + '</div>' : '') + '</div>';
    document.body.appendChild(mobileMenu);
    menuButton.type = 'button';
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-controls', 'mobile-menu');
    mobileMenu.id = 'mobile-menu';
    menuButton.addEventListener('click', function () {
      var open = !mobileMenu.classList.contains('is-open');
      mobileMenu.classList.toggle('is-open', open);
      document.body.classList.toggle('menu-open', open);
      menuButton.setAttribute('aria-expanded', String(open));
      if (open) mobileMenu.querySelector('.mobile-menu__close').focus();
    });
    mobileMenu.querySelector('.mobile-menu__close').addEventListener('click', closeMenu);
    mobileMenu.addEventListener('click', function (event) { if (event.target === mobileMenu) closeMenu(); });
    mobileMenu.querySelectorAll('a').forEach(function (link) { link.addEventListener('click', closeMenu); });
    document.addEventListener('keydown', function (event) { if (event.key === 'Escape' && mobileMenu.classList.contains('is-open')) closeMenu(); });
  }

  document.querySelectorAll('.chip').forEach(function (chip) {
    chip.setAttribute('role', 'button'); chip.tabIndex = 0;
    function selectChip() {
      var group = chip.parentElement;
      group.querySelectorAll('.chip').forEach(function (item) { item.classList.toggle('on', item === chip); item.setAttribute('aria-pressed', String(item === chip)); });
      filterBooks(chip.textContent.trim().toLowerCase());
    }
    chip.setAttribute('aria-pressed', String(chip.classList.contains('on')));
    chip.addEventListener('click', selectChip);
    chip.addEventListener('keydown', function (event) { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); selectChip(); } });
  });

  function filterBooks(query) {
    var cards = document.querySelectorAll('.grid-wrap .book');
    if (!cards.length) return;
    var search = document.querySelector('[data-book-search]');
    var term = ((search && search.value) || '').toLowerCase().trim();
    var shown = 0;
    cards.forEach(function (card) {
      var genre = (card.querySelector('.cat') || {}).textContent || '';
      var text = card.textContent.toLowerCase();
      var genreMatch = query === 'everything' || genre.toLowerCase().indexOf(query) !== -1;
      var searchMatch = !term || text.indexOf(term) !== -1;
      var visible = genreMatch && searchMatch;
      card.hidden = !visible;
      if (visible) shown++;
    });
    var count = document.querySelector('.grid-wrap .count');
    if (count) count.textContent = 'SHOWING ' + shown + ' OF 3,214 BOOKS';
  }

  var searchInput = document.querySelector('[data-book-search]');
  if (searchInput) searchInput.addEventListener('input', function () {
    var active = document.querySelector('.chips-row .chip.on');
    filterBooks(active ? active.textContent.trim().toLowerCase() : 'everything');
  });
  var sort = document.querySelector('[data-book-sort]');
  if (sort) sort.addEventListener('change', function () {
    var grid = document.querySelector('.grid-wrap .book-grid');
    if (!grid) return;
    var books = Array.prototype.slice.call(grid.querySelectorAll('.book'));
    books.sort(function (a, b) {
      var aPrice = Number(((a.querySelector('.price') || {}).textContent || '').replace(/[^0-9.]/g, ''));
      var bPrice = Number(((b.querySelector('.price') || {}).textContent || '').replace(/[^0-9.]/g, ''));
      return sort.value === 'price-low' ? aPrice - bPrice : sort.value === 'price-high' ? bPrice - aPrice : 0;
    }).forEach(function (book) { grid.appendChild(book); });
    if (sort.value !== 'staff') toast('Shelf sorted — find your next fold.');
  });

  document.querySelectorAll('a.btn[href="cart.html"]').forEach(function (button) {
    if (button.textContent.toLowerCase().indexOf('add to bag') === -1) return;
    button.addEventListener('click', function () { setCartCount(cartCount() + 1); });
  });
  document.querySelectorAll('a.btn.ghost[href="#"]').forEach(function (button) {
    if (button.textContent.toLowerCase().indexOf('save') === -1) return;
    button.addEventListener('click', function (event) {
      event.preventDefault();
      var saved = button.classList.toggle('is-saved');
      button.textContent = saved ? '♥ Saved for later' : '♡ Save for later';
      button.setAttribute('aria-pressed', String(saved));
      toast(saved ? 'Saved to your reading list.' : 'Removed from your reading list.');
    });
  });

  document.querySelectorAll('.rsvp[href="#"]').forEach(function (button) {
    if (button.textContent.trim().toLowerCase() !== 'rsvp') return;
    button.addEventListener('click', function (event) {
      event.preventDefault();
      var joined = button.dataset.joined === 'true';
      button.dataset.joined = String(!joined);
      button.textContent = joined ? 'RSVP' : 'You’re going ✓';
      button.classList.toggle('sunny', !joined);
      toast(joined ? 'Your RSVP was removed.' : 'You’re on the list — see you there!');
    });
  });

  document.querySelectorAll('form').forEach(function (form) { if (form.hasAttribute('data-auth-form')) return; form.addEventListener('submit', function (event) { event.preventDefault(); var email = form.querySelector('input[type="email"]'); if (!email || !email.value) { toast('Add your email to join the reading list.'); return; } form.reset(); toast('You’re in — your next great read is on its way.'); }); });

  document.querySelectorAll('[data-auth-form]').forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var name = form.querySelector('[name="name"]');
      storage.set('dogear-reader', name ? name.value.trim() : 'Reader');
      var button = form.querySelector('button[type="submit"]');
      if (button) { button.disabled = true; button.textContent = 'All set ✓'; }
      toast(form.dataset.authForm === 'signup' ? 'Welcome to dogear — Folio saved you a spot.' : 'Welcome back — your next chapter is waiting.');
      window.setTimeout(function () { window.location.href = 'home.html'; }, 900);
    });
  });

  document.querySelectorAll('.qty').forEach(function (control) {
    var quantity = control.querySelector('b');
    control.querySelectorAll('button').forEach(function (button) { button.addEventListener('click', function () {
      var current = Number(quantity.textContent); var next = Math.max(1, current + (button.textContent.indexOf('+') > -1 ? 1 : -1));
      quantity.textContent = next; updateCartSummary();
    }); });
  });
  document.querySelectorAll('.rm').forEach(function (remove) { remove.tabIndex = 0; remove.setAttribute('role', 'button'); function clear() { var item = remove.closest('.item'); if (item) { item.remove(); setCartCount(Math.max(0, cartCount() - 1)); updateCartSummary(); toast('Removed from your bag.'); } } remove.addEventListener('click', clear); remove.addEventListener('keydown', function (event) { if (event.key === 'Enter') clear(); }); });
  function updateCartSummary() {
    var subtotal = 0;
    document.querySelectorAll('.item').forEach(function (item) { var price = Number(((item.querySelector('.price') || {}).textContent || '').replace(/[^0-9.]/g, '')); var qty = Number(((item.querySelector('.qty b') || {}).textContent || '1')); subtotal += price * qty; });
    var rows = document.querySelectorAll('.summary .sum-row');
    if (!rows.length) return;
    rows[0].lastElementChild.textContent = '$' + subtotal.toFixed(2);
    var discount = subtotal * .15; rows[1].lastElementChild.textContent = '−$' + discount.toFixed(2);
    rows[3].lastElementChild.textContent = '$' + (subtotal - discount).toFixed(2);
  }

  document.querySelectorAll('a.btn[href="#"]').forEach(function (button) {
    var label = button.textContent.toLowerCase();
    if (label.indexOf('log') > -1 && label.indexOf('page') > -1) button.addEventListener('click', function (event) { event.preventDefault(); var today = document.querySelector('.cal .today'); if (today) { today.classList.remove('today'); today.classList.add('lit'); } var streak = document.querySelector('.streak-demo h2'); if (streak) streak.textContent = '28 days and counting.'; button.textContent = 'Today is logged ✓'; button.classList.add('sunny'); toast('Today’s reading is logged. Your streak is 28 days!'); });
    if (label.indexOf('join free') > -1) button.addEventListener('click', function (event) { event.preventDefault(); button.textContent = 'You’re in ✓'; button.classList.add('sunny'); toast('Welcome to the club — Folio is cheering for you.'); });
    if (label.indexOf('check out') > -1) button.addEventListener('click', function (event) { event.preventDefault(); toast('This is a concept checkout — your bag is saved for later.'); });
  });
})();
