import {
  HeartPulse,
  Building2,
  Stethoscope,
  Home,
  BedDouble,
  Hotel,
  Briefcase,
  ShoppingBag,
  GraduationCap,
  Landmark,
  LucideIcon,
} from 'lucide-react';

export type SolutionSlug =
  | 'elderly-care'
  | 'community-care'
  | 'clinical-assist'
  | 'smart-home'
  | 'smart-room'
  | 'hospitality'
  | 'workspace'
  | 'retail'
  | 'campus'
  | 'cultural';

export type SolutionGroup = 'health' | 'home' | 'commercial' | 'public';

export type Solution = {
  slug: SolutionSlug;
  icon: LucideIcon;
  titleKey: string;
  group: SolutionGroup;
  planned?: boolean;
  buyer?: { zh: string; en: string };
  problems?: Array<{ zh: string; en: string }>;
  kpis?: Array<{ label: { zh: string; en: string }; value: string; note?: { zh: string; en: string } }>;
  architecture?: Array<{ zh: string; en: string }>;
  pilot?: { weeks: string; scale: { zh: string; en: string } };
  sku?: { zh: string; en: string };
  workflow?: Array<{
    stage: { zh: string; en: string };
    condition: { zh: string; en: string };
    action: { zh: string; en: string };
    record: { zh: string; en: string };
  }>;
  safeguards?: Array<{ title: { zh: string; en: string }; body: { zh: string; en: string } }>;
  acceptance?: Array<{ zh: string; en: string }>;
  bundle?: {
    headline: { zh: string; en: string };
    items: Array<{ zh: string; en: string }>;
    rhythm?: { zh: string; en: string };
  };
};

export const solutions: Solution[] = [
  {
    "slug": "elderly-care",
    "icon": HeartPulse,
    "titleKey": "elderlyCare",
    "group": "health",
    "buyer": {
      "zh": "居家照护家庭、长者公寓与护理机构",
      "en": "Families arranging care, senior apartments and care facilities"
    },
    "problems": [
      {
        "zh": "独处时的状态变化不容易被及时发现",
        "en": "Changes while someone is alone can go unnoticed"
      },
      {
        "zh": "频繁查看摄像头打扰日常生活",
        "en": "Frequent camera checks can intrude on daily life"
      },
      {
        "zh": "提醒后由谁确认、怎样记录，缺少约定",
        "en": "Who checks an alert and how the outcome is recorded are often unclear"
      }
    ],
    "kpis": [],
    "architecture": [
      {
        "zh": "卫生间及相邻干区评估毫米波存在、静止与疑似跌倒状态",
        "en": "Evaluate mmWave presence, stillness and suspected falls in bathroom-adjacent areas"
      },
      {
        "zh": "提醒、人工确认和处理记录按照护流程配置并现场验证",
        "en": "Configure notifications, human confirmation and response records, then validate on site"
      },
      {
        "zh": "血压与血氧等测量采用原厂产品，接入按型号确认",
        "en": "Use original-manufacturer measurement devices, verifying data access by model"
      }
    ],
    "pilot": {
      "weeks": "project",
      "scale": {
        "zh": "现场条件与首期范围确认后制定",
        "en": "Defined after site conditions and initial scope are agreed"
      }
    },
    "sku": {
      "zh": "AIOS Care 项目配置",
      "en": "AIOS Care project configuration"
    },
    "bundle": {
      "headline": {
        "zh": "卫生间状态提醒与床旁日常支持",
        "en": "Bathroom state reminders and bedside support"
      },
      "items": [
        {
          "zh": "助手软件与照护事项记录",
          "en": "Assistant software and care task records"
        },
        {
          "zh": "家庭主机及毫米波节点设计方向",
          "en": "Household host and mmWave node design"
        },
        {
          "zh": "原厂床旁操作与测量设备选配",
          "en": "Optional OEM bedside controls and measurement devices"
        },
        {
          "zh": "安装勘察、设备适配与现场验证",
          "en": "Site survey, device integration and validation"
        }
      ],
      "rhythm": {
        "zh": "目前可查看助手软件操作；感知、通知和设备联动按样机与现场测试确认，不替代人工照护。",
        "en": "The assistant software is shown in use. Sensing, notifications and device actions require prototype and site testing; care remains a human responsibility."
      }
    }
  },
  {
    "slug": "community-care",
    "icon": Building2,
    "titleKey": "communityCare",
    "group": "health",
    "buyer": {
      "zh": "社区照护服务方与长者公寓运营者",
      "en": "Community care services and senior-apartment operators"
    },
    "problems": [
      {
        "zh": "多住户的照护事项分散在不同渠道",
        "en": "Care tasks across households are scattered"
      },
      {
        "zh": "家属和服务人员需要不同的信息范围",
        "en": "Families and service staff need different information"
      },
      {
        "zh": "设备条件与响应流程因住户而异",
        "en": "Device conditions and response routines vary by household"
      }
    ],
    "kpis": [],
    "architecture": [
      {
        "zh": "先确认首期房间、网络和人员责任",
        "en": "Agree initial rooms, network and staff responsibilities"
      },
      {
        "zh": "账号、授权与通知渠道按项目验证",
        "en": "Validate accounts, permissions and notification channels per project"
      },
      {
        "zh": "先在小范围确认记录与响应流程，再评估扩展",
        "en": "Validate records and response in a limited scope before expansion"
      }
    ],
    "pilot": {
      "weeks": "project",
      "scale": {
        "zh": "现场条件与首期范围确认后制定",
        "en": "Defined after site conditions and initial scope are agreed"
      }
    },
    "sku": {
      "zh": "AIOS Care 项目配置",
      "en": "AIOS Care project configuration"
    },
    "bundle": {
      "headline": {
        "zh": "从清楚的照护事项与响应流程开始",
        "en": "Start with clear care tasks and response routines"
      },
      "items": [
        {
          "zh": "项目范围评估与现场勘察",
          "en": "Scope assessment and site survey"
        },
        {
          "zh": "助手、事项记录与主机配置",
          "en": "Assistant, task records and host configuration"
        },
        {
          "zh": "按户选择的感知与交互设备",
          "en": "Sensing and interaction devices selected per household"
        },
        {
          "zh": "账号权限、通知与业务接口适配",
          "en": "Permissions, notifications and workflow integration"
        }
      ],
      "rhythm": {
        "zh": "这是多住户项目配置方案；部署规格、访问范围与服务流程需逐项验证。",
        "en": "This is a multi-household configuration proposal; deployment, access and service routines require verification."
      }
    }
  },
  {
    "slug": "clinical-assist",
    "icon": Stethoscope,
    "titleKey": "clinicalAssist",
    "group": "health",
    "buyer": {
      "zh": "康复与日常照护项目的业务及信息化负责人",
      "en": "Operations and IT leads for rehabilitation and everyday care projects"
    },
    "problems": [
      {
        "zh": "复查、测量与日常事项容易遗漏",
        "en": "Follow-ups, measurements and daily tasks can be missed"
      },
      {
        "zh": "原厂设备的数据接口各不相同",
        "en": "Data interfaces differ between OEM devices"
      },
      {
        "zh": "业务系统接入需要明确边界与授权",
        "en": "System integration requires defined scope and authorization"
      }
    ],
    "kpis": [],
    "architecture": [
      {
        "zh": "先确定辅助事项与数据范围",
        "en": "Define support tasks and data scope first"
      },
      {
        "zh": "采购或合作提供合适的原厂测量设备",
        "en": "Use suitable purchased or partner-supplied measurement devices"
      },
      {
        "zh": "业务接口与信息访问单独评估、测试和验收",
        "en": "Assess, test and accept business interfaces and information access separately"
      }
    ],
    "pilot": {
      "weeks": "project",
      "scale": {
        "zh": "现场条件与首期范围确认后制定",
        "en": "Defined after site conditions and initial scope are agreed"
      }
    },
    "sku": {
      "zh": "AIOS Care 项目配置",
      "en": "AIOS Care project configuration"
    },
    "bundle": {
      "headline": {
        "zh": "日常事项与测量记录的辅助接入",
        "en": "Support for daily tasks and measurement records"
      },
      "items": [
        {
          "zh": "业务流程与接口评估",
          "en": "Workflow and interface assessment"
        },
        {
          "zh": "助手事项管理与项目部署配置",
          "en": "Assistant task management and project deployment"
        },
        {
          "zh": "原厂测量设备选配",
          "en": "Optional OEM measurement devices"
        },
        {
          "zh": "授权、联调与验收工作",
          "en": "Authorization, integration testing and acceptance"
        }
      ],
      "rhythm": {
        "zh": "按具体设备与项目流程提供辅助信息；不把概念场景当作临床效果或已完成的医院系统接入。",
        "en": "Support information follows specific devices and project workflows; concept scenes do not establish clinical outcomes or completed hospital integration."
      }
    }
  },
  {
    "slug": "smart-home",
    "icon": Home,
    "titleKey": "smartHome",
    "group": "home",
    "buyer": {
      "zh": "需要管理日常事务、物品与房间设备的家庭",
      "en": "Households managing daily tasks, belongings and room devices"
    },
    "problems": [
      {
        "zh": "临出门想不起物品放在哪里",
        "en": "Finding a needed item just before leaving"
      },
      {
        "zh": "出行准备和预约事项反复遗漏",
        "en": "Missing preparation steps or appointments"
      },
      {
        "zh": "固定时间规则打断正在发生的生活",
        "en": "Fixed schedules interrupt what people are doing"
      }
    ],
    "kpis": [],
    "architecture": [
      {
        "zh": "先用助手记录、检索与跟进明确交代的事项",
        "en": "Use the assistant to save, retrieve and follow explicitly shared tasks"
      },
      {
        "zh": "按厨房、卫生间、门口等位置选择合适设备",
        "en": "Select suitable devices for the kitchen, bathroom, entrance and other locations"
      },
      {
        "zh": "现有家电按品牌、型号和接口确认适配范围",
        "en": "Verify existing appliance integration by brand, model and interface"
      }
    ],
    "pilot": {
      "weeks": "project",
      "scale": {
        "zh": "现场条件与首期范围确认后制定",
        "en": "Defined after site conditions and initial scope are agreed"
      }
    },
    "sku": {
      "zh": "Home Box 家庭配置",
      "en": "Home Box household configuration"
    },
    "bundle": {
      "headline": {
        "zh": "助手软件、家庭主机与按需选择的房间终端",
        "en": "Assistant software, household host and selected room devices"
      },
      "items": [
        {
          "zh": "记住与找回、准备与跟进、建议与调整",
          "en": "Remember and retrieve, prepare and follow through, adjust suggestions"
        },
        {
          "zh": "家庭计算主机与显示入口配置",
          "en": "Household compute and display configuration"
        },
        {
          "zh": "水浸、声学与毫米波节点设计方向",
          "en": "Water-contact, acoustic and mmWave node designs"
        },
        {
          "zh": "原厂门口、窗帘与床旁设备选配及适配服务",
          "en": "Optional OEM entrance, curtain and bedside devices with integration services"
        }
      ],
      "rhythm": {
        "zh": "已有软件操作录像展示三项日常闭环。设备图为设计效果图，安装、联动和交付范围在勘察与测试后确认。",
        "en": "The software recording shows three everyday workflows. Device images are design visualizations; installation, actions and delivery scope follow survey and testing."
      }
    }
  },
  {
    "slug": "smart-room",
    "icon": BedDouble,
    "titleKey": "smartRoom",
    "group": "home",
    "buyer": {
      "zh": "先改造一个房间的家庭、长者公寓与空间运营者",
      "en": "Households, senior apartments and operators starting with one room"
    },
    "problems": [
      {
        "zh": "希望先解决一个房间的问题，不必一次改全屋",
        "en": "Solving one room first without a whole-home retrofit"
      },
      {
        "zh": "电视关闭后仍需方便的操作入口",
        "en": "Keeping convenient access when the TV is off"
      },
      {
        "zh": "窗帘、照明与人员习惯需要协调",
        "en": "Coordinating curtains, lighting and personal routines"
      }
    ],
    "kpis": [],
    "architecture": [
      {
        "zh": "优先评估现有电视经 HDMI 展示事项界面",
        "en": "Evaluate an HDMI task interface on the existing TV"
      },
      {
        "zh": "遥控、物理按键与其他入口按使用能力选择",
        "en": "Select remote, physical and other controls around usability"
      },
      {
        "zh": "逐项确认窗帘轨道、负载、供电与原有控制",
        "en": "Check curtain tracks, loads, power and existing controls individually"
      }
    ],
    "pilot": {
      "weeks": "project",
      "scale": {
        "zh": "现场条件与首期范围确认后制定",
        "en": "Defined after site conditions and initial scope are agreed"
      }
    },
    "sku": {
      "zh": "Home Box 家庭配置",
      "en": "Home Box household configuration"
    },
    "bundle": {
      "headline": {
        "zh": "从一个房间开始配置家庭事务入口",
        "en": "Start with a household workspace in one room"
      },
      "items": [
        {
          "zh": "助手软件与房间事项配置",
          "en": "Assistant software and room task setup"
        },
        {
          "zh": "主机、HDMI 显示与操作方式评估",
          "en": "Host, HDMI display and control assessment"
        },
        {
          "zh": "窗帘、门口及床旁原厂设备选配",
          "en": "Optional OEM curtains, entrance and bedside devices"
        },
        {
          "zh": "安装、适配、使用培训与测试",
          "en": "Installation, integration, training and testing"
        }
      ],
      "rhythm": {
        "zh": "电视可以是显示入口，不要求为每个房间新增大屏；待机、唤醒和关屏后的使用方式需实测确认。",
        "en": "The TV can be a display without adding a dedicated large screen to every room. Standby, wake-up and access with the screen off require testing."
      }
    }
  },
  {
    slug: 'hospitality',
    icon: Hotel,
    titleKey: 'hospitality',
    group: 'commercial',
    planned: true,
  },
  {
    slug: 'workspace',
    icon: Briefcase,
    titleKey: 'workspace',
    group: 'commercial',
    planned: true,
  },
  {
    slug: 'retail',
    icon: ShoppingBag,
    titleKey: 'retail',
    group: 'commercial',
    planned: true,
  },
  {
    slug: 'campus',
    icon: GraduationCap,
    titleKey: 'campus',
    group: 'public',
    planned: true,
  },
  {
    slug: 'cultural',
    icon: Landmark,
    titleKey: 'cultural',
    group: 'public',
    planned: true,
  },
];

export function getSolution(slug: SolutionSlug) {
  return solutions.find((s) => s.slug === slug);
}

export const solutionsByGroup: Record<SolutionGroup, Solution[]> = {
  health: solutions.filter((s) => s.group === 'health'),
  home: solutions.filter((s) => s.group === 'home'),
  commercial: solutions.filter((s) => s.group === 'commercial'),
  public: solutions.filter((s) => s.group === 'public'),
};
