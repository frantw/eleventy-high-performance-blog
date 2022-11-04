---
title: 玩轉 VSCode Neovim，快，還要更快！
description: 在使用 VSCode 作為編輯器的基礎上，透過 VSCode Neovim 以 vim 的方式撰寫程式碼，相關設定的心得分享
date: 2022-11-04
tags:
 - VSCode Neovim
 - VSCode
 - Vim
image: https://i.imgur.com/9LLtzdC.jpg
layout: layouts/post.njk
---

## 前言

最近我開始嘗試用 Vim 開發，然而該如何與一直以來使用的 VSCode 整合習慣，也就成了一大課題

就像是武術有不同的流派，有各家之長，修行在個人，不同的武術家又有不同的個人風格。同樣的工具，隨著每個人不同的使用習慣，也會延伸出不同的使用方式

以下會介紹我如何入門使用 VSCode Neovim，逐而摸索出自己的一套整合開發習慣。這些個人設定並沒有所謂的「標準答案」。

## 什麼是 VSCode Neovim？

其實 [VSCode Neovim](https://marketplace.visualstudio.com/items?itemName=asvetliakov.vscode-neovim) 是一個 VSCode 中的擴充插件，讓我們得以在 VSCode 中嵌入使用 [NeoVim](https://neovim.io/) 

背後的工作原理可以簡化為：
- 當 VSCode 開啟時，連上 Neovim instance
- 在 normal/visual 模式時，指令直接送往 Neovim，而這個插件會監聽 Neovim 的變化，在 VSCode 中同步編輯
- 切換到 insert 模式的時候，則會停止監聽，將編輯掌控權交由 VSCode 本身，直到模式再度切換
- 部分指令像是檔案儲存、視窗滾動，等等的操作都是直接透過 VSCode command 來完成，而非 Vim 的原生指令

這部分在[官方文件](https://github.com/vscode-neovim/vscode-neovim)中有更加詳盡的介紹

也許有人讀到這裡，已經受不了這些，想直接往下找設定懶人包了吧？

但是明白了工作原理，對於在 VSCode 中的實際操作，個人設定的調整和 Debug 上是很有幫助的。不管怎麼說，先在腦海中留下初步的印象就對了！

## VSCode Neovim vs VSCodevim

為什麼我選擇使用 VSCode Neovim？而不使用 [VSCodevim](https://marketplace.visualstudio.com/items?itemName=vscodevim.vim) 這個擴充插件？

……坦白說，理由很簡單，就是後者用起來不是那麼順暢。

VSCodevim 在原理上更像是 VSCode 模擬 Vim 操作鍵位的擴充應用，但我個人實際操作上，能感覺到一定程度的明顯卡頓，經過嘗試後在第一時間光速棄坑🙃

除此之外，要做一些 Vim 相關的個人化的設定的話，所有設定都需要直接異動 VSCode 的 `keybindings.json` 或是 `settings.json`，和一般調整 `.vimrc` 設定檔的撰寫格式稍有不同

在這一點上，使用 VSCode Neovim 其實也有不可避免的情況，比方說：需要針對 insert mode 做相關調整，還是會需要異動上面這兩個檔案，但這樣的特殊設定對我來說能少一個是一個

也是想給自己留條後路，~~萬一以後改用其他的 IDE 多少能省下一些麻煩~~

但這樣說起來，VSCodevim 難道沒有優點嗎──還是有的！

對於剛開始學習 Vim 的新手來說，VSCodevim 有比較直覺的 toggle 切換功能，在切換是否使用 Vim 時較為便利

一開始不用多想，直接使用插件的預設設定來操作 Vim，可以省去部分自行研究設定的麻煩，迴避掉一些剛入門學習的陣痛

## 開始使用 VSCode Neovim

事不宜遲，開始進行 VSCode Neovim 的基本環境設定吧！

### 在 VSCode 中安裝 VSCode Neovim 擴充插件

第一步，當然是要先安裝 [VSCode Neovim](https://marketplace.visualstudio.com/items?itemName=asvetliakov.vscode-neovim) 的插件

### 安裝 Neovim

在這裡利用 homebrew 來安裝 Neovim

```bash
brew install neovim
```

### 建立 init.vim

```bash
mkdir ~/.config
touch ~/.config/nvim/init.vim
```

透過指令 `nvim ~/.config/nvim/init.vim` 便可以進行內容編輯

```vim
if exists('g:vscode')
    " VSCode extension
else
    " ordinary neovim
endif
```

### 編輯 VSCode settings.json

需要先在終端機輸入 `which nvim` 確認 nvim 的路徑

打開 VSCode 的 `settings.json`，進行以下內容的編輯：

```json
{
  "vscode-neovim.neovimExecutablePaths.darwin": "${nvim 路徑}",
  "vscode-neovim.neovimInitVimPaths.darwin": "Users/${使用者名稱}/.config/nvim/init.vim",
}
```

### 修改 macOS 中針對 VSCode 的鍵盤鍵入設定

需要在終端機中輸入：

```bash
defaults write com.microsoft.VSCode ApplePressAndHoldEnabled -bool false
```

否則在 VSCode 進行 hjkl 移動時，將按鍵按住不放時，只會移動一格，並不會一路向前

### 編輯 VSCode keybindings.json

到這一步其實已經完成得差不多了，但或許實際投入開發，會需要因應個人習慣做一些 VSCode 中的快捷鍵調整

針對 insert 模式，可以透過類似以下的形式來設定：

```json
[
  {
    "command": "vscode-neovim.compositeEscape1",
    "key": "j",
    "when": "neovim.mode == insert && editorTextFocus",
    "args": "j"
  }
]
```

而某些特殊鍵（control/alt/command）等等的組合鍵，會需要特別在 VSCode 指出，傳給 Neovim

這部分也可以按照個人需要加以調整；

```json
[
  {
    "key": "cmd+.",
    "command": "vscode-neovim.send",
    "when": "editorFocus && neovim.mode == 'visual'",
    "args": "<D-.>"
  }
]
```

### 安裝 vim-plug

要更進一步提升效率，絕對少不了 vim 插件的應用，我選擇使用 [vim-plug](https://github.com/junegunn/vim-plug) 這個 plug manager

```bash
curl -fLo "${XDG_DATA_HOME:-$HOME/.local/share}"/nvim/site/autoload/plug.vim --create-dirs \
       https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
```

要安裝 plugin，只需要在先前的 `~/.config/nvim/init.vim` 開頭加入：

```vim
call plug#begin()
" use VSCode easymotion when in VSCode mode
Plug 'asvetliakov/vim-easymotion'
call plug#end()
```

再下 `:PlugInstall` 命令來安裝即可
當然別忘了必須以 `nvim` 指令來開啟編輯 `init.vim`

## 我的個人 init.vim 設定檔

關於更詳盡的 `init.vim` 設定檔細節以及安裝的 plugin

可以直接參考我的 Repo：[nvimrc](https://github.com/frantw/nvimrc)

## 其他輔以運用的 VSCode 插件

在這裡推薦一些我個人有安裝的 VSCode 插件，對於提升開發效率也有一定程度的幫助

各種程式語言的 Refactor 插件或是 Snippets 插件就不特別列出
（這是最基本的，但也需要親自閱讀文件，記憶可用功能和對應 shortcut）

### Which Key

[Which Key](https://marketplace.visualstudio.com/items?itemName=VSpaceCode.whichkey) 提供了另一種形式的功能菜單，可以大幅度降低我們死背硬記 shortcut 的困擾

原則上進行個人設定的調整時，最好盡可能根據[關鍵少數法則](https://en.wikipedia.org/wiki/Pareto_principle)來調整：**透過最常用的 20% 功能指令，去覆蓋 80% 的需求應用**

但不可避免的，總是有碰上剩下的 20% 需求應用的時候，透過 Which Key 搭配 `keybindings.json` 的客製化設定，就能盡可能覆蓋這部分的需要

### Double Line Numbers

[Double Line Numbers](https://marketplace.visualstudio.com/items?itemName=slhsxcmy.vscode-double-line-numbers) 提供了雙排行號的介面

當然，只是要切換成相對行號的介面的話，即使不安裝這個插件也是能辦到的

你只需要在 VSCode 的 `settings.json` 中加入 `"editor.lineNumbers": "relative"` 就可以了

個人之所以會安裝這個插件，是因為工作上與同事的往來會需要頻繁展示畫面，多了一排絕對行號能減少一些溝通困擾

我是設定成 `Double Line Numbers: Absolute + Relative` 的形式，並將相對行號那排的 Font color 設定為高亮顏色

### Clipboard

[Clipboard](https://marketplace.visualstudio.com/items?itemName=Digoro.Clipboard) 作為一個輕量的插件，提供了循環剪貼簿的功能

只要透過 `Shift + Ctrl + V` 或 `Shift + Command + V` 的快捷鍵來貼上，就可以從 clipboard history 中選取項目來貼上

而我另外調整了自己的 `init.vim`，加上以下設定：

```vim
set clipboard=unnamedplus
augroup SyncVSCodeClipboard
    autocmd!
    autocmd TextYankPost * if v:event.operator ==# 'y' | call VSCodeNotify('clipboard.copy', @) | endif
augroup END
```

這樣一來，每當觸發 `yank` 便會自動同步到這個插件的紀錄之中，可以用來循環貼上

## 踩坑

### 在 visual mode 的選取範圍，並不真正在 VSCode 中被選取

說實在的，這是我個人覺得 VSCode Neovim 擴充插件最坑人的地方。


我會留意到這個現象，是出於這樣的情境需要：

> 在 VSCode 中我想選取特定範圍的程式碼，再呼叫 VSCode 內建的 Quick Fix 功能來進行重構

當我在 visual mode 中選取範圍時，預期這段程式碼在 Quick Fix 中應該可以呼叫特定的重構方式──然而透過 v 指令選取後，敲下 `Command + .` 快捷鍵卻無法如預期呼叫出選單

後來查找[官方文件](https://github.com/vscode-neovim/vscode-neovim#vscode-specific-differences)，才找到相關的敘述：

> Visual modes don't produce VSCode selections, so any VSCode commands expecting selection won't work. To round the corners, invoking the VSCode command picker from visual mode through the default hotkeys (f1/ctrl/cmd+shift+p) converts VIM selection to real VSCode selection.

> This conversion is also done automatically for some commands like commenting and formatting.

> If you're using some custom mapping for calling VSCode commands that depends on real VSCode selection, you can use VSCodeNotifyRange/VSCodeNotifyRangePos/VSCodeNotifyVisual (linewise, characterwise, and automatic) which will convert VIM visual mode selection to VSCode selection before calling the command ([see below](https://github.com/vscode-neovim/vscode-neovim#invoking-vscode-actions-from-neovim)).

道理是都明白了，至於該怎麼具體解決我的問題，我又做了幾個嘗試：

1. **綁定另外的快捷鍵，在需要的時候主動同步選取範圍給 VSCode**
   參考這個 [issue](https://github.com/vscode-neovim/vscode-neovim/issues/958)，我在自己的 `init.vim` 中加入：
   ```vim
   vmap <space> <cmd>call VSCodeNotifyVisual('noop', 1)<cr>
   ```
   每當選取完範圍，我需要同步這段選取給 VSCode 時，就主動敲下空白鍵

   這個解決方案雖然可以應付我的問題，但在實際投入開發時，會耗費不必要的思考成本，需要反覆考慮是否需要先進行同步

2. **直接將需要的快捷鍵傳進 NeoVim，進行同步選取範圍並呼叫 VSCode command**

   後來我重新思考，釐清自己的應用場景其實只有在呼叫 Quick Fix 選單時會碰上這個問題
   那麼或許我不需要大費周章保留一個快捷鍵去做同步選取的動作，直接針對呼叫 Quick Fix 的快捷鍵動手就好

   首先調整 VSCode 的 `keybindings.json`，指定快捷鍵傳入 Neovim：
    ```json
    [
      {
        "key": "cmd+.",
        "command": "vscode-neovim.send",
        "when": "editorFocus && neovim.mode == 'visual'",
        "args": "<D-.>"
      }
    ]
    ```

   再回到 `init.vim`，在呼叫快捷鍵時主動同步選單，並幫忙呼叫 VSCode command：
   ```vim
   vnoremap <D-.> <cmd>call VSCodeNotifyVisual('noop', 1)<cr><Esc><cmd>call VSCodeNotify('editor.action.quickFix')<cr>
   ```

   如此一來，可以完美應付我的需求，在操作體驗上也更加直覺！

## 總結

就如同我在前言所提及的：以上這些個人設定並沒有所謂的「標準答案」。

實際上，只要選擇你偏好的開發工具，無論是什麼 IDE 或是什麼樣的 Vim 設定，能提升你的開發效率就是好工具！

重點還是在於，**去深入拆解自己的開發習慣，有意識地察覺有哪些基本操作可能造成無意識的時間浪費**

在這樣的原則下去調整 IDE 設定，以及 vimrc 相關設定，久而久之便能融會貫通，內化成自己的一套開發心法！

### 其他參考
 - [vscode-nvim_程式人生](https://www.796t.com/article.php?id=409246)
 - [VSCode Neovim插件配置——将VSCode作为Neovim的GUI客户端](https://zhangjk98.xyz/vscode-neovim-setting/)
 - [vscode vim mode - 喇賽的人 Blog](https://www.blog.lasai.com.tw/2020/07/05/vscode-vim-mode/)

















