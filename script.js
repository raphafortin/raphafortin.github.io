/**
 * Pixelz Games - Site Interactions
 * Scroll animations, header, mobile menu
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initScrollReveal();
  initMobileMenu();
  initSmoothScroll();
});

function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header)
  {
    return;
  }

  const handleScroll = () => {
    if (window.scrollY > 80)
    {
      header.classList.add('scrolled');
    }
    else
    {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

function initScrollReveal() {
  const reveals = document.querySelectorAll(
    '.section-title, .section-subtitle, .game-card, .studio-text, .studio-stats, .stat'
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting)
        {
          entry.target.classList.add('visible');
          if (!entry.target.classList.contains('reveal'))
          {
            entry.target.classList.add('reveal');
          }
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  reveals.forEach((el, i) => {
    el.classList.add('reveal');
    if (el.classList.contains('game-card'))
    {
      el.style.transitionDelay = `${i * 80}ms`;
    }
    observer.observe(el);
  });
}

function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (!toggle || !navLinks)
  {
    return;
  }

  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    toggle.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#')
      {
        return;
      }

      const target = document.querySelector(href);
      if (target)
      {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}
