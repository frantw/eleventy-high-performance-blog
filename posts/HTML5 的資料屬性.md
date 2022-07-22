---
title: HTML5 的資料屬性 (data-* attribute)
description: 關於 data-* attribute 這樣的 DOM 屬性介紹與示範應用
date: 2017-07-08
tags:
 - JavaScript
 - jQuery
 - HTML
image: https://cdn.colorlib.com/wp/wp-content/uploads/sites/2/html5-logo.png
layout: layouts/post.njk
---

## 前言

常常在 html 之中看到形如 `data-* attribute ` 的資料屬性，以下面這段程式碼為例：

```html
<div class="controls"  data-uid="${session_user.id}">
    <span id="like_post" class="s_${post.favorite}">
        <a void class="do pif-like" data-function="like">${_("like")}</a>
        <a void class="undo pif-like" data-function="unlike">${_("unlike")}</a>
    </span>
</div>
```

這段程式碼之中，有的元素被賦予了 `data-uid` 的屬性，有的則是被賦予了 `data-function` 的屬性。

然而如果你直接 google  `data-uid` 或是 `data-function` 卻也查不太到這個屬性，這到底是什麼？又有什麼意義或用途呢？

## HTML5 中的 data-* attribute

**HTML5** 中的 **`data-* attribute`** 事實上是一種自定義的屬性，讓我們可以上所有 HTML 元素之中嵌入自定義的屬性，而之所以會有這個自定義屬性的出現，不只是為了方便 programer 能理解，同時最後也能再經由 JavaScript / jQuery 去存取。

data-* attribute 屬性包含兩個部分：

-   屬性名稱不能包含任何大寫字母，同時在前綴字 **data-** 之後則必須至少要有一個字
-   屬性值則可以是任何的字串

由於這是一個自定義名稱，所以當我們想去 google  `data-uid` 或是 `data-function` 也就會找不到答案。

## 利用 JavaScript 來取值

當我們想取得 data-* attribute 的屬性值時，我們可以利用 JavaScript 的 `dataset` 物件來存取。

以前面的程式碼為例，假如我們想取得 `#like_post` 之中的 `data-function` ，可以寫成這樣：

```javascript
var ele = document.getElementById('like_post');  
var func = ele.dataset.function;
```

如果考慮瀏覽器相容性，也可以利用 `getAttribute` 去操作，然而速度與可讀性上還是 `dataset` 較佳。

## 利用 jQuery 來取值

利用 jQuery 更是方便，使用內建的 `.data()` 就能夠存取我們想要的屬性值了，能寫成這樣：

```javascript
var ele = document.getElementById('like_post');  
var func = ele.data('function');
```

是不是相當的方便呢？只要能善用 **`data-* attribute `** ，就能夠幫助我們更有效率地去存取這些值。
