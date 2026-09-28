document.addEventListener('DOMContentLoaded', () => {

    // 1. スクロール時のフェードインアニメーション
    const fadeElements = document.querySelectorAll('.js-fade');
    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0
    });

    fadeElements.forEach(el => {
        fadeObserver.observe(el);
    });

    // 2. スムーススクロール
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = targetId === '#' ? document.documentElement : document.querySelector(targetId);
            
            if (targetElement) {
                const offset = 100;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. ヒーローエリアの文字フェードイン
    setTimeout(() => {
        const heroReveals = document.querySelectorAll('.hero-content .reveal-text');
        heroReveals.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 1s ease, transform 1s ease';
            
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 300 * index);
        });
    }, 100);
});
