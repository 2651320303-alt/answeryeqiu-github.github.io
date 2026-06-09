import { useEffect, useMemo, useState } from "react";
import "./BrushTrainingModule.css";

const plaqueDots = [
  { x: 92, y: 118, delay: 6 },
  { x: 115, y: 96, delay: 12 },
  { x: 142, y: 112, delay: 20 },
  { x: 165, y: 92, delay: 28 },
  { x: 188, y: 120, delay: 36 },
  { x: 214, y: 100, delay: 44 },
  { x: 232, y: 126, delay: 52 },
  { x: 126, y: 145, delay: 60 },
  { x: 176, y: 150, delay: 70 },
  { x: 220, y: 154, delay: 80 },
];

const methodData = [
  { name: "巴氏刷牙法", value: 53.95 },
  { name: "旋转刷牙法", value: 49.57 },
  { name: "生理刷牙法", value: 44.48 },
];

function getAngleStatus(angle) {
  if (angle >= 40 && angle <= 50) {
    return {
      level: "good",
      title: "角度合适",
      text: "牙刷约 45° 贴近牙龈边缘，更容易清洁牙龈沟和牙面交界处。",
    };
  }

  if (angle < 30) {
    return {
      level: "warn",
      title: "角度过低",
      text: "牙刷太平，容易只刷到牙面，忽略牙龈边缘。",
    };
  }

  if (angle > 65) {
    return {
      level: "warn",
      title: "角度过高",
      text: "牙刷太竖，清洁范围变窄，容易漏刷牙面。",
    };
  }

  return {
    level: "normal",
    title: "继续调整",
    text: "把牙刷慢慢调整到接近 45° 的位置。",
  };
}

function getPressureStatus(pressure) {
  if (pressure >= 35 && pressure <= 62) {
    return {
      level: "good",
      title: "力度合适",
      text: "轻柔、小幅度震颤即可，不需要大力横刷。",
    };
  }

  if (pressure > 62) {
    return {
      level: "danger",
      title: "力度过重",
      text: "不是越用力越干净，过重可能刺激牙龈、增加磨损风险。",
    };
  }

  return {
    level: "normal",
    title: "力度偏轻",
    text: "保持轻柔接触牙面和牙龈边缘，不要悬空。",
  };
}

export default function BrushTrainingModule() {
  const [angle, setAngle] = useState(45);
  const [pressure, setPressure] = useState(48);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);

  const angleStatus = useMemo(() => getAngleStatus(angle), [angle]);
  const pressureStatus = useMemo(() => getPressureStatus(pressure), [pressure]);
  const isBestState = angleStatus.level === "good" && pressureStatus.level === "good";
  const remainingSeconds = Math.max(0, 20 - Math.floor(progress / 5));

  useEffect(() => {
    if (!isRunning) return undefined;

    const timer = window.setInterval(() => {
      setProgress((previous) => {
        if (previous >= 100) {
          window.clearInterval(timer);
          setIsRunning(false);
          return 100;
        }
        return previous + 1;
      });
    }, 200);

    return () => window.clearInterval(timer);
  }, [isRunning]);

  function startTraining() {
    setProgress(0);
    setIsRunning(true);
  }

  function resetTraining() {
    setIsRunning(false);
    setProgress(0);
    setAngle(45);
    setPressure(48);
  }

  const remainingPlaque = plaqueDots.filter((dot) => progress < dot.delay).length;
  const cleanScore = Math.round(100 - (remainingPlaque / plaqueDots.length) * 100);

  return (
    <div className="btm-module">
      <section className="btm-trainer-card">
        <div className="btm-visual-panel">
          <div className="btm-svg-wrap">
            <svg viewBox="0 0 320 250" className="btm-mouth-svg" aria-label="巴氏刷牙法动画">
              <defs>
                <linearGradient id="btmToothGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#eaf7ff" />
                </linearGradient>

                <linearGradient id="btmGumGradient" x1="0" x2="1">
                  <stop offset="0%" stopColor={pressure > 62 ? "#ff8f9e" : "#ffd5da"} />
                  <stop offset="100%" stopColor={pressure > 62 ? "#ff647a" : "#ffc0c8"} />
                </linearGradient>

                <filter id="btmSoftShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="10" stdDeviation="12" floodOpacity="0.12" />
                </filter>
              </defs>

              <rect x="48" y="166" width="224" height="34" rx="17" fill="url(#btmGumGradient)" />
              <path
                d="M78 80 C74 58, 98 42, 119 58 C132 68, 139 68, 153 58 C174 42, 198 58, 194 80 L181 163 C178 183, 154 184, 148 164 L137 128 L126 164 C120 184, 96 183, 93 163 Z"
                fill="url(#btmToothGradient)"
                filter="url(#btmSoftShadow)"
                stroke="#d8ecf6"
                strokeWidth="2"
              />

              <path
                d="M174 82 C171 59, 195 42, 217 58 C231 69, 237 69, 250 58 C271 43, 294 60, 290 82 L278 164 C275 183, 252 184, 246 164 L234 128 L223 164 C217 184, 193 183, 190 164 Z"
                fill="url(#btmToothGradient)"
                filter="url(#btmSoftShadow)"
                stroke="#d8ecf6"
                strokeWidth="2"
              />

              <path
                d="M62 166 C92 148, 117 145, 145 160 C170 173, 196 173, 226 160 C248 150, 267 154, 284 166"
                fill="none"
                stroke={pressure > 62 ? "#ef4b64" : "#ff9faf"}
                strokeWidth="7"
                strokeLinecap="round"
              />

              {plaqueDots.map((dot, index) => {
                const visible = progress < dot.delay;
                return (
                  <circle
                    key={index}
                    cx={dot.x}
                    cy={dot.y}
                    r={visible ? 5 : 2}
                    fill="#f6b74f"
                    opacity={visible ? 0.9 : 0.08}
                    className="btm-plaque-dot"
                  />
                );
              })}

              <g
                className={isRunning ? "btm-brush-animate" : ""}
                style={{
                  transformOrigin: "210px 118px",
                  transform: `rotate(${angle - 45}deg)`,
                }}
              >
                <rect x="190" y="108" width="86" height="15" rx="7.5" fill="#0f172a" opacity="0.92" />
                <rect x="162" y="102" width="38" height="27" rx="8" fill="#e6f5fb" />
                <line x1="166" y1="106" x2="166" y2="127" stroke="#1fb6a6" strokeWidth="3" />
                <line x1="174" y1="105" x2="174" y2="128" stroke="#1fb6a6" strokeWidth="3" />
                <line x1="182" y1="105" x2="182" y2="128" stroke="#1fb6a6" strokeWidth="3" />
                <line x1="190" y1="106" x2="190" y2="127" stroke="#1fb6a6" strokeWidth="3" />
              </g>

              <path
                d="M159 135 L205 108"
                stroke={isBestState ? "#12b981" : "#f59e0b"}
                strokeWidth="3"
                strokeDasharray="6 6"
                opacity="0.75"
              />
              <text x="207" y="104" className="btm-angle-label">
                {angle}°
              </text>
            </svg>
          </div>

          <div className="btm-progress-box">
            <div className="btm-progress-ring">
              <svg viewBox="0 0 120 120">
                <circle className="btm-ring-bg" cx="60" cy="60" r="48" />
                <circle
                  className="btm-ring-fill"
                  cx="60"
                  cy="60"
                  r="48"
                  style={{
                    strokeDashoffset: 302 - (302 * progress) / 100,
                  }}
                />
              </svg>
              <div className="btm-ring-text">
                <strong>{cleanScore}%</strong>
                <span>演示清洁度</span>
              </div>
            </div>

            <div>
              <p className="btm-small-title">菌斑剩余点</p>
              <p className="btm-big-number">{remainingPlaque}</p>
              <p className="btm-hint">
                演示剩余 {remainingSeconds} 秒。真实刷牙建议约 2 分钟，本动画压缩为 20 秒演示。
              </p>
            </div>
          </div>
        </div>

        <div className="btm-control-panel">
          <div className="btm-status-grid">
            <div className={`btm-status-card ${angleStatus.level}`}>
              <span>角度反馈</span>
              <strong>{angleStatus.title}</strong>
              <p>{angleStatus.text}</p>
            </div>

            <div className={`btm-status-card ${pressureStatus.level}`}>
              <span>力度反馈</span>
              <strong>{pressureStatus.title}</strong>
              <p>{pressureStatus.text}</p>
            </div>
          </div>

          <div className="btm-slider-block">
            <div className="btm-slider-header">
              <label htmlFor="angle">牙刷角度</label>
              <span>{angle}°</span>
            </div>
            <input
              id="angle"
              type="range"
              min="0"
              max="90"
              value={angle}
              onChange={(event) => setAngle(Number(event.target.value))}
            />
            <div className="btm-scale-row">
              <span>0°</span>
              <span>45° 推荐</span>
              <span>90°</span>
            </div>
          </div>

          <div className="btm-slider-block">
            <div className="btm-slider-header">
              <label htmlFor="pressure">刷牙力度</label>
              <span>{pressure}%</span>
            </div>
            <input
              id="pressure"
              type="range"
              min="0"
              max="100"
              value={pressure}
              onChange={(event) => setPressure(Number(event.target.value))}
            />
            <div className="btm-scale-row">
              <span>偏轻</span>
              <span>轻柔</span>
              <span>过重</span>
            </div>
          </div>

          <div className="btm-button-row">
            <button className="btm-primary-btn" onClick={startTraining} disabled={isRunning}>
              {isRunning ? "训练中..." : "开始刷牙动画"}
            </button>
            <button className="btm-ghost-btn" onClick={resetTraining}>
              重置
            </button>
          </div>
        </div>
      </section>

      <section className="btm-data-section">
        <div>
          <p className="btm-eyebrow">数据卡片</p>
          <h3>为什么优先演示巴氏刷牙法？</h3>
          <p>
            巴氏刷牙法强调牙刷贴近牙龈边缘，并进行小幅度轻柔清洁，适合转化为动画教学。
            在该实验数据中，刷牙 3 分钟后，巴氏刷牙法的菌斑去除率高于旋转刷牙法和生理刷牙法。
          </p>
        </div>

        <div className="btm-chart">
          {methodData.map((item) => (
            <div className="btm-bar-row" key={item.name}>
              <div className="btm-bar-label">
                <span>{item.name}</span>
                <strong>{item.value}%</strong>
              </div>
              <div className="btm-bar-track">
                <div className="btm-bar-fill" style={{ width: `${item.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="btm-tips-section">
        <h3>巴氏刷牙法动作提示</h3>
        <div className="btm-tips-grid">
          <div>
            <strong>01 角度</strong>
            <p>牙刷与牙龈边缘约 45°，刷毛轻触牙龈沟区域。</p>
          </div>
          <div>
            <strong>02 动作</strong>
            <p>小幅度、短距离、轻柔震颤，不要大力横向拉锯。</p>
          </div>
          <div>
            <strong>03 覆盖</strong>
            <p>外侧、内侧、咀嚼面都要刷，前牙内侧可竖起牙刷上下刷。</p>
          </div>
        </div>
      </section>
    </div>
  );
}
