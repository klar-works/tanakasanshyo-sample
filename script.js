document.addEventListener('DOMContentLoaded', () => {

    // 1. スクロール時のフェードインアニメーション (Intersection Observer)
    const fadeElements = document.querySelectorAll('.js-fade');

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 画面内に入ったら is-active クラスを付与
                entry.target.classList.add('is-active');
                // 一度発火したら監視を解除する
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -10% 0px', // 画面の下から10%入ったところで発火
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
            // href="#" の場合はトップへ、それ以外は該当IDへ
            const targetElement = targetId === '#' ? document.documentElement : document.querySelector(targetId);
            
            if (targetElement) {
                // 固定ヘッダー（お知らせ+ヘッダー）の高さ分を考慮してずらす
                const offset = 100;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 初回ロード時にヒーローエリア内のテキストをフェードインさせるための処理
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
