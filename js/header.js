// Header JavaScript - 组件加载和语言切换功能

// Header HTML模板
var headerHTML = '\
<!-- 固定顶部导航栏 -->\
<header class="header-fixed">\
    <div class="header-container">\
        <div class="logo">\
            <a href="index.html" class="logo-link">\
                <img src="切图/header-logo.png" alt="MG广告平台">\
            </a>\
        </div>\
        <nav class="nav-menu">\
            <a href="liuliang-zhu.html" class="nav-link" data-i18n="nav.traffic">流量变现</a>\
            <a href="guanggao-zhu.html" class="nav-link" data-i18n="nav.advertiser">广告主</a>\
            <a href="https://doc.mguwp.net/" class="nav-link" target="_blank" data-i18n="nav.docs">开发者文档</a>\
            <a href="faq.html" class="nav-link" data-i18n="nav.faq">FAQ</a>\
            <a href="http://www.mguwp.net/about_index.html" class="nav-link" target="_blank" data-i18n="nav.about">关于我们</a>\
        </nav>\
        <div class="language-selector">\
            <div class="language-current">\
                <span class="language-text">简体中文</span>\
                <span class="language-arrow">▼</span>\
            </div>\
            <div class="language-dropdown">\
                <a href="#" class="language-option" data-lang="zh">简体中文</a>\
                <a href="#" class="language-option" data-lang="en">English</a>\
            </div>\
        </div>\
        <div class="login-btn">\
            <a href="https://developer.ad.mguwp.net" class="login-link" target="_blank" data-i18n="nav.login">登录</a>\
        </div>\
    </div>\
</header>';

// 加载Header组件
function loadHeader() {
    var placeholder = document.getElementById('header-placeholder');
    if (placeholder) {
        placeholder.innerHTML = headerHTML;
        initHeaderEvents();
        
        // Trigger i18n update if available
        if (typeof updatePageContent === 'function') {
            updatePageContent();
        }
    }
}

// 初始化Header事件
function initHeaderEvents() {
    // 自动高亮当前页面导航项
    highlightCurrentPage();
    
    // 语言切换功能
    var languageOptions = document.querySelectorAll('.language-option');
    
    languageOptions.forEach(function(option) {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            var selectedLang = this.getAttribute('data-lang');
            
            // 使用全局的 switchLanguage 函数
            if (typeof switchLanguage === 'function') {
                switchLanguage(selectedLang);
            }
        });
    });
}

// 根据当前页面自动高亮对应的导航项
function highlightCurrentPage() {
    // 获取当前页面路径或页面标识
    var currentPath = window.location.pathname;
    var currentPage = currentPath.split('/').pop().replace('.html', '') || 'index';
    
    // 页面名称映射到导航文本 (Use keys that match data-i18n)
    // Note: This highlighting logic relies on text content matching. 
    // Since text content changes with language, we should match by href or another stable attribute.
    // Let's update logic to match by href.
    
    var navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(function(link) {
        var href = link.getAttribute('href');
        if (href && href.indexOf(currentPage + '.html') !== -1 && currentPage !== 'index') {
            link.classList.add('active');
        }
        // Special handling for external links or specific pages if needed
        if (currentPage === 'faq' && href === 'faq.html') link.classList.add('active');
    });
    
    // If still relying on body data-page for some reason (e.g. root path)
    var bodyPage = document.body.getAttribute('data-page');
    if (bodyPage) {
         navLinks.forEach(function(link) {
            var href = link.getAttribute('href');
             if (href && href.indexOf(bodyPage + '.html') !== -1) {
                link.classList.add('active');
            }
        });
    }
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', loadHeader);
