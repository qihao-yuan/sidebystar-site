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
            'product_test': '产品体验 - 循星科技',
            'aios-showcase': 'AIOS技术展示 - 循星科技',
            'aios-3d-demo': 'AIOS 3D智能家居演示 - 循星科技',
            'docs': 'AIOS 技术手册 - 循星科技',
            'docs-ess-api': '环境感知系统 API 文档 - 循星科技',
            'community': '开发者社区 - 循星科技',
            'partners': '合作与生态 - 循星科技',
            'contact': '联系我们 - 循星科技',
            'mbti-test': 'MBTI 家居人格测试 - 循星科技',
            'mbti-result': 'MBTI 家居人格测试结果 - 循星科技',
            'plugins': '插件中心 - 循星科技'
        },
        'en': {
            'index': 'SidebyStar - Per aspera ad astra',
            'about': 'About Us - SidebyStar',
            'team': 'Team - SidebyStar',
            'products': 'Products - SidebyStar',
            'product_test': 'Product Experience - SidebyStar',
            'aios-showcase': 'AIOS Tech Showcase - SidebyStar',
            'aios-3d-demo': 'AIOS 3D Smart Home Demo - SidebyStar',
            'docs': 'AIOS Technical Manual - SidebyStar',
            'docs-ess-api': 'Environmental Sensing System API Documentation - SidebyStar',
            'community': 'Developer Community - SidebyStar',
            'partners': 'Partners & Ecosystem - SidebyStar',
            'contact': 'Contact - SidebyStar',
            'mbti-test': 'MBTI Home Personality Test - SidebyStar',
            'mbti-result': 'MBTI Home Personality Test Results - SidebyStar',
            'plugins': 'Plugin Center - SidebyStar'
        }
    };

    // 页面描述映射
    const pageDescriptionMap = {
        'zh-CN': {
            'index': '循星科技 - 循此苦旅，终抵群星。专注于AIOS智能家居平台开发。',
            'about': '了解循星科技的愿景使命，探索我们在AIOS智能家居领域的创新之路。',
            'team': '认识循星科技的核心团队成员，了解我们的技术实力与团队文化。',
            'products': '探索循星科技的产品生态，体验AIOS智能家居解决方案。',
            'product_test': '体验循星科技的产品功能，感受AIOS智能家居的魅力。',
            'aios-showcase': '深入了解AIOS技术特性，体验智能家居的未来。',
            'aios-3d-demo': '体验AIOS 3D智能家居演示，感受沉浸式智能设备控制体验。',
            'docs': 'AIOS技术手册，为开发者提供完整的技术文档和API指南。',
            'docs-ess-api': '环境感知系统API文档，实现智能环境监测与控制。',
            'community': '加入循星科技开发者社区，与志同道合的开发者一起创新。',
            'partners': '循星科技合作伙伴生态，共建智能家居产业链。',
            'contact': '联系循星科技，开启智能家居合作之旅。',
            'mbti-test': '专业的MBTI人格测试，了解您的人格类型特征。',
            'mbti-result': '查看您的MBTI测试结果，深入了解个人人格特质。',
            'plugins': '循星科技插件中心，扩展AIOS平台功能。'
        },
        'en': {
            'index': 'SidebyStar - Per aspera ad astra. Focused on AIOS smart home platform development.',
            'about': 'Learn about SidebyStar\'s vision and mission, explore our innovation in AIOS smart home.',
            'team': 'Meet the core team members of SidebyStar, learn about our technical strength and team culture.',
            'products': 'Explore SidebyStar\'s product ecosystem and experience AIOS smart home solutions.',
            'product_test': 'Experience SidebyStar\'s product features and feel the charm of AIOS smart home.',
            'aios-showcase': 'Deep dive into AIOS technology features and experience the future of smart home.',
            'aios-3d-demo': 'Experience AIOS 3D Smart Home Demo with immersive smart device control.',
            'docs': 'AIOS Technical Manual, providing complete technical documentation and API guides for developers.',
            'docs-ess-api': 'Environmental Sensing System API documentation for intelligent environmental monitoring and control.',
            'community': 'Join SidebyStar developer community and innovate with like-minded developers.',
            'partners': 'SidebyStar partner ecosystem, building smart home industry chain together.',
            'contact': 'Contact SidebyStar to start your smart home collaboration journey.',
            'mbti-test': 'Professional MBTI personality test to understand your personality type characteristics.',
            'mbti-result': 'View your MBTI test results and gain deep insights into your personality traits.',
            'plugins': 'SidebyStar Plugin Center, extend AIOS platform functionality.'
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
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);
    });

    // 重新获取元素
    const newLangSwitchLinks = document.querySelectorAll('.lang-switch a');


    function setLanguage(lang) {
        if (!lang) return; 


        htmlTag.setAttribute('lang', lang);


        newLangSwitchLinks.forEach(link => {
            if (link.getAttribute('data-lang') === lang) {
                link.classList.add('active-lang');
            } else {
                link.classList.remove('active-lang');
            }
        });


        const currentPageId = getCurrentPageId();
        const newTitle = pageTitleMap[lang] && pageTitleMap[lang][currentPageId] 
                        ? pageTitleMap[lang][currentPageId] 
                        : (lang === 'en' ? 'SidebyStar' : '循星科技');
        document.title = newTitle;


        const newDescription = pageDescriptionMap[lang] && pageDescriptionMap[lang][currentPageId]
                              ? pageDescriptionMap[lang][currentPageId]
                              : (lang === 'en' ? 'SidebyStar - Per aspera ad astra. Focused on AIOS smart home platform development.' 
                                               : '循星科技 - 循此苦旅，终抵群星。专注于AIOS智能家居平台开发。');


        let metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', newDescription);
        } else {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            metaDescription.setAttribute('content', newDescription);
            document.head.appendChild(metaDescription);
        }

        let ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) {
            ogTitle.setAttribute('content', newTitle);
        } else {
            ogTitle = document.createElement('meta');
            ogTitle.setAttribute('property', 'og:title');
            ogTitle.setAttribute('content', newTitle);
            document.head.appendChild(ogTitle);
        }

        let ogDescription = document.querySelector('meta[property="og:description"]');
        if (ogDescription) {
            ogDescription.setAttribute('content', newDescription);
        } else {
            ogDescription = document.createElement('meta');
            ogDescription.setAttribute('property', 'og:description');
            ogDescription.setAttribute('content', newDescription);
            document.head.appendChild(ogDescription);
        }

        try {
            localStorage.setItem('preferredLang', lang);
        } catch (e) {
            console.warn('LocalStorage not available or quota exceeded.');
        }

        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
    }

    newLangSwitchLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); 
            const selectedLang = link.getAttribute('data-lang');
            setLanguage(selectedLang);
        });
    });


    let preferredLang = 'zh-CN'; 
    

    try {
        const savedLang = localStorage.getItem('preferredLang');
        if (savedLang && ['zh-CN', 'en'].includes(savedLang)) {
            preferredLang = savedLang;
        } else {

            const currentLang = htmlTag.getAttribute('lang');
            if (currentLang && ['zh-CN', 'en'].includes(currentLang)) {
                preferredLang = currentLang;
            } else {

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


    const supportedLangs = ['zh-CN', 'en'];
    if (!supportedLangs.includes(preferredLang)) {
        preferredLang = 'zh-CN'; 
    }

    setLanguage(preferredLang);
}

// 工具函数：获取当前语言
function getCurrentLanguage() {
    return document.documentElement.getAttribute('lang') || 'zh-CN';
}

// 工具函数：更新页面元数据（可被外部调用，如 MBTI 结果页面）
function updatePageMetadata(customTitle, customDescription) {
    const currentLang = getCurrentLanguage();
    

    if (customTitle) {
        document.title = customTitle;
        
        // 同时更新 Open Graph 标题
        let ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) {
            ogTitle.setAttribute('content', customTitle);
        }
    }
    
    // 更新页面描述
    if (customDescription) {
        // 更新 meta description
        let metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', customDescription);
        }
        
        // 更新 Open Graph 描述
        let ogDescription = document.querySelector('meta[property="og:description"]');
        if (ogDescription) {
            ogDescription.setAttribute('content', customDescription);
        }
    }
}

// 自动初始化
document.addEventListener('DOMContentLoaded', () => {
    // 延迟初始化，确保navigation.js有机会先生成导航
    setTimeout(initializeLanguageSwitcher, 50);
}); 