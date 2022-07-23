---
title: 如何修改 GitHub 上已存在之 Repo 名稱
description: 紀錄如何修改在 GitHub 上已存在的 Repo 的名稱
date: 2021-02-14
tags: 
 - GitHub
 - Git
image: https://i.imgur.com/L3XcoMq.png
layout: layouts/post.njk
---

## 前言

在 GitHub 上已有遠端 Repository 時，也許會事後反悔、想修改 Repo 名稱

在這裡筆記一下這種情形下的標準做法，避免影響到既有存在於遠端上的專案

## 修改遠端 Repo 名稱

以 GitHub 為例，先進入遠端 Repo 的設定頁面：

```text
https://github.com/<github 帳號>/<repo 名稱>/settings
```

![](https://i.imgur.com/lwnPIZC.png)

1. 把 **Repository name** 欄位改成新的 Repo 名稱
2. 確認新名稱可以使用，會跳出 `<新名稱> is available` 的訊息
3. 點擊 **Rename** 更新 Repo 名稱

## 更新本地端的遠端 Repo 位置

GitHub 更新 Repo 名稱後，複製新的遠端伺服器網址，格式如下：

```text
git@github.com:<github 帳號>/<repo 名稱>.git
```

![](https://i.imgur.com/3GvHuQr.gif)

切換到本地端資料夾，打開終端機輸入指令

1. 使用 **`git remote set-url`** 指令，更改遠端伺服器網址

```bash
git remote set-url origin git@github.com:<github 帳號>/<repo 名稱>.git
```

2. 使用 **`git remote -v`** 指令，確認遠端伺服器網址

```bash
git remote -v
```

如此一來便大功告成

