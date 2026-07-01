import {
  type CSSProperties,
  type RefObject,
  useMemo,
  useRef,
  useState
} from "react";
import QRCode from "qrcode";
import { QRCodeSVG } from "qrcode.react";
import {
  auxiliaryTools,
  glossaryCards,
  lineupImages,
  mealAdviceCards,
  Persona,
  PersonaId,
  personas,
  purchaseFeedback,
  quizQuestions
} from "./data/personaTest";

type Answers = Array<number | null>;

function App() {
  const quizRef = useRef<HTMLElement | null>(null);
  const galleryRef = useRef<HTMLElement | null>(null);
  const resultRef = useRef<HTMLElement | null>(null);
  const [answers, setAnswers] = useState<Answers>(
    Array(quizQuestions.length).fill(null)
  );
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<Persona | null>(null);
  const [flippedPersona, setFlippedPersona] = useState<PersonaId | null>(null);
  const [flippedTerms, setFlippedTerms] = useState<string[]>([]);
  const [selectedPurchase, setSelectedPurchase] = useState("含氟防龋");
  const [selectedMeal, setSelectedMeal] = useState(mealAdviceCards[0].name);
  const [expandedTool, setExpandedTool] = useState("牙刷 + 含氟牙膏");
  const [sticker, setSticker] = useState("");
  const [challengeActive, setChallengeActive] = useState(false);

  const currentQuestion = quizQuestions[step];
  const progress = ((step + 1) / quizQuestions.length) * 100;
  const scorePreview = useMemo(() => getScores(answers), [answers]);
  const topPersona = getTopPersona(scorePreview);
  const currentResult = result ?? topPersona;

  const scrollTo = (target: RefObject<HTMLElement | null>) => {
    target.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const selectOption = (optionIndex: number) => {
    const nextAnswers = [...answers];
    nextAnswers[step] = optionIndex;
    setAnswers(nextAnswers);
    setSticker(["+ 护牙能量", "+ 清洁线索", "+ 人格碎片"][step % 3]);

    window.setTimeout(() => setSticker(""), 620);

    if (step < quizQuestions.length - 1) {
      window.setTimeout(() => setStep((current) => current + 1), 220);
    } else {
      const persona = getTopPersona(getScores(nextAnswers));
      setResult(persona);
      window.setTimeout(() => scrollTo(resultRef), 260);
    }
  };

  const restartQuiz = () => {
    setAnswers(Array(quizQuestions.length).fill(null));
    setStep(0);
    setResult(null);
    scrollTo(quizRef);
  };

  const toggleTerm = (term: string) => {
    setFlippedTerms((current) =>
      current.includes(term)
        ? current.filter((item) => item !== term)
        : [...current, term]
    );
  };

  const copyLink = async () => {
    await navigator.clipboard?.writeText(window.location.href);
    setSticker("链接已复制");
    window.setTimeout(() => setSticker(""), 900);
  };

  const systemShare = async () => {
    if (!navigator.share) {
      await copyLink();
      return;
    }

    await navigator.share({
      title: "护牙人格测试",
      text: `我的护牙人格是：${currentResult.name}`,
      url: window.location.href
    });
  };

  const saveShareCard = async () => {
    await downloadShareCard(currentResult);
  };

  return (
    <main className="persona-app">
      {sticker && <div className="floating-sticker">{sticker}</div>}
      <Hero onStart={() => scrollTo(quizRef)} onGallery={() => scrollTo(galleryRef)} />
      <PersonaGallery
        refNode={galleryRef}
        flippedPersona={flippedPersona}
        onFlip={setFlippedPersona}
      />
      <QuizSection
        refNode={quizRef}
        question={currentQuestion}
        step={step}
        progress={progress}
        answers={answers}
        onSelect={selectOption}
        onBack={() => setStep((current) => Math.max(0, current - 1))}
        preview={topPersona}
      />
      <GlossarySection flippedTerms={flippedTerms} onToggle={toggleTerm} />
      <PurchaseSection
        selected={selectedPurchase}
        onSelect={setSelectedPurchase}
      />
      <BrushToolSection
        active={challengeActive}
        onToggle={() => setChallengeActive((value) => !value)}
      />
      <AuxiliaryToolsSection
        expandedTool={expandedTool}
        onExpand={setExpandedTool}
      />
      <MealAdviceSection selected={selectedMeal} onSelect={setSelectedMeal} />
      <ResultSection
        refNode={resultRef}
        persona={currentResult}
        completed={Boolean(result)}
        onSave={saveShareCard}
        onCopy={copyLink}
        onShare={systemShare}
        onRestart={restartQuiz}
        onGallery={() => scrollTo(galleryRef)}
      />
    </main>
  );
}

function Hero({
  onStart,
  onGallery
}: {
  onStart: () => void;
  onGallery: () => void;
}) {
  return (
    <section className="tooth-hero">
      <div className="hero-bg">
        <MultiSourceImage sources={lineupImages} alt="" />
      </div>
      <nav className="lab-nav">
        <span>牙齿防御局</span>
        <span>护牙人格实验室</span>
      </nav>
      <div className="hero-copy">
        <div className="game-kicker">卡牌游戏入口 · 日常护牙决策测试</div>
        <h1>护牙人格测试</h1>
        <p className="hero-sub">测测你是哪种口腔生活型人格</p>
        <p className="hero-text">
          不是所有牙齿问题，都靠一支网红牙膏解决。回答几个生活习惯问题，
          解锁你的 7 大护牙人格，生成专属护牙建议卡。
        </p>
        <div className="hero-actions">
          <button type="button" onClick={onStart}>
            开始测试
          </button>
          <button type="button" className="ghost" onClick={onGallery}>
            查看人格图鉴
          </button>
        </div>
      </div>
      <div className="sticker-clouds" aria-hidden="true">
        {[
          "含氟优先",
          "别让牙龈报警",
          "甜饮党请注意",
          "2 分钟刷牙挑战",
          "睡前别跳过",
          "测测你的护牙人格"
        ].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </section>
  );
}

function PersonaGallery({
  refNode,
  flippedPersona,
  onFlip
}: {
  refNode: React.RefObject<HTMLElement | null>;
  flippedPersona: PersonaId | null;
  onFlip: (id: PersonaId | null) => void;
}) {
  return (
    <section className="section game-section" ref={refNode}>
      <SectionHeading
        eyebrow="角色图鉴"
        title="护牙人格图鉴"
        intro="每一种护牙人格，都是一种常见生活习惯的缩影。点击翻面，看看它真正提醒你的是什么。"
      />
      <div className="lineup-showcase">
        <MultiSourceImage sources={lineupImages} alt="7 个人格站位图" />
      </div>
      <div className="persona-track">
        {personas.map((persona) => {
          const flipped = flippedPersona === persona.id;
          return (
            <article
              className={`persona-card ${flipped ? "flipped" : ""}`}
              key={persona.id}
              style={
                {
                  "--card": persona.color,
                  "--accent": persona.accent
                } as CSSProperties
              }
              onClick={() => onFlip(flipped ? null : persona.id)}
            >
              <div className="flip-inner">
                <div className="card-face card-front">
                  <SafeImage src={persona.image} alt={persona.name} />
                  <div className="card-name">
                    <b>{persona.name}</b>
                    <span>{persona.keywords.join(" / ")}</span>
                  </div>
                </div>
                <div className="card-face card-back">
                  <div className="card-back-title">
                    <span>{persona.name}</span>
                    <b>{persona.keywords.slice(0, 3).join(" / ")}</b>
                  </div>
                  <div className="back-note">
                    <em>生活画像</em>
                    <p>{persona.cardBack.audience}</p>
                    <p>{persona.cardBack.insight}</p>
                  </div>
                  <div className="back-note action">
                    <em>今日行动</em>
                    <p>{persona.cardBack.action}</p>
                  </div>
                  <div className="back-note warning">
                    <em>提醒</em>
                    <p>{persona.cardBack.warning}</p>
                  </div>
                  <small>点击卡牌返回正面</small>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function QuizSection({
  refNode,
  question,
  step,
  progress,
  answers,
  preview,
  onSelect,
  onBack
}: {
  refNode: React.RefObject<HTMLElement | null>;
  question: (typeof quizQuestions)[number];
  step: number;
  progress: number;
  answers: Answers;
  preview: Persona;
  onSelect: (optionIndex: number) => void;
  onBack: () => void;
}) {
  return (
    <section className="section quiz-zone" ref={refNode}>
      <SectionHeading
        eyebrow="MBTI 式护牙人格测试"
        title="开始护牙人格测试"
        intro="选择最像你的生活习惯，系统会生成你的护牙人格。"
      />
      <div className="quiz-shell">
        <div className="quiz-topline">
          <span>
            第 {step + 1} / {quizQuestions.length} 题
          </span>
          <span>当前倾向：{preview.name}</span>
        </div>
        <div className="progress-track">
          <i style={{ width: `${progress}%` }} />
        </div>
        <div className="question-card">
          <h3>{question.title}</h3>
          <div className="option-grid">
            {question.options.map((option, index) => (
              <button
                type="button"
                key={option.label}
                className={answers[step] === index ? "selected" : ""}
                onClick={() => onSelect(index)}
              >
                <b>{String.fromCharCode(65 + index)}</b>
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="quiz-actions">
          <button type="button" onClick={onBack} disabled={step === 0}>
            返回上一题
          </button>
          <span>选择后自动进入下一题</span>
        </div>
      </div>
    </section>
  );
}

function GlossarySection({
  flippedTerms,
  onToggle
}: {
  flippedTerms: string[];
  onToggle: (term: string) => void;
}) {
  return (
    <section className="section">
      <SectionHeading
        eyebrow="包装词翻译机"
        title="护牙黑话词典"
        intro="把包装词翻译成人话。点击卡片翻面，不再被广告词牵着走。"
      />
      <div className="lingo-grid">
        {glossaryCards.map(([term, meaning]) => {
          const flipped = flippedTerms.includes(term);
          return (
            <button
              type="button"
              className={`lingo-card ${flipped ? "flipped" : ""}`}
              key={term}
              onClick={() => onToggle(term)}
            >
              <span className="lingo-front">{term}</span>
              <span className="lingo-back">{meaning}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function PurchaseSection({
  selected,
  onSelect
}: {
  selected: string;
  onSelect: (value: string) => void;
}) {
  const feedback = purchaseFeedback[selected];

  return (
    <section className="section buy-section">
      <SectionHeading
        eyebrow="购买选择"
        title="你买牙膏时最看重什么？"
        intro="先选一个你最容易被吸引的词，看看它到底是核心功能，还是体验/营销词。"
      />
      <div className="choice-pills">
        {Object.keys(purchaseFeedback).map((item) => (
          <button
            type="button"
            className={selected === item ? "active" : ""}
            key={item}
            onClick={() => onSelect(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="feedback-card">
        <span>{feedback.tag}</span>
        <h3>{selected}</h3>
        <p>{feedback.text}</p>
        <p className="next-step">{feedback.next}</p>
      </div>
    </section>
  );
}

function BrushToolSection({
  active,
  onToggle
}: {
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <section className="section">
      <SectionHeading
        eyebrow="刷牙工具选择"
        title="你适合哪种刷牙工具？"
        intro="工具不是身份标签，能稳定刷干净才是胜利条件。"
      />
      <div className="tool-choice-grid">
        <article className="tool-choice">
          <h3>普通牙刷</h3>
          <p>适合：预算有限、不想充电、使用方便、愿意学习正确手法的人。</p>
          <b>推荐：软毛牙刷 + 巴氏刷牙法动画训练</b>
        </article>
        <article className="tool-choice electric">
          <h3>电动牙刷</h3>
          <p>适合：容易刷不满 2 分钟、手法控制不好、需要计时提醒、想要更省力的人。</p>
          <b>提醒：电动牙刷也不能随便乱刷，仍然需要刷到牙龈边缘。</b>
        </article>
      </div>
      <button type="button" className="challenge-button" onClick={onToggle}>
        巴氏刷牙法挑战
      </button>
      <div className={`bass-challenge ${active ? "active" : ""}`}>
        <div className="tooth-demo">
          <span className="gum-line" />
          <span className="tooth-shape t1" />
          <span className="tooth-shape t2" />
          <span className="tooth-shape t3" />
          <span className="angle-guide">45°</span>
          <span className="motion-arc" />
          <span className="brush-head" />
          <span className="plaque p1" />
          <span className="plaque p2" />
          <span className="plaque p3" />
          <span className="plaque p4" />
          <span className="clean-spark s1" />
          <span className="clean-spark s2" />
          <span className="clean-spark s3" />
        </div>
        <div>
          <h3>45° 角度 / 小幅震颤 / 温柔用力</h3>
          <p>
            本设计以巴氏刷牙法作为标准化教学模板：刷毛朝向牙龈边缘，
            小幅移动，不用大力横刷。
          </p>
        </div>
      </div>
    </section>
  );
}

function AuxiliaryToolsSection({
  expandedTool,
  onExpand
}: {
  expandedTool: string;
  onExpand: (tool: string) => void;
}) {
  return (
    <section className="section">
      <SectionHeading
        eyebrow="辅助工具说明书"
        title="这些工具能不能代替刷牙？"
        intro="辅助工具是队友，不是主角。点击卡片展开解释。"
      />
      <div className="assist-grid">
        {auxiliaryTools.map((tool) => {
          const active = expandedTool === tool.name;
          return (
            <button
              type="button"
              key={tool.name}
              className={`assist-card ${active ? "active" : ""}`}
              onClick={() => onExpand(tool.name)}
            >
              <img className="tool-art" src={tool.image} alt="" aria-hidden="true" />
              <span>{tool.name}</span>
              <b>{tool.conclusion}</b>
              <small>{tool.effect}</small>
              {active && <p>{tool.detail}</p>}
            </button>
          );
        })}
      </div>
    </section>
  );
}

function MealAdviceSection({
  selected,
  onSelect
}: {
  selected: string;
  onSelect: (value: string) => void;
}) {
  const current =
    mealAdviceCards.find((item) => item.name === selected) ?? mealAdviceCards[0];

  return (
    <section className="section meal-section">
      <SectionHeading
        eyebrow="饭后清洁任务"
        title="刚吃完东西，现在要不要刷牙？"
        intro="先判断吃了什么，再决定漱口、等待、牙缝清洁或睡前完整刷牙。"
      />
      <div className="meal-layout">
        <div className="meal-options">
          {mealAdviceCards.map((item) => (
            <button
              type="button"
              key={item.name}
              className={selected === item.name ? "active" : ""}
              onClick={() => onSelect(item.name)}
            >
              <img className="meal-art" src={item.image} alt="" aria-hidden="true" />
              {item.name}
            </button>
          ))}
        </div>
        <article className="meal-card">
          <img className="meal-hero-art" src={current.image} alt="" aria-hidden="true" />
          <span>{current.tag}</span>
          <h3>{current.name}</h3>
          <p>{current.advice}</p>
          <div className="meal-timeline">
            {current.steps.map((step) => (
              <b key={step}>{step}</b>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

function ResultSection({
  refNode,
  persona,
  completed,
  onSave,
  onCopy,
  onShare,
  onRestart,
  onGallery
}: {
  refNode: React.RefObject<HTMLElement | null>;
  persona: Persona;
  completed: boolean;
  onSave: () => void;
  onCopy: () => void;
  onShare: () => void;
  onRestart: () => void;
  onGallery: () => void;
}) {
  const shareUrl =
    typeof window === "undefined" ? "http://127.0.0.1:5173/" : window.location.href;

  return (
    <section className="section result-section" ref={refNode}>
      <SectionHeading
        eyebrow={completed ? "结果已生成" : "结果预览"}
        title={`你的护牙人格是：${persona.name}`}
        intro={persona.shareSubtitle}
      />
      <div
        className="result-layout"
        style={
          {
            "--card": persona.color,
            "--accent": persona.accent
          } as CSSProperties
        }
      >
        <article className="share-card" id="share-card">
          <div className="share-card-header">
            <p>护牙人格测试</p>
            <h3>你的护牙人格是：{persona.name}</h3>
            <span>{persona.shareSubtitle}</span>
          </div>
          <div className="share-card-image">
            <SafeImage src={persona.image} alt={persona.name} />
          </div>
          <div className="share-card-copy">
            <p>
              {persona.description} 对你来说，第一优先级是：
              {persona.toothpaste}
            </p>
            <b>今日护牙建议：{persona.advice}</b>
          </div>
          <div className="share-card-qr">
            <QRCodeSVG
              value={shareUrl}
              size={78}
              bgColor="#ffffff"
              fgColor="#17121f"
              level="M"
              marginSize={2}
            />
            <span>扫码测测你的护牙人格</span>
          </div>
        </article>
        <div className="result-copy">
          <div className="result-block">
            <span>关键词</span>
            <p>{persona.keywords.join(" / ")}</p>
          </div>
          <div className="result-block">
            <span>生活习惯画像</span>
            <p>{persona.audience}</p>
          </div>
          <div className="result-block">
            <span>风险提醒</span>
            <p>{persona.risk}</p>
          </div>
          <div className="result-block">
            <span>牙膏推荐</span>
            <p>{persona.toothpaste}</p>
          </div>
          <div className="result-block">
            <span>刷牙方式</span>
            <p>{persona.brushing}</p>
          </div>
          <div className="result-block">
            <span>饭后清洁建议</span>
            <p>{persona.afterMeal}</p>
          </div>
          <div className="result-block punchline">
            <span>一句话总结</span>
            <p>{persona.summary}</p>
          </div>
          <div className="share-actions">
            <button type="button" onClick={onSave}>
              保存分享卡
            </button>
            <button type="button" onClick={onCopy}>
              复制链接
            </button>
            <button type="button" onClick={onShare}>
              系统分享
            </button>
            <button type="button" className="ghost" onClick={onRestart}>
              再测一次
            </button>
          </div>
          <div className="qr-box">
            <div className="real-qr" aria-label="当前网页二维码">
              <QRCodeSVG
                value={shareUrl}
                size={92}
                bgColor="#ffffff"
                fgColor="#17121f"
                level="M"
                marginSize={2}
              />
            </div>
            <p>二维码分享区：扫码打开当前护牙人格测试页。</p>
          </div>
        </div>
      </div>
      <div className="all-personas-panel">
        <div>
          <span>全部人格图鉴</span>
          <h3>除了你的结果，还有另外 6 种常见护牙人格。</h3>
          <p>回到图鉴区，看看朋友可能是哪一张卡。</p>
          <button type="button" onClick={onGallery}>
            查看全部人格图鉴
          </button>
        </div>
        <MultiSourceImage sources={lineupImages} alt="全部护牙人格" />
      </div>
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
  intro
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <div className="section-heading">
      <p>{eyebrow}</p>
      <h2>{title}</h2>
      <span>{intro}</span>
    </div>
  );
}

function SafeImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="image-fallback">
        <b>{alt}</b>
      </div>
    );
  }

  return <img src={src} alt={alt} onError={() => setFailed(true)} />;
}

function MultiSourceImage({ sources, alt }: { sources: string[]; alt: string }) {
  const [index, setIndex] = useState(0);
  const src = sources[index];

  if (!src) {
    return (
      <div className="image-fallback">
        <b>{alt || "护牙人格测试"}</b>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setIndex((current) => current + 1)}
    />
  );
}

function getScores(answers: Answers) {
  const scores: Record<PersonaId, number> = {
    mintLightning: 0,
    nightGummy: 0,
    skipFrame: 0,
    roseAlert: 0,
    pearlFilter: 0,
    cloudSave: 0,
    caramelBubble: 0
  };

  answers.forEach((answer, index) => {
    if (answer === null) return;
    const option = quizQuestions[index].options[answer];
    Object.entries(option.scores).forEach(([id, value]) => {
      scores[id as PersonaId] += value ?? 0;
    });
  });

  return scores;
}

function getTopPersona(scores: Record<PersonaId, number>) {
  const [winner] = personas
    .map((persona) => ({ persona, score: scores[persona.id] }))
    .sort((a, b) => b.score - a.score);

  return winner.persona;
}

async function downloadShareCard(persona: Persona) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const shareUrl =
    typeof window === "undefined" ? "http://127.0.0.1:5173/" : window.location.href;

  canvas.width = 1080;
  canvas.height = 1600;

  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, persona.color);
  gradient.addColorStop(1, "#fff7e8");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "rgba(255,255,255,.9)";
  roundRect(ctx, 70, 70, 940, 1460, 46);
  ctx.fill();

  ctx.fillStyle = persona.accent;
  roundRect(ctx, 112, 112, 260, 58, 29);
  ctx.fill();
  ctx.fillStyle = "#101018";
  ctx.font = "700 34px Microsoft YaHei, sans-serif";
  ctx.fillText("护牙人格测试", 132, 151);
  ctx.font = "900 68px Microsoft YaHei, sans-serif";
  wrapCanvasText(ctx, `你的护牙人格是：${persona.name}`, 120, 235, 840, 76);

  ctx.fillStyle = "#ffffff";
  roundRect(ctx, 145, 390, 790, 500, 34);
  ctx.fill();

  try {
    const image = await loadImage(persona.image);
    drawContainedImage(ctx, image, 175, 420, 730, 440);
  } catch {
    ctx.fillStyle = persona.color;
    roundRect(ctx, 175, 420, 730, 440, 34);
    ctx.fill();
  }

  ctx.fillStyle = "rgba(255,255,255,.92)";
  roundRect(ctx, 112, 920, 856, 540, 30);
  ctx.fill();
  ctx.fillStyle = "#1d1d25";
  ctx.font = "700 38px Microsoft YaHei, sans-serif";
  let nextY = wrapCanvasText(ctx, persona.shareSubtitle, 145, 990, 790, 50);

  ctx.font = "32px Microsoft YaHei, sans-serif";
  nextY = wrapCanvasText(
    ctx,
    persona.shareCardText,
    145,
    nextY + 28,
    790,
    44
  );

  ctx.fillStyle = persona.color;
  ctx.font = "800 36px Microsoft YaHei, sans-serif";
  wrapCanvasText(ctx, `今日护牙建议：${persona.advice}`, 145, nextY + 36, 570, 50);

  try {
    const qrDataUrl = await QRCode.toDataURL(shareUrl, {
      errorCorrectionLevel: "M",
      margin: 2,
      width: 236,
      color: {
        dark: "#17121f",
        light: "#ffffff"
      }
    });
    const qrImage = await loadImage(qrDataUrl);

    ctx.fillStyle = "#ffffff";
    roundRect(ctx, 730, 1210, 200, 200, 24);
    ctx.fill();
    ctx.lineWidth = 8;
    ctx.strokeStyle = "#17121f";
    roundRect(ctx, 730, 1210, 200, 200, 24);
    ctx.stroke();
    drawContainedImage(ctx, qrImage, 748, 1228, 164, 164);

    ctx.fillStyle = "#17121f";
    ctx.font = "800 26px Microsoft YaHei, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("扫码测试", 830, 1445);
    ctx.textAlign = "left";
  } catch {
    ctx.fillStyle = "#17121f";
    ctx.font = "800 26px Microsoft YaHei, sans-serif";
    ctx.fillText("扫码测试：复制页面链接分享", 145, 1440);
  }

  const link = document.createElement("a");
  link.download = `${persona.name}-护牙人格分享卡.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

function wrapCanvasText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  let line = "";
  Array.from(text).forEach((char) => {
    const testLine = `${line}${char}`;
    if (ctx.measureText(testLine).width > maxWidth && line) {
      ctx.fillText(line, x, y);
      line = char;
      y += lineHeight;
    } else {
      line = testLine;
    }
  });
  ctx.fillText(line, x, y);
  return y + lineHeight;
}

function drawContainedImage(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number
) {
  const scale = Math.min(width / image.width, height / image.height);
  const drawWidth = image.width * scale;
  const drawHeight = image.height * scale;
  const drawX = x + (width - drawWidth) / 2;
  const drawY = y + (height - drawHeight) / 2;
  ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}

export default App;
