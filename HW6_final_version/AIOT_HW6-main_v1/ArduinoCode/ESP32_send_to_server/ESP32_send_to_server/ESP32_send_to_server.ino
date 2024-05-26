#include <WiFi.h>
#include <DHT11.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

const char *ssid = "Aiot";
const char *password = "1234567890";
const char *serverAddress = "http://172.20.10.5:5000/post_data";

DHT11 dht11(15);

void setup() {
Serial.begin(9600); //鮑率設定 9600
WiFi.begin(ssid, password);//網路設定
//等待網路連線
while (WiFi.status() != WL_CONNECTED) {
delay(1000);
Serial.println("Connecting to WiFi...");
}
//連上網路並顯示目前 IP
Serial.println("Connected to WiFi");
Serial.println(WiFi.localIP());
}

void loop() {
int temperature = 0;
int humidity = 0;
int result = dht11.readTemperatureHumidity(temperature, humidity);
if (result == 0) {
// Create an object JSON
DynamicJsonDocument jsonDoc(200);
jsonDoc["temperature"] = temperature;
jsonDoc["humidity"] = humidity;
// Serializa el JSON en una cadena
String payload;
serializeJson(jsonDoc, payload);

} else {
// Print error message based on the error code.
Serial.println(DHT11::getErrorString(result));
}
delay(5000);
}