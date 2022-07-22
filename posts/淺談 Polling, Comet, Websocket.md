---
title: 淺談 Polling, Comet, Websocket
date: 2017-07-31
tags: 
 - AJAX
 - Comet
 - Websocket
image: https://i.imgur.com/APW1lja.png
layout: layouts/post.njk
---

## 前言

現在需要做即時回應與更新的網站已是愈來愈多，大至 Facebook、Twitter，小至即時聊天室的實作等等，在以前使用者只能靠著重新載入網頁才能獲得最新的資訊，但是這樣不但很浪費時間，也會佔用很多不必要的網路資源，並不是一個好的方式。

現在要實作這樣的功能，當然不能不知道一些**網路推播技術 Internet Push technology**——對這個名詞很陌生嗎？讓我們來看看[維基百科](https://zh.wikipedia.org/wiki/%E6%8E%A8%E9%80%81%E6%8A%80%E6%9C%AF)的說明：

>   **推播技術**，是一種基於 Internet 通訊方式的伺服器推播，其中要求通訊的請求是由發布者或中央伺服器發起。與 pull/get 形成對比，資訊傳輸的相應一般由接收者或用戶端發起。
>   推動服務通常是基於提前的資訊預設定上。也就是所謂的 publish/subscribe 模型，客戶通過訂閱由伺服器提供各種資訊的頻道，不論何時都可以在其中一個頻道得到新的內容，同樣伺服器通過推播把資訊傳遞給相應的用戶端。

## Polling 輪詢

先來談談傳統的 **Polling 輪詢技術**，基本上原理很簡單，就是每隔一段固定時間就自動送出 Request 給伺服器，去跟伺服器要資料就對了！

```javascript
(function poll(){
   setTimeout(function(){
      $.ajax({ url: "server", success: function(data){
        // Do something to update your view

        // Setup the next poll recursively
        poll();
      }, dataType: "json"});
  }, 30000);
})();
```

它有以下幾個特點：

-   容易實作
-   沒有跨瀏覽器的問題
-   不需要特殊伺服器做配合

但也有致命的缺點：

-   沒效率
-   浪費頻寬

這個做法是最老舊的方式，如果你已經事先知道伺服器上資料更新的頻率或時間，那麼也許用這樣的方式去做資料的同步更新。
但現在許多的網頁應用程式上並不是這樣，你通常不會知道伺服器上的資料何時會更新，在伺服器沒有新資料時，瀏覽器如果也送出 Request，就會造成浪費網路資源的狀況。而 Comet 的出現解決了 Polling 這樣的弊端。

## Comet

**Comet** 在英文中也就是彗星的意思，顧名思義發出的 Request 會像彗星的尾巴般，將 Request 拉長，讓伺服器可以想傳資料就傳，不需要等客戶端先送請求伺服器再回傳，**讓伺服器實時地將更新的資訊傳送到用戶端**。

Comet 原先的精神是發出 Request 後不馬上結束，但這種做法卻引申出另一個問題那就是他會把傳統的 Web 伺服器（例如 Apache）的連線給佔住。所以 Comet 的技術得配合 **Non-Blocking IO** 的 Web 伺服器才能非同步處理。

後來發展出改良式的 Comet，伺服器會發一個長時間等待的 Request、當伺服器有資料 Response 時立刻斷掉、接著再發一個新的 Request。

這種改良式的 Comet 主要有兩種實作方式：

-   **Long Polling 長時間輪詢**
    Long Polling 的原理是瀏覽器發出一個 Request，而伺服器讓這個 Request 持續開啟一段時間，若在這時間間隔內伺服器有資料就會回傳給客戶端，如果沒有則超時後伺服器會關上 Request。瀏覽器收到回應後，才會再重新發出一個 Request。
    
    ![](https://i.imgur.com/bijGnVj.png)
    
    與 Polling 的不同之處就在於它是比較有效率的、可以等到 timeout 或拿到資料時再重新發、因此減少不必要的流量浪費。但是，這種情況下當傳送的訊息相當龐大時，可能會造成傳送不完全，使得控制失靈。
-   **Streaming 串流**
    Streaming 的原理則是讓伺服器與客戶端建立起一條持續的連線，為了使連線不中斷，伺服器每隔一段時間會發送 Response 給客戶端，確保連線不中斷，在 Streaming 中使用隱藏的 **iframe tag**，伺服器將資料傳入 iframe，交給其中的 javascript 去執行頁面的更新。
    
    ![](https://i.imgur.com/GzYQEuM.png)
    
    使用 Streaming 有一些缺點，由於他是建立在 HTTP 協定上的一種傳輸機制，訊息會被包裝起來，所以可能會因為 **代理伺服器（proxy）** 或 **防火牆（firewall）** 將其中的資料存放在 **緩衝區 （Buffer）** 中，造成傳送上的延遲，因此許多使用串流的 Comet 實作會在偵測到有代理伺服器的狀況時，改用長時間輪詢的方式處理。

![](https://i.imgur.com/t6HiEi8.png)

瞭解 Comet 的原理後，我們其實可以發現 Comet 的最大瓶頸在於控制連線生命週期上需要反覆發出請求，而導致效能會較差，然而 **WebSocket** 的出現卻解決了這個問題，讓效能不會卡在連線生命週期，增強了資料傳輸的效率。

## WebSocket

**WebSocket** 是定義在 HTML5 標準中的一個新的網頁傳輸方式，可在一條連線上提供**全雙工、雙向的資料傳輸**。在這樣的標準下你可以很容易實作一個兼具可擴充性與即時性的網頁應用程式。

同時因為 WebSocket 提供瀏覽器一個 **原生（native）** 的 socket，所以直接解決了 Comet 架構很容易出錯的問題，而在整個架構的複雜度上也會比傳統的做法簡單很多。

![](http://www.ruanyifeng.com/blogimg/asset/2017/bg2017051502.png)

簡單來說就是利用了新的協定建立了雙向的通道：當通道建立起來之後，Browser 可以隨時丟訊息給 Server、Server 可以隨時丟訊息給瀏覽器。唯一的小缺點就是可能有一些瀏覽器相容性的問題必須要解決，IE10 以前的版本並不支援。

在使用前，需要建立一個 WebSocket 物件。

```javascript
  var ws = new WebSocket('ws://server');
  ws.onmessage = function(message) {
    alert(message.data);
    ws.close()
  };
ws.send('Hello WebSocket.');
```

WebSocket 可以選擇 **ws** 或是 **wss** 通訊協定。
 - ws 就相當於一般的 http
 - wss 則相當於 https，需要伺服器可以支援

操作上十分單純，以 `send()` 送出訊息，而以 `onmessage` 事件接收訊息。
呼叫 `close()` 即可結束連線。這中間無法改變通訊的 url。

比起前端的使用操作，在後端、伺服器上實作 WebSocket Protocol 倒是複雜多了。這部分就不多贅述。

總而言之，透過 WebSocket 建立永久連線，這種開放式連線可以讓客戶端和伺服器端之間隨時雙向交換資料，因此可降低延遲時間，改善資源使用效率，必定會是未來的潮流和趨勢。
