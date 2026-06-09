import { useEffect, useMemo, useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import BrushTrainingModule from "./BrushTrainingModule.jsx";

const toothpasteCases = [
  {
    id: "daily",
    label: "没有明显问题，只想日常防护",
    type: "日常防护型",
    recommend: "含氟防龋基础款",
    keywords: "含氟 / 防蛀 / 防龋",
    misunderstanding: "贵价、泡沫多或口感强，不等于清洁效果更好。",
    behavior: "每天两次有效刷牙，配合牙线清洁牙缝。",
    visual: "halo",
  },
  {
    id: "caries",
    label: "容易蛀牙 / 经常喝奶茶甜饮",
    type: "奶茶防龋型",
    recommend: "含氟防龋牙膏",
    keywords: "含氟 / 防蛀 / 防龋",
    misunderstanding: "喝完甜饮马上刷并不总是最优，先喝水或漱口更稳妥。",
    behavior: "减少糖分停留，睡前完整刷牙，牙缝处重点清洁。",
    visual: "halo",
  },
  {
    id: "sensitive",
    label: "冷热酸甜会牙酸",
    type: "冷热敏感型",
    recommend: "抗敏牙膏",
    keywords: "抗敏 / 舒敏 / 含氟",
    misunderstanding: "抗敏牙膏不是止痛药，持续疼痛需要看牙医。",
    behavior: "轻柔刷牙，避免横向用力拉锯，减少酸性刺激。",
    visual: "sensitive",
  },
  {
    id: "gum",
    label: "牙龈容易出血",
    type: "牙龈关注型",
    recommend: "含氟基础款或护龈牙膏",
    keywords: "护龈 / 含氟",
    misunderstanding: "护龈牙膏只能辅助，不等于治疗牙龈疾病。",
    behavior: "关注牙菌斑、牙线、牙结石，反复出血建议口腔检查。",
    visual: "gum",
  },
  {
    id: "white",
    label: "想让牙齿看起来更白",
    type: "表面色渍型",
    recommend: "温和去渍或美白牙膏",
    keywords: "美白 / 去渍 / 含氟",
    misunderstanding: "美白牙膏主要针对外源性色渍，不等于牙齿更健康。",
    behavior: "减少咖啡、茶、烟草色渍停留，避免过度摩擦。",
    visual: "stain",
  },
  {
    id: "breath",
    label: "口气不清新",
    type: "清新口气型",
    recommend: "含氟基础款或清新口气牙膏",
    keywords: "清新口气 / 含氟",
    misunderstanding: "清新口气牙膏只能改善体验，不一定解决口臭根源。",
    behavior: "检查牙缝、舌苔和牙周问题，睡前清洁尤其关键。",
    visual: "breath",
  },
];

const wordGroups = [
  {
    words: ["含氟", "防蛀", "防龋"],
    title: "基础防龋关键词",
    explain: "普通人优先看。含氟牙膏能帮助牙釉质抵抗酸攻击，是日常防龋的基础选择。",
  },
  {
    words: ["抗敏", "舒敏"],
    title: "冷热酸甜刺激时关注",
    explain: "适合牙本质敏感导致的短暂酸痛。若疼痛持续、夜间痛或咬合痛，需要看牙医。",
  },
  {
    words: ["护龈"],
    title: "辅助护理，不是治疗",
    explain: "护龈牙膏可以辅助口腔护理，但牙龈反复出血通常要关注牙菌斑、牙结石和牙线使用。",
  },
  {
    words: ["美白", "去渍"],
    title: "更多针对表面色渍",
    explain: "主要面向咖啡、茶、烟草等外源性色渍，不等于牙齿更健康，也不建议用力刷。",
  },
  {
    words: ["清新口气"],
    title: "改善气味体验",
    explain: "可以让口感更清爽，但不一定解决口臭根源。牙缝、舌苔和牙周状况也要检查。",
  },
  {
    words: ["草本"],
    title: "先看真实功效",
    explain: "多为体验或概念表达，仍需回到含氟、防龋、抗敏等明确功效来判断。",
  },
  {
    words: ["抗牙石"],
    title: "偏向预防形成",
    explain: "可以帮助减少牙石形成趋势，但不能去掉已经形成的牙结石，牙结石需要专业洁治。",
  },
];

const foodCases = [
  {
    id: "acid",
    label: "酸性饮料 / 柠檬水 / 果汁 / 碳酸饮料",
    advice: "先喝水或漱口，等待一段时间后再刷牙，减少牙釉质被酸软化时受到摩擦。",
    typeLabel: "酸性饮品后",
  },
  {
    id: "sweet",
    label: "奶茶 / 蛋糕 / 糖果",
    advice: "先喝水或漱口，减少糖分停留，睡前完成一次完整刷牙。",
    typeLabel: "甜食甜饮后",
  },
  {
    id: "sticky",
    label: "薯片 / 饼干 / 黏性零食",
    advice: "注意牙缝残留，可配合牙线或牙缝刷，避免碎屑长时间卡在牙缝。",
    typeLabel: "黏性零食后",
  },
  {
    id: "meal",
    label: "普通正餐",
    advice: "保持早晚有效刷牙，不必焦虑每餐都刷。饭后喝水或简单漱口即可。",
    typeLabel: "普通正餐后",
  },
  {
    id: "night",
    label: "夜宵 / 睡前加餐",
    advice: "睡前必须完成一次完整清洁，包括刷牙和牙缝清洁，别让食物残留陪你过夜。",
    typeLabel: "睡前加餐后",
  },
];

function ToothScene({ mode = "halo", force = 35 }) {
  const heavy = force > 70;

  return (
    <svg className="tooth-scene" viewBox="0 0 260 260" role="img" aria-label="牙齿状态示意图">
      <defs>
        <filter id="softGlow">
          <feGaussianBlur stdDeviation="7" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {mode === "halo" && (
        <>
          <circle className="halo-ring one" cx="130" cy="132" r="86" />
          <circle className="halo-ring two" cx="130" cy="132" r="62" />
        </>
      )}
      {mode === "sensitive" && (
        <>
          <path className="ice" d="M58 70h32l16 28-16 28H58L42 98z" />
          <path className="bolt" d="M190 53l-27 55h28l-23 57 55-75h-30z" />
        </>
      )}
      {mode === "breath" && (
        <>
          <path className="scent" d="M50 172c20-18 50-18 70 0" />
          <path className="scent delay" d="M42 199c30-22 70-22 100 0" />
        </>
      )}
      <path
        className="gum-base"
        d="M57 158c23 18 44 24 73 24s50-6 73-24v44H57z"
        fill={mode === "gum" || heavy ? "#ffe1e1" : "#dff7ef"}
      />
      {(mode === "gum" || heavy) && <path className="gum-alert" d="M63 159c36 18 96 18 134 0" />}
      <path
        className="tooth"
        d="M137 72c25-40 79-28 83 23 5 57-33 131-58 131-14 0-15-17-16-35-2-27-8-46-20-46s-18 19-20 46c-1 18-2 35-16 35-25 0-63-74-58-131 4-51 58-63 83-23 6 10 16 10 22 0z"
      />
      <path className="shine" d="M80 94c12-22 32-30 50-20" />
      {mode === "stain" && (
        <>
          <ellipse className="stain one" cx="100" cy="135" rx="12" ry="8" />
          <ellipse className="stain two" cx="159" cy="153" rx="14" ry="9" />
          <text className="svg-label" x="78" y="61">表面色渍</text>
        </>
      )}
    </svg>
  );
}

function MiniIcon({ type }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      {type === "brush" && (
        <>
          <rect x="11" y="38" width="42" height="9" rx="4" fill="currentColor" />
          <rect x="42" y="18" width="8" height="24" rx="3" fill="currentColor" opacity=".7" />
          <path d="M16 34h26" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
        </>
      )}
      {type === "paste" && (
        <>
          <path d="M18 19h23l9 28H14z" fill="currentColor" opacity=".9" />
          <rect x="20" y="13" width="19" height="8" rx="3" fill="currentColor" opacity=".65" />
        </>
      )}
      {type === "time" && (
        <>
          <circle cx="32" cy="32" r="20" fill="none" stroke="currentColor" strokeWidth="6" />
          <path d="M32 20v14l10 7" stroke="currentColor" strokeWidth="5" strokeLinecap="round" fill="none" />
        </>
      )}
    </svg>
  );
}

function SharePanel({ currentUrl, onShare }) {
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const isLocalPreview = currentUrl.includes("localhost") || currentUrl.includes("127.0.0.1");

  const copyLink = async () => {
    await navigator.clipboard?.writeText(currentUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section className="share-section section-pad" id="share">
      <div className="section-kicker">扫码传播</div>
      <h2>分享给朋友</h2>
      <p className="section-lead">网页是纯前端静态项目，部署后一个链接就能完整体验所有交互。</p>
      {isLocalPreview && (
        <p className="share-local-note">
          当前是本地预览地址，仅你的电脑可访问。上传到 Vercel、Netlify、GitHub Pages 或学校服务器后，二维码会自动使用线上链接。
        </p>
      )}
      <div className="share-actions">
        <button className="ghost" onClick={copyLink}>复制链接</button>
        <button className="ghost" onClick={() => setShowQr(true)}>生成二维码</button>
        <button className="primary small" onClick={onShare}>系统分享</button>
      </div>
      <div className={`qr-box glass-card ${showQr ? "show" : ""}`}>
        {showQr ? (
          <>
            <QRCodeSVG value={currentUrl} size={164} bgColor="transparent" fgColor="#12324a" level="M" />
            <p>{copied ? "链接已复制，可以发送给朋友" : "二维码内容为当前网页链接"}</p>
          </>
        ) : (
          <p>点击“生成二维码”后，这里会显示当前网页链接的二维码。</p>
        )}
      </div>
    </section>
  );
}

export default function App() {
  const [selectedCase, setSelectedCase] = useState(toothpasteCases[1]);
  const [selectedWord, setSelectedWord] = useState(wordGroups[0]);
  const [selectedFood, setSelectedFood] = useState(foodCases[1]);
  const [shareCardVisible, setShareCardVisible] = useState(false);
  const [toast, setToast] = useState("");
  const stepOneRef = useRef(null);
  const [currentUrl, setCurrentUrl] = useState("https://example.com/tooth-care-selector");

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const result = useMemo(() => ({
    type: selectedCase.type,
    toothpaste: selectedCase.recommend,
    keywords: selectedCase.keywords,
    brushing: "巴氏刷牙法，轻柔刷牙龈边缘",
    food: selectedFood.advice,
  }), [selectedCase, selectedFood]);

  const showToast = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  };

  const handleShare = async () => {
    const shareData = {
      title: "护牙选择器｜牙膏怎么选，牙该怎么刷？",
      text: "扫码进入后，选择你的口腔问题，生成个人护牙建议。",
      url: currentUrl,
    };

    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }

    await navigator.clipboard?.writeText(currentUrl);
    showToast("链接已复制，可以发送给朋友");
  };

  const reset = () => {
    setSelectedCase(toothpasteCases[1]);
    setSelectedWord(wordGroups[0]);
    setSelectedFood(foodCases[1]);
    setShareCardVisible(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">护牙选择器</div>
          <h1>牙膏怎么选，牙该怎么刷？</h1>
          <p>一个基于日常口腔清洁误区的互动护牙选择器</p>
          <p className="scan-note">扫码进入后，选择你的口腔问题，生成个人护牙建议。</p>
          <button className="primary" onClick={() => stepOneRef.current?.scrollIntoView({ behavior: "smooth" })}>
            开始判断
          </button>
          <span className="microcopy">3步生成你的护牙建议</span>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="floating-icon brush"><MiniIcon type="brush" /></div>
          <div className="floating-icon paste"><MiniIcon type="paste" /></div>
          <div className="floating-icon time"><MiniIcon type="time" /></div>
          <ToothScene mode="halo" />
        </div>
      </section>

      <section className="section-pad step-grid" ref={stepOneRef}>
        <div>
          <div className="section-kicker">Step 1</div>
          <h2>第一步：你的牙齿现在更像哪种情况？</h2>
          <div className="option-grid">
            {toothpasteCases.map((item) => (
              <button
                key={item.id}
                className={`option-card ${selectedCase.id === item.id ? "active" : ""}`}
                onClick={() => setSelectedCase(item)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <aside className="sticky-result">
          <div className="visual-card glass-card">
            <ToothScene mode={selectedCase.visual} />
          </div>
          <div className="advice-card glass-card fade-in" key={selectedCase.id}>
            <span>你的牙膏选择卡</span>
            <h3>{selectedCase.type}</h3>
            <dl>
              <dt>推荐类型</dt>
              <dd>{selectedCase.recommend}</dd>
              <dt>重点查看</dt>
              <dd>{selectedCase.keywords}</dd>
              <dt>容易误解</dt>
              <dd>{selectedCase.misunderstanding}</dd>
              <dt>配合行为</dt>
              <dd>{selectedCase.behavior}</dd>
            </dl>
          </div>
        </aside>
      </section>

      <section className="section-pad">
        <div className="section-kicker">Step 2</div>
        <h2>第二步：把包装词翻译成人话</h2>
        <p className="section-lead">看到包装上的功能词，先把它翻译成真正有用的判断线索。</p>
        <div className="tag-cloud">
          {wordGroups.flatMap((group) => group.words.map((word) => (
            <button
              key={word}
              className={`word-tag ${selectedWord.words.includes(word) ? "active" : ""}`}
              onClick={() => setSelectedWord(group)}
            >
              {word}
            </button>
          )))}
        </div>
        <div className="word-explain glass-card fade-in" key={selectedWord.title}>
          <p>包装词翻译</p>
          <h3>{selectedWord.title}</h3>
          <span>{selectedWord.explain}</span>
        </div>
      </section>

      <section className="section-pad brush-section">
        <div className="section-kicker">Step 3</div>
        <h2>第三步：不是用力刷，而是刷对位置</h2>
        <p className="section-lead">
          以巴氏刷牙法作为标准化教学模板：牙刷与牙龈边缘约 45°角，小幅度、短距离、轻柔移动，外侧、内侧、咀嚼面都要清洁，前牙内侧可以竖起牙刷上下刷。
        </p>
        <BrushTrainingModule />
      </section>

      <section className="section-pad timeline-section">
        <div className="section-kicker">Step 4</div>
        <h2>刚吃完东西，现在要不要刷牙？</h2>
        <div className="food-list">
          {foodCases.map((item) => (
            <button
              key={item.id}
              className={`food-chip ${selectedFood.id === item.id ? "active" : ""}`}
              onClick={() => setSelectedFood(item)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="timeline glass-card">
          {["吃完", selectedFood.typeLabel, "先漱口/喝水", "等待/刷牙", "睡前完整清洁"].map((label, index) => (
            <div className="timeline-item" key={label}>
              <span>{index + 1}</span>
              <p>{label}</p>
            </div>
          ))}
        </div>
        <div className="food-advice fade-in" key={selectedFood.id}>{selectedFood.advice}</div>
      </section>

      <section className="section-pad result-section">
        <div className="section-kicker">Result</div>
        <h2>生成你的护牙建议</h2>
        <div className="result-card glass-card">
          <div>
            <span>我的护牙类型</span>
            <strong>{result.type}</strong>
          </div>
          <div>
            <span>推荐牙膏类型</span>
            <strong>{result.toothpaste}</strong>
          </div>
          <div>
            <span>需要注意的包装词</span>
            <strong>{result.keywords}</strong>
          </div>
          <div>
            <span>推荐刷牙方式</span>
            <strong>{result.brushing}</strong>
          </div>
          <div>
            <span>饭后清洁建议</span>
            <strong>{result.food}</strong>
          </div>
        </div>
        <div className="result-actions">
          <button className="ghost" onClick={reset}>重新测试</button>
          <button className="primary small" onClick={() => setShareCardVisible(true)}>生成分享卡</button>
        </div>
        {shareCardVisible && (
          <div className="poster-card fade-in">
            <div className="poster-top">
              <ToothScene mode={selectedCase.visual} />
              <div>
                <p>护牙选择器</p>
                <h3>{result.type}</h3>
              </div>
            </div>
            <ul>
              <li><span>推荐牙膏</span><b>{result.toothpaste}</b></li>
              <li><span>重点查看</span><b>{result.keywords}</b></li>
              <li><span>刷牙方式</span><b>{result.brushing}</b></li>
              <li><span>饭后建议</span><b>{result.food}</b></li>
            </ul>
            <div className="poster-footer">
              <QRCodeSVG value={currentUrl} size={74} bgColor="transparent" fgColor="#12324a" level="M" />
              <p>扫码测一测你的护牙方式</p>
            </div>
          </div>
        )}
      </section>

      <SharePanel currentUrl={currentUrl} onShare={handleShare} />

      <section className="section-pad sources">
        <div className="section-kicker">Reference</div>
        <h2>信息来源</h2>
        <ul className="source-list glass-card">
          <li>WHO Oral Health Fact Sheet</li>
          <li>NHS How to keep your teeth clean</li>
          <li>ADA Toothpastes / Toothbrushes / Brushing Your Teeth</li>
          <li>Cochrane Powered/electric toothbrushes compared to manual toothbrushes</li>
          <li>Mayo Clinic Brushing your teeth after acidic foods</li>
          <li>国家药监局《牙膏监督管理办法》政策解读</li>
          <li>刘呈胜、蔡成莲《刷牙方法和时间对菌斑清除效果的影响》</li>
        </ul>
      </section>
      {toast && <div className="toast">{toast}</div>}
    </main>
  );
}
