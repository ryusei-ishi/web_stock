// ========================================
// Fleur Douce — Script
// ========================================

document.addEventListener('DOMContentLoaded', () => {

  // --- パスワード認証 ---
  // ★ パスワードはここで変更できます ★
  const SITE_PASSWORD = 'fleur2026';

  const gate = document.getElementById('password-gate');
  const pwInput = document.getElementById('pw-input');
  const pwSubmit = document.getElementById('pw-submit');
  const pwError = document.getElementById('pw-error');

  if (gate) {
    // すでに認証済みならスキップ
    if (sessionStorage.getItem('pw-auth') === 'ok') {
      gate.classList.add('hidden');
    }

    const tryAuth = () => {
      if (pwInput.value === SITE_PASSWORD) {
        sessionStorage.setItem('pw-auth', 'ok');
        gate.style.transition = 'opacity 0.4s ease';
        gate.style.opacity = '0';
        setTimeout(() => gate.classList.add('hidden'), 400);
      } else {
        pwError.textContent = 'パスワードが違います';
        pwInput.value = '';
        pwInput.focus();
      }
    };

    pwSubmit.addEventListener('click', tryAuth);
    pwInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') tryAuth();
    });
  }

  // --- ハンバーガーメニュー ---
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      nav.classList.toggle('active');
    });

    // ナビリンクをクリックしたらメニューを閉じる
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
      });
    });
  }

  // --- ヘッダーのスクロール効果 ---
  const header = document.querySelector('.header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 100) {
      header.style.boxShadow = '0 2px 20px rgba(166, 124, 150, 0.08)';
    } else {
      header.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
  });

  // --- スクロールアニメーション ---
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // アニメーション対象の要素を監視
  const animTargets = document.querySelectorAll(
    '.concept-grid, .bouquet-card, .service-card, .testimonial-card, ' +
    '.seasonal-banner, .shop-grid, .contact-form, .insta-item'
  );

  animTargets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // is-visible クラスのスタイル
  const style = document.createElement('style');
  style.textContent = `
    .is-visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);

  // カードに順番にディレイを付与
  document.querySelectorAll('.bouquet-grid, .service-grid, .testimonial-grid, .insta-grid').forEach(grid => {
    const children = grid.children;
    Array.from(children).forEach((child, i) => {
      child.style.transitionDelay = `${i * 0.1}s`;
    });
  });

  // --- スムーススクロール（ヘッダーの高さ分オフセット） ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});
