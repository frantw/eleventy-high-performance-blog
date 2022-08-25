---
title: Hexo + GitHub Actions 打造自動部署
description: 手把手教學如何架置 Hexo 部落格，並透過 GitHub Actions 實作簡易的自動化部屬流程
date: 2019-12-22
tags:
 - CI/CD
 - Hexo
 - GitHub
image: https://i.imgur.com/ecETp6l.png
layout: layouts/post.njk
---

## 前言

這篇文章的出現，要從兩年前開始說起，那時候的我才剛開始摸 [Hexo](https://hexo.io/zh-tw/index.html)。
當時的我比起其他平台，像是 Wordpress / Medium / Logdown 等等諸如此類，更喜歡 markdown 寫作方式，所以興致沖沖地架了個部落格。

但是理想很豐滿，現實總是骨感——很快地，過了大約一年左右便很少更新，敵擋不過自己的惰性。

畢竟靜態網頁的佈署步驟太麻煩，必須滿足本地端有 Hexo 檔案的前提，我偏偏又喜歡用 [HackMD](https://hackmd.io/) 撰寫，一來一往之間步驟太過繁複。久而久之，這段時間我傾向於使用 HackMD 整理個人筆記，懶得發表技術文章到 blog 上。

直到我注意到 GitHub 推出 **CI/CD 服務**，能幫助我解決這個麻煩！趁這個機會我打算順便打理 Hexo 架構，把菜鳥時期我搭建的部落格重新打掉，在 2020 前夕超進化！

## 什麼是 Hexo

想進一步瞭解更多，可以看看中文的 [Hexo官方文件](https://hexo.io/zh-tw/docs/)。

>   Hexo 是一個快速、簡單且強大的網誌框架。Hexo 使用 Markdown（或其他渲染引擎）解析您的文章，並在幾秒鐘內，透過漂亮的主題產生靜態檔案。

Hexo 使用 Node.js 搭建，速度快且免費，操作也相對簡單，更是支持 Markdown ，也有不少第三方外掛系統。

## 開始使用 Hexo

### 準備工作 for Windows

事前需要先安裝以下軟體

-   [Node.js](https://nodejs.org/en/)
-   [Github](https://desktop.github.com/)
    - 當然你必須先擁有屬於自己的 github 帳號
    - 登入 Github 之後，點選右上角 Create repository
      Repository name 必須是 `github帳號.github.io` 並選擇 Public

安裝好上述軟體後，就可以打開 Shell 鍵入

```bash
npm install -g hexo-cli
```

透過 npm 就可以順利完成 Hexo 的安裝了

### 初始化和安裝

接下來，我們要進行初始化和安裝，在 Shell 鍵入

```bash
hexo init
npm install
```

跑完後，會在該資料夾底下新增所需要的檔案：

```plain
.
├── _config.yml
├── package.json
├── scaffolds
├── source
|   ├── _drafts
|   └── _posts
└── themes
```

等它跑完就可以開始寫新文章、架 blog 了，初步的建置就是如此簡單！

### 建立新文章

在 Shell 鍵入以下訊息

```bash
hexo new "postName"  # 建立一個新的文章
```

新文章的格式是 markdown，可以到 `source/_post/postName.md` 去修改


### 預覽 blog

在 Shell 鍵入

```bash
hexo g # (也可以打 hexo generate) 產生 blog
hexo s # (也可以打 hexo server)   讓 blog 可在 local 端檢視
```

在 `http://localhost:4000` 就可以看見剛剛建好的 blog

### 使用 Hexo Deploy 部署

先安裝 hexo-deployer-git

```bash
npm install hexo-deployer-git --save
```

接下來打開資料夾中的 `_config.yml` 編輯 `deploy:`

```bash
deploy:
  type: git
  repo: https://github.com/你的 github 帳號/你的專案名稱.git
  branch: master
```

完成設定以後，就可以發佈 blog 了

```bash
hexo deploy # (也可以打 hexo d) 發佈 blog
```

發布之後，到專案的 **Settings** 啟用 **GitHub Pages**
**Source** 的欄位就選剛才填的 deploy branch

![](https://i.imgur.com/wp4Qu8P.png)

等一段時間後，就會顯示啟用，就可以從 `http://github帳號.github.io` 連上 blog，完成初步工作！

到這個階段其實已經可以利用 `hexo` 基本指令在本地端架 blog 了，只是為了完成自動化部署，我又加入了 CI/CD 流程！

## 使用 GitHub Actions 實現 CI/CD

### 什麼是 CI/CD

> CI（Continuous integration）為「持續性整合」，目的是讓專案能夠在每一次的變動中都能通過一些檢驗來確保專案品質。 CD（Continuous Deployment）則為「自動化部署」，讓專案能夠自動在每次變動後能以最新版本呈現。

事實上在業界應用中，可做的多了，像是：環境建置、單元測試、日誌紀錄、產品部署，可以簡化開發流程。
而在 Hexo 的 blog 架設過程中，我們也能用它來達成自動部署！

**GitHub Actions** 是由 GitHub 提供的 CI/CD 服務，用於在 GitHub 建置、測試、封裝、發佈或部署任何專案。並可藉此建置端對端（end-to-end）CI/CD 功能。

Hexo 所提供的指令 `hexo generate` 其實是幫我們產生靜態網頁檔案，也就是 `public` 資料夾的內容。
同時 `hexo deploy` 則將 `public` 資料夾中的內容推送到 `_config.yml` 中指定的遠端專案的分支中，並 **完全覆蓋** 當下分支的已有內容。

因此我們的目的其實是要把這份運用 Hexo 框架的原始碼資料夾推送到 GitHub 的另一個專案分支上，並藉由 GitHub 所提供的 CI/CD 服務幫我們進行產生靜態網頁檔案，再推送到指定專案分支，也就是我們現在建立起 GitHub Pages 的專案上。

### 把 Hexo 原始碼推送到 GitHub

首先要把 Hexo 真正的 source code 推送到 GitHub 上建立一個新專案。
記得將這個專案設為 **Private**，不公開他人瀏覽。

```bash
git init
git add --all
git commit -m "First commit"
git remote add origin https://github.com/你的 github 帳號/新專案名稱.git
git push -u origin master
```

### 建立 SSH Key
在執行 Github Actions 的過程中，為了讓這段程式也可以把靜態網頁推送到原先我們所建立的專案上，必須建立一個 SSH Key 給它使用。

```bash
ssh-keygen -f github-deploy-key # 然後三次 Enter
```

 - 原始碼專案
   到 **Settings** 的 **Secrets** 去 Add a new secret
   - Name 輸入 `HEXO_DEPLOY_PRI`
   - Value 填上私鑰 `github-actions-deploy` 的內容

 - 靜態網頁專案
   到 **Settings** 的 **Deploy keys**
   - Title 輸入 `HEXO_DEPLOY_PUB`
   - Key 填上公鑰 `github-actions-deploy.pub` 的內容
   - 勾選 Allow write access

再打開資料夾中的 `_config.yml` 編輯 `deploy:`，要改成 ssh 連線才可以順利部署

```bash
deploy:
  type: git
  repo: git@github.com:你的github帳號/你的靜態網頁專案名稱.git
  branch: master
```

記得要 commit 後推送到專案上

### 設定 GitHub Actions

回到原始碼專案，到 **Actions** 右上角選擇 **Set up a workflow yourself**

我的 `main.yml` 設定如下


```yaml
name: Deploy Blog

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout
      uses: actions/checkout@v1
    - name: Use Node.js 10.x
      uses: actions/setup-node@v1
      with:
        node-version: "10.x"
    - name: Setup Hexo env
      env:
        HEXO_DEPLOY_PRI: ${{secrets.HEXO_DEPLOY_PRI}}
      run: |
        # set up private key for deploy
        mkdir -p ~/.ssh/
        echo "$HEXO_DEPLOY_PRI" > ~/.ssh/id_rsa
        chmod 600 ~/.ssh/id_rsa
        ssh-keyscan github.com >> ~/.ssh/known_hosts
        git config --global user.name '使用者帳號'
        git config --global user.email '使用者信箱'
        # install dependencies
        npm i -g hexo-cli
        npm i
    - name: Deploy
      run: |
        # generate and depoly
        hexo g -d
```

把 `main.yml` 推上 `workflows/` 後，再一次回到 Actions 確認 workflows 

![](https://i.imgur.com/BVXrSPn.png)

本地端檔案也要記得同步 `main.yml` 建立時推上去的 commit

```bash
git remote update
git pull
```

###  blog 變更生效

每次要更動 blog 內容，像是發文或更改佈景等操作都要記得推上去

```bash
git add .
git commit -m "變更內容"
git push origin master
```

Github Actions 就會幫我們自動執行後續動作

### 備份原始碼

既然都把原始碼 git 上去了，以後如果要在其他電腦架 blog，只需要
```bash
git clone git@github.com:你的github帳號/你的原始碼專案名稱.git
cd 你的原始碼專案名稱
npm install
```

順手完成了備份動作，是不是一石二鳥呢！

### 線上發文

現在讓我們試著用 GitHub 直接線上發文
到專案原始碼底下的 `source/_posts` 選擇右上角 **Create new file**

![](https://i.imgur.com/snIwAWC.png)

`file name` 即為`文章標題.md`，內容要調整成 hexo 文章格式

![](https://i.imgur.com/aB8fkjX.png)

然後選擇 **Commit new file**
如此以來就真正實現我想要的線上發布功能了！大功告成！

## 踩坑經歷

### 更改佈景主題

在 [Hexo Themes](https://hexo.io/themes/) 中尋找你喜歡的佈景主題並保存到 `themes` 下
之後打開 `_config.yml`，找到 `theme:` 修改成佈景名稱，也就是資料夾的對應名稱

如果是 git clone 下來的主題
為了得以順利執行 actions，必須先將 `themes` 底下的 `/.git` 刪除，然後加入
```bash
git add .\themes\主題名稱\
git add -f .\themes\主題名稱\_config.yml
```

### 設定自定義域名

重點同樣是域名服務商的設定，設定好之後記得要在 `source` 底下保存一個 `CNAME` 推上去
才不會每次 push 後自訂域名設定都被覆蓋
