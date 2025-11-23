// i18n.js - Internationalization logic

// Get current language from URL or LocalStorage or default to 'zh'
function getCurrentLanguage() {
    const urlParams = new URLSearchParams(window.location.search);
    const langFromUrl = urlParams.get('lang');
    
    if (langFromUrl && (langFromUrl === 'zh' || langFromUrl === 'en')) {
        localStorage.setItem('mg_ads_lang', langFromUrl);
        return langFromUrl;
    }
    
    const langFromStorage = localStorage.getItem('mg_ads_lang');
    if (langFromStorage && (langFromStorage === 'zh' || langFromStorage === 'en')) {
        return langFromStorage;
    }
    
    return 'zh'; // Default
}

// Get current page identifier
function getCurrentPage() {
    const path = window.location.pathname;
    const filename = path.split('/').pop() || 'index.html';
    
    if (filename === 'index.html' || filename === '' || filename === 'index') {
        return 'index';
    } else if (filename === 'guanggao-zhu.html' || filename === 'guanggao-zhu') {
        return 'advertiser';
    } else if (filename === 'liuliang-zhu.html' || filename === 'liuliang-zhu') {
        return 'publisher';
    } else if (filename === 'faq.html' || filename === 'faq') {
        return 'faq';
    }
    
    // Fallback to body data-page attribute
    const bodyPage = document.body.getAttribute('data-page');
    if (bodyPage) {
        if (bodyPage === 'guanggao-zhu') return 'advertiser';
        if (bodyPage === 'liuliang-zhu') return 'publisher';
        return bodyPage;
    }
    
    return 'index'; // Default
}

// Update page content based on selected language
function updatePageContent() {
    const lang = getCurrentLanguage();
    
    // Set html lang attribute
    document.documentElement.setAttribute('lang', lang === 'zh' ? 'zh-CN' : 'en');
    
    // 0. Update page title
    const currentPage = getCurrentPage();
    const titleKey = `title.${currentPage}`;
    const titleValue = getNestedTranslation(translations[lang], titleKey);
    if (titleValue) {
        document.title = titleValue;
    }
    
    // 1. Update elements with data-i18n attribute
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        const value = getNestedTranslation(translations[lang], key);
        
        if (value) {
            if (el.tagName === 'INPUT' && el.getAttribute('placeholder')) {
                el.setAttribute('placeholder', value);
            } else {
                el.innerHTML = value;
            }
        }
    });
    
    // 2. Update Carousel Text (if specific logic needed)
    // The carousel text in index.js needs to be updated dynamically
    if (window.updateCarouselLanguage) {
        window.updateCarouselLanguage(lang);
    }
    
    // 3. Update Language Selector State
    updateLanguageSelector(lang);
}

// Helper to get nested object value by string key (e.g. "index.s1_title")
function getNestedTranslation(obj, path) {
    return path.split('.').reduce((prev, curr) => {
        return prev ? prev[curr] : null;
    }, obj);
}

// Update header language selector UI
function updateLanguageSelector(lang) {
    const currentText = document.querySelector('.language-current .language-text');
    if (currentText) {
        currentText.textContent = lang === 'zh' ? '简体中文' : 'English';
    }
}

// Switch language function
function switchLanguage(lang) {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('lang', lang);
    window.location.href = currentUrl.toString();
}

// Expose to window
window.switchLanguage = switchLanguage;
window.getCurrentLanguage = getCurrentLanguage;

// Init on load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize i18n
    updatePageContent();
    
    // Bind click events for language selector options
    // Note: Header might be loaded dynamically, so we use delegation or wait
    document.body.addEventListener('click', function(e) {
        if (e.target.classList.contains('language-option')) {
            e.preventDefault();
            const lang = e.target.getAttribute('data-lang');
            switchLanguage(lang);
        }
    });
});

