# iot-smart-lighting-system
This repository contains the source code and flow files for a smart IoT-based lighting system designed to optimize energy consumption by dynamically adjusting the brightness of a Tapo L530E smart lamp. The system uses real-time sensor data (light intensity) and a mobile app interface for monitoring and control.


**Technologies Used:**
Node-RED: Used for data processing and decision-making.
LoRaWAN: Communication protocol for receiving sensor data.
InfluxDB: Time-series database for storing light intensity and power consumption data.
Grafana: Visualization tool for displaying system performance.
React Native: Mobile app for controlling the smart system and monitoring real-time data.

**Features:**
-> Dynamic adjustment of lamp brightness based on real-time light intensity.
-> Historical data storage and visualization using InfluxDB and Grafana.
-> Mobile app for user interaction, enabling manual control of the system (admin) or viewing light intensity and power consumption (user).
-> Energy-saving through smart lighting control with the ability to disable the system manually.

**Contents:**
Node-RED Flow: Contains the JSON file of the entire flow used in the system, including data collection, decision-making, and actuation logic.
Mobile App Source Code: Built with React Native, the app provides a real-time interface for controlling the lighting system and monitoring energy consumption.
README: Detailed instructions on how to set up the system, including configuring Node-RED, InfluxDB, and the mobile app.


**Instructions to Clone and Run the Project:**
Clone the repository:
git clone https://github.com/yourusername/smart-lighting-system
Follow the steps in the README.md file to install dependencies and configure the environment.
