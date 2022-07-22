---
title: 什麼是 SSH？設定 Sublime 同步遠端檔案
description: 簡單介紹 SSH，並且利用 Subline SFTP 套件快速同步遠端檔案
date: 2017-08-23
tags: 
 - Sublime
 - SFTP
 - SSH
image: https://i.imgur.com/mYb9TQo.png
toc: true
layout: layouts/post.njk
---

## 前言

在開始介紹 SFTP 以前，我們要先聊聊 **SSH (Secure Shell)** 協定。沒聽過 SSH 嗎？

那你或許有聽過 **Telnet**，沒錯！就是廣大鄉民們平常用來上 PTT 的連線協定。
Telnet 易用，速度又快，只要執行 Telnet 程式來連線到遠端伺服器，使用者輸入帳密後便可以遠端控制主機。

但是由於 Telnet 傳輸的資料並未加密，所以容易遭到竊取，後來 SSH 橫空出世，SSH 預設是以金鑰為基礎來驗證及加密傳輸，也可以省去輸入帳號密碼的步驟，大家也就多改用較為安全的 SSH。

## SSH（Secure Shell）

接下來我們進一步介紹 SSH 協定的運作原理：

1.  靠加密編碼的演算法，產生一組很長又混亂的字串及檔案
2.  這組資料分別為**私鑰 (private key)** 與**公鑰 (public key)**
3.  接著**將公鑰傳至想要可以免帳號密碼登入的主機上**
4.  登入主機進行驗證後，主機就會認為你是經過驗證的使用者，就可以登入囉。

## 在 OSX 與 Linux 環境下產生 SSH key

由於 OS X 跟 Linux 都是 Unix-Like 系統，所以產生的方式都一樣。
步驟如下：

1.  使用內建的終端機 
2.  `ssh-keygen` 建立 ssh key
3.  `ls -al` 會看到生成了兩個檔案：`id_rsa.pub` `id_rsa`
    也就是你所持有的公鑰與私鑰
4.  把 `id_rsa.pub` 的內容加入 server 端的 `~/.ssh/authorized_keys`
5.  建立連線 `ssh USER@SSH_SERVER`

## 在 Windows 環境下產生 SSH key

在 Windows 中有兩種類型的程式可以支援 SSH：

-   **OpenSSH** - 安裝完 git 會自動安裝
-   **PuTTY**

使用 **OpenSSH** 的步驟如下：

1.  使用 PowerShell  
2.  安裝 git 會順便安裝 OpenSSH
3.  先建立 .ssh 的資料夾
    通常安裝 git 的時候在產生 github_rsa 的時候就已經建好了
4.  `ssh-keygen` 建立 ssh key
5.  `ls` 會看到生成了兩個檔案：`id_rsa.pub` `id_rsa`
6.  把 `id_rsa.pub` 的內容加入 server 端的 `~/.ssh/authorized_keys`
7.  建立連線 `ssh USER@SSH_SERVER`

雖然可以順利的手動連線，但是很遺憾的，**OpenSSH** 的公鑰/私鑰的格式和 Linux 環境之下是不同的，由於我們之後還想要使用 **SFTP**，為了避免在後續操作會導致 `Sublime SFTP Connection timeout`，那就必須利用 **puttygen.exe** 對公鑰/私鑰進行格式轉換。

這樣做實在太麻煩了，不如我們就直接使用 **puttygen.exe** 來生成金鑰吧：

1.  使用 PowerShell  
2.  下載 **puttygen.exe**，打開之後點選 Generate
    滑鼠在 key 區空白位置晃動，可加快生成隨機數
3.  在 key comment 填寫備註
4.  在 key passphras 填寫 key 的密碼，如同前面步驟，也可以選擇不設置
5.  把上方框框中的內容，也就是公鑰複製到 server 端的 `/.ssh/authorized_keys` 之中
6.  點擊 puttygen.exe 中的 Save private key，保存私鑰 **id_rsa.ppk**
7.  建立連線 `ssh USER@SSH_SERVER`

## 使用 Sublime SFTP 同步檔案

> 註：本文撰寫於 2017/08，我後來跳槽使用 VSCode。
> 官方直接支援 SSH 連線到伺服器進行開發，我認為方便多了。


來到本文的正題，也就是如何在 [Sublime Text3](https://www.sublimetext.com/3) 上借助 [SFTP](https://wbond.net/sublime_packages/sftp) 這個套件來幫助我們更加快速與便利地去建立 SSH 連線和管理檔案：

-   **安裝 SFTP**
    如同其他套件，利用 `package control install package` 輸入 `sftp` 後就會自動下載
-   **配置文件** 
    在第一次執行之前，我們必須設定配置文件 `sftp-sonfig.json`
    簡單介紹幾個選項
-   連線設定
    -   `type` 有 sftp, ftp, ftps 等連線可選，在這裡我們選擇 `sftp`
    -   `host` SSH_SERVER
    -   `user` USER
    -   `password` 預設沒有使用的話，註解就好
    -   `port` 沒有指定的話，註解就好
    -   `ssh_key_file` 在 windows 環境中，設定成剛才儲存的 **id_rsa.ppk** 的路徑，
        例如 `"C:\/Users\/username\/.ssh\/id_rsa.ppk"`
-   同步設定
    -   `save_before_upload` 上傳前，local 自動存檔
    -   `sync_down_on_open` local 開啟檔案時，自動從遠端同步（保留 local 原 code）
    -   `sync_skip_deletes` 同步時，跳過刪除的檔案
    -   `sync_same_age` 時間戳相同的檔案一併同步
    -   `confirm_downloads` 下載時不要詢問
    -   `confirm_sync` 同步時不要詢問
    -   `confirm_overwrite_newer` 覆寫時不要詢問
-   同步檔案
    -   `remote_path` 遠端同步的資料夾
    -   `ignore_regexes` 同步資料夾下忽略的檔案
-   **進行連線**
    儲存配置文件後，即可在目錄按下滑鼠右鍵直接操作
    ![](http://i.imgur.com/6iF3MY7.png)

## 參考資料

-   [別讓 MIS 不開心，免密碼直接登入遠端的 SSH Server](http://blog.itist.tw/2015/03/login-ssh-server-without-username-and-password.html)
-   [SublimeText3中使用SFTP編輯遠程伺服器文件](https://kknews.cc/other/y8k2a2k.html)
