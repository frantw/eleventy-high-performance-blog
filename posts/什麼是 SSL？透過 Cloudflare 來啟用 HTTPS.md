---
title: 什麼是 SSL？透過 Cloudflare 來啟用 HTTPS
description: 簡述說明何謂 SSL 憑證，並透過 Cloudflare 替網站啟用 SSL 憑證，變為 HTTPS！
date: 2019-12-23
tags:
 - Cloudflare
 - SSL
 - Google Domains
image: https://i.imgur.com/MnQEFox.png
layout: layouts/post.njk
---

## 前言

當你使用 Chrome 瀏覽器時，是否曾留意過網址列出現的「**不安全**」？

尤其辛辛苦苦架好網站，甚至加上自訂域名，卻看到那幾個字，顯得格外刺眼——為什麼會出現所謂的不安全警示呢？

這是因為 Google 鼓勵網站加上 SSL 憑證，那些能以 HTTPS 加密通訊協定存取的網站，就會加上綠色鎖頭字樣！甚至還列入了搜尋演算法的指標中，影響 SEO 排名。

重點來了，所謂的 SSL 憑證到底是什麼？

## SSL - Secure Sockets Layer（通訊安全協定）

SSL 的原文是 **Secure Sockets Layer**，聽起來好像很複雜，其實本意是為了保護使用者的個人資料、聯絡方式、付款資訊不被第三方所攔截的技術。

![](https://i.imgur.com/DLeBOxF.png)

運作原理就是在瀏覽器拜訪網站時，會向對應的伺服器要求建立安全連線，這部分會協議使用的加密演算法或是密鑰交換演算法等機制，協議出一份密鑰來認證。

同時為了真正確保協議過程中的安全，除了協議的內容，伺服器還要回傳 **CA（Certificate Authority，數位憑證）**，這是第三方的認證，來讓使用者端確認不是冒用身分。

協議完成後，就可以按照協議進行加密、傳送資料了！經過加密的資料，即使第三方有心人士竊取到資料，也會因為缺少解密金鑰而無法得到正確訊息，只能看到亂碼。

在原本的 HTTP 協定中加入 SSL 憑證的通訊安全協定，就是 HTTPS 協定。

![](https://i.imgur.com/0gXpLaO.png)

## 用 Cloudflare 加上 SSL 憑證

我們可以使用 Cloudflare 的 DNS 代管服務，來免費使用 SSL 憑證。
只要將網域設為代管後，就能掛上 SSL 加密連線，擁有綠色鎖頭。

讓我們先申請 Cloudflare 服務吧！首先要讓 Cloudflare 來解析域名。

### 申請 DNS 託管

註冊/登入後，點選 **Add Site**。

![](https://i.imgur.com/h8u5R9K.png)

選擇免費方案，就可以使用 SSL 憑證囉。

![](https://i.imgur.com/7J9KkvS.png)

解析後可能會有一些錯誤訊息，這部分通常與域名服務商中的 DNS 設定有關。
我的域名服務商是 **Google Domains**，後面會以 Google Domains 作為操作示範。

幾個常見錯誤訊息如下：

 - An MX record was not found for your root domain. An MX record is required for mail to reach `@自訂域名` addresses.
如果有設定自訂電子郵件地址，自訂紀錄就必須設定 MX，沒設定可忽略。

 - An A, AAAA or CNAME record was not found for the www subdomain. The `自訂域名` subdomain will not resolve.
代表沒設定 A 或 CNAME，必須填齊。

![](https://i.imgur.com/AkGyFNQ.png)

由於我是使用 Github Pages，所以指向的 IP 是以下四組。
```text
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

### 設定名稱伺服器

接下來要把域名服務商的名稱伺服器，改成**使用自訂名稱伺服器**。

![](https://i.imgur.com/FWNNm2g.png)

填上 Cloudflare 所給的兩組名稱伺服器，儲存後回到 Cloudflare 去 Re-check。

更新可能要很久，過一段時間再回來確認吧。
生效後，就會看到出現啟用狀態，代表 DNS 託管設定完成。

![](https://i.imgur.com/pCic5BS.png)

### 啟用 SSL 憑證

接下來終於可以使用 SSL 憑證了！點開 **SSL/TLS** 來確認吧。

![](https://i.imgur.com/faoEwGd.png)

Cloudflare 通常會自動使用 SSL 憑證，設定是 Fiexible，代表確實運作中，看見網址列出現鎖頭就完成了。

 - **Off**
   未啟用 SSL
 - **Flexible**
   Cloudflare 會透過 HTTP 存取伺服器，再透過 HTTPS 跟使用者連線，所以使用者可以透過 HTTPS 連線到網站
 - **Full**
   Cloudflare 會透過 HTTPS 存取伺服器，同時也透過 HTTPS 跟使用者連線
 - **Full (Strict)**
   強制使用 HTTPS 連線，但 Cloudflare 會檢查第三方是不是信任憑證（不可自簽）


![](https://i.imgur.com/lZKA0k5.png)

### 設定自動跳轉

最後要確保網站的所有訪問都是基於 HTTPS 協定，所以要讓 HTTP 自動跳轉到 HTTPS。

點開 **SSL/TLS** 底下的 **Edge Certificates** 分頁，找到 **Always Use HTTPS** 並打開。

![](https://i.imgur.com/GjEQVnW.png)

這樣即使使用者在網址列輸入的是 HTTP，也會自動跳轉囉！

## 結語

現在網站擁有 SSL 憑證了，原理是透過握手技術（**Handshake**）以及**公私鑰加密**，來達成資料加密的連線。不僅是安全，對於 SEO 也有優勢。

這之中利用了 **Cloudflare** 代管 DNS，提供免費的 **SSL 憑證服務**。
事實上 Cloudflare 能做到的可不只這樣，光是免費方案就提供了基本的**安全防護**、**網站加速**等其他功能，日後也可按需求付費升級。

我自己比較常用到的是這些：
 - **Analytics** 以檢視網站分析
 - **Speed** 啟用 **Auto Minify**
 - **Page Rules** 自訂頁面規則

你的網站還沒有 SSL 憑證嗎？不如現在就試試看吧！
