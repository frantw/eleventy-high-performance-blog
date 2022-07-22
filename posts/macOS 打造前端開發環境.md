---
title: macOS 打造前端開發環境
description: 在 macOS 系統打造個人化前端開發環境
date: 2021-02-27
tags:
  - macOS
  - Homebrew
  - NVM
  - zsh
  - zimfw
  - iTerm2
  - VSCode
image: https://i.imgur.com/QkZmCtv.png
layout: layouts/post.njk
---

## 前言

最近剛拿到新的 MacBook Pro，早忘了幾年前安裝環境究竟處理過什麼細節
有些參考資料又比較過時，因此決定把這次安裝的程序和設定的細節記錄下來

以下所使用的是 macOS Big Sur 11.2.1 的 MacBook Pro (13-inch, 2020)

## 安裝 Homebrew

[Homebrew](https://brew.sh/index_zh-tw.html) 是 Mac 系統中的套件管理工具
利用 Homebrew 能讓我們不必藉由 App Store 或官網下載安裝檔就能取得許多軟體

在終端機輸入
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

後面會盡可能利用 `brew` 指令來安裝軟體，加快效率

## 安裝 Xcode Command Line Tool

Command Line Tools 是在 Xcode 中的一款工具，在 macOS 中，有許多的工具或是語言都會依賴這個命令列開發者工具

```bash
xcode-select --install
```

## 安裝 NVM

在安裝開發前端必備的 **Node.js** 以前，先讓我們來安裝 [NVM](https://github.com/nvm-sh/nvm)，英文全名是 Node Version Manager

NVM 的用途如同英文全名，便是用來管理 Node 版本的工具。因為在不同的專案之間，我們可能必須要切換不同版本的運行環境，這時 NVM 便能幫助我們輕鬆切換

在終端機輸入以下指令來安裝
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash
```

安裝完再輸入下面的指令
```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
```
這會把 NVM 的 Repo 資料夾複製到 `~/.nvm`
然後將 source line 加進 profile 設定檔中（`~/.bash_profile`、`~/.zshrc`、`~/.profile`或`~/.bashrc`）

## 透過 NVM 安裝 Node.js

JavaScript 通常是執行在瀏覽器的環境中，而 [Node.js](https://nodejs.org/en/) 能讓我們在後端（脫離瀏覽器環境的情況）中建立起能執行 JavaScript 的環境

- 使用 NVM 安裝最新版本的 Node.js
  ```bash
  nvm install node
  ```

- 或安裝最新 LTS 版本的 Node.js
  ```bash
  nvm install --lts
  ```

- 或安裝指定的 Node.js 版本
  ```bash
  nvm install 12.16.3
  ```

- 需要切換當前使用版本
  ```bash
  nvm use 12
  ```

- 要查看目前是使用哪個版本
  ```bash
  nvm current
  ```

## 安裝 NPM

其實在我們安裝 Node.js 時，通常都會附帶安裝 [NPM](https://www.npmjs.com/)，英文全名為 Node Package Manager

NPM 是套件管理工具，能幫助我們管理專案的安裝套件，做到自動下載和版本控制等等的事情

雖然剛才已經順帶安裝了，但我想指定使用特定版本的 NPM
```bash
npm i -g npm@6.14.4
```

這裡使用了縮寫 `i` 表示 `install`，`-g` 則是 `--global` 的縮寫，代表全域安裝，而不只是安裝在目前的專案目錄裡

## 安裝 wget

[wget](https://www.gnu.org/software/wget/) 和前面我們所用到的 curl 指令，兩者都是 Linux 中用來下載檔案的
只不過在 macOS 中並沒有預設安裝 wget，但未來我們可能還是有機會用上

```bash
brew install wget
```

## 安裝 Git

[Git](https://git-scm.com/) 是一種版本控制系統
其實 MacOS 預設是有安裝 Git 的，只是有版本過舊的可能

確認目前的 Git 版本
```bash
git --version 
```

需要的話，重新安裝 Git 來取得最新版本
```bash
git clone https://github.com/git/git
```

記得設定 `git config` 的識別資料，這樣每次 Git 的提交才會標註上你的資訊
```bash
git config --global user.name "John Doe"
git config --global user.email johndoe@example.com
```

確認 `git config` 的資訊
```bash
git config --list
```

## 安裝 iTerm2

比起原生終端機，我個人還是喜歡使用 [iTerm2](https://iterm2.com/)

```bash
brew install iterm2
```

接下來設定顏色樣式，到 [Iterm2-color-schemes](https://iterm2colorschemes.com/) 挑一個喜歡的顏色組合吧！

滑鼠右鍵、另存連結，存下 `.itermcolors` 檔案，再回到 iTerm2 中依序點擊

```text
Preferences → Profiles → Colors → Color Presets... → Import...
```

選擇剛才下載的 `.itermcolors` 檔案（我使用的是 [Brogrammer](https://raw.githubusercontent.com/mbadolato/iTerm2-Color-Schemes/master/schemes/Brogrammer.itermcolors)）

## 安裝 zsh

Zsh 又稱為 Z shell，和常聽到的 Bash 類似，都是一種 shell 工具
從 macOS Catalina（10.15）版本後，是使用 Zsh 作為預設 shell

如果是以前的系統版本，會需要再手動安裝
```bash
brew install zsh
```

確認是否安裝成功
```bash
zsh --version
```

## 安裝 zimfw

[Zim](https://zimfw.sh/) 是一個管理 zsh 組態設定的框架

以前我使用的其實是另一個叫做 [oh-my-zsh](https://ohmyz.sh/) 的老牌框架，但是 oh-my-zsh 比較肥一些

直到後來我發現了 Zim，一些我常用的功能在 Zim 之中也都有，[速度](https://github.com/zimfw/zimfw/wiki/Speed)又相較 oh-my-zsh 快上不少，所以就改用這個

```bash
curl -fsSL https://raw.githubusercontent.com/zimfw/install/master/install.zsh | zsh
```

## 安裝 Powerlevel10k

[Powerlevel10k](https://github.com/romkatv/powerlevel10k) 是一個 Zsh 外觀主題，還有方便的自動設定介面

要搭配 Zim 安裝，可以輸入

```bash
vi ~/.zimrc
```

把 `zmodule steeef` 這行改成 `zmodule romkatv/powerlevel10k`

儲存退出後，回到終端機輸入
```bash
zimfw install
source ~/.zshrc
```
`source ~/.zshrc` 會重新載入配置文件，當然也能直接重新啟動終端機來重載

重載後便會進入 Powerlevel10k 的自動設定介面

![](https://i.imgur.com/nPErbkB.png)

如果沒有的話，先重開終端機，再輸入設定指令
```bash
p10k configure
```
理論上在過程中會自動安裝我們所需要的 powerline 字體 - Meslo Nerd Font

要回到 iTerm2 中確認字型是 `MesloLGS NF` 並設定字體大小，依序點選

```text
Preferences → Profiles → Text
```

## 安裝 VSCode

程式碼編輯器 [Visual Studio Code](https://code.visualstudio.com/)，吃飯工具相信不用多做解釋

```bash
brew install --cask visual-studio-code
```

再打開 VSCode 按下 Command + Shift + P，安裝 Shell 指令 `code`

```bash
Install 'code' command in PATH command
```

`code` 指令能讓我們在終端機快速用 VSCode 打開檔案或資料夾

```bash
code file_or_folder_name
```

設定預設終端機和字體，在 VSCode 依序點擊
```text
Preferences → Settings → Features → Terminal 
```

 1. 將 `OsxExec` 的欄位設定成 `iTerm.app`
 2. 將 `Font Family` 的欄位設定成 `MesloLGS NF`

## 安裝其他程式

到這裡為止，其實已經能滿足大部分的開發需求了
再來就是安裝一些瀏覽器或是其他工作上可能需要的工具

 - 安裝 [Google Chrome](https://www.google.com/chrome/)
    ```bash
    brew install --cask google-chrome
    ```
 - 安裝 [Mozilla Firefox](https://www.mozilla.org/firefox/)
    ```bash
    brew install --cask firefox
    ```
 - 安裝 [Microsoft Edge](https://www.microsoft.com/edge)
    ```bash
    brew install --cask microsoft-edge
    ```
 - 安裝 [Docker](https://www.docker.com/)
    ```bash
    brew install --cask docker
    ```
 - 安裝 [tmux](https://tmux.github.io/)
    ```bash
    brew install tmux
    ```
 - 安裝 [bat](https://github.com/sharkdp/bat)，記得在 `~/.zshrc` 中加入 `alias cat="bat"`
    ```bash
    brew install bat
    ```
 - 安裝 [exa](https://the.exa.website/)，記得在 `~/.zshrc` 中加入 `alias ls="exa"`
    ```bash
    brew install exa
    ```
 - 安裝 [BetterTouchTool](https://folivora.ai/)
    ```bash
    brew install --cask bettertouchtool
    ```
 - 安裝 [Fork](https://git-fork.com/)
    ```bash
    brew install --cask fork
    ```
 - 安裝 [p7zip（7-Zip）](https://github.com/jinfeihan57/p7zip)
    ```bash
    brew install p7zip
    ```
 - 安裝 [Slack](https://slack.com/)（順便一提，我使用的是 [Convoy](https://slackthemes.net/#/convoy) 這個顏色主題）
    ```bash
    brew install --cask slack
    ```

## 結語

雖然上面洋洋灑灑列了一大篇，但其實還有其他的眉眉角角，比如說

- 設定 SSH 金鑰，可以參考我之前寫的另一篇[文章](https://blog.wjhuang.com/posts/83ff426e/#%E5%9C%A8-OSX-%E8%88%87-Linux-%E7%92%B0%E5%A2%83%E4%B8%8B%E7%94%A2%E7%94%9F-SSH-key)
- 安裝 VSCode 的擴充套件
- 安裝 Chrome 的擴充功能
- ……

還有許多小工具能幫助開發體驗更加美好，這些就留待未來有機會再補充囉！
