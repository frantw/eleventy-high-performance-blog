---
title: 離開 Hexo，使用 Eleventy 架設部落格
description: 棄用了過去的 Hexo 建置方式，改為使用 Eleventy (11ty) 來架設技術部落格的一些心得分享
date: 2022-08-02
tags:
 - Eleventy
 - 11ty
 - Hexo
 - CI/CD
 - Cloudflare
image: https://i.imgur.com/wnR3ScU.png
layout: layouts/post.njk
---

## 前言

從今年年初便知道 [Eleventy](https://www.11ty.dev/) 這樣的一套 Static Site Generator，經過一番評估之後，最近終於趁著空閒的空檔，選擇 [Eleventy](https://www.11ty.dev/) 作為新的技術框架，並以 [eleventy-high-performance-blog](https://github.com/google/eleventy-high-performance-blog) 作為基底，架置了新的部落格，和過去所使用的 [Hexo](https://hexo.io/zh-tw/) 框架說掰掰。

## 為什麼不用 Hexo？

過去我使用 [Hexo](https://hexo.io/zh-tw/) 架置部落格也有好幾年，事實上作為新手架置部落格的選擇來說，還是一個很不錯的選擇。

我認為 [Hexo](https://hexo.io/zh-tw/) 有以下的優點：
- 基於 Node.js 撰寫，在本地編譯建置靜態頁面，有一定 SEO 優勢
- 開源社群十分活躍，你幾乎不需要自己重造輪子
- 基於以上，有豐富的漂亮主題與外掛
- 中文文件、網路資源多，學習成本低

但是，基於以上的優點……菜鳥時期的我也犯下了一些錯誤：
- 套用了漂亮的主題，卻未著重效能
- 使用第三方外掛，實際上未必需要那麼強大的自定義功能，增加程式複雜度
- 使用第三方套件並未積極更新最新版本，間接導致損失了可能的效能改進或延伸出資安問題

![舊桌機版網頁 Lighthouse 表現](https://i.imgur.com/PgaB6fJ.png)
> 過去我所使用的是 [hexo-theme-icarus](https://github.com/ppoffice/hexo-theme-icarus) 這個主題，利用 Lighthouse 量測，在桌機上的表現還不算太差，但還有改善空間

![舊手機版網頁 Lighthouse 表現](https://i.imgur.com/BD0Bwpm.png)

> 然而透過 Lighthouse 量測，在手機上的表現是顯而易見的差強人意

其實後來想想，我真的需要這個主題之中的每一個功能嗎？答案當然是否定的。

對於自己的部落格，我的要求也和以前的我有所不同：
- 效能優化擺在第一順位考量，不需要太浮誇的功能，越簡潔越好
- 比起過於笨重的第三方套件，還不如不要，我可以自己動手
- 基於前者，要容易按照我自己的需求客製化，框架架構不要太複雜

釐清自己的需求與目的後，開始研究不同技術與工具評估，透過 Huli 的這篇文章（[除了 hexo，也可以考慮用 eleventy 來寫技術部落格](https://blog.huli.tw/2021/08/22/eleventy-over-hexo/)）我得知了 [eleventy-high-performance-blog](https://github.com/google/eleventy-high-performance-blog) 這個 template repo。

## 關於 eleventy-high-performance-blog

[eleventy-high-performance-blog](https://github.com/google/eleventy-high-performance-blog) 是一套由 google 工程師所建置的開源部落格模板，以打造高速效能為重點，這個模板已經建構好一套相對完整的架構，包含：
 - **圖片最佳化**（響應式圖片、lazy load、轉換 webp / AVIF 等優化格式）
 - **CSS / JS minify**（使用 [rollup.js](https://rollupjs.org/guide/en/)、[PurgeCSS](https://purgecss.com/) 等工具）
 - **基本 SEO 建設**（HTML 語意化、meta tag、Sitemap 等等）
 - 考量 **[Web Accessibility（a11y）](https://developer.mozilla.org/en-US/docs/Web/Accessibility)** 而實作
 - 導入了 [mocha](https://mochajs.org/)，有一套**基本的測試架構**，CI 階段可整合測試

專案架構也清晰精簡，易於改動維護，可以說是麻雀雖小，五臟俱全！

非要雞蛋裡挑骨頭的話，這個模板未經修改、直接建置的 [Demo site](https://eleventy-high-performance-blog-sample.industrialempathy.com/) 看起來確實是比 Hexo 社群那些酷酷的主題要來得精簡許多……

但是，正如這個專案的 README 所說：
> Knock yourself out. This is a template repository.

![接受挑戰](https://i.imgur.com/2v7qWrx.png)

**Ok，我接受這個挑戰！**

## 架設個人化部落格的心路分享

開始改造的第一步，首要之務當然是：**確立風格，列出需求**

以我的例子來說，參考了一些前輩和同事的技術部落格後，確立自己心有所屬的主題風格後，再將我心中的想像、這其中必備的功能一一列出來：

- 留言功能是必備
- 文章要有漂亮的封面圖片
- 想要深色主題和淺色主題的切換功能
- 要有頁面分頁功能（分頁邏輯要和舊站一致）
- 文章 link url 的轉換規則需要調整，不直接使用 title 字串（邏輯要和舊站一致，方便我作 301 轉址）
- 串接 Google Analytics

……諸多調整和樣式有關，族繁不及備載。

總而言之，事前確認越是具體，實作階段也就更明確，避免反覆修改。

### Color Palette

Color Palette 的部分，我則是借助了 [Colormind](http://colormind.io/bootstrap/) 這個網站幫我配好合理的網頁配色，實務上再按需求作一些 darken & lighten 色彩轉換。

![Colormind](https://i.imgur.com/ZB4faSz.png)

> 只需要選好主色，點擊 Generate 便會自動產生合理的網頁配色。當然，你也可以設定副色等等，將其一併納入考量！


### 留言功能 - [Giscus](https://giscus.app/zh-TW)

至於留言功能的部分，本來是在 [utterances](https://utteranc.es/) 和 [JamComments](https://jamcomments.com/) 之間反覆猶豫，兩者對我來說各有優缺。

我一直以來都不是很喜歡 [utterances](https://utteranc.es/) 這種相依於 GitHub issues 相關 API 的方式，其實使用上並不會造成什麼問題，但對我來說 ...Is this an issue for me? 

心裡總是有種彆扭的感覺在那裡，否則單以功能面來說，[utterances](https://utteranc.es/) 絕對是可以滿足我的需求。

反過來說，[JamComments](https://jamcomments.com/) 這個第三方服務雖然看起來和 Eleventy 有不錯的支援性，甚至文件上也提供了[官方外掛](https://jamcomments.com/docs/integrations/eleventy/)，但是對我而言，網站所相依的第三方服務，當然還是能少一個是一個。

直到我在 SNS 上偶然看見有人推薦 [Giscus](https://giscus.app/zh-TW) 這個工具，完美解除了我上述的疑慮！

[Giscus](https://giscus.app/zh-TW) 其實是受到 [utterances](https://utteranc.es/) 啟發，但不同的是，背後所使用的是 GitHub Discussions 相關 API。

當然這套工具也支援多樣的主題樣式設定，支援多語言，還可以讓我透過 `window.postMessage` 等方式對 giscus iframe 做更進一步的動態互動。

文件很清楚，串接過程中也沒遇到什麼問題，是一套我會想強力推薦給大家的留言系統工具！

### CI/CD

在本地環境弄得差不多了，下一步開始著手調整 CI/CD workflow。

CI 部分，原有的架構會有在 run build 過程中耗時過久的問題，我選擇直接對最費時的圖片處理流程下手，調整 `.gitignore` 設定，將 `_site/img` 事先 commit 進 repo（畢竟我的個人需求也不是很需要時常更新既有的靜態圖檔），如此一來可節省 5 到 10 分鐘不等。

CD 部分，我就直接使用 GitHub Actions 一口氣處理掉了，覺得自己不太需要用到 [Netlify](https://www.netlify.com/) 服務，需要作轉址或是 SSL 憑證則是透過熟悉的 [Cloudflare](https://www.cloudflare.com/zh-tw/) 幫忙處理。

#### CI/CD flow 說明

基本上常駐的就是三支 branch：

 - **`develop`**：主要開發與測試使用，有異動便會觸發 `build & test` CI 流程，沒問題再人工手動進 code 到 `main` branch
 - **`main`**：有異動便會觸發 `build & deploy` CD 流程，將建置產生的異動自動推上 `gh-pages` branch
 - **`gh-pages`**：不直接對這個 branch 操作，有異動就會直接觸發 Github 預設的 `pages build and deployment` workflow，我什麼都不用做 😆

#### `build & deploy` workflow 設定檔範例
```yml
name: build & deploy
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [14.x]
    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v1
        with:
          node-version: ${{ matrix.node-version }}
      - name: Install dependencies and build
        run: npm install && npm run build-ci
      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          ssh-key: ${{ secrets.DEPLOY_KEY }}
          branch: gh-pages
          folder: _site
```

Deploy job 使用了 [JamesIves/github-pages-deploy-action](https://github.com/JamesIves/github-pages-deploy-action) 代勞，記得按照[文件說明](https://github.com/JamesIves/github-pages-deploy-action#using-an-ssh-deploy-key-)去 Repo Settings 設定 **Deploy key** 和 **Repository secrets**。

### 購買自定義域名，設定 Cloudflare 代管 DNS

不詳述如何設定自定義域名了，總之買完之後要去域名服務商調整設定，使用 [Cloudflare](https://www.cloudflare.com/zh-tw/) 代管 DNS。

可以參考我過去的這篇文章：[什麼是 SSL？透過 Cloudflare 來啟用 HTTPS](https://frannn.dev/posts/d22e4c38/#%E7%94%A8-cloudflare-%E5%8A%A0%E4%B8%8A-ssl-%E6%86%91%E8%AD%89)

光是 [Cloudflare](https://www.cloudflare.com/zh-tw/) 的免費方案就提供了許多網站加速、安全防禦服務，我重點設定的項目有這些：

- **SSL/TLS 憑證**（一律使用 HTTPS，同時自動改寫）
- **Caching**（調整瀏覽器快取 TTL 時間）
- **使用 [Auto Minify](https://support.cloudflare.com/hc/en-us/articles/200168196-Using-Cloudflare-Auto-Minify)**
- **啟用 Brotli 壓縮**
- **啟用 [Rocket Loader](https://support.cloudflare.com/hc/en-us/articles/200168056-Understanding-Rocket-Loader)**

### 成果

最後，你現在眼前所看到的這個 blog 便是一切的成果！

![新桌機版網頁 Lighthouse 表現](https://i.imgur.com/KyKloTT.png)
> 利用 Lighthouse 量測，同一篇文章在桌機上的表現

![新手機版網頁 Lighthouse 表現](https://i.imgur.com/N1hTyGZ.png)
> 利用 Lighthouse 量測，同一篇文章在手機上的表現

可以看到，雖然加了一些雜七雜八客製化功能和樣式（甚至是串上了 Google Analytics），但 Lighthouse 還是有很亮眼的表現。

再進一步比較修改前和修改後，手機版網頁上的各個指標所耗費時間：

![舊手機版網頁的 Performance](https://i.imgur.com/szsJ4v3.png) 
> Before：**FCP** 時間高達 3.1 秒，**LCP** 時間更需要 9.4 秒，完全就是不合格。

![新手機版網頁的 Performance](https://i.imgur.com/bcn8AYg.png)
> After：**FCP** 時間降至 1.0 秒，**LCP** 時間只需要 1.3 秒，指標一切綠燈！

對於這樣的復仇成果，我個人可以說是相當滿意。

## 總結

感謝前人指路，讓我發現了一套這麼棒的模板工具！

過去我是懶人起手，直接交給了 Hexo 社群提供的主題來包辦一切，但是無形之中也因個人掌握不足，間接導致一些額外的效能問題。

這次基於簡潔的 [eleventy-high-performance-blog](https://github.com/google/eleventy-high-performance-blog) 模板工具來開發，客製化個人功能的過程中，每告一段落、完成了一個較大規模的異動調整，我就會停下來檢查一下剛才完成的部分有沒有什麼地方可以再優化。（我個人是花了點心力在確認資源載入的 `preload` 設定等等）

與日常的專案開發不同，受限於頻繁的功能迭代有時候很難落實這件事情──然而**頻繁量測，不斷地調整與測試，是提升網頁效能的必經之路**。

不排斥自己動手來的話，我是很推薦 [eleventy-high-performance-blog](https://github.com/google/eleventy-high-performance-blog) 這個模板工具的，還收穫了滿滿的成就感！

這個部落格的原始碼放在 [GitHub](https://github.com/frantw/eleventy-high-performance-blog) 上，如有疑問歡迎在這篇文章底下留言。

### 其他參考
 - [除了 hexo，也可以考慮用 eleventy 來寫技術部落格](https://blog.huli.tw/2021/08/22/eleventy-over-hexo/)
 - [為什麼我離開 Medium 用 eleventy 做一個 blog](https://jason-memo.dev/posts/why-i-leave-medium-and-build-blog-with-eleventy/)
