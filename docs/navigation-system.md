# 导航系统使用说明
# Navigation System Documentation

## 📋 概述 Overview

新的导航系统将html/子目录中页面的导航菜单配置集中到一个JavaScript文件中，避免了每次修改导航都要更新多个HTML文件的麻烦。

**注意：首页(index.html)保持静态导航不变，以维持其特殊的布局设计。**

The new navigation system centralizes navigation menu configurations for pages in the html/ subdirectory into a single JavaScript file, eliminating the need to update multiple HTML files every time navigation changes.

**Note: The homepage (index.html) maintains its static navigation to preserve its special layout design.**

## 🗂️ 文件结构 File Structure

```
js/
├── navigation.js          # 主导航系统文件（仅处理html/子目录页面）
├── language.js           # 语言切换功能
├── animations.js         # 动画效果
└── ferris-wheel.js       # 团队页面摩天轮效果
```

## ⚙️ 配置说明 Configuration

### 导航配置对象 Navigation Config Object

```javascript
const NAV_CONFIG = {
    // 标准页面导航（html/子目录中的页面）
    standard: [
        { id: 'home', url: '../index.html', zh: '主页', en: 'Home' },
        { id: 'about', url: 'about.html', zh: '关于我们', en: 'About Us' },
        // ... 更多菜单项
    ]
};
```

### 菜单项属性 Menu Item Properties

- `id`: 页面唯一标识符，用于高亮当前页面
- `url`: 页面链接地址
- `zh`: 中文显示文本
- `en`: 英文显示文本

## 🔧 使用方法 Usage

### 1. 适用页面 Applicable Pages

动态导航系统**仅适用于html/子目录中的页面**：
- about.html
- team.html  
- products.html
- aios-showcase.html
- 以及其他html/目录下的页面

**首页(index.html)保持静态导航不变。**

The dynamic navigation system **only applies to pages in the html/ subdirectory**:
- about.html
- team.html
- products.html
- aios-showcase.html
- And other pages in the html/ directory

**The homepage (index.html) keeps its static navigation unchanged.**

### 2. 在HTML页面中引用脚本 Include Scripts in HTML

```html
<!-- 仅在html/子目录的页面底部添加以下脚本 -->
<script src="../js/navigation.js"></script>
```

### 3. 确保导航容器存在 Ensure Navigation Container Exists

```html
<div class="nav">
    <!-- 导航将由navigation.js动态生成 -->
</div>
```

### 4. 自动初始化 Automatic Initialization

导航系统会在页面加载完成后自动检测页面类型：
- 如果是首页，则不进行任何处理
- 如果是html/子目录页面，则自动生成导航

The navigation system automatically detects page type after page load:
- If it's the homepage, no processing is performed
- If it's a page in html/ subdirectory, navigation is automatically generated

## 🛠️ API接口 API Interface

### 全局对象 Global Object

```javascript
window.Navigation = {
    init: initNavigation,           // 重新初始化导航
    update: updateNavigation,       // 更新导航配置
    add: addNavigationItem,         // 添加导航项
    remove: removeNavigationItem,   // 删除导航项
    config: NAV_CONFIG             // 访问配置对象
};
```

### 示例用法 Example Usage

```javascript
// 添加新的导航项
Navigation.add({
    id: 'blog',
    url: 'blog.html',
    zh: '博客',
    en: 'Blog'
});

// 删除导航项
Navigation.remove('community');

// 更新整个导航配置
Navigation.update([
    { id: 'home', url: '../index.html', zh: '首页', en: 'Home' },
    { id: 'about', url: 'about.html', zh: '关于', en: 'About' }
]);
```

## 🎨 样式处理 Style Handling

### 当前页面高亮 Current Page Highlighting

html/子目录页面的导航项会自动检测当前页面并添加`.current`样式类。

Navigation items in html/ subdirectory pages automatically detect the current page and add the `.current` style class.

### 首页样式保持不变 Homepage Styles Unchanged

首页保持原有的`.btn`样式类和布局，不受动态导航系统影响。

The homepage maintains its original `.btn` style classes and layout, unaffected by the dynamic navigation system.

## 📱 响应式支持 Responsive Support

导航系统完全兼容现有的响应式设计，支持语言切换功能。

The navigation system is fully compatible with existing responsive design and supports language switching.

## 🔄 维护说明 Maintenance Instructions

### 添加新页面 Adding New Pages

**对于html/子目录中的新页面：**
1. 在`NAV_CONFIG.standard`中添加对应的菜单项
2. 确保新页面包含`navigation.js`脚本
3. 添加`.nav`容器到页面中

**对于首页修改：**
直接修改`index.html`中的静态导航结构

**For new pages in html/ subdirectory:**
1. Add corresponding menu item in `NAV_CONFIG.standard`
2. Ensure new page includes `navigation.js` script
3. Add `.nav` container to the page

**For homepage modifications:**
Directly modify the static navigation structure in `index.html`

### 修改菜单结构 Modifying Menu Structure

只需修改`js/navigation.js`中的`NAV_CONFIG.standard`数组，所有html/子目录页面的导航将自动更新。

Simply modify the `NAV_CONFIG.standard` array in `js/navigation.js`, and navigation for all html/ subdirectory pages will update automatically.

## ✅ 优势 Benefits

1. **部分集中管理**: html/子目录页面的导航配置集中管理
2. **保持首页布局**: 首页的特殊布局和样式得到保护
3. **自动同步**: 修改一次，所有子页面自动更新
4. **类型安全**: 统一的数据结构，减少错误
5. **易于维护**: 清晰的API和文档

1. **Partial Centralized Management**: Centralized management for html/ subdirectory page navigation
2. **Preserve Homepage Layout**: Homepage's special layout and styles are protected
3. **Automatic Synchronization**: Modify once, all subpages update automatically
4. **Type Safety**: Unified data structure reduces errors
5. **Easy Maintenance**: Clear API and documentation 