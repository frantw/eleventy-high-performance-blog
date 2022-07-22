---
title: 善用 Rebase 的 Git 工作流程
description: 介紹 Rebase 與 Merge 的差別，Rebase 在多人協作的專案場景，絕對是必備良器！
date: 2017-11-01
tags: 
 - Git
image: https://snippetinfo.net/sysdata/doc/4/41f7d6c3f65e1b1a/c291.jpg
layout: layouts/post.njk
---

## 前言

簡單介紹了 Merge 和 Rebase 的差異，並且以合併後的結果線圖來作比較。
在多人協作的專案場景，能好好善用 Rebase 的話，絕對能省去不少麻煩事！

## 分支的合併

完成作業的 Topic 分支，最終都會合併到 Integration 分支。
合併分支有兩種方法：使用 **merge** 或 **rebase**。
兩者都是合併歷史記錄，但是根據使用的方法合併後的分支歷史記錄有很大的差別。

![](https://i.imgur.com/MucvWQq.png)

### Merge

修改內容的歷史記錄會維持原狀，但是合併後的歷史紀錄會變得更複雜。
![](https://i.imgur.com/fZnV9YR.png)

Git 在做 merge 時，會自動判斷現在的狀況是否適合是使用 **fast-forward**，或是我們可以透過加上 `--ff` 或是 `--no-ff` 來強制設定是否使用 fast-forward，差別如下：
![](https://cdn-images-1.medium.com/max/800/1*SjSWhbwhPqFUTlPL8IV2mg.png)

`--no-ff` 會多出一個 merge commit，而 `--ff` 會直接視為 master 分支上多出的 commit。
可視需求決定要使用哪種。

### Rebase

修改內容的歷史記錄會接在要合併的分支後面，合併後的歷史記錄會比較清楚簡單，但是，會比使用 merge 更容易發生衝突。
![](https://i.imgur.com/XXoH6Nr.png)

![](https://i.imgur.com/8NqcY1V.png)

## 多人協作的 Git 工作流程

具體來說，如果我們要將 feature branch 合併進 master

-   先切換到 feature branch，update 之後把遠端的 master 分支 rebase 進來
    `git checkout branch-name`
    `git remote update`
    `git rebase origin/master`

-   切換到本地 master，當然要先確認本地 master 與遠端同步
    `git checkout master`
    `git merge --ff origin/master`

-   把 feature branch 給 merge 進來 master，同時要保留新增功能用的commit
    `git merge --no-ff branch-name`

-   將本地 master 推上遠端
    `git push origin master`

原理其實並不難，但是在多人協作的專案開發時，如果能善用 Rebase 的話，有時候能幫助你省去一些意想不到的麻煩！