const auditForm = document.querySelector('#audit-form');
const urlInput = document.querySelector('#audit-url');
const emailInput = document.querySelector('#audit-email');
const formStep = document.querySelector('#audit-form .audit-step');
const formError = document.querySelector('#form-error');
const result = document.querySelector('#audit-result');
const formFields = [
  ['#audit-first', 'your first name'],
  ['#audit-last', 'your last name'],
  ['#audit-email', 'your email'],
  ['#audit-url', 'your website URL'],
  ['#audit-need', 'how we can help']
];
function normalizeWebsite(value = urlInput.value) {
  const raw = value.trim();
  const normalized = /^https?:\/\//i.test(raw) ? raw : 'https://' + raw;
  try {
    const parsed = new URL(normalized);
    if (parsed.hostname.includes('.') && !parsed.hostname.includes(' ')) return parsed.href;
  } catch (error) { }
  return '';
}
formFields.forEach(([id]) => document.querySelector(id).addEventListener('input', () => { formError.textContent = ''; }));
auditForm.addEventListener('submit', (event) => {
  event.preventDefault();
  for (const [id, label] of formFields) {
    const field = document.querySelector(id);
    if (!field.value.trim()) { formError.textContent = 'Please enter ' + label + '.'; field.focus(); return; }
  }
  if (!emailInput.checkValidity()) { formError.textContent = 'Please enter a valid email address.'; emailInput.focus(); return; }
  const website = normalizeWebsite();
  if (!website) { formError.textContent = 'Please enter a valid website address, such as yourwebsite.com.'; urlInput.focus(); return; }
  urlInput.value = website;
  const val = (id) => document.querySelector(id).value.trim();
  const subject = encodeURIComponent('Free SEO strategy request');
  const body = encodeURIComponent('Name: ' + val('#audit-first') + ' ' + val('#audit-last') + '\nEmail: ' + val('#audit-email') + '\nWebsite: ' + website + '\nHow can we help: ' + val('#audit-need'));
  result.innerHTML = 'Thanks! Your details are ready. This preview does not send the form. <a href="mailto:info@tanotsolutions.com?subject=' + subject + '&body=' + body + '">Email them to Tanot Solutions →</a>';
  result.hidden = false;
  formStep.hidden = true;
});

const footerAuditForm = document.querySelector('#footer-audit-form');
footerAuditForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const footerUrl = document.querySelector('#footer-audit-url');
  const website = normalizeWebsite(footerUrl.value);
  const status = document.querySelector('#footer-audit-status');
  if (!website) {
    status.textContent = 'Enter a valid website address, such as yoursite.com.';
    footerUrl.focus();
    return;
  }
  urlInput.value = website;
  formError.textContent = '';
  result.hidden = true;
  formStep.hidden = false;
  status.textContent = 'Website added. Fill in the rest of the form to get your free SEO strategy.';
  if (window.siteScroll) window.siteScroll.scrollTo('#audit', { offset: -110 });
  else document.querySelector('#audit').scrollIntoView({ behavior: 'smooth', block: 'center' });
  document.querySelector('#audit-first').focus({ preventScroll: true });
});

document.querySelector('[data-copy-email]').addEventListener('click', async (event) => {
  const button = event.currentTarget;
  const email = document.querySelector('#footer-email').textContent.trim();
  try {
    await navigator.clipboard.writeText(email);
  } catch (error) {
    const field = document.createElement('textarea');
    field.value = email;
    field.style.position = 'fixed';
    field.style.opacity = '0';
    document.body.append(field);
    field.select();
    document.execCommand('copy');
    field.remove();
  }
  button.textContent = 'Copied';
  button.classList.add('copied');
  button.setAttribute('aria-label', 'Email address copied');
  setTimeout(() => {
    button.textContent = 'Copy';
    button.classList.remove('copied');
    button.setAttribute('aria-label', 'Copy email address');
  }, 1800);
});

document.querySelector('#newsletter-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  document.querySelector('#newsletter-status').textContent = 'Thanks for your interest. Newsletter signup is not connected in this preview.';
  event.currentTarget.querySelector('button').textContent = '✓';
});

const footerClock = document.querySelector('#india-clock');
function updateFooterClock() {
  footerClock.textContent = new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).format(new Date()).toUpperCase() + ' IST';
}
updateFooterClock();
setInterval(updateFooterClock, 1000);

const serviceGrid = document.querySelector('.service-grid');
if (serviceGrid) {
  const serviceCards = [...serviceGrid.querySelectorAll('.service-card')];
  serviceCards.forEach((card, index) => card.style.setProperty('--card-index', index));
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    serviceGrid.classList.add('reveal-ready');
    const cardObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.18 });
    serviceCards.forEach((card) => cardObserver.observe(card));
  } else {
    serviceCards.forEach((card) => card.classList.add('in-view'));
  }
}

const advantageGrid = document.querySelector('.advantage-grid');
if (advantageGrid) {
  const advantageCards = [...advantageGrid.querySelectorAll('.advantage-card')];
  advantageCards.forEach((card, index) => card.style.setProperty('--card-index', index));
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    advantageGrid.classList.add('reveal-ready');
    const advantageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.14 });
    advantageCards.forEach((card) => advantageObserver.observe(card));
  } else {
    advantageCards.forEach((card) => card.classList.add('in-view'));
  }
}

const reviewGrid = document.querySelector('.review-grid');
const caseSection = document.querySelector('.case-section');
const caseCount = document.querySelector('[data-case-count]');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function countCaseStudy() {
  const target = Number(caseCount.dataset.caseCount);
  const started = performance.now();
  caseCount.textContent = '+0';
  function step(now) {
    const progress = Math.min(1, Math.max(0, (now - started) / 950));
    const eased = 1 - Math.pow(1 - progress, 3);
    caseCount.textContent = '+' + Math.round(target * eased).toLocaleString('en-US');
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
if (reviewGrid && caseSection) {
  const reviewCards = [...reviewGrid.querySelectorAll('.review-card')];
  reviewCards.forEach((card, index) => card.style.setProperty('--card-index', index));
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    reviewGrid.classList.add('reveal-ready');
    const reviewObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    reviewCards.forEach((card) => reviewObserver.observe(card));
    caseSection.classList.add('reveal-ready');
    caseCount.textContent = '+0';
    const caseObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        caseSection.classList.add('is-visible');
        countCaseStudy();
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.2 });
    caseObserver.observe(caseSection);
  } else {
    reviewCards.forEach((card) => card.classList.add('in-view'));
    caseSection.classList.add('is-visible');
    caseCount.textContent = '+' + Number(caseCount.dataset.caseCount).toLocaleString('en-US');
  }
}

const footerCtaCard = document.querySelector('.footer-cta-card');
if ('IntersectionObserver' in window && !prefersReducedMotion) {
  const ctaObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      footerCtaCard.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.18 });
  ctaObserver.observe(footerCtaCard);
} else {
  footerCtaCard.classList.add('is-visible');
}

const pageHero = document.querySelector('.hero');
if (prefersReducedMotion) pageHero.classList.add('hero-ready');
else requestAnimationFrame(() => pageHero.classList.add('hero-ready'));
const proofStrip = document.querySelector('.proof-strip');
const proofCards = [...proofStrip.querySelectorAll('.proof-card')];
proofCards.forEach((card, index) => card.style.setProperty('--proof-index', index));
if ('IntersectionObserver' in window && !prefersReducedMotion) {
  proofStrip.classList.add('reveal-ready');
  const proofObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.25 });
  proofCards.forEach((card) => proofObserver.observe(card));
} else {
  proofCards.forEach((card) => card.classList.add('is-visible'));
}

const scrollRevealTargets = [...document.querySelectorAll('.client-inner, .reviews-section .section-heading, .review-bottom, .services-section .section-heading, .why-section .section-heading, .founder-inner, .mega-footer-grid-simple > .footer-column, .mega-footer-grid-simple ~ .footer-legal')];
if ('IntersectionObserver' in window && !prefersReducedMotion) {
  const scrollRevealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-revealed');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -24px 0px' });
  scrollRevealTargets.forEach((target, index) => {
    target.style.setProperty('--scroll-order', index % 4);
    target.classList.add('scroll-reveal');
    scrollRevealObserver.observe(target);
  });
}
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    navLinks.classList.toggle('open', open);
  });
  navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
    navLinks.classList.remove('open');
  }));
}

// Video review card: type the label, title and description when the card scrolls into view.
// The untyped remainder stays in the layout (visibility:hidden) so the card never changes size,
// and a visually hidden copy keeps the full text available to screen readers.
const videoCopy = document.querySelector('.video-review-copy');
if (videoCopy) {
  const typeTargets = ['.video-review-label', '.video-review-title', '.video-review-text']
    .map((selector) => videoCopy.querySelector(selector))
    .filter(Boolean);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const typers = typeTargets.map((el) => {
      const full = el.textContent;
      el.textContent = '';
      const srCopy = document.createElement('span');
      srCopy.className = 'sr-only';
      srCopy.textContent = full;
      const shown = document.createElement('span');
      shown.setAttribute('aria-hidden', 'true');
      const typed = document.createElement('span');
      const caret = document.createElement('span');
      caret.className = 'type-caret';
      caret.hidden = true;
      const rest = document.createElement('span');
      rest.className = 'type-rest';
      rest.textContent = full;
      shown.append(typed, caret, rest);
      el.append(srCopy, shown);
      return { full, typed, caret, rest };
    });
    const speeds = [28, 55, 18];
    const typeOne = ({ full, typed, caret, rest }, speed) => new Promise((resolve) => {
      let i = 0;
      caret.hidden = false;
      const tick = () => {
        i += 1;
        typed.textContent = full.slice(0, i);
        rest.textContent = full.slice(i);
        if (i < full.length) setTimeout(tick, full[i - 1] === ' ' ? speed * 0.6 : speed);
        else resolve();
      };
      tick();
    });
    const typeObserver = new IntersectionObserver(async (entries, observer) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      for (let n = 0; n < typers.length; n += 1) {
        await typeOne(typers[n], speeds[n]);
        if (n < typers.length - 1) {
          typers[n].caret.hidden = true;
          await new Promise((resolve) => setTimeout(resolve, 220));
        }
      }
      setTimeout(() => typers[typers.length - 1].caret.classList.add('type-caret-done'), 2400);
    }, { threshold: 0.45 });
    typeObserver.observe(videoCopy);
  }
}


// Smooth scrolling (Lenis): soft, gliding wheel/trackpad scroll and smooth in-page links.
// Always on (touch devices keep their native scroll). Re-measures once everything has loaded so the
// scroll length is right after a refresh, when the browser restores a mid-page position.
if (window.Lenis) {
  const lenis = new window.Lenis({ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1, autoResize: true });
  window.siteScroll = lenis;
  const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
  requestAnimationFrame(raf);
  const remeasure = () => lenis.resize();
  if (document.readyState === 'complete') remeasure(); else window.addEventListener('load', remeasure, { once: true });
  document.querySelectorAll('img[loading="lazy"]').forEach((img) => img.addEventListener('load', remeasure, { once: true }));
  const headerOffset = () => -((document.querySelector('.header')?.offsetHeight || 80) + 12);
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const id = link.getAttribute('href');
      if (id === '#') return;
      const target = id === '#top' ? 0 : document.querySelector(id);
      if (target === null) return;
      event.preventDefault();
      lenis.scrollTo(target, { offset: id === '#top' ? 0 : headerOffset(), duration: 1.2 });
      history.replaceState(null, '', id);
    });
  });
}

// Reviews: one-at-a-time slider with arrows, dots, swipe and gentle autoplay.
const reviewSlider = document.querySelector('.review-slider');
if (reviewSlider) {
  const slides = [...reviewSlider.querySelectorAll('.review-card')];
  const dotsWrap = reviewSlider.querySelector('.review-dots');
  let current = 0;
  let timer;
  const dots = slides.map((slide, index) => {
    slide.classList.add('in-view');
    slide.setAttribute('aria-roledescription', 'slide');
    slide.setAttribute('aria-label', (index + 1) + ' of ' + slides.length);
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'review-dot';
    dot.setAttribute('aria-label', 'Show review ' + (index + 1));
    dot.addEventListener('click', () => { show(index); restart(); });
    dotsWrap.appendChild(dot);
    return dot;
  });
  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const active = i === current;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
      dots[i].classList.toggle('is-active', active);
      dots[i].setAttribute('aria-current', active ? 'true' : 'false');
    });
  }
  const autoplayDelay = 5000;
  reviewSlider.style.setProperty('--review-autoplay', autoplayDelay + 'ms');
  function restart() {
    clearInterval(timer);
    reviewSlider.classList.remove('is-paused');
    timer = setInterval(() => show(current + 1), autoplayDelay);
    // Restart the progress bar on the active dot.
    const dot = dots[current];
    dot.classList.remove('is-active');
    void dot.offsetWidth;
    dot.classList.add('is-active');
  }
  function pause() {
    clearInterval(timer);
    reviewSlider.classList.add('is-paused');
  }
  reviewSlider.querySelector('.review-prev').addEventListener('click', () => { show(current - 1); restart(); });
  reviewSlider.querySelector('.review-next').addEventListener('click', () => { show(current + 1); restart(); });
  reviewSlider.addEventListener('mouseenter', pause);
  reviewSlider.addEventListener('mouseleave', restart);
  reviewSlider.addEventListener('focusin', pause);
  reviewSlider.addEventListener('focusout', (e) => { if (!reviewSlider.contains(e.relatedTarget)) restart(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); else restart(); });
  let touchX = null;
  reviewSlider.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; pause(); }, { passive: true });
  reviewSlider.addEventListener('touchend', (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 40) show(current + (dx < 0 ? 1 : -1));
    restart();
    touchX = null;
  });
  show(0);
  restart();
}

// FAQ: one question open at a time, with smooth height animation on open and close.
const faqItems = [...document.querySelectorAll('.faq-list details')];
if (faqItems.length) {
  const faqMotion = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const running = new Map();
  const easing = 'cubic-bezier(.22,.7,.2,1)';
  const closedHeight = (item) => {
    const style = getComputedStyle(item);
    return item.querySelector('summary').getBoundingClientRect().height
      + parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth)
      + parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
  };
  function finish(item) {
    running.get(item)?.cancel();
    running.delete(item);
    item.style.height = '';
    item.style.overflow = '';
  }
  function setOpen(item, open) {
    if (!faqMotion) { item.open = open; item.classList.remove('is-closing'); return; }
    const from = item.getBoundingClientRect().height;
    finish(item);
    item.style.overflow = 'hidden';
    if (open) {
      item.classList.remove('is-closing');
      item.open = true;
    } else {
      item.classList.add('is-closing');
    }
    const to = open ? item.getBoundingClientRect().height : closedHeight(item);
    const animation = item.animate({ height: [from + 'px', to + 'px'] }, { duration: 420, easing });
    running.set(item, animation);
    const answer = item.querySelector('p');
    if (answer) {
      answer.animate(
        open ? { opacity: [0, 1], transform: ['translateY(-6px)', 'none'] } : { opacity: [1, 0], transform: ['none', 'translateY(-6px)'] },
        { duration: open ? 380 : 240, easing, fill: 'both' }
      ).onfinish = (e) => e.target.cancel();
    }
    animation.onfinish = () => {
      if (!open) { item.open = false; item.classList.remove('is-closing'); }
      finish(item);
    };
  }
  faqItems.forEach((item) => {
    item.querySelector('summary').addEventListener('click', (event) => {
      event.preventDefault();
      const willOpen = !item.open || item.classList.contains('is-closing');
      if (willOpen) faqItems.forEach((other) => { if (other !== item && other.open && !other.classList.contains('is-closing')) setOpen(other, false); });
      setOpen(item, willOpen);
    });
  });
}
