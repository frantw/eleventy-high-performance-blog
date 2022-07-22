---
title: Vue.js 新手上路
description: 初學 Vue.js 的心得筆記，著重介紹何謂資料綁定 (Data Binding)
date: 2018-02-03
tags:
 - Vue.js
image: https://cdn-images-1.medium.com/max/1920/1*nfvapd86apvGH-hNBYkYuw.png
layout: layouts/post.njk
---

## 前言

在開始學習今天的主題之前，我們要來先討論一下：**為什麼要學框架（Framework）？**
因為很潮正夯特流行嗎？因為業界好找工作嗎？又有什麼是只用 jQuery 辦不到的事情嗎？

簡單來說，**jQuery** 是**以 DOM 元素來觸發功能**，能幫助我們更簡單的實現網頁上的資料互動及事件處理方法，同時也簡化了許多 AJAX 的操作方法，是設計動畫效果的絕佳利器。

然而 **框架（Framework）** 包括你聽過的三神獸 **Vue**, **Angular**, **React**，都是**以資料來驅動功能**，適合用來撰寫一些以資料為主體的網頁以及 SPA，能幫助我們更加簡潔地去處理資料邏輯。

## 進入 Vue.js 世界

讓我們先寫一個簡單的  **Vue 建構式（Vue Vonstructor）** 來建立 view model ：

```javascript
var app = new Vue({
  el: '.app', // 要綁定的 DOM element，即作用範圍
  data: { // 資料綁定
  	msg: 'Hello World!', 
  	users: [{name: 'Tom', gender: 'male', age: 20},{name: 'Alice', gender: 'female', age: 18}] ,
        isActive: true
  },
  computed: {}, // 當資料改變時，對應更新的變動值
  methods: {} // 可以定義在元件或樣板內使用的 method
});
```

## 資料綁定 Data Binding

#### data 的作用

-   儲存元件內部狀態或資料
-   和 v-model 合作實現雙向綁定

利用 Mustache 的雙括號語法以及 **模板語法** 可以直接將 data 的值置入

```html
<div class="app">
  <h1>{{msg}}</h1>
</div>
```

#### v-bind

雙括號語法不能直接寫入 html 的屬性之中，需使用 `v-bind` 語法作屬性綁定，縮寫為 `:`

```html
<div class="app">
  <div class="title"> 
    <h1>{{msg}}</h1>
  </div>
  <ul class="userList" :class="{ active: isActive }">
    <li class="userItem" v-for="item in users" :key="item.id">{{item.name}}</li>
  </ul>
</div>
```

#### 其他模板語法

-   **v-if** , **v-else-if**, **v-else**
    形如 `v-if="boolean"` ,  `v-else-if="boolean"`  ,  `v-else` 
    類似 [Handlebars.js](http://handlebarsjs.com/) 中的 &#123;&#123;#if boolean&#125;&#125; ,  &#123;&#123;else&#125;&#125;
-   **v-show**
    形如 `v-show="boolean"`
    類似 `v-if`，不過會保留 DOM 元素本身，只是改變 `display: none` 
-   **v-for**
    形如 `v-for="item in array"` 
    類似 [Handlebars.js](http://handlebarsjs.com/) 中的 &#123;&#123;#each item&#125;&#125;

## 屬性計算 Computed Propertries

我們可以直接利用 **computed** 來幫助我們 **處理雙括號表達式的資料邏輯**

```javascript
computed: {  // 當資料改變時，對應更新的變動值
  userNum: function(){
    return users.length;
  }
},
```

**computed** 有以下特點

-   function 本身無法帶入外部參數
-   具有資料緩存的功能，不會每次都重新渲染
    當使用的 data 中的對應值變動，**computed** 裡的值**才會自動更新**

## Methods 與事件處理

#### methods

我們可以在 **methods** 裡面定義可被 vue 物件呼叫的 function

```javascript
  methods: { // 可以定義在元件或樣板內使用的 method
    addFollow: function(user){
      // ...
    }
```

而在 function 裡呼叫的 this 會自動綁定為呼叫這個 function 的物件
同時必須注意的是，也就**不能使用 ES6 中的箭頭函數**來定義 method function

#### v-on

使用 `v-on` 語法作事件處理的綁定，縮寫為 `@` 

```html
<div class="app">
  <ul class="userList" :class="{ active: isActive }">
    <li class="userItem" v-for="item in users" :key="item.id">{{item.name}}
      <a void @click="setFollow(item)">Follow</a>
    </li>
  </ul>
</div>
```

再去呼叫我們在 **methods** 中所定義的 function

## 雙向綁定

#### v-model

`v-model` 可以幫助我們實現雙向綁定，也就是說**去動態同步更改 data 的資料**，在表單呈現上特別好用
限用於`<input>`、`<select>`和`<textarea>`

```html
<div class="app">
  <h1>{{msg}}</h1>
  <input type="text" v-model="msg">
</div>
```

## Todos with Vue.js

利用前面所提及的各種方法，實作出一個簡單的 todo list
<iframe height='400' scrolling='no' title='todos with vue.js' src='//codepen.io/veru/embed/JMMXxQ/?height=400&theme-id=0&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/veru/pen/JMMXxQ/'>todos with vue.js</a> by Veru (<a href='https://codepen.io/veru'>@veru</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

-   實作功能
    -   可新增/刪除 todo
    -   可將 todo 標示完成
    -   顯示未完成的 todo 數量
    -   可切換不同分頁：全部/未完成/已完成
    -   快捷鍵：完成所有 todo/刪除已完成 todo

## 參考資料

-   [Vue.js 官方文件](https://cn.vuejs.org/v2/guide/)
-   [第一次用 Vue.js 就愛上](https://www.slideshare.net/kurotanshi/vuejs-62131923)
-   [Summer 的 Vue.js 學習筆記總整理](https://cythilya.github.io/2017/05/21/vue-study-note/)
