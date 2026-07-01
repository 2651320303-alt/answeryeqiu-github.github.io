# 护牙人格测试

《护牙人格测试》是一个 React + Vite H5 新媒体互动网页，把牙膏选择、刷牙方式、饭后清洁和辅助工具认知包装成“人格测试 + 卡牌图鉴 + 护牙任务挑战”的体验。

主题：护牙人格测试  
副标题：测测你是哪种口腔生活型人格

## 运行方式

推荐方式：直接双击项目根目录的 `start-local.bat`，脚本会自动启动本地网页服务并打开页面。

```bash
npm install
npm run dev
```

启动后固定打开：`http://127.0.0.1:5173/`。

为了避免重启电脑后本地地址打不开，已在当前 Windows 用户的“启动”文件夹中加入自动启动命令。电脑登录后会自动运行 `start-local.ps1 -NoBrowser`，后台启动本地 Vite 服务；之后直接访问 `http://127.0.0.1:5173/` 即可。

如果自动启动失效，手动双击 `start-local.bat` 即可恢复。`127.0.0.1` 是本机地址，必须有本地服务运行才会显示网页。

生产构建：

```bash
npm run build
```

部署到 GitHub Pages、Vercel 或 Netlify 时，上传 `dist` 目录中的 `index.html` 和 `assets` 文件夹即可。

## 主要功能

- 首页 Hero：使用 7 人格站位图作为主视觉，加入贴纸标签、浮动动效和测试入口。
- 护牙人格图鉴：7 张人格卡横向滑动，点击翻面查看人群画像、风险提醒和护牙建议。
- 人格测试：10 道生活习惯题，使用 `mintLightning`、`nightGummy`、`skipFrame`、`roseAlert`、`pearlFilter`、`cloudSave`、`caramelBubble` 作为计分维度。
- 护牙黑话词典：含氟、美白、护龈、抗敏等包装词翻牌卡，把营销词翻译成人话。
- 购买选择反馈：对“美白、抗敏、护龈、价格、香味、品牌、网红推荐、含氟防龋”等选择给出判断建议。
- 刷牙工具推荐：普通牙刷 / 电动牙刷对比，并保留巴氏刷牙法动画挑战。
- 辅助工具解释：漱口水、冲牙器、牙线、洗牙等工具展开说明，强调不能替代刷牙。
- 饭后清洁建议：根据奶茶、咖啡、酸性饮料、黏性零食、正餐、夜宵输出任务式建议。
- 结果页：生成护牙人格卡，支持保存分享卡、复制链接、系统分享、再测一次和查看全部人格图鉴。

## 7 个人格

展示顺序固定为：

1. 薄荷闪电型
2. 深夜软糖型
3. 跳帧省略型
4. 玫瑰警报型
5. 珍珠滤镜型
6. 云朵省电型
7. 焦糖泡泡型

其中“云朵省电型”代表想护牙但怕麻烦，希望找到最省事方案；“跳帧省略型”代表对刷牙和护牙关注度较低，容易把刷牙做成快速略过的动作。

## 图片资源

页面会优先读取：

- `/assets/personas/mint-lightning.png`
- `/assets/personas/night-gummy.png`
- `/assets/personas/skip-frame.png`
- `/assets/personas/rose-alert.png`
- `/assets/personas/pearl-filter.png`
- `/assets/personas/cloud-save.png`
- `/assets/personas/caramel-bubble.png`
- `/assets/personas/lineup-7-clean.png`

如果 `skip-frame.png` 或 `lineup-7-clean.png` 暂时不存在，页面会自动使用已有站位图或渐变文字 fallback，不会报错。

## 技术栈

- React
- Vite
- TypeScript
- Tailwind CSS
- Canvas 分享卡导出

## 设计说明

页面不是普通医学科普页，而是“卡牌游戏入口 / 人格测试 / 角色图鉴 / 护牙任务挑战”的混合型信息设计作品。它用强标题、粗描边、贴纸标签、翻牌卡、横向滑动角色卡和结果分享卡来增强传播性，同时把护牙知识转译为轻量选择题和可执行建议。

医学表达保持克制：不宣称牙膏可以治疗疾病，不说漱口水或冲牙器可以替代刷牙；巴氏刷牙法作为本设计的标准化教学模板呈现，不表述为唯一正确方法。
