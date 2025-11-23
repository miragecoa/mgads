// 收益计算逻辑
window.calculateDauRevenue = async function(dau) {
    try {
        // Formula: dau * 15 / 1000 * 20 / 2 * 30
        const monthlyRevenue = dau * 15 / 1000 * 20 / 2 * 30;
        
        return {
            success: true,
            data: {
                expected_total_revenue: monthlyRevenue
            },
            message: 'Revenue calculated successfully'
        };
    } catch (error) {
        console.error('DAU Revenue Calculation Error:', error);
        throw error;
    }
};

async function calculateRevenue() {
    const input = document.getElementById('dau-input');
    const output = document.getElementById('revenue-output');
    const dau = parseFloat(input.value);

    if (isNaN(dau) || dau < 0) {
        output.textContent = '请输入有效数值';
        output.style.color = 'red';
        return;
    }

    try {
        const result = await window.calculateDauRevenue(dau);
        if (result.success) {
            // 格式化金额，保留两位小数，添加千位分隔符
            const revenue = result.data.expected_total_revenue.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
            output.textContent = `¥${revenue}`;
            output.style.color = '#0078D7'; // 使用蓝色高亮结果
        }
    } catch (error) {
        output.textContent = '计算出错';
        output.style.color = 'red';
    }
}

// 邮件订阅逻辑
window.subscribeEmail = async function(email) {
    try {
        const response = await fetch(`https://www.mguwp.com/cms/subscribe/save?email=${encodeURIComponent(email)}&language=zh`, {
            method: 'GET'
        });
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || '订阅失败');
        }
        
        return data;
    } catch (error) {
        console.error('Email subscription error:', error);
        throw error;
    }
};

async function handleSubscribe() {
    const input = document.querySelector('.email-input');
    const email = input.value.trim();

    if (!email) {
        alert('请输入邮箱地址');
        return;
    }

    try {
        const result = await window.subscribeEmail(email);
        if (result.code === 200 || result.success) {
            alert('订阅成功！');
            input.value = ''; // 清空输入框
        } else {
            alert(result.message || '订阅失败，请稍后重试');
        }
    } catch (error) {
        alert('订阅出错，请检查网络或稍后重试');
    }
}

// 绑定订阅按钮点击事件
document.addEventListener('DOMContentLoaded', () => {
    const emailIcon = document.querySelector('.email-icon');
    if (emailIcon) {
        emailIcon.addEventListener('click', handleSubscribe);
    }
    
    // 也可以支持回车键订阅
    const emailInput = document.querySelector('.email-input');
    if (emailInput) {
        emailInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSubscribe();
            }
        });
    }
});


// 轮播图逻辑
(function() {
    // Get translations based on current language
    function getCarouselTexts() {
        const lang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'zh';
        if (lang === 'en' && typeof translations !== 'undefined') {
            return [
                translations.en.index.s5_carousel_1,
                translations.en.index.s5_carousel_2,
                translations.en.index.s5_carousel_3,
                translations.en.index.s5_carousel_4,
                translations.en.index.s5_carousel_5,
                translations.en.index.s5_carousel_6
            ];
        }
        // Default Chinese
        return ['横幅广告', '全屏广告', '对联广告', '插屏广告', '退屏广告', '开屏广告'];
    }

    const carouselData = [
        { img: '切图/广告平台标准/滚动-1.png', text: '横幅广告' },
        { img: '切图/广告平台标准/滚动-2.png', text: '全屏广告' },
        { img: '切图/广告平台标准/滚动-3.png', text: '对联广告' },
        { img: '切图/广告平台标准/滚动-4.png', text: '插屏广告' },
        { img: '切图/广告平台标准/滚动-5.png', text: '退屏广告' },
        { img: '切图/广告平台标准/滚动-6.png', text: '开屏广告' }
    ];

    let currentIndex = 0; // Start index
    let timer = null;

    function initCarousel() {
        const stage = document.querySelector('.carousel-stage');
        const dotsContainer = document.querySelector('.carousel-dots');
        if (!stage || !dotsContainer) return;

        // Generate Items
        carouselData.forEach((item, index) => {
            const el = document.createElement('div');
            el.className = 'carousel-item';
            el.innerHTML = `<img src="${item.img}" alt="${item.text}">`;
            el.dataset.index = index;
            el.onclick = () => handleItemClick(index);
            stage.appendChild(el);

            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.onclick = () => goToSlide(index);
            dotsContainer.appendChild(dot);
        });

        updateCarousel();
        startAutoPlay();
    }

    function updateCarousel() {
        const items = document.querySelectorAll('.carousel-item');
        const dots = document.querySelectorAll('.dot');
        const descText = document.querySelector('.carousel-desc-text');
        const total = carouselData.length;

        items.forEach(item => {
            item.className = 'carousel-item'; // Reset
            const index = parseInt(item.dataset.index);
            
            // Logic for Circular Carousel
            // Active: currentIndex
            // Prev: currentIndex - 1
            // Next: currentIndex + 1
            
            let diff = index - currentIndex;
            if (diff < -1) diff += total; // Wrap around
            if (diff > 1) diff -= total;  // Wrap around
            
            // Specific logic for 6 items to handle the wrap correctly at extremes
            // If active is 0, prev is 5 (diff 5). 5-6 = -1. Correct.
            // If active is 5, next is 0 (diff -5). -5+6 = 1. Correct.
            // But what about items far away?
            // We need logic to define "prev", "active", "next" and "hidden".
            
            // Calculate distance in circle
            const distance = (index - currentIndex + total) % total;
            
            if (distance === 0) {
                item.classList.add('active');
            } else if (distance === 1) {
                item.classList.add('next');
            } else if (distance === total - 1) {
                item.classList.add('prev');
            } else {
                item.classList.add('hidden');
            }
        });

        // Update Dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });

        // Update Text
        if (descText) {
            const texts = getCarouselTexts();
            descText.textContent = texts[currentIndex];
        }
    }

    // Update carousel language when language changes
    window.updateCarouselLanguage = function(lang) {
        const texts = getCarouselTexts();
        carouselData.forEach((item, index) => {
            item.text = texts[index];
        });
        updateCarousel();
    };

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
        resetAutoPlay();
    }

    function handleItemClick(index) {
        // If click prev or next, move to it. If click active, do nothing or something else.
        if (index !== currentIndex) {
            goToSlide(index);
        }
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % carouselData.length;
        updateCarousel();
    }

    function startAutoPlay() {
        if (timer) clearInterval(timer);
        timer = setInterval(nextSlide, 5000);
    }

    function resetAutoPlay() {
        startAutoPlay();
    }

    // Init on load
    window.addEventListener('DOMContentLoaded', initCarousel);
})();

// 案例轮播逻辑 (板块6)
(function() {
    let currentIndex = 0;
    const intervalTime = 5000;
    let timer = null;

    function initCaseCarousel() {
        const textItems = document.querySelectorAll('.case-text-item');
        const imgItems = document.querySelectorAll('.case-img-item');
        
        if (!textItems || textItems.length === 0 || !imgItems || imgItems.length === 0) return;

        function nextSlide() {
            // Remove active from current
            if(textItems[currentIndex]) textItems[currentIndex].classList.remove('active');
            if(imgItems[currentIndex]) imgItems[currentIndex].classList.remove('active');

            // Increment index
            currentIndex = (currentIndex + 1) % textItems.length;

            // Add active to new
            if(textItems[currentIndex]) textItems[currentIndex].classList.add('active');
            if(imgItems[currentIndex]) imgItems[currentIndex].classList.add('active');
        }

        timer = setInterval(nextSlide, intervalTime);
    }

    window.addEventListener('DOMContentLoaded', initCaseCarousel);
})();
