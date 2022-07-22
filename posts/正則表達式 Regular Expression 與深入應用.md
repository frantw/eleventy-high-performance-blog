---
title: 正則表達式 Regular Expression 與深入應用
description: 介紹在 JavaScript 中處理資料驗證時，常見的 RegExp Pattern 及其撰寫原理
date: 2018-06-20
tags:
 - JavaScript
 - RegExp
image: https://i.imgur.com/Tk7xs2e.jpg
layout: layouts/post.njk
---

## 前言

在資料驗證時，常常必須進行字串比對的工作，我們能藉由 **正則表達式（Regular Expression）** 來判斷是否字串具有符合的格式。

善用**正則表達式**能幫助我們用更加簡潔的程式碼去驗證字串，再利用 String 中的 `match()` 或 `replace()` 等方法對字串做更進一步的處理。 

## 建立正則表達式

在 JavaScript 中，我們有兩種方式可以建立正則表達式：

 - 建立字面值

 ``` javascript
     var re = /JavaScript/;
 ```

 - 建立 RegExp 物件

 ``` javascript
     var re = new RegExp('JavaScript');
 ```

 如果是不變的值，使用字面值來建立會具有較好的效能。

## 正則表達式中的特殊字元

正則表達式由數個簡易字元組成，下面列出在正則表達式中個人比較常利用的特殊字元。

### 一般常見

 - `\`：跳脫特殊字元（如 `\.` 找 "." 或是 `\/` 找 "/"）
 - `.`：任意字元
 - `^`：字元的開頭
 - `$`：字元的結尾
 - `[abc]` ：比對是否為中括號中的 a 或 b 或 c
 - `[^abc]`：不是中括號中的 a 或 b 或 c 的任何字元
 - `[a-z]` ：抓任何小寫 a-z 之間的字元
 - `[a-zA-Z]` ：抓任何小寫 a-z 和大寫 A-Z 之間字元
 - `[0-9]`：數字字元
 - `|`：OR
 - `()`：群組

### 指定匹配字元

前面我們曾提及一種特殊字元，也就是反斜線。
反斜線 `\` 在前可表示**轉義** (escaping) ，將其後的特殊字元視為一般字元。
如果要表示的字串中含有 `/` 字元時，就必須寫作 `/\//`。

但別把跳脫字元和下面這類型的特殊字元混淆了。

 - `\d`：匹配任何數字字元
 - `\D`：匹配任何不是數字字元
 - `\w` ：匹配所有文字字元 + 底線，其實等於 `[a-z\dA-Z_]`
 - `\W`：匹配所有非文字字元（標點符號、特殊字元等）
 - `\s`：匹配空格字元
 - `\S`：匹配任何**非空格字元**
 - `\b`：在邊界的字元, 如 `hello` 會得到 ["h", "o"]

### 指定匹配次數

以下字元**只會針對前一個位置的匹配規則作用**

 - `*`：0 或更多
 - `+`：1 或更多
 - `?`：0 或 1 次
 - `{m}`：m 次
 - `{n,}`：最少 n 次
 - `{m,n}`：m 到 n 次
 - `{m, n}?`：從 m 號到 n 次，取匹配最少次的

### flags 旗標

正則表達式可以設定不同的甚至是多個 **flag** 來改變預設規則。

 - `/.../i`：不區分大小寫
 - `/.../g`：**全局匹配模式**，得以重複匹配多次，否則預設固定回傳第一個結果

## 實際撰寫正則表達式

下面以幾個例子說明該如何撰寫正則表達式。

### 範例一：手機號碼

 - 撰寫思維：判斷是不是十位數數字所組成
 - 正則表達式：`[0-9]{10}`

### 範例二：email

 - 撰寫思維：以 `@` 為中點，可以把字串切分成前半部和後半部
   - 前半部以任意文字字元和 `-` 組成任意長度
   - 後半部以任意文字字元和 `.` 組成任意長度
 - 正則表達式：
   1. 先以 `[\w\-]` 表達任意文字字元或 `-` 的字元
   2. 加上加號 `[\w\-]+` 取取符合規則的一個或多個字元
   3. 後半部如法炮製出 `[\w\-].`
   4. 最後加上中間的 `@` 並以括號包成群組，得到 `([\w\-]+@[\w\.]+)`

### 範例三：不確定如何分隔的手機號碼
 - 撰寫思維：手機號碼可能以分隔線 `-` 或是空白字元分隔
   一樣先拆成三個部分，各自檢查是否符合規則
 - 正則表達式：
   1. 先以 `\d{4}` 表達四位數字字元如 `0912`
   2. 後面可能用空格或是 `-` 隔開，所以變成 `\d{4}[\s\-]?`
   3. 如法炮製其他部分，得到 `\d{4}[\s\-]?\d{3}[\s\-]?\d{3}`

### 其他常見實例

以下實例會以字面值，也就是兩個 `/` 包裹字元的形式來表示。

| RegExp                  | 說明                 | 範例             |
| ----------------------- | -------------------- | ---------------- |
| `/^\d{4}-\d{2}-\d{2}$/` | 西元生日格式         | "1996-08-06"     |
| `/^[A-Z]\d{9}$/`        | 身分證字號           | "A123456789"     |
| `/^09\d{8}$/`           | 手機號碼             | "0912345678"     |
| `/^[^aeiou]*$/`         | 不包含小寫母音的字串 | "hEllO","ApplE"  |
| `/^.*@gmail\.com$/`     | gmail 信箱           | "test@gmail.com" |
| ``/^[0-9\+\-\*\/]*$/``  | 四則運算算式         | "1+2*3"          |

## 實際應用

接下來介紹一些常用的方法，如 RegExp 的 `test()` 和 `exec()` 方法，或是 String 的 `match()` 和 `replace()` 方法。

這些只是個人比較常用到的，實際上還有其他可搭配應用的方法，有興趣可以再參閱其他技術文件。

### RegExp.prototype.test()

語法形如 `regexObj.test(str)`
對正則表達式檢查某個字串是否匹配其規則，並回傳 `true` 或 `false`。

```javascript
var result1 = (/han/).test('hannah1');
console.log(result1); // true

var result2 = (/nan/).test('hannah1');
console.log(result2); // false
```

### RegExp.prototype.exec()

語法形如 `regexObj.exec(str)`
對正則表達式連續檢查字串的匹配結果，回傳符合結果的陣列或是 `null`。

每次執行會把成功匹配的末位紀錄在 `regexObj.lastIndex` 中，做為下一次匹配開始的位置。並且可搭配**全局匹配模式**和 `()` **群組**的特殊字元來使用，能得到更進一步分組的結果陣列。

```javascript
var re = /(foo)([\w]+)/g;
var str = 'table football, foosball';
var array;

while ((array = re.exec(str)) != null) {
  console.log(array, re.lastIndex);
}
// Array ["football", "foo", "tball"] 14
// Array ["foosball", "foo", "sball"] 24
```

以第一次 `console.log` 的結果陣列 `array` 為例，這個結果陣列會有以下屬性：

|屬性|說明|實例|
|---|---|---|
|[0]|匹配的全部字串|"football"|
|[1], ..., [n]|括號中的分組匹配字串|[1] = "foo" </br> [2] = "tball"|
|index|匹配到的字串起點位於原始字串的索引值|6|
|input|原始字串值|"table football, foosball"|

### String.prototype.match()

語法形如 `str.match(regexp)`

對一個字串判斷是否符合正則表達式的結果，會回傳匹配字串或 `null`。
如果是**全局匹配模式**，則會回傳匹配字串之結果陣列。此結果陣列的格式與 `RegExp.prototype.exec()` 相同。

```javascript
var re = /[ABC]/gi;
var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
console.log(str.match(re)); // ["A", "B", "C", "a", "b", "c"]

var regex = /[\d]/g;
console.log(str.match(regex)); // null

console.log(str.match()); // [""]
```

### String.prototype.replace()

語法形如 `str.replace(regexp|substr, newSubstr|function)`

對一個字串與 `pattern` 比對，這個 `pattern` 可以是字串也可以是正則表達式，再以 `replacement` 取代吻合處，此處的 `replacement` 則可以是字串或函式。
並且可搭配**群組**的特殊字元來使用，能指定一個字串為參數，形如 `$n`，代表第 `n` 項的分組匹配字串。

必須注意的是，**`replace()` 方法並不會改變原有字串**。

```javascript
var s = 'We wish you a merry xmas! We wish you a merry xmas!';
console.log(s.replace(/xmas/i, 'Christmas'));
// We wish you a merry Christmas! We wish you a merry xmas!

var str = 'John Smith';
console.log(str.replace(/(\w+)\s(\w+)/, '$2, $1'));
// Smith, John
```

## 結語

字串比對和資料驗證等問題算是很容易接觸到的狀況，利用正則表達式我們就能夠更簡單去驗證其格式的正確性。

初次接觸確實會讓人覺得簡直像是無字天書，但實際搞懂每個特殊字元的對應意義，日後無論是要自己撰寫規則還是檢閱他人的驗證規則，其實也不是這麼困難的事。
