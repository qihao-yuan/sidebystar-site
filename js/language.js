// 语言切换器初始化函数（可被外部调用）
function initializeLanguageSwitcher() {
    const langSwitchLinks = document.querySelectorAll('.lang-switch a');
    const htmlTag = document.documentElement; // Get the <html> tag

    // 页面标题映射
    const pageTitleMap = {
        'zh-CN': {
            'index': '循星科技 - 循此苦旅，终抵群星',
            'about': '关于我们 - 循星科技',
            'team': '团队成员 - 循星科技',
            'products': '我们的产品 - 循星科技',
            'aios-showcase': 'AIOS技术展示 - 循星科技',
            'docs': 'AIOS 技术手册 - 循星科技',
            'docs-ess-api': '环境感知系统 API 文档 - 循星科技',
            'community': '开发者社区 - 循星科技',
            'partners': '合作与生态 - 循星科技',
            'contact': '联系我们 - 循星科技'
        },
        'en': {
            'index': 'SidebyStar - To the Stars Through Hardships',
            'about': 'About Us - SidebyStar',
            'team': 'Team - SidebyStar',
            'products': 'Products - SidebyStar',
            'aios-showcase': 'AIOS Tech Showcase - SidebyStar',
            'docs': 'AIOS Technical Manual - SidebyStar',
            'docs-ess-api': 'Environmental Sensing System API Documentation - SidebyStar',
            'community': 'Developer Community - SidebyStar',
            'partners': 'Partners - SidebyStar',
            'contact': 'Contact - SidebyStar'
        }
    };

    // 获取当前页面ID
    function getCurrentPageId() {
        const path = window.location.pathname;
        const fileName = path.split('/').pop().replace('.html', '');
        
        if (fileName === '' || fileName === 'index') return 'index';
        return fileName;
    }

    // 清除之前的事件监听器
    langSwitchLinks.forEach(link => {
        // 移除之前可能存在的监听器（通过克隆节点实现）
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);
    });

    // 重新获取元素
    const newLangSwitchLinks = document.querySelectorAll('.lang-switch a');

    // Function to set the language
    function setLanguage(lang) {
        if (!lang) return; // Exit if lang is not provided

        // Update the lang attribute on the <html> tag
        htmlTag.setAttribute('lang', lang);

        // Update the active class on switcher links
        newLangSwitchLinks.forEach(link => {
            if (link.getAttribute('data-lang') === lang) {
                link.classList.add('active-lang');
            } else {
                link.classList.remove('active-lang');
            }
        });

        // Update the page title using the mapping
        const currentPageId = getCurrentPageId();
        const newTitle = pageTitleMap[lang] && pageTitleMap[lang][currentPageId] 
                        ? pageTitleMap[lang][currentPageId] 
                        : (lang === 'en' ? 'SidebyStar' : '循星科技');
        document.title = newTitle;

        // Save the selected language to localStorage
        try {
            localStorage.setItem('preferredLang', lang);
        } catch (e) {
            console.warn('LocalStorage not available or quota exceeded.');
        }

        // 触发自定义事件，让其他组件知道语言已切换
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
    }

    // Add click event listeners to language switch links
    newLangSwitchLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            const selectedLang = link.getAttribute('data-lang');
            setLanguage(selectedLang);
        });
    });

    // Initialize language on page load
    let preferredLang = 'zh-CN'; // Default to Chinese
    
    // 优先级：1. localStorage保存的设置 2. HTML标签设置 3. 浏览器偏好
    try {
        const savedLang = localStorage.getItem('preferredLang');
        if (savedLang && ['zh-CN', 'en'].includes(savedLang)) {
            preferredLang = savedLang;
        } else {
            // 如果localStorage没有保存的语言，检查HTML标签
            const currentLang = htmlTag.getAttribute('lang');
            if (currentLang && ['zh-CN', 'en'].includes(currentLang)) {
                preferredLang = currentLang;
            } else {
                // 最后才使用浏览器偏好
                preferredLang = navigator.language.startsWith('en') ? 'en' : 'zh-CN';
            }
        }
    } catch (e) {
        console.warn('LocalStorage not available. Using HTML lang attribute or browser language preference.');
        const currentLang = htmlTag.getAttribute('lang');
        if (currentLang && ['zh-CN', 'en'].includes(currentLang)) {
            preferredLang = currentLang;
        } else {
            preferredLang = navigator.language.startsWith('en') ? 'en' : 'zh-CN';
        }
    }

    // Ensure preferredLang is one of the supported languages
    const supportedLangs = ['zh-CN', 'en'];
    if (!supportedLangs.includes(preferredLang)) {
        preferredLang = 'zh-CN'; // Fallback to default if stored lang is invalid
    }

    setLanguage(preferredLang);
}

// 自动初始化
document.addEventListener('DOMContentLoaded', () => {
    // 延迟初始化，确保navigation.js有机会先生成导航
    setTimeout(initializeLanguageSwitcher, 50);
}); 