// 循星 AIOS 家居 MBTI 测试系统
// 基于四维度：体验/节能、隐私/云端、自动/手动、个人/集体

// 测试问题数据
const questions = [
    {
        id: 1,
        title: { 
            'zh-CN': '🏠 居家环境偏好',
            'en': '🏠 Home Environment Preference'
        },
        text: {
            'zh-CN': '下班回家后，你更希望家里的氛围是：',
            'en': 'After work, you prefer your home atmosphere to be:'
        },
        options: [
            {
                text: {
                    'zh-CN': '自动感应我的情绪，播放合适的音乐和光效',
                    'en': 'Automatically sense my mood and play appropriate music and lighting'
                },
                scores: { S: 1, E: 0, P: 0, R: 0, A: 1, M: 0, I: 1, C: 0 }
            },
            {
                text: {
                    'zh-CN': '保持基本的节能模式，我需要时再手动调整',
                    'en': 'Keep basic energy-saving mode, I\'ll adjust manually when needed'
                },
                scores: { S: 0, E: 1, P: 0, R: 0, A: 0, M: 1, I: 1, C: 0 }
            }
        ]
    },
    {
        id: 2,
        title: {
            'zh-CN': '💡 智能控制方式',
            'en': '💡 Smart Control Method'
        },
        text: {
            'zh-CN': '对于家里的智能设备，你倾向于：',
            'en': 'For smart devices at home, you tend to:'
        },
        options: [
            {
                text: {
                    'zh-CN': '设置完整的自动化方案，让它们自己运行',
                    'en': 'Set up complete automation schemes and let them run themselves'
                },
                scores: { S: 0, E: 0, P: 0, R: 0, A: 1, M: 0, I: 0, C: 0 }
            },
            {
                text: {
                    'zh-CN': '保留手动控制权，我要知道每个设备在做什么',
                    'en': 'Keep manual control, I want to know what each device is doing'
                },
                scores: { S: 0, E: 0, P: 1, R: 0, A: 0, M: 1, I: 0, C: 0 }
            }
        ]
    },
    {
        id: 3,
        title: {
            'zh-CN': '🔒 数据隐私考量',
            'en': '🔒 Data Privacy Consideration'
        },
        text: {
            'zh-CN': '关于家居数据的处理，你更注重：',
            'en': 'Regarding home data processing, you focus more on:'
        },
        options: [
            {
                text: {
                    'zh-CN': '数据不出家门，完全本地化处理',
                    'en': 'Data stays at home, completely localized processing'
                },
                scores: { S: 0, E: 0, P: 1, R: 0, A: 0, M: 0, I: 0, C: 0 }
            },
            {
                text: {
                    'zh-CN': '利用云端AI能力，获得更智能的体验',
                    'en': 'Utilize cloud AI capabilities for smarter experience'
                },
                scores: { S: 1, E: 0, P: 0, R: 1, A: 0, M: 0, I: 0, C: 0 }
            }
        ]
    },
    {
        id: 4,
        title: {
            'zh-CN': '⚡ 电费与体验',
            'en': '⚡ Electricity Bills vs Experience'
        },
        text: {
            'zh-CN': '在电费和使用体验之间，你会：',
            'en': 'Between electricity bills and user experience, you would:'
        },
        options: [
            {
                text: {
                    'zh-CN': '优先考虑节能省电，合理控制使用成本',
                    'en': 'Prioritize energy saving and reasonably control usage costs'
                },
                scores: { S: 0, E: 1, P: 0, R: 0, A: 0, M: 0, I: 0, C: 0 }
            },
            {
                text: {
                    'zh-CN': '追求极致体验，电费是次要考虑',
                    'en': 'Pursue ultimate experience, electricity bills are secondary'
                },
                scores: { S: 1, E: 0, P: 0, R: 0, A: 0, M: 0, I: 0, C: 0 }
            }
        ]
    },
    {
        id: 5,
        title: {
            'zh-CN': '👥 家庭成员协调',
            'en': '👥 Family Member Coordination'
        },
        text: {
            'zh-CN': '家里有多个成员时，智能系统应该：',
            'en': 'When there are multiple family members, the smart system should:'
        },
        options: [
            {
                text: {
                    'zh-CN': '学习每个人的偏好，提供个性化服务',
                    'en': 'Learn each person\'s preferences and provide personalized services'
                },
                scores: { S: 0, E: 0, P: 0, R: 0, A: 0, M: 0, I: 1, C: 0 }
            },
            {
                text: {
                    'zh-CN': '找到全家的共同喜好，创造和谐的共享体验',
                    'en': 'Find common preferences for the whole family, create harmonious shared experience'
                },
                scores: { S: 0, E: 0, P: 0, R: 0, A: 0, M: 0, I: 0, C: 1 }
            }
        ]
    },
    {
        id: 6,
        title: {
            'zh-CN': '🎯 设备联动策略',
            'en': '🎯 Device Linkage Strategy'
        },
        text: {
            'zh-CN': '你希望家里的智能设备之间：',
            'en': 'You want smart devices in your home to:'
        },
        options: [
            {
                text: {
                    'zh-CN': '通过云端实现无缝协作，功能更丰富',
                    'en': 'Achieve seamless collaboration through cloud, with richer functions'
                },
                scores: { S: 1, E: 0, P: 0, R: 1, A: 1, M: 0, I: 0, C: 0 }
            },
            {
                text: {
                    'zh-CN': '在本地网络内互联，安全可控',
                    'en': 'Interconnect within local network, safe and controllable'
                },
                scores: { S: 0, E: 1, P: 1, R: 0, A: 0, M: 1, I: 0, C: 0 }
            }
        ]
    },
    {
        id: 7,
        title: {
            'zh-CN': '🌙 夜间模式设定',
            'en': '🌙 Night Mode Settings'
        },
        text: {
            'zh-CN': '关于夜间的智能家居行为，你倾向于：',
            'en': 'Regarding smart home behavior at night, you tend to:'
        },
        options: [
            {
                text: {
                    'zh-CN': '系统自动识别作息，无感调整各种设备',
                    'en': 'System automatically recognizes routine, seamlessly adjusts devices'
                },
                scores: { S: 0, E: 0, P: 0, R: 0, A: 1, M: 0, I: 0, C: 0 }
            },
            {
                text: {
                    'zh-CN': '我手动设置睡眠模式，掌控每个环节',
                    'en': 'I manually set sleep mode, control every aspect'
                },
                scores: { S: 0, E: 0, P: 1, R: 0, A: 0, M: 1, I: 1, C: 0 }
            }
        ]
    },
    {
        id: 8,
        title: {
            'zh-CN': '🔄 系统升级偏好',
            'en': '🔄 System Upgrade Preference'
        },
        text: {
            'zh-CN': '对于系统功能升级，你更喜欢：',
            'en': 'For system function upgrades, you prefer:'
        },
        options: [
            {
                text: {
                    'zh-CN': '自动从云端获取最新功能和改进',
                    'en': 'Automatically get latest features and improvements from cloud'
                },
                scores: { S: 1, E: 0, P: 0, R: 1, A: 1, M: 0, I: 0, C: 0 }
            },
            {
                text: {
                    'zh-CN': '我来决定何时升级，保持系统稳定性',
                    'en': 'I decide when to upgrade, maintain system stability'
                },
                scores: { S: 0, E: 1, P: 1, R: 0, A: 0, M: 1, I: 1, C: 0 }
            }
        ]
    }
];

// 16型人格映射数据
const personalityTypes = {
    'EPAI': {
        name: { 'zh-CN': '玄隐型', 'en': 'Xuanyin Type' },
        description: { 
            'zh-CN': '私域本地＋全自动省电，默默守护个人舒适',
            'en': 'Private local + fully automatic energy saving, silently guarding personal comfort'
        },
        keywords: { 'zh-CN': '离线、省电、极客', 'en': 'Offline, Energy-saving, Geek' },
        faction: 'xuanwu',
        factionName: { 'zh-CN': '玄武', 'en': 'Xuanwu' }
    },
    'EPAC': {
        name: { 'zh-CN': '玄俭型', 'en': 'Xuanjian Type' },
        description: { 
            'zh-CN': '私域＋全自动协同，全家账单最优解',
            'en': 'Private + fully automatic coordination, optimal solution for family bills'
        },
        keywords: { 'zh-CN': '全屋节能、无感执行', 'en': 'Whole house energy saving, seamless execution' },
        faction: 'xuanwu',
        factionName: { 'zh-CN': '玄武', 'en': 'Xuanwu' }
    },
    'EPMI': {
        name: { 'zh-CN': '玄御型', 'en': 'Xuanyu Type' },
        description: { 
            'zh-CN': '私域＋手动微控，个人 DIY 精细调能',
            'en': 'Private + manual micro-control, personal DIY fine-tuning'
        },
        keywords: { 'zh-CN': '高自由度、面板控', 'en': 'High freedom, panel control' },
        faction: 'xuanwu',
        factionName: { 'zh-CN': '玄武', 'en': 'Xuanwu' }
    },
    'EPMC': {
        name: { 'zh-CN': '玄稳型', 'en': 'Xuanwen Type' },
        description: { 
            'zh-CN': '私域＋手动协同，家里老人也能安心用',
            'en': 'Private + manual coordination, safe for elderly family members'
        },
        keywords: { 'zh-CN': '稳定、安全、长辈友好', 'en': 'Stable, secure, elder-friendly' },
        faction: 'xuanwu',
        factionName: { 'zh-CN': '玄武', 'en': 'Xuanwu' }
    },
    'SPAI': {
        name: { 'zh-CN': '苍感型', 'en': 'Canggan Type' },
        description: { 
            'zh-CN': '全自动感知，毫秒级响应只为你',
            'en': 'Fully automatic perception, millisecond response just for you'
        },
        keywords: { 'zh-CN': '极速、极致体验', 'en': 'Ultra-fast, ultimate experience' },
        faction: 'qinglong',
        factionName: { 'zh-CN': '青龙', 'en': 'Qinglong' }
    },
    'SPAC': {
        name: { 'zh-CN': '苍协型', 'en': 'Cangxie Type' },
        description: { 
            'zh-CN': '多人自动剧本，隐私不出网',
            'en': 'Multi-person automatic scenarios, privacy stays offline'
        },
        keywords: { 'zh-CN': '家庭联动、场景剧本', 'en': 'Family linkage, scenario scripts' },
        faction: 'qinglong',
        factionName: { 'zh-CN': '青龙', 'en': 'Qinglong' }
    },
    'SPMI': {
        name: { 'zh-CN': '苍控型', 'en': 'Cangkong Type' },
        description: { 
            'zh-CN': '极速私域＋手动操控，随叫随到',
            'en': 'Ultra-fast private domain + manual control, on-demand'
        },
        keywords: { 'zh-CN': '单身玩家、手动党', 'en': 'Solo player, manual control enthusiast' },
        faction: 'qinglong',
        factionName: { 'zh-CN': '青龙', 'en': 'Qinglong' }
    },
    'SPMC': {
        name: { 'zh-CN': '苍融型', 'en': 'Cangrong Type' },
        description: { 
            'zh-CN': '手动协同＋隐私保障，合租或小家庭',
            'en': 'Manual coordination + privacy protection, for roommates or small families'
        },
        keywords: { 'zh-CN': '合租友好、隐私分区', 'en': 'Roommate-friendly, privacy zoning' },
        faction: 'qinglong',
        factionName: { 'zh-CN': '青龙', 'en': 'Qinglong' }
    },
    'SRAI': {
        name: { 'zh-CN': '白曜型', 'en': 'Baiyao Type' },
        description: { 
            'zh-CN': '云端大模型，量身打造高阶体验',
            'en': 'Cloud large model, tailor-made high-end experience'
        },
        keywords: { 'zh-CN': '高配、AI 语音', 'en': 'High-end, AI voice' },
        faction: 'baihu',
        factionName: { 'zh-CN': '白虎', 'en': 'Baihu' }
    },
    'SRAC': {
        name: { 'zh-CN': '白煌型', 'en': 'Baihuang Type' },
        description: { 
            'zh-CN': '豪华云协同，全屋奢享一键启',
            'en': 'Luxury cloud coordination, whole house luxury at one touch'
        },
        keywords: { 'zh-CN': '顶配、全屋智能', 'en': 'Top-tier, whole house intelligence' },
        faction: 'baihu',
        factionName: { 'zh-CN': '白虎', 'en': 'Baihu' }
    },
    'SRMI': {
        name: { 'zh-CN': '白御型', 'en': 'Baiyu Type' },
        description: { 
            'zh-CN': '云助攻＋手动微调，玩得爽也控得稳',
            'en': 'Cloud assistance + manual fine-tuning, fun and stable control'
        },
        keywords: { 'zh-CN': '云+本地、半自动', 'en': 'Cloud+local, semi-automatic' },
        faction: 'baihu',
        factionName: { 'zh-CN': '白虎', 'en': 'Baihu' }
    },
    'SRMC': {
        name: { 'zh-CN': '白灵型', 'en': 'Bailing Type' },
        description: { 
            'zh-CN': '云协同＋手动主导，全家都能轻松上手',
            'en': 'Cloud coordination + manual control, easy for whole family'
        },
        keywords: { 'zh-CN': '亲和、灵活', 'en': 'Friendly, flexible' },
        faction: 'baihu',
        factionName: { 'zh-CN': '白虎', 'en': 'Baihu' }
    },
    'ERAI': {
        name: { 'zh-CN': '朱清型', 'en': 'Zhuqing Type' },
        description: { 
            'zh-CN': '云端预测个人用能，省电又精准',
            'en': 'Cloud prediction of personal energy use, energy-saving and accurate'
        },
        keywords: { 'zh-CN': 'AI 预测、个人节流', 'en': 'AI prediction, personal energy saving' },
        faction: 'zhuque',
        factionName: { 'zh-CN': '朱雀', 'en': 'Zhuque' }
    },
    'ERAC': {
        name: { 'zh-CN': '朱省型', 'en': 'Zhusheng Type' },
        description: { 
            'zh-CN': '云端协同调峰，全家电费直降',
            'en': 'Cloud coordinated peak shaving, direct reduction in family electricity bills'
        },
        keywords: { 'zh-CN': '全屋节流、峰谷优化', 'en': 'Whole house energy saving, peak-valley optimization' },
        faction: 'zhuque',
        factionName: { 'zh-CN': '朱雀', 'en': 'Zhuque' }
    },
    'ERMI': {
        name: { 'zh-CN': '朱衡型', 'en': 'Zhuheng Type' },
        description: { 
            'zh-CN': '云建议＋手动决策，自己掌控省电节奏',
            'en': 'Cloud suggestions + manual decisions, control your own energy-saving rhythm'
        },
        keywords: { 'zh-CN': '精打细算、透明账单', 'en': 'Calculated, transparent billing' },
        faction: 'zhuque',
        factionName: { 'zh-CN': '朱雀', 'en': 'Zhuque' }
    },
    'ERMC': {
        name: { 'zh-CN': '朱策型', 'en': 'Zhuze Type' },
        description: { 
            'zh-CN': '云协同＋人工把关，成本/舒适两手抓',
            'en': 'Cloud coordination + manual oversight, balancing cost and comfort'
        },
        keywords: { 'zh-CN': '策略调度、多人共识', 'en': 'Strategic scheduling, multi-person consensus' },
        faction: 'zhuque',
        factionName: { 'zh-CN': '朱雀', 'en': 'Zhuque' }
    }
};

// 插件推荐数据
const pluginRecommendations = {
    'xuanwu': [
        { name: '峰谷电价调度', desc: '根据电价自动调整设备运行时间' },
        { name: '本地语音控制', desc: '离线语音识别，隐私保护' },
        { name: '设备能耗监控', desc: '实时监控各设备能耗，优化用电' }
    ],
    'qinglong': [
        { name: '环境氛围光', desc: '根据时间和情绪自动调光' },
        { name: '隐私场景模式', desc: '本地化智能场景，数据不出网' },
        { name: '个人偏好学习', desc: '本地AI学习个人习惯' }
    ],
    'baihu': [
        { name: '云端AI助手', desc: '支持复杂语音交互和智能推荐' },
        { name: '全屋智能联动', desc: '云端协调所有设备的联动' },
        { name: '智能内容推送', desc: '基于云端数据的个性化内容' }
    ],
    'zhuque': [
        { name: '云端能耗分析', desc: '利用大数据优化能耗策略' },
        { name: '智能调峰填谷', desc: '根据电网负荷自动调整用电' },
        { name: '家庭账单优化', desc: '云端分析，找到最省钱的用电方案' }
    ]
};

// 全局变量
let currentQuestion = 0;
let answers = [];
let scores = { S: 0, E: 0, P: 0, R: 0, A: 0, M: 0, I: 0, C: 0 };

// 测试控制函数
function startTest() {
    document.getElementById('mbti-intro').style.display = 'none';
    document.getElementById('mbti-test').style.display = 'block';
    currentQuestion = 0;
    answers = [];
    scores = { S: 0, E: 0, P: 0, R: 0, A: 0, M: 0, I: 0, C: 0 };
    showQuestion();
}

function showQuestion() {
    const question = questions[currentQuestion];
    const lang = document.documentElement.lang || 'zh-CN';
    
    document.getElementById('question-title').textContent = question.title[lang];
    document.getElementById('question-text').textContent = question.text[lang];
    document.getElementById('question-counter').textContent = `${currentQuestion + 1} / ${questions.length}`;
    
    // 更新进度条
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById('progress-bar').style.width = progress + '%';
    
    // 创建选项
    const optionsContainer = document.getElementById('question-options');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'mbti-option';
        optionElement.textContent = option.text[lang];
        optionElement.onclick = () => selectOption(index);
        
        // 如果已经选择过，恢复选择状态
        if (answers[currentQuestion] === index) {
            optionElement.classList.add('selected');
        }
        
        optionsContainer.appendChild(optionElement);
    });
    
    // 更新按钮状态
    document.getElementById('prev-btn').disabled = currentQuestion === 0;
    document.getElementById('next-btn').disabled = answers[currentQuestion] === undefined;
    
    // 最后一题时改变按钮文本
    if (currentQuestion === questions.length - 1) {
        document.getElementById('next-btn').innerHTML = `
            <span lang="zh-CN">查看结果</span>
            <span lang="en">View Result</span>
        `;
    } else {
        document.getElementById('next-btn').innerHTML = `
            <span lang="zh-CN">下一题</span>
            <span lang="en">Next</span>
        `;
    }
}

function selectOption(optionIndex) {
    // 清除之前的选择
    document.querySelectorAll('.mbti-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // 选择当前选项
    document.querySelectorAll('.mbti-option')[optionIndex].classList.add('selected');
    
    // 记录答案
    answers[currentQuestion] = optionIndex;
    
    // 启用下一题按钮
    document.getElementById('next-btn').disabled = false;
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        calculateResult();
    }
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
    }
}

function calculateResult() {
    // 计算得分
    scores = { S: 0, E: 0, P: 0, R: 0, A: 0, M: 0, I: 0, C: 0 };
    
    answers.forEach((answerIndex, questionIndex) => {
        const question = questions[questionIndex];
        const selectedOption = question.options[answerIndex];
        
        Object.keys(selectedOption.scores).forEach(dimension => {
            scores[dimension] += selectedOption.scores[dimension];
        });
    });
    
    // 确定人格类型
    const personalityCode = 
        (scores.S >= scores.E ? 'S' : 'E') +
        (scores.P >= scores.R ? 'P' : 'R') +
        (scores.A >= scores.M ? 'A' : 'M') +
        (scores.I >= scores.C ? 'I' : 'C');
    
    showResult(personalityCode);
}

function showResult(personalityCode) {
    document.getElementById('mbti-test').style.display = 'none';
    document.getElementById('mbti-result').style.display = 'block';
    
    const personality = personalityTypes[personalityCode];
    const lang = document.documentElement.lang || 'zh-CN';
    
    // 动态更新页面标题
    document.title = `${personality.name[lang]} (${personalityCode}) - 循星科技`;
    
    // 显示结果
    document.getElementById('result-title').textContent = `你是「${personality.name[lang]}」`;
    document.getElementById('result-code').textContent = personalityCode;
    document.getElementById('result-description').textContent = personality.description[lang];
    
    // 显示阵营
    const factionElement = document.getElementById('result-faction');
    factionElement.innerHTML = `<div class="mbti-faction ${personality.faction}">
        ${personality.factionName[lang]} - ${personality.keywords[lang]}
    </div>`;
    
    // 显示维度雷达图
    showDimensionRadar();
    
    // 显示插件推荐
    showPluginRecommendations(personality.faction);
}

function showDimensionRadar() {
    const totalQuestions = questions.length;
    
    // 计算各维度百分比
    const dimensions = [
        { id: 'se', score: (scores.S / totalQuestions) * 100, label: scores.S >= scores.E ? '体验导向' : '节能导向' },
        { id: 'pr', score: (scores.P / totalQuestions) * 100, label: scores.P >= scores.R ? '隐私本地' : '云端协同' },
        { id: 'am', score: (scores.A / totalQuestions) * 100, label: scores.A >= scores.M ? '全自动' : '手动控制' },
        { id: 'ic', score: (scores.I / totalQuestions) * 100, label: scores.I >= scores.C ? '个人优先' : '集体协调' }
    ];
    
    dimensions.forEach(dimension => {
        const fillElement = document.getElementById(`dimension-${dimension.id}`);
        const labelElement = document.getElementById(`dimension-${dimension.id}-label`);
        
        // 动画效果
        setTimeout(() => {
            fillElement.style.width = dimension.score + '%';
        }, 300);
        
        labelElement.textContent = dimension.label;
    });
}

function showPluginRecommendations(faction) {
    const pluginsContainer = document.getElementById('plugin-recommendations');
    const plugins = pluginRecommendations[faction];
    
    pluginsContainer.innerHTML = '';
    
    plugins.forEach(plugin => {
        const pluginElement = document.createElement('div');
        pluginElement.className = 'mbti-plugin-card';
        pluginElement.innerHTML = `
            <div class="mbti-plugin-name">${plugin.name}</div>
            <div class="mbti-plugin-desc">${plugin.desc}</div>
        `;
        pluginsContainer.appendChild(pluginElement);
    });
}

function shareResult() {
    // 简单的分享功能
    const personality = personalityTypes[getCurrentPersonalityCode()];
    const lang = document.documentElement.lang || 'zh-CN';
    
    const shareText = `我是「${personality.name[lang]}」- ${personality.description[lang]}。快来测试你的家居 MBTI 吧！`;
    const shareTitle = `我的家居MBTI测试结果：${personality.name[lang]}`;
    
    if (navigator.share) {
        navigator.share({
            title: shareTitle,
            text: shareText,
            url: window.location.href
        });
    } else {
        // 复制到剪贴板
        navigator.clipboard.writeText(shareText).then(() => {
            alert(lang === 'zh-CN' ? '结果已复制到剪贴板！' : 'Result copied to clipboard!');
        });
    }
}

function retakeTest() {
    document.getElementById('mbti-result').style.display = 'none';
    document.getElementById('mbti-intro').style.display = 'block';
    
    // 恢复原始页面标题
    document.title = '家居 MBTI 测试 - 循星科技';
    
    // 重置测试状态
    currentQuestion = 0;
    answers = [];
    scores = { S: 0, E: 0, P: 0, R: 0, A: 0, M: 0, I: 0, C: 0 };
}

function getCurrentPersonalityCode() {
    return (scores.S >= scores.E ? 'S' : 'E') +
           (scores.P >= scores.R ? 'P' : 'R') +
           (scores.A >= scores.M ? 'A' : 'M') +
           (scores.I >= scores.C ? 'I' : 'C');
}

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    // 确保语言切换功能正常工作
    if (typeof initializeLanguage === 'function') {
        initializeLanguage();
    }
}); 