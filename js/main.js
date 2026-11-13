/**
 * Bambana Real Estate – Main JavaScript
 * Fly-in animations, mobile menu, FAQ accordion
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', nav.classList.contains('open'));
    });
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Header scroll
  const header = document.querySelector('.header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-question');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const wasActive = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
      if (!wasActive) item.classList.add('active');
    });
  });

  // Fly-in animations with IntersectionObserver
  const flyEls = document.querySelectorAll('.fly-in, .fade-in');
  if (flyEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

    flyEls.forEach(el => observer.observe(el));
  } else {
    flyEls.forEach(el => el.classList.add('visible'));
  }

  // Active nav
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Form submit feedback
  const form = document.querySelector('form[name="contact"]');
  if (form) {
    form.addEventListener('submit', () => {
      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        btn.textContent = 'Sending...';
        btn.disabled = true;
      }
    });
  }
});
