document.addEventListener('DOMContentLoaded', () => {

  const navBtns = document.querySelectorAll('.nav-btn');
  const sections = document.querySelectorAll('.task-section');
  const stickyNav = document.querySelector('.sticky-nav');

  function activateSection(id) {
    sections.forEach(s => s.classList.remove('active'));
    navBtns.forEach(b => b.classList.remove('active'));

    const target = document.getElementById(id);
    const btn = document.querySelector(`.nav-btn[data-target="${id}"]`);
    if (target) {
      target.classList.add('active');
      // הצג מיד את כל אלמנטי ה-reveal בסקשן הפעיל — כך iframes לא נשארים שקופים/בגובה 0
      target.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    }
    if (btn) {
      btn.classList.add('active');
      btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }

    if (stickyNav) {
      const navTop = stickyNav.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: navTop - 8, behavior: 'smooth' });
    }
  }

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => activateSection(btn.dataset.target));
  });

  const firstBtn = navBtns[0];
  if (firstBtn) activateSection(firstBtn.dataset.target);

  const heroObserver = new IntersectionObserver(([entry]) => {
    stickyNav?.classList.toggle('shadow-active', !entry.isIntersecting);
  }, { threshold: 0.1 });

  const hero = document.querySelector('.hero');
  if (hero) heroObserver.observe(hero);

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

});
