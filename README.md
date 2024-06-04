# HW6_Final-version
作業內容

1. 基本分(60％)(承Lab2,3實作內容)
    1. **20%** ESP32傳輸溫濕度（在Arduino IDE中SerialPort觀測量測到之數據）
    2. **20%** 使用Flask製作前端頁面（Frontend&UI）
    3. **20%** 使用Flask製作後端API設計（Backend）
2. 進階分(40%)
    1. **20%** 呈現即時數據表現（每五秒更新一次數據）
    2. **20%** 可觀看過去某個時間區段資料

第一部份：Raspberry Pi 刷機
1. 下載Raspberry Pi IMAGER，並安裝到一張64GB記憶卡。
2. 開啟下載好之Raspberry Pi Imager v1.8.5，並選擇對應之安裝版本、作業系統、儲存位置後刷機
3. 刷機完成後，將記憶卡放到樹梅派背面，並接上電源線、HDMI線、鍵盤、滑鼠後，開機。開機之後，進行初始化設定（設定名稱、密碼、時區等資訊），並將樹梅派連接網路（為了與Arduino 同一網域，故都連接同一手機熱點)。

第二部份：溫溼度感測器實驗
1. 取得溫溼度資料，下圖可以看到Arduino 已經有收到溫溼度，但是因為還沒有開啟伺服器，所以connection refused.
![Untitled (1)](https://github.com/jackychen1021/HW6_Final-version/assets/150798964/3b32c396-c58f-437c-abe7-18f71517b0e4)
2. 在終端機執行以下指令
    1. sudo apt update
    2. sudo apt install python3
    3. sudo apt install python3-pip
    4. sudo pip3 install flask
3. 開啟終端機執行python3  app.py
![Untitled (2)](https://github.com/jackychen1021/HW6_Final-version/assets/150798964/b6ba4746-bb26-48a9-bc2c-d2b80d4a03e8)
![Untitled (3)](https://github.com/jackychen1021/HW6_Final-version/assets/150798964/852c705b-b2ed-46d8-9db0-643a7137fe1c)
4. 開啟伺服器之後，再次查看Adruino 序列埠監控窗，可以看到資料已經Post 成功。
![Untitled (4)](https://github.com/jackychen1021/HW6_Final-version/assets/150798964/ac640d99-883d-43a4-bfcc-a86a9c1fc60d)

第三部份：使用Flask製作前端頁面
1. index.html呈現結果(下拉式選單)(包含header.html/footer.html)
![Untitled (5)](https://github.com/jackychen1021/HW6_Final-version/assets/150798964/217ef099-fede-48c4-a453-2b7962d91dd5)
2. realtime-data.html
![Untitled (6)](https://github.com/jackychen1021/HW6_Final-version/assets/150798964/7678564c-6b80-47c7-8652-abe6507f16b8)
3. specifiedtime-data.html
![Untitled (7)](https://github.com/jackychen1021/HW6_Final-version/assets/150798964/c286f4e0-9f80-40c8-9e75-355105956e4f)

第四部份：使用Flask製作後端API設計
1. 呈現即時數據
![Untitled (6)](https://github.com/jackychen1021/HW6_Final-version/assets/150798964/7678564c-6b80-47c7-8652-abe6507f16b8)
2. 觀看過去某個時間區段資料
![Untitled (7)](https://github.com/jackychen1021/HW6_Final-version/assets/150798964/c286f4e0-9f80-40c8-9e75-355105956e4f)

第五部份：Demo結果 Youtube 網址
1. Arduino : https://www.youtube.com/watch?v=mQuQ0NCdato
2. Web Demo : https://www.youtube.com/watch?v=4lYTIg_kBnk

第六部份：
1. 手繪架構圖
![Untitled](https://github.com/jackychen1021/HW6_Final-version/assets/150798964/7f357777-3edf-4d44-b0b1-ea563e03c266)
2. 利用Excalidraw 以及 Mermaid 呈現此次作業流程圖
![Untitled (8)](https://github.com/jackychen1021/HW6_Final-version/assets/150798964/efc4a518-3c27-4a45-8fba-660cc2e1d4c6)
![Untitled (9)](https://github.com/jackychen1021/HW6_Final-version/assets/150798964/d03c3dd7-f747-4e4a-ad0a-3eed8520ef4f)
![Untitled (10)](https://github.com/jackychen1021/HW6_Final-version/assets/150798964/ed4b96b6-b393-4f81-bc26-8bdda6db265d)
![Untitled (11)](https://github.com/jackychen1021/HW6_Final-version/assets/150798964/1f9fdc7b-fe7e-4b8e-b274-b41735e905b7)
