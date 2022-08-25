---
title: Gulp 建立自己的自動化程序
description: 簡單說明 Gulp 工具，並介紹個人開發習慣的設定配置
date: 2017-04-15
tags:
 - Gulp
image: https://i.imgur.com/OfLUYJm.png
layout: layouts/post.njk
---

## 前言

在進行網頁開發的時候，過程中可能有許多問題需要處理，以我的開發習慣來舉例：

-   編譯 SASS, Pug
-   壓縮 `.css`, `.js` 或圖檔
-   修改完成之後要不斷 F5 重整頁面
-   諸如此類…

雖然很多工具都可以完成各別的功能，但這樣在開發的過程中反而顯得相當沒效率，這時候我們就可以利用 [Gulp](http://gulpjs.com/) 來協助我們建立自己的自動化程序。

## 安裝全域 Gulp

Gulp 是 Node.js 的套件，所以必須先安裝 Node.js 才可以安裝。

檢查 npm 版本，3.0.2 以上才可順利安裝 Gulp

```bash
npm --version
```

安裝全域 Gulp

```bash
npm install gulp --global
```

## 安裝 Gulp 套件

首先要進行專案初始化，在專案資料夾底下輸入

```bash
npm init
```

安裝所要使用的套件，會產生一個 `node_modules` 資料來存放所有套件

```bash
npm install gulp gulp-sass gulp-pug gulp-uglify gulp-imagemin gulp-connect gulp-livereload -save-dev
```

我個人常用的套件有下面這些：

-   gulp-sass：CSS preprocessor，內建 CSS 檔案壓縮
-   gulp-pug：HTML 的模板，原名是 Jade
-   gulp-uglify：JavaScript 混淆與檔案壓縮
-   gulp-imagemin：自動壓縮圖檔，支援 PNG, JPEG, GIF 和 SVG
-   gulp-connect：在本地建立起網頁伺服器
-   gulp-livereload：以伺服器方式打開網頁，搭配 [chrome 插件](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei)自動刷新頁面

## 資料夾結構

在使用 Gulp 時，資料夾結構會影響到 Gulp 配置檔（`gulpfile.js`）的部分。

以下是我的資料夾結構配置：

```plain
|- src/    #開發時的專案檔案資料夾
    |- images/
    |- index.js
    |- style.sass
    |- index.pug
|- dist/    #最終專案匯出的資料夾
    |- images/
    |- index.js
    |- style.css
    |- index.html
|- gulpfile.js
|- package.json
|- node_modules/
```

## 建立 gulpfile.js

接下來在專案目錄下建立 `gulpfile.js`，這裡就不贅述細節，直接附上程式碼。

```javascript
// import plugin
var gulp = require('gulp'),
    sass = require('gulp-sass')
    pug = require('gulp-pug')
    uglify = require('gulp-uglify')
    imagemin = require('gulp-imagemin')
    connect = require('gulp-connect')
    livereload = require('gulp-livereload');

// file paths
const stylePath = {src: 'src/*.sass', dest: 'dist'};
const htmlPath = {src: 'src/*.pug', dest: 'dist'};
const scriptPath = {src: 'src/*.js', dest: 'dist'};
const imagePath = {src: 'src/images/**', dest: 'dist/images'};

// default
gulp.task('default', ['sass', 'pug', 'js', 'images', 'server', 'watch']);
// gulp-connect
gulp.task('server', function() {
  connect.server({
    root: '',
    livereload: true,
  });
});

// gulp-sass
gulp.task('sass', function() {
	return gulp.src(stylePath.src)
          .pipe(sass()) // compile sass into CSS
          .pipe(gulp.dest(stylePath.dest))
          .pipe(connect.reload())
});

// gulp-pug
gulp.task('pug', function() {
  return gulp.src(htmlPath.src)
    .pipe(pug({ // compile pug into HTML
      pretty: true
    }))
    .pipe(gulp.dest(htmlPath.dest))
    .pipe(connect.reload())
});

// gulp-uglify
gulp.task('js', function () {
  return gulp.src(scriptPath.src)
    .pipe(uglify())  // minify JavaScript
    .pipe(gulp.dest(scriptPath.dest))
    .pipe(connect.reload())
});

// gulp-imagemin  
gulp.task('images', function() {
  return gulp.src(imagePath.src)
    .pipe(imagemin())  // minify images
    .pipe(gulp.dest(imagePath.dest)) 
});

// watch
gulp.task('watch', function() {
  gulp.watch(htmlPath.src, ['pug']);
  gulp.watch(stylePath.src, ['sass']);
  gulp.watch(scriptPath.src, ['js']);
  gulp.watch(imagePath.src, ['images']);
});
```

## 執行 gulp

輸入 `gulp` 就可以開始執行我們的自動化流程了！

每當有新專案時，只要複製前個專案的 `package.json` 和 `gulpfile.js` 再執行 `npm install` 就可以了。

我也把模板放上了 [Github](https://github.com/frantw/GulpTemplate)，日後也可以直接 fork 下來。

## 參考資料

-   [gulp 學習筆記](https://www.gitbook.com/book/kejyuntw/gulp-learning-notes/details)
-   [Gulp 基礎入門 - 2017](https://qq7886.gitbooks.io/gulp-beginner/content/)
-   [Gulp 學習 - 建立 SCSS/SASS 編輯環境](http://www.oxxostudio.tw/articles/201503/gulp-4-scss-sass.html)
