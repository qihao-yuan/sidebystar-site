/**
 * 统一导航系统 v2
 * 主导航 + 页脚次级导航 + CTA 栏注入
 */

const NAV_CONFIG = {
    standard: [
        { id: 'home', url: '../index.html', zh: '首页', en: 'Home' },
        { id: 'scenarios', url: 'scenarios.html', zh: '场景方案', en: 'Scenarios' },
        { id: 'platform', url: 'platform.html', zh: '平台能力', en: 'Platform' },
        { id: 'deployment', url: 'deployment.html', zh: '部署交付', en: 'Deployment' },
        { id: 'cases', url: 'cases.html', zh: '案例中心', en: 'Cases' },
        { id: 'about', url: 'about.html', zh: '关于我们', en: 'About' },
        { id: 'contact', url: 'contact.html', zh: '联系销售', en: 'Contact Sales' }
    ],
    secondary: [
        {
            group: 'scenarios',
            zh: '场景入口',
            en: 'Scenarios',
            items: [
                { url: 'scenario-elderly-care.html', zh: '养老与照护', en: 'Elderly Care' },
                { url: 'scenario-smart-home.html', zh: '智能家居', en: 'Smart Home' },
                { url: 'scenario-home-guardian.html', zh: '居家守护', en: 'Home Guardian' },
                { url: 'scenario-smart-room.html', zh: '智能房间', en: 'Smart Room' }
            ]
        },
        {
            group: 'platform',
            zh: '平台与产品',
            en: 'Platform & Products',
            items: [
                { url: 'products.html', zh: '产品矩阵', en: 'Products' },
                { url: 'docs.html', zh: '技术文档', en: 'Tech Docs' },
                { url: 'docs-ess-api.html', zh: 'API 文档', en: 'API Docs' },
                { url: 'community.html', zh: '开发者中心', en: 'Developers' }
            ]
        },
        {
            group: 'trust',
            zh: '信任与合作',
            en: 'Trust & Cooperation',
            items: [
                { url: 'privacy.html', zh: '隐私与合规', en: 'Privacy' },
                { url: 'pilot.html', zh: '试点合作', en: 'Pilot Program' },
                { url: 'cases.html', zh: '案例中心', en: 'Cases' }
            ]
        }
    ]
};

function addUnifiedNavigationStyles() {
    const styleId = 'unified-nav-styles';
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
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
        @media (max-width: 768px) {
            .nav { flex-wrap: wrap; gap: 10px; }
            .nav a { padding: 6px 10px; font-size: 0.9rem; }
            .lang-switch { margin-left: 0; }
        }
    `;
    document.head.appendChild(style);
}

function isHomePage() {
    const path = window.location.pathname.toLowerCase();
    if (path.endsWith('index.html') || path === '/' || path.endsWith('/') || path.includes('/index')) {
        return true;
    }
    if (!path.includes('/html/') && !path.includes('.html')) {
        return true;
    }
    return false;
}

function getCurrentPageId() {
    const path = window.location.pathname;
    const fileName = path.split('/').pop().replace('.html', '');
    const pageMapping = {
        'index': 'home',
        '': 'home',
        'aios-showcase': 'platform',
        'scenarios': 'scenarios',
        'scenario-elderly-care': 'scenarios',
        'scenario-smart-home': 'scenarios',
        'scenario-home-guardian': 'scenarios',
        'scenario-smart-room': 'scenarios',
        'docs-ess-api': 'platform',
        'mbti-test': 'home',
        'mbti-result': 'home'
    };
    return pageMapping[fileName] || fileName;
}

function renderNavigationMenu(navItems, currentPage) {
    const navContainer = document.querySelector('.nav');
    if (!navContainer) return;

    let navHtml = '';
    navItems.forEach(function(item) {
        var isActive = item.id === currentPage;
        var classAttr = isActive ? ' class="current"' : '';
        navHtml += '<a href="' + item.url + '"' + classAttr + '>' +
            '<span lang="zh-CN">' + item.zh + '</span>' +
            '<span lang="en">' + item.en + '</span></a>';
    });

    navHtml += '<div class="lang-switch">' +
        '<a data-lang="zh-CN" class="active-lang">中文</a>' +
        '<a data-lang="en">EN</a></div>';

    navContainer.innerHTML = navHtml;

    setTimeout(function() {
        if (typeof initializeLanguageSwitcher === 'function') {
            initializeLanguageSwitcher();
        } else {
            setTimeout(function() {
                if (typeof initializeLanguageSwitcher === 'function') {
                    initializeLanguageSwitcher();
                }
            }, 100);
        }
    }, 50);
}

function injectCTABar() {
    if (isHomePage()) return;
    var footer = document.querySelector('footer');
    if (!footer) return;
    if (document.querySelector('.cta-bar')) return;

    var cta = document.createElement('div');
    cta.className = 'cta-bar';
    cta.innerHTML = '<div class="container">' +
        '<h3><span lang="zh-CN">开启您的空间智能之旅</span>' +
        '<span lang="en">Start Your Spatial Intelligence Journey</span></h3>' +
        '<p><span lang="zh-CN">无论您关注养老照护、智能家居还是其他空间场景，我们都可以为您提供定制化的本地 AI 解决方案。</span>' +
        '<span lang="en">Whether you focus on elderly care, smart home, or other spatial scenarios, we can provide customized local AI solutions.</span></p>' +
        '<div class="cta-actions">' +
        '<a href="contact.html" class="btn btn-primary"><span lang="zh-CN">预约演示</span><span lang="en">Book Demo</span></a>' +
        '<a href="scenarios.html" class="btn"><span lang="zh-CN">查看场景方案</span><span lang="en">View Scenarios</span></a>' +
        '<a href="pilot.html" class="btn"><span lang="zh-CN">申请试点</span><span lang="en">Apply for Pilot</span></a>' +
        '<a href="contact.html" class="btn"><span lang="zh-CN">联系销售</span><span lang="en">Contact Sales</span></a>' +
        '</div></div>';

    footer.parentNode.insertBefore(cta, footer);
}

function renderFooterNav() {
    var footer = document.querySelector('footer');
    if (!footer) return;
    var container = footer.querySelector('.container');
    if (!container) return;
    if (footer.querySelector('.footer-nav')) return;

    var html = '<div class="footer-nav">';
    NAV_CONFIG.secondary.forEach(function(group) {
        html += '<div class="footer-nav-group">' +
            '<h4><span lang="zh-CN">' + group.zh + '</span>' +
            '<span lang="en">' + group.en + '</span></h4><ul>';
        group.items.forEach(function(item) {
            html += '<li><a href="' + item.url + '">' +
                '<span lang="zh-CN">' + item.zh + '</span>' +
                '<span lang="en">' + item.en + '</span></a></li>';
        });
        html += '</ul></div>';
    });
    html += '</div>';

    container.insertAdjacentHTML('afterbegin', html);
}

var ICP_BEIAN_HREF = 'https://beian.miit.gov.cn/';
var ICP_BEIAN_TEXT = '浙ICP备2026020439号';
var POLICE_BEIAN_HREF = 'https://beian.mps.gov.cn/#/query/webSearch?code=33010902004609';
var POLICE_BEIAN_TEXT = '浙公网安备33010902004609号';

function beianPoliceIconSrc() {
    var path = window.location.pathname.toLowerCase();
    if (path.indexOf('/html/') !== -1) {
        return '../pics/备案图标.png';
    }
    return 'pics/备案图标.png';
}

function beianLinksHtml() {
    var sep = ' <span class="beian-sep" aria-hidden="true">|</span> ';
    var icon = '<img src="' + beianPoliceIconSrc() + '" alt="" width="16" height="17" class="police-beian-icon" />';
    var police = '<a href="' + POLICE_BEIAN_HREF + '" target="_blank" rel="noreferrer" class="police-beian-link">' +
        icon + '<span class="police-beian-text">' + POLICE_BEIAN_TEXT + '</span></a>';
    return '<a href="' + ICP_BEIAN_HREF + '" target="_blank" rel="noopener noreferrer">' +
        ICP_BEIAN_TEXT + '</a>' + sep + police;
}

function injectIcpBeian() {
    var footer = document.querySelector('footer');
    if (!footer) return;
    if (footer.querySelector('.icp-beian')) return;

    var target = footer.querySelector('.container') || footer;

    var p = document.createElement('p');
    p.className = 'icp-beian';
    p.innerHTML = beianLinksHtml();
    target.appendChild(p);
}

function initNavigation() {
    if (isHomePage()) return;

    addUnifiedNavigationStyles();
    var navItems = NAV_CONFIG.standard;
    var currentPage = getCurrentPageId();
    renderNavigationMenu(navItems, currentPage);
    injectCTABar();
    renderFooterNav();
}

function updateNavigation(newItems) {
    NAV_CONFIG.standard = newItems;
    if (!isHomePage()) initNavigation();
}

function addNavigationItem(item) {
    NAV_CONFIG.standard.push(item);
    if (!isHomePage()) initNavigation();
}

function removeNavigationItem(itemId) {
    NAV_CONFIG.standard = NAV_CONFIG.standard.filter(function(item) { return item.id !== itemId; });
    if (!isHomePage()) initNavigation();
}

function getNavigationConfig() {
    return NAV_CONFIG;
}

document.addEventListener('DOMContentLoaded', function() {
    injectIcpBeian();
    initNavigation();
});

window.Navigation = {
    init: initNavigation,
    update: updateNavigation,
    add: addNavigationItem,
    remove: removeNavigationItem,
    getConfig: getNavigationConfig,
    isHomePage: isHomePage
};
