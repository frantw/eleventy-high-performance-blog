---
title: JSON & AJAX 基本觀念與實作
description: 搞懂 JSON 以及 AJAX 的基本觀念以及前後端常見的應用場景
date: 2017-03-31
tags: 
 - JavaScript
 - jQuery
 - AJAX
 - JSON
image: https://i.imgur.com/JrMrax5.png
layout: layouts/post.njk
---

## 前言

之前在學校課程中實作資料庫內容的呈現時，是利用 PHP + MySQL 做資料的傳遞，然而在前後端分離的工作模式之中，只要前端從後端 API 那裡接到產出的資料，就可以直接執行頁面上的資料呈現與處理。

本文所要實作的內容如下：

-   建構 **JSON data file** 存放預設資料
-   透過 **jQuery 語法 ( Ajax )** 讀取資料

也就是說著重在前端接取資料並呈現的部分，不包含後端產生 JSON data file 的工作。

## 什麼是 JSON

![](https://i.imgur.com/N4d8OPG.png)
**JSON（JavaScript Object Notation）** 是一種輕量級的資料交換語言，後端透過資料庫整理成線上 JSON 格式 ，提供給前端使用，我們可以再經由 jQuery 去存取。

JSON 支援的資料型態有 string, number, array, object 等等，主要的宣告與 Javascript 無異，只是有些細節要注意：

-   名稱為字串，必須用成對雙引號 “” 包括
-   值可以是雙引號包括的字串、數字、true、false、null、物件或者是陣列。
-   不支援 JavaScript 的 Date、Error、規則表示式或函式表示。

## 建立 JSON data file

首先，我想建立一個存有餐廳名稱的物件陣列，可以每次自動讀取我喜歡的餐廳。
所以我準備了一個 JSON 檔案`data.json`，其內容如下：

```javascript
[ 
    {"name": "西堤牛排"},
    {"name": "欣葉日本料理"},
    {"name": "屯京拉麵"},
    {"name": "一番地壽喜燒"},
    {"name": "銀湯匙"},
    {"name": "原燒"}
]
```

在我們開始著手讀取 JSON data file 之前，還有兩個不可不知的函數：

-   **JSON.stringify()**
-   **JSON.parse()**

### JavaScript variable to JSON string

利用 `JSON.stringify()` 函數，我們可以把 JavaScript variable 轉換成 JSON 所表示的 string，範例如下：

```javascript
var rlist = [ 
    {"name": "西堤牛排"},
    {"name": "欣葉日本料理"},
    {"name": "屯京拉麵"},
    {"name": "一番地壽喜燒"},
    {"name": "銀湯匙"},
    {"name": "原燒"}
];

var jsonText = JSON.stringify(rlist);
console.log(typeof jsonText); // string
```

### JSON string to JavaScript variable

利用 `JSON.parse()` 函數，我們可以把 JSON string 轉換成 JavaScript 中可以運用的物件，範例如下：

```javascript
var jsonText = '[{"name":"西堤牛排"},{"name":"欣葉日本料理"},{"name":"屯京拉麵"},{"name":"一番地壽喜燒"},{"name":"銀湯匙"},{"name":"原燒"}]';

var rlist = JSON.parse(jsonText);
console.log(typeof rlist); // object
```

## Ajax 非同步載入技術

開始資料讀取之前，我們先瞭解一下大名鼎鼎的 Ajax 是什麼吧！

**Ajax 即「Asynchronous JavaScript and XML」（非同步的JavaScript與XML技術）**，基本上的核心概念就是**追求提升使用者的體驗**，為了達成這個目的而有動態傳輸的做法。

Ajax 最大的特色就是可以直接動態傳送、接收資料。相較之下，如果是傳統的網頁技術，Server 在接受指令之後，處理完成後還要再重新導向另一個頁面。

除此之外也還有其他的好處：

-   提升使用者體驗，減少頁面跳轉時產生的落差
-   節省網路流量，不傳送重複的版面資訊
-   能達到跨平台、跨網域、跨瀏覽器互動的可能

而 JSON 因小巧與瀏覽器內建快速解析支援，因此較適用於網路資料傳輸領域，是目前常應用在 Ajax 的資料傳輸格式。

## 利用 Ajax 讀取資料

接下來讓我們利用 `jQuery.ajax` 來讀取放在 Json data file 中的資料，範例如下：

```javascript
$.ajax({
  url: dataurl,    // "data.json"
  dataType: "json",
  error: function(){
    console.log("error");
  },
  success: function(res){
    console.log("success");
    rlist = res;
    update();    // 負責更新資料的 update function
  }
});
```

`$.ajax()` 當中的參數說明：
-   url (String)：指定要進行呼叫的位址。
-   dataType (String)：返回的資料類型 - xml, html, script, json, jsonp, text。
    不設定的話 jQuery 會幫你猜返回的內容格式是什麼。
-   success：請求成功時執行函式。
-   error：請求失敗時執行函式。

瞭解這些以後，基本上我們就可以利用後端 API 輸出的 JSON string 去處理並呈現網頁上的資料囉！
