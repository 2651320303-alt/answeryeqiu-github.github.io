export type PersonaId =
  | "mintLightning"
  | "nightGummy"
  | "skipFrame"
  | "roseAlert"
  | "pearlFilter"
  | "cloudSave"
  | "caramelBubble";

export interface Persona {
  id: PersonaId;
  slug: string;
  name: string;
  image: string;
  color: string;
  accent: string;
  themeColors: string[];
  keywords: string[];
  audience: string;
  description: string;
  advice: string;
  risk: string;
  cardBack: {
    audience: string;
    insight: string;
    action: string;
    warning: string;
  };
  toothpaste: string;
  brushing: string;
  afterMeal: string;
  summary: string;
  shareSubtitle: string;
  shareCardText: string;
}

export interface QuizOption {
  label: string;
  scores: Partial<Record<PersonaId, number>>;
}

export interface QuizQuestion {
  id: string;
  title: string;
  options: QuizOption[];
}

const balancedScores: Record<PersonaId, number> = {
  mintLightning: 1,
  nightGummy: 1,
  skipFrame: 1,
  roseAlert: 1,
  pearlFilter: 1,
  cloudSave: 1,
  caramelBubble: 1
};

export const lineupImages = [
  "assets/personas/tooth-team.png",
  "assets/personas/lineup-7-clean.png",
  "assets/personas/lineup-clean.png",
  "assets/personas/lineup-wide.png"
];

export const personas: Persona[] = [
  {
    id: "mintLightning",
    slug: "mint-lightning",
    name: "薄荷闪电型",
    image: "assets/personas/mint-lightning.png",
    color: "#18d6b2",
    accent: "#ffe15a",
    themeColors: ["#18d6b2", "#1aa8ff", "#ffe15a"],
    keywords: ["快", "急", "清爽", "赶时间"],
    audience: "早八学生、早上想多睡一会儿、刷牙很快结束的人。",
    description:
      "你像一道薄荷味闪电，早上速度很快，但也容易把刷牙变成“随便过一遍”。",
    advice: "用 2 分钟分区计时，把刷牙从“赶时间”变成“高效率”。",
    risk: "长期快速刷牙容易漏刷牙龈边缘和后牙区域。",
    cardBack: {
      audience: "早八赶时间，刷牙常常很快结束。",
      insight: "清爽启动很快，但容易漏刷重点区域。",
      action: "开 2 分钟计时，分区刷到牙龈边缘。",
      warning: "越快越要防止后牙和牙龈边缘被跳过。"
    },
    toothpaste: "优先看含氟防龋，再根据口气清新需求选择薄荷体验。",
    brushing: "使用 2 分钟计时，按区域刷到牙龈边缘。",
    afterMeal: "赶时间也先漱口，晚上再做完整清洁。",
    summary: "你的清爽值很高，但牙齿不喜欢被闪电式略过。",
    shareSubtitle: "清爽启动很快，刷牙时长需要被认真守住。",
    shareCardText:
      "你很擅长快速进入状态，也容易把刷牙压缩成一个清爽动作。今天先把计时器打开，让速度和清洁质量一起在线。"
  },
  {
    id: "nightGummy",
    slug: "night-gummy",
    name: "深夜软糖型",
    image: "assets/personas/night-gummy.png",
    color: "#3020a8",
    accent: "#ff5bbb",
    themeColors: ["#3020a8", "#6d35ff", "#ff5bbb"],
    keywords: ["夜晚", "疲惫", "甜食", "懒得动"],
    audience: "上班族、熬夜党、夜宵党、睡前吃东西但不想刷牙的人。",
    description:
      "你白天很努力，晚上只想放松，但夜宵和甜食最容易在睡前偷袭牙齿。",
    advice: "睡前最后一次清洁不能省，尤其是夜宵、甜饮之后。",
    risk: "夜间唾液分泌减少，睡前不清洁容易让糖分和残渣停留更久。",
    cardBack: {
      audience: "熬夜党、夜宵党，睡前容易偷懒。",
      insight: "夜晚放松很重要，但糖分也更容易停留。",
      action: "睡前完整刷一次，夜宵后先漱口。",
      warning: "不要让甜食和残渣陪牙齿过夜。"
    },
    toothpaste: "选择含氟防龋牙膏，把睡前清洁设成不可跳过任务。",
    brushing: "睡前刷满 2 分钟，先把困意放一边。",
    afterMeal: "夜宵后至少漱口，睡前仍要完整刷牙。",
    summary: "你不是不护牙，只是夜晚太会哄你偷懒。",
    shareSubtitle: "深夜快乐值很高，睡前清洁值需要补上。",
    shareCardText:
      "你可能很会照顾白天的任务，却常常在夜晚对牙齿按下省电模式。今晚的底线是：吃完后别直接睡，睡前完整刷一次。"
  },
  {
    id: "skipFrame",
    slug: "skip-frame",
    name: "跳帧省略型",
    image: "assets/personas/skip-frame.png",
    color: "#9fc9ff",
    accent: "#ffe36d",
    themeColors: ["#9fc9ff", "#f2f7ff", "#ffe36d"],
    keywords: ["省略", "略过", "低关注", "刷牙时间短"],
    audience:
      "刷牙经常不到 1 分钟、觉得“刷了就行”、出问题才想到护牙、容易漏刷的人。",
    description:
      "你不是完全不刷牙，只是总把护牙放在生活待办的后面，常常处于“能省就省、能快就快、差不多就行”的状态。",
    advice:
      "先不要追求完美，建立最基础的护牙底线：刷满 2 分钟 + 睡前认真刷一次 + 选择含氟牙膏。",
    risk:
      "如果长期把刷牙做成“快速略过”的动作，容易出现牙菌斑清洁不足、龋齿风险增加，以及护牙习惯长期失衡的问题。",
    cardBack: {
      audience: "觉得“刷了就行”，容易漏刷的人。",
      insight: "不是不刷牙，而是常把护牙放到最后。",
      action: "先守住底线：2 分钟 + 睡前认真刷。",
      warning: "长期跳帧，牙菌斑清洁会不足。"
    },
    toothpaste: "选择含氟防龋牙膏，把基础防线先搭起来。",
    brushing: "从每次刷满 2 分钟开始，不追求复杂，但不要再跳帧。",
    afterMeal: "饭后先漱口，睡前别省略完整清洁。",
    summary: "刷牙不是没做，只是经常被你“快速跳过”。",
    shareSubtitle: "护牙进度条还在加载，先别按跳过。",
    shareCardText:
      "你平时对刷牙这件事不算完全忽视，但也很少真正花时间认真完成。对刷牙时长、牙龈边缘、牙缝清洁这些细节，你往往容易省略。"
  },
  {
    id: "roseAlert",
    slug: "rose-alert",
    name: "玫瑰警报型",
    image: "assets/personas/rose-alert.png",
    color: "#ff3d64",
    accent: "#fff0f3",
    themeColors: ["#ff3d64", "#ff9eb2", "#ffffff"],
    keywords: ["牙龈", "出血", "警示", "护理"],
    audience: "刷牙出血、牙龈敏感、以为换护龈牙膏就能解决的人。",
    description: "牙龈出血不是小提示，而是身体给你的红色警报。",
    advice:
      "护龈牙膏只能辅助，更要关注牙菌斑、牙线、牙结石和刷牙力度。",
    risk:
      "长期牙龈出血不能只靠换牙膏，应关注牙菌斑、牙结石和刷牙方式。",
    cardBack: {
      audience: "刷牙出血、牙龈敏感的人。",
      insight: "牙龈在报警，不只是换牙膏的问题。",
      action: "放轻力度，清洁牙缝，关注牙结石。",
      warning: "持续出血或不适，建议专业检查。"
    },
    toothpaste: "护龈功能可作为辅助，不要把它当成治疗方案。",
    brushing: "使用软毛牙刷，控制力度，关注牙龈边缘清洁。",
    afterMeal: "牙缝清洁要跟上，持续出血或不适应考虑专业检查。",
    summary: "你的牙龈在举牌，不是在随便撒娇。",
    shareSubtitle: "警觉值拉满，护龈行动要从今天开始。",
    shareCardText:
      "你对牙龈状态比较敏感，或者已经遇到过刷牙出血。今天的重点不是迷信某支牙膏，而是调整力度、清洁牙缝，并观察是否需要专业检查。"
  },
  {
    id: "pearlFilter",
    slug: "pearl-filter",
    name: "珍珠滤镜型",
    image: "assets/personas/pearl-filter.png",
    color: "#a779ff",
    accent: "#fff4ff",
    themeColors: ["#a779ff", "#d8c8ff", "#fff4ff"],
    keywords: ["美白", "外观", "精致", "包装吸引"],
    audience: "关注牙齿白不白、笑容好不好看，容易被美白牙膏吸引的人。",
    description:
      "你很在意笑容的光泽感，但牙齿健康不只取决于白不白。",
    advice: "美白牙膏主要针对表面色渍，基础防龋和正确刷牙不能忽略。",
    risk: "美白不是护牙的全部，牙齿健康不等于牙齿越白越好。",
    cardBack: {
      audience: "关注牙齿白不白，容易被包装吸引。",
      insight: "笑容光泽很加分，但健康不是滤镜。",
      action: "先看含氟防龋，再考虑美白需求。",
      warning: "不要为了变白而大力横刷。"
    },
    toothpaste: "先看含氟防龋，再判断美白是不是你的额外需求。",
    brushing: "温和刷牙，不要为了更白而用力横刷。",
    afterMeal: "咖啡、茶、甜饮后及时漱口，减少色渍停留。",
    summary: "你有上镜笑容野心，也需要基础健康打底。",
    shareSubtitle: "闪耀感很强，基础防龋不能被滤镜盖住。",
    shareCardText:
      "你可能容易被亮白、去黄、包装质感吸引。好看的笑容值得追求，但今天先把含氟防龋和温和清洁放在滤镜前面。"
  },
  {
    id: "cloudSave",
    slug: "cloud-save",
    name: "云朵省电型",
    image: "assets/personas/cloud-save.png",
    color: "#73c8ff",
    accent: "#9ff2db",
    themeColors: ["#73c8ff", "#9ff2db", "#ffffff"],
    keywords: ["懒", "轻松", "低成本", "怕麻烦"],
    audience: "知道要护牙，但不想研究太复杂步骤的人。",
    description:
      "你不是不想护牙，只是不想让护牙变成一件很麻烦的事。",
    advice:
      "选择最小可执行方案：含氟牙膏 + 软毛牙刷或电动牙刷 + 睡前完整清洁。",
    risk: "越想省事，越要抓住最基础的护牙动作，不要用漱口水替代刷牙。",
    cardBack: {
      audience: "想护牙，但不想研究复杂步骤。",
      insight: "你需要省心方案，而不是一堆闲置工具。",
      action: "含氟牙膏 + 顺手牙刷 + 睡前清洁。",
      warning: "漱口水不能代替认真刷牙。"
    },
    toothpaste: "不要被复杂术语绕晕，先确认含氟防龋和日常可坚持。",
    brushing: "选择你愿意每天用的工具，比买一堆闲置工具更有效。",
    afterMeal: "吃完先漱口，睡前做完整清洁。",
    summary: "你的护牙路线不是卷，是把最低配做稳定。",
    shareSubtitle: "能量要留给喜欢的事，牙齿清洁也要刚刚好。",
    shareCardText:
      "你并不是对护牙无感，而是需要一个足够省心、足够稳定的方案。别把流程变复杂，先把基础组合坚持住。"
  },
  {
    id: "caramelBubble",
    slug: "caramel-bubble",
    name: "焦糖泡泡型",
    image: "assets/personas/caramel-bubble.png",
    color: "#ff9d15",
    accent: "#fff1c9",
    themeColors: ["#ff9d15", "#ffd16b", "#fff1c9"],
    keywords: ["奶茶", "咖啡", "糖分", "色渍"],
    audience: "奶茶、咖啡、果茶、甜饮爱好者。",
    description:
      "你的人生需要一点甜，但牙齿可能正在承受糖分和色渍的双重压力。",
    advice: "优先关注含氟防龋，不要只被“美白、清新”吸引。",
    risk: "甜饮和咖啡习惯会增加糖分停留和外源性色渍问题。",
    cardBack: {
      audience: "奶茶、咖啡、甜饮爱好者。",
      insight: "快乐可以有糖，牙齿需要防龋护盾。",
      action: "甜饮后先喝水或漱口，睡前刷完整。",
      warning: "糖分停留越久，龋齿风险越高。"
    },
    toothpaste: "含氟防龋牙膏是第一优先级，美白需求排在后面看。",
    brushing: "每天两次完整刷牙，甜饮后减少糖分停留。",
    afterMeal: "喝完甜饮先漱口，不要让糖分一直挂在口腔里。",
    summary: "你的人生有焦糖泡泡，牙齿需要防龋护盾。",
    shareSubtitle: "甜饮快乐值很高，防龋警觉值需要提高。",
    shareCardText:
      "你可能经常喝奶茶、咖啡或果茶，也容易被“美白、清新口气”这类包装词吸引。但对你来说，第一优先级是确认牙膏是否含氟，并减少糖分在口腔里的停留时间。"
  }
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: "morning",
    title: "早上赶时间时，你通常怎么刷牙？",
    options: [
      { label: "快速刷一下，能清爽就行", scores: { mintLightning: 2 } },
      { label: "能省步骤就省步骤", scores: { cloudSave: 2 } },
      { label: "经常不到 1 分钟就结束", scores: { skipFrame: 3 } },
      { label: "会认真刷够时间", scores: balancedScores }
    ]
  },
  {
    id: "paste",
    title: "你买牙膏时最容易被什么吸引？",
    options: [
      { label: "美白、亮白、去黄", scores: { pearlFilter: 2 } },
      { label: "清新口气、薄荷味", scores: { mintLightning: 1 } },
      { label: "抗敏、护龈", scores: { roseAlert: 2 } },
      { label: "价格、方便、随手买", scores: { cloudSave: 2 } },
      { label: "含氟、防蛀、防龋", scores: { caramelBubble: 1 } }
    ]
  },
  {
    id: "drink",
    title: "你最常喝什么？",
    options: [
      { label: "奶茶 / 果茶 / 甜饮", scores: { caramelBubble: 2 } },
      { label: "咖啡", scores: { caramelBubble: 2, pearlFilter: 1 } },
      { label: "碳酸饮料 / 酸性饮料", scores: { caramelBubble: 1 } },
      { label: "白水", scores: { cloudSave: 1 } }
    ]
  },
  {
    id: "night",
    title: "你晚上吃完东西后会？",
    options: [
      { label: "太累了，直接睡", scores: { nightGummy: 3 } },
      { label: "漱口一下就算了", scores: { cloudSave: 1 } },
      { label: "认真刷牙", scores: balancedScores },
      { label: "看心情", scores: { nightGummy: 1 } }
    ]
  },
  {
    id: "tool",
    title: "你对刷牙工具的态度是？",
    options: [
      { label: "普通牙刷最方便", scores: { cloudSave: 1 } },
      { label: "电动牙刷更省力，但怕充电麻烦", scores: { cloudSave: 2 } },
      { label: "想要计时提醒", scores: { mintLightning: 2 } },
      { label: "牙龈敏感，怕刷太重", scores: { roseAlert: 2 } }
    ]
  },
  {
    id: "gum",
    title: "你有没有刷牙出血或牙龈不适？",
    options: [
      { label: "经常有", scores: { roseAlert: 3 } },
      { label: "偶尔有", scores: { roseAlert: 2 } },
      { label: "没太注意", scores: { skipFrame: 2 } },
      { label: "基本没有", scores: balancedScores }
    ]
  },
  {
    id: "color",
    title: "你对牙齿颜色的在意程度？",
    options: [
      { label: "非常在意，笑容要上镜", scores: { pearlFilter: 3 } },
      { label: "有点在意", scores: { pearlFilter: 1 } },
      { label: "不太在意，健康就行", scores: { cloudSave: 1 } },
      { label: "喝了奶茶咖啡后会担心", scores: { caramelBubble: 2 } }
    ]
  },
  {
    id: "attention",
    title: "你多久会认真关注一次自己的牙齿状态？",
    options: [
      { label: "每天都会留意", scores: { pearlFilter: 1, roseAlert: 1 } },
      { label: "有不舒服才会注意", scores: { skipFrame: 3 } },
      { label: "喝了奶茶咖啡后会担心", scores: { caramelBubble: 2 } },
      { label: "看情况，不太固定", scores: { cloudSave: 1 } }
    ]
  },
  {
    id: "tired",
    title: "如果今天很累，你最可能怎么处理刷牙？",
    options: [
      { label: "还是会认真刷完", scores: balancedScores },
      { label: "快速刷一下就结束", scores: { mintLightning: 1 } },
      { label: "能不刷就不刷，或者随便应付", scores: { skipFrame: 3 } },
      { label: "漱口一下代替", scores: { cloudSave: 1, nightGummy: 1 } }
    ]
  },
  {
    id: "goal",
    title: "你希望这个网页最帮你解决什么？",
    options: [
      { label: "推荐适合我的牙膏", scores: { caramelBubble: 1, pearlFilter: 1 } },
      { label: "教我怎么正确刷牙", scores: { mintLightning: 1, roseAlert: 1 } },
      { label: "给我最省事的护牙方案", scores: { cloudSave: 2 } },
      { label: "告诉我夜宵后怎么办", scores: { nightGummy: 2 } },
      { label: "帮我先养成不要跳过刷牙的习惯", scores: { skipFrame: 2 } }
    ]
  }
];

export const glossaryCards = [
  ["含氟", "基础防龋关键词，普通成人选牙膏时应优先关注。"],
  ["美白", "多针对表面色渍，不等于牙齿更健康。"],
  ["护龈", "辅助护理，不等于治疗牙龈疾病。"],
  ["抗敏", "适合冷热酸甜刺激导致的牙敏感，持续疼痛应就医。"],
  ["清新口气", "改善气味体验，但不一定解决口臭根源。"],
  ["抗牙石", "偏向预防牙石形成，已经形成的牙结石通常需要专业洁治。"],
  ["草本", "多为体验或概念表达，仍需看真实功效。"]
] as const;

export const purchaseFeedback: Record<
  string,
  { tag: string; text: string; next: string }
> = {
  美白: {
    tag: "体验/外观词",
    text: "你正在被“珍珠滤镜”吸引。美白牙膏主要针对表面色渍，但基础防龋不能忽略。",
    next: "建议先确认是否含氟，再看美白需求。"
  },
  抗敏: {
    tag: "功能需求词",
    text: "抗敏适合冷热酸甜刺激导致的牙敏感体验，但持续疼痛不应只靠牙膏硬扛。",
    next: "观察触发场景，持续不适应考虑专业检查。"
  },
  护龈: {
    tag: "辅助护理词",
    text: "护龈牙膏可以作为辅助，但牙龈出血常常还和牙菌斑、牙结石、刷牙力度有关。",
    next: "先调整刷牙力度和牙缝清洁，再看是否需要专业洁治。"
  },
  价格: {
    tag: "决策效率词",
    text: "省钱没有错，但不要把关键功能一起省掉。",
    next: "在预算内优先找含氟防龋和适合自己的口感。"
  },
  香味: {
    tag: "体验词",
    text: "香味会让刷牙更愉快，但清爽感不等于清洁完成。",
    next: "喜欢的香味可以保留，同时刷满 2 分钟。"
  },
  品牌: {
    tag: "信任线索",
    text: "品牌可以降低选择成本，但真正要看功能和使用习惯是否匹配。",
    next: "读包装时先找含氟、防龋、适用人群和使用提醒。"
  },
  网红推荐: {
    tag: "营销影响词",
    text: "种草可以参考，但不能替代判断。先看是否含氟，再看自己是否真的需要抗敏、护龈或美白。",
    next: "把推荐词翻译成真实需求，再决定要不要买。"
  },
  含氟防龋: {
    tag: "基础重点",
    text: "你抓住了基础重点。含氟是普通成人日常防龋的重要判断点。",
    next: "在此基础上，再看口感、美白、护龈等个性需求。"
  }
};

export const auxiliaryTools = [
  {
    name: "漱口水",
    visual: "mouthwash",
    image: "assets/ui-icons/mouthwash.png",
    effect: "清新口气、辅助抑菌",
    conclusion: "不能替代刷牙",
    detail: "它像队友的加成技能，但不能负责清掉牙面菌斑。"
  },
  {
    name: "冲牙器",
    visual: "flosser",
    image: "assets/ui-icons/water-flosser.png",
    effect: "冲掉食物残渣，辅助清理牙缝",
    conclusion: "不能替代刷牙",
    detail: "冲得很爽，但牙面仍需要牙刷和牙膏的机械清洁。"
  },
  {
    name: "牙线 / 牙缝刷",
    visual: "floss",
    image: "assets/ui-icons/floss.png",
    effect: "清洁牙缝菌斑",
    conclusion: "不能替代刷牙，但很重要",
    detail: "牙缝是隐藏地图，牙刷刷不到的地方需要它们补位。"
  },
  {
    name: "洗牙",
    visual: "cleaning",
    image: "assets/ui-icons/cleaning.png",
    effect: "去除牙结石，专业护理",
    conclusion: "不能替代日常刷牙",
    detail: "专业清理不是免刷券，日常清洁仍然要在线。"
  },
  {
    name: "牙刷 + 含氟牙膏",
    visual: "brush",
    image: "assets/ui-icons/brush-fluoride.png",
    effect: "机械清洁牙面 + 防龋",
    conclusion: "日常基础",
    detail: "主角登场：每天稳定执行，才是护牙系统的地基。"
  }
];

export const mealAdviceCards = [
  {
    name: "奶茶 / 果茶 / 甜饮",
    visual: "sweet-drink",
    image: "assets/ui-icons/sweet-drink.png",
    tag: "糖分停留警报",
    advice: "先喝水或漱口，减少糖分停留，睡前完整刷牙。",
    steps: ["吃完", "先漱口/喝水", "减少糖分停留", "睡前完整清洁"]
  },
  {
    name: "咖啡",
    visual: "coffee",
    image: "assets/ui-icons/coffee.png",
    tag: "色渍观察点",
    advice: "注意外源性色渍，不要只依赖美白牙膏，基础防龋仍然重要。",
    steps: ["喝完", "喝水清口", "观察色渍需求", "保持含氟防龋"]
  },
  {
    name: "酸性饮料 / 柠檬水 / 果汁 / 碳酸饮料",
    visual: "acid",
    image: "assets/ui-icons/acid-drink.png",
    tag: "先缓一缓",
    advice: "先喝水或漱口，等待一段时间后再刷牙，避免刚喝完就用力刷。",
    steps: ["喝完", "先漱口/喝水", "等待一段时间", "温和刷牙"]
  },
  {
    name: "薯片 / 饼干 / 黏性零食",
    visual: "snack",
    image: "assets/ui-icons/snack.png",
    tag: "牙缝残留区",
    advice: "注意牙缝残留，可配合牙线或牙缝刷，再完成日常刷牙。",
    steps: ["吃完", "清理残渣", "牙线/牙缝刷", "睡前完整清洁"]
  },
  {
    name: "普通正餐",
    visual: "meal",
    image: "assets/ui-icons/meal.png",
    tag: "不必过度焦虑",
    advice: "保持早晚有效刷牙，不必焦虑每餐都刷。饭后漱口是轻量好习惯。",
    steps: ["吃完", "可以漱口", "正常作息", "早晚有效刷牙"]
  },
  {
    name: "夜宵 / 睡前加餐",
    visual: "night-food",
    image: "assets/ui-icons/night-food.png",
    tag: "睡前必做任务",
    advice: "睡前必须完成一次完整清洁，别让食物残渣陪牙齿过夜。",
    steps: ["吃完", "别直接睡", "刷满 2 分钟", "完成睡前清洁"]
  }
];

export const consequenceCards = [
  "长期不看含氟：防龋保护不足",
  "长期大力横刷：可能刺激牙龈，增加牙颈部磨损风险",
  "喝甜饮后不清洁：糖分停留时间增加",
  "牙龈出血只换牙膏：可能忽略牙菌斑和牙结石问题",
  "依赖漱口水：不能去除牙面菌斑",
  "刷牙经常跳过或不到 1 分钟：牙菌斑清洁不足，护牙习惯难以建立"
];
