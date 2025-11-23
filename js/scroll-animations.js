// 滚动触发动画 - 使用 Intersection Observer
(function() {
    // 动画关键帧定义（如果CSS中没有定义）
    if (!document.querySelector('#scroll-animations-style')) {
        const style = document.createElement('style');
        style.id = 'scroll-animations-style';
        style.textContent = `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }

    // 初始化动画元素
    function initScrollAnimations() {
        // 查找所有需要动画的元素
        const animatedElements = document.querySelectorAll([
            '.title-line-1',
            '.title-line-2',
            '.section-1-subtitle',
            '.section-1-desc',
            '.section-1-btn',
            '.section-1-image',
            '.section-2-title',
            '.section-2-card',
            '.section-2-small-box',
            '.s3-title-line1',
            '.s3-title-line2',
            '.section-3-desc',
            '.section-3-btn',
            '.s4-title-line1',
            '.s4-title-line2',
            '.section-4-desc',
            '.section-4-btn',
            '.section-5-title',
            '.section-6-title',
            '.section-7-title',
            '.join-btn-1',
            '.join-btn-2',
            '.section-7-text',
            // 广告主页面
            '.s1-title-line1',
            '.s1-title-line2',
            '.s2-title-line1',
            '.s2-title-line2',
            '.section-2-desc',
            '.s3-title-line1',
            '.s3-title-line2',
            '.section-3-desc',
            '.section-4-title',
            '.section-4-btn',
            // 流量主页面
            '.title-sub',
            '.title-main',
            '.section-2-desc',
            '.section-3-desc',
            // FAQ页面
            '.section-1-title',
            '.section-1-btn'
        ].join(','));

        // 创建 Intersection Observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 元素进入视口，添加动画类
                    entry.target.classList.add('animate-in');
                    // 动画完成后，可以取消观察（可选）
                    observer.unobserve(entry.target);
                }
            });
        }, {
            // 当元素进入视口 20% 时触发
            threshold: 0.2,
            // 提前 50px 触发，让动画更自然
            rootMargin: '0px 0px -50px 0px'
        });

        // 观察所有动画元素
        animatedElements.forEach(element => {
            if (element) {
                observer.observe(element);
            }
        });
    }

    // 页面加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initScrollAnimations);
    } else {
        initScrollAnimations();
    }
})();

