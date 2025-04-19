document.addEventListener('DOMContentLoaded', () => {
    const langSwitchLinks = document.querySelectorAll('.lang-switch a');
    const htmlTag = document.documentElement; // Get the <html> tag

    // Function to set the language
    function setLanguage(lang) {
        if (!lang) return; // Exit if lang is not provided

        // Update the lang attribute on the <html> tag
        htmlTag.setAttribute('lang', lang);

        // Update the active class on switcher links
        langSwitchLinks.forEach(link => {
            if (link.getAttribute('data-lang') === lang) {
                link.classList.add('active-lang');
            } else {
                link.classList.remove('active-lang');
            }
        });

        // Update the page title (simple example, might need refinement)
        const titleBase = '循星科技';
        const titleEnBase = 'SidebyStar';
        let pageTitleZh = document.querySelector('title').textContent; // Get current title for context
        let pageTitleEn = '';

        // Basic title translation logic (improve as needed)
        if (pageTitleZh.includes('关于我们')) pageTitleEn = 'About Us';
        else if (pageTitleZh.includes('产品')) pageTitleEn = 'Products';
        else if (pageTitleZh.includes('团队')) pageTitleEn = 'Team';
        else if (pageTitleZh.includes('合作')) pageTitleEn = 'Partners';
        else if (pageTitleZh.includes('开发者')) pageTitleEn = 'Developers';
        else if (pageTitleZh.includes('联系')) pageTitleEn = 'Contact';
        else if (pageTitleZh.includes('首页') || document.location.pathname.endsWith('index.html') || document.location.pathname === '/') pageTitleEn = 'Home';
        else pageTitleEn = pageTitleZh; // Fallback

        if (lang === 'en' && pageTitleEn) {
             document.title = `${pageTitleEn} - ${titleEnBase}`;
        } else {
             // Attempt to reconstruct Chinese title if switching back from English
             // This is basic, might need a map or data attributes for better accuracy
             let originalZhTitle = '循星科技'; // Default
             if (pageTitleEn === 'About Us') originalZhTitle = '关于我们';
             else if (pageTitleEn === 'Products') originalZhTitle = '我们的产品';
             else if (pageTitleEn === 'Team') originalZhTitle = '团队成员';
             else if (pageTitleEn === 'Partners') originalZhTitle = '合作与生态';
             else if (pageTitleEn === 'Developers') originalZhTitle = '开发者中心';
             else if (pageTitleEn === 'Contact') originalZhTitle = '联系我们';
             else if (pageTitleEn === 'Home') originalZhTitle = '首页';
             document.title = `${originalZhTitle} - ${titleBase}`;
        }

        // Save the selected language to localStorage
        try {
            localStorage.setItem('preferredLang', lang);
        } catch (e) {
            console.warn('LocalStorage not available or quota exceeded.');
        }
    }

    // Add click event listeners to language switch links
    langSwitchLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            const selectedLang = link.getAttribute('data-lang');
            setLanguage(selectedLang);
        });
    });

    // Initialize language on page load
    let preferredLang = 'zh-CN'; // Default to Chinese
    try {
         preferredLang = localStorage.getItem('preferredLang') || 
                           (navigator.language.startsWith('en') ? 'en' : 'zh-CN'); // Check localStorage or browser pref
    } catch (e) {
        console.warn('LocalStorage not available or quota exceeded. Defaulting language.');
        preferredLang = navigator.language.startsWith('en') ? 'en' : 'zh-CN';
    }

    // Ensure preferredLang is one of the supported languages
    const supportedLangs = ['zh-CN', 'en'];
    if (!supportedLangs.includes(preferredLang)) {
        preferredLang = 'zh-CN'; // Fallback to default if stored lang is invalid
    }

    setLanguage(preferredLang);
}); 