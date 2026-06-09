# 护牙选择器

《护牙选择器》是一个移动端优先的 H5 互动网页项目，用于帮助用户判断牙膏选择、刷牙方式和饭后清洁时机。项目为纯前端静态应用，不需要后端或登录，适合部署到 Vercel、Netlify、GitHub Pages 或学校服务器后扫码传播。

## 本地运行

```bash
npm install
npm run dev
```

开发服务启动后，按终端提示打开本地地址即可体验。

## 构建静态文件

```bash
npm run build
```

构建完成后，`dist` 目录就是可部署的静态网页文件。

## 部署到 Vercel

1. 将项目推送到 GitHub 仓库。
2. 打开 Vercel，选择 `Add New Project`。
3. 导入该仓库。
4. Framework Preset 选择 `Vite`。
5. Build Command 使用 `npm run build`。
6. Output Directory 使用 `dist`。
7. 部署完成后，复制 Vercel 生成的网址即可分享。

## 部署到 GitHub Pages

1. 安装 GitHub Pages 部署工具：

```bash
npm install gh-pages --save-dev
```

2. 在 `package.json` 中补充脚本：

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. 执行部署：

```bash
npm run deploy
```

4. 在 GitHub 仓库的 `Settings > Pages` 中确认 Pages 地址。

如果仓库不是根域名部署，建议在 `vite.config.js` 中设置对应的 `base` 路径。

## 如何把生成的网址转成二维码

部署完成后，打开线上网页，页面底部有“分享给朋友”区域：

- 点击“复制链接”可以复制当前网页地址。
- 点击“生成二维码”会在页面中生成当前网页链接对应的二维码。
- 也可以把部署后的 URL 粘贴到任意二维码生成工具中，下载后放入海报、PPT 或课堂展示页。

## 分享能力

- 在线链接分享：部署后通过一个 URL 直接访问。
- 二维码传播：页面内置二维码生成区域，二维码内容为当前网页链接。
- 系统分享：支持 `navigator.share` 的浏览器会打开系统分享面板；不支持时自动复制链接。
- 个人护牙分享卡：完成测试后可生成适合截图传播的结果卡。
