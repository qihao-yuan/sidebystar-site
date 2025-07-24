/**
 * 统一导航系统
 * Unified Navigation System
 * 注意：首页保持静态导航，此系统处理html/子目录中的所有页面
 */

// 导航配置
const NAV_CONFIG = {
    // 所有页面导航配置（除首页外）
    standard: [
        { id: 'home', url: '../index.html', zh: '主页', en: 'Home' },
        { id: 'mbti-test', url: 'mbti-test.html', zh: '家居测试', en: 'Home Test' },
        { id: 'about', url: 'about.html', zh: '关于我们', en: 'About Us' },
        { id: 'team', url: 'team.html', zh: '团队成员', en: 'Team' },
        { id: 'products', url: 'products.html', zh: '我们的产品', en: 'Products' },
        { id: 'plugins', url: 'plugins.html', zh: '插件生态', en: 'Plugins' },
        { id: 'aios', url: 'aios-showcase.html', zh: 'AIOS技术', en: 'AIOS Tech' },
        { id: 'aios-3d-demo', url: 'aios-3d-demo.html', zh: '3D智能家居', en: '3D Smart Home' },
        { id: 'docs', url: 'docs.html', zh: '技术手册', en: 'Tech Manual' },
        { id: 'community', url: 'community.html', zh: '开发者社区', en: 'Community' },
        { id: 'partners', url: 'partners.html', zh: '合作与生态', en: 'Partners' },
        { id: 'contact', url: 'contact.html', zh: '联系我们', en: 'Contact' }
    ]
};

/**
 * 添加统一的导航样式（包括语言切换器）
 */
function addUnifiedNavigationStyles() {
    const styleId = 'unified-nav-styles';
    
    // 检查是否已经添加了样式
    if (document.getElementById(styleId)) {
        return;
    }
    
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
        /* 导航样式统一 */
        .nav {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .nav a {
            color: var(--text-color);
            text-decoration: none;
            padding: 6px 12px;
            border-radius: 6px;
            transition: all 0.3s ease;
            font-size: 0.85rem;
        }
        
        .nav a:hover {
            background-color: rgba(var(--accent-color-rgb), 0.2);
            color: var(--accent-color);
        }
        
        .nav a.current {
            background-color: rgba(var(--accent-color-rgb), 0.3);
            color: var(--primary-color);
            font-weight: 600;
        }
        
        /* 语言切换器样式 */
        .lang-switch {
            display: flex;
            gap: 4px;
            margin-left: 8px;
        }
        
        .lang-switch a {
            cursor: pointer;
            padding: 5px 10px;
            border-radius: 15px;
            transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
            color: var(--text-color);
            text-decoration: none;
            font-size: 0.9rem;
            border: 1px solid transparent;
            background-color: transparent;
        }
        
        .lang-switch a:hover {
            background-color: rgba(var(--accent-color-rgb), 0.2);
            color: var(--accent-color);
            border-color: rgba(var(--accent-color-rgb), 0.4);
        }
        
        .lang-switch a.active-lang {
            font-weight: bold;
            background-color: rgba(var(--accent-color-rgb), 0.3);
            color: var(--primary-color);
            border-color: rgba(var(--accent-color-rgb), 0.5);
        }
        
        /* 响应式处理 */
        @media (max-width: 768px) {
            .nav {
                flex-wrap: wrap;
                gap: 10px;
            }
            
            .nav a {
                padding: 6px 10px;
                font-size: 0.9rem;
            }
            
            .lang-switch {
                margin-left: 0;
            }
        }
    `;
    
    document.head.appendChild(style);
}

/**
 * 检测是否为首页
 */
function isHomePage() {
    const path = window.location.pathname.toLowerCase();
    
    // 明确指定首页的判断条件
    if (path.endsWith('index.html') || 
        path === '/' || 
        path.endsWith('/') ||
        path.includes('/index')) {
        return true;
    }
    
    // 如果路径不包含任何HTML文件，且不在html目录下，认为是首页
    if (!path.includes('/html/') && !path.includes('.html')) {
        return true;
    }
    
    return false;
}

/**
 * 自动检测当前页面类型并渲染导航
 */
function initNavigation() {
    // 检测是否为首页
    if (isHomePage()) {
        console.log('检测到首页，保持静态导航不变');
        return; // 首页保持静态导航
    }
    
    console.log('检测到非首页，启用统一导航管理');
    
    // 添加统一导航样式
    addUnifiedNavigationStyles();
    
    // 获取导航配置和当前页面
    const navItems = NAV_CONFIG.standard;
    const currentPage = getCurrentPageId();
    
    // 渲染导航
    renderNavigationMenu(navItems, currentPage);
}

/**
 * 获取当前页面ID
 */
function getCurrentPageId() {
    const path = window.location.pathname;
    const fileName = path.split('/').pop().replace('.html', '');
    
    // 特殊页面映射
    const pageMapping = {
        'index': 'home',
        '': 'home',
        'aios-showcase': 'aios',
        'aios-3d-demo': 'aios-3d-demo',
        'docs-ess-api': 'docs',
        'mbti-test': 'mbti-test',
        'mbti-result': 'mbti-test'
    };
    
    return pageMapping[fileName] || fileName;
}

/**
 * 渲染导航菜单
 */
function renderNavigationMenu(navItems, currentPage) {
    // 查找导航容器
    const navContainer = document.querySelector('.nav');
    if (!navContainer) {
        console.warn('未找到导航容器 .nav');
        return;
    }
    
    let navHtml = '';
    
    // 生成导航链接
    navItems.forEach(item => {
        const isActive = item.id === currentPage;
        const classAttr = isActive ? ' class="current"' : '';
        
        navHtml += `
            <a href="${item.url}"${classAttr}>
                <span lang="zh-CN">${item.zh}</span>
                <span lang="en">${item.en}</span>
            </a>
        `;
    });
    
    // 添加语言切换器
    navHtml += `
        <div class="lang-switch">
            <a data-lang="zh-CN" class="active-lang">中文</a>
            <a data-lang="en">EN</a>
        </div>
    `;
    
    navContainer.innerHTML = navHtml;
    
    // 导航生成后，初始化语言切换功能
    setTimeout(() => {
        if (typeof initializeLanguageSwitcher === 'function') {
            initializeLanguageSwitcher();
        } else {
            console.warn('initializeLanguageSwitcher 函数未找到，稍后重试...');
            setTimeout(() => {
                if (typeof initializeLanguageSwitcher === 'function') {
                    initializeLanguageSwitcher();
                }
            }, 100);
        }
    }, 50);
    
    console.log(`导航已渲染，当前页面: ${currentPage}`);
}

/**
 * 更新导航配置
 */
function updateNavigation(newItems) {
    NAV_CONFIG.standard = newItems;
    if (!isHomePage()) {
        initNavigation();
    }
}

/**
 * 添加导航项
 */
function addNavigationItem(item) {
    NAV_CONFIG.standard.push(item);
    if (!isHomePage()) {
        initNavigation();
    }
}

/**
 * 删除导航项
 */
function removeNavigationItem(itemId) {
    NAV_CONFIG.standard = NAV_CONFIG.standard.filter(item => item.id !== itemId);
    if (!isHomePage()) {
        initNavigation();
    }
}

/**
 * 获取导航配置
 */
function getNavigationConfig() {
    return NAV_CONFIG;
}

// 页面加载完成后自动初始化导航
document.addEventListener('DOMContentLoaded', initNavigation);

// 导出函数供外部使用
window.Navigation = {
    init: initNavigation,
    update: updateNavigation,
    add: addNavigationItem,
    remove: removeNavigationItem,
    getConfig: getNavigationConfig,
    isHomePage: isHomePage
}; 