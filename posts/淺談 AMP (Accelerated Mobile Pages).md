---
title: 淺談 AMP (Accelerated Mobile Pages)
description: 介紹何為 AMP (Accelerated Mobile Pages) 這項 Google 大力推行的框架
date: 2017-12-10
tags: 
 - AMP
 - SEO
image: https://i.imgur.com/L5iho7Y.png
layout: layouts/post.njk
---

## 前言

網站速度、內容品質，這些都是 SEO的排名因素，同時也跟用戶體驗息息相關。而 Google 在[2015 年正式發佈](https://googleblog.blogspot.tw/2015/10/introducing-accelerated-mobile-pages.html)其獨有的 **AMP** 框架，中文為 **加速版行動網頁** 。

AMP是 Google 獨有的網頁框架，用來使行動裝置網頁能快速載入。如果你有架設 AMP框架，促進使用者體驗優化，也許會讓該頁面的 rankng 提升 ，同時這個框架也能夠非常有效的提升用戶體驗，未來 AMP將有可能會越來越被重視、且也有可能在搜尋排名中佔有更強的影響力。

[Google 官方網站](https://www.ampproject.org/docs/tutorials/create)上也一步步演示了要如何架設 AMP 網站，主要可分為三大部分

-   AMP HTML
-   AMP JS
-   AMP Cache

## AMP HTML

必須按照其規格撰寫：

-   以 `<!doctype html>` 開頭
-   其中第一個  tag 須為 `<html ⚡>` 或 `<html amp>` 表示為 AMP 網頁
-   必須包含 `<head>` 與 `<body>`
-   在 `<head>` 內必須以 `<meta charset="utf-8">` 作為第一個 tag
-   在 `<head>` 內必須包含 `<script async src="https://cdn.ampproject.org/v0.js"></script>` tag 以引入 AMP JS
-   在 `<head>` 內必須包含 `<link rel="canonical" href="$SOME_URL">` 其中 `$SOME_URL` 指向原本的非 AMP 網頁
-   在 `<head>` 內必須包含 `<meta name="viewport" content="width=device-width,minimum-scale=1">` 並且建議加入 `initial-scale=1`
-   在 `<head>` 內必須包含 [AMP Boilerplate Code](https://www.ampproject.org/docs/reference/spec/amp-boilerplate)

一個頁面可使用唯一一個 `<style amp-custom>` tag 來自訂 style，然而有些 css 屬性是禁用的，但更加上了一些額外的屬性幫助我們排版，可見[相關規範](https://www.ampproject.org/docs/guides/responsive_amp)。

而 HTML tags 也多以 AMP HTML tags 予以取代，像是 `<img>` 以 `<amp-img>` 替代，等等[其他 component](https://www.ampproject.org/zh_cn/docs/reference/components)，這部分在下個段落會再細談。

## AMP JS

為了有效管理資源載入並提供客製化標籤，所以僅能使用 AMP 的元件，不允許使用任何第三方的外連 js file 或是 inline script，也就是說你只能使用 AMP 規範提供的 [Component 元件](https://www.ampproject.org/zh_cn/docs/reference/components) 去完成網頁的行為，或者 iframe 一個非 AMP 頁面進來。

 AMP 規範所提供 Component 大略可分為以下數類：

-   [Ads & analytics](https://www.ampproject.org/docs/reference/components#ads-and-analytics)
-   [Dynamic content](https://www.ampproject.org/docs/reference/components#dynamic-content)
-   [Layout](https://www.ampproject.org/docs/reference/components#layout)
-   [Media](https://www.ampproject.org/docs/reference/components#media)
-   [Presentation](https://www.ampproject.org/docs/reference/components#presentation)
-   [Social](https://www.ampproject.org/docs/reference/components#social)

## AMP Cache

Google AMP Cache 會驗證你的網站是否為 AMP 網頁，如果網站符合其規範，Search Result 便會出現 AMP Cache 的結果，提供快取好的 AMP HTML 網頁。

同時這個搜尋結果會出現在一個新的區塊 **Top Stories 版位**，只有支援 AMP 的網頁才會出現，所以支援 AMP 網站等同於讓你的網頁多了一次機會出現在 Google search result 。

![](http://www.thesempost.com/wp-content/uploads/2016/02/amp-demo2-576x1024.png)

## 總結

AMP 最大優點當然就是頁面的加載速度的顯著提升，在 Google 的搜尋結果更會多出一個 Top Stories 版位。

然而其諸多限制也帶來一些困擾，例如廣告投放、外站圖源、用戶登入問題，這些都只能依賴 AMP 規範提供的 Component 去完成，當然也不能設計一些太過複雜的介面。基於這些限制，開發者是否要引入該框架技術，就勢必得再多加思量了。

## 參考資料

-   [Accelerated Mobile Pages (AMP) 實戰守則](https://blog.lalacube.com/archives/2101/accelerated-mobile-pages-amp-%E5%AF%A6%E6%88%B0%E5%AE%88%E5%89%87)
-   [AMP - Accelerated Mobile Pages 研究筆記](http://tedshd.logdown.com/posts/1460247-amp-accelerated-mobile-pages)
