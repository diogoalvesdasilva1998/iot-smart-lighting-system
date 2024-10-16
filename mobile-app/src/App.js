import React, { useEffect, useState } from 'react';
import { View, Text, Switch,TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Svg, Circle, Text as SvgText } from 'react-native-svg';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ProgressChart } from 'react-native-chart-kit';

import axios from 'axios';


// Admin and User dashboard screens (placeholder for now)
function AdminDashboard() {
  {
    /* Define light and power variables that return the current light intensity and power consumption values */
  }
  const [lightIntensity, setLightIntensity] = useState(0);
  const [powerConsumption, setPowerConsumption] = useState(0);
  const [isSmartSystemEnabled, setIsSmartSystemEnabled] = useState(false); // Initial state

  const toggleSmartSystem = async (value) => {
    console.error(isSmartSystemEnabled);
    try {
        const response = await fetch('http://xxx.xxx.xxx.xxx:xxxx/disable-smart-system', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: value ? "enabled" : "disabled" }), // Set to "enabled" or "disabled"
        });

        if (response.ok) {
            console.log(`Smart System ${value ? "enabled" : "disabled"}`);
            const data = await response.json();
            setIsSmartSystemEnabled(data[0].state === "true"); // Update local state based on API response
        } else {
            console.error("Failed to change Smart System state");
        }
    } catch (error) {
        console.error("Error:", error);
    }
};

  useEffect(() => {
    const fetchData = async () => {
    const light_intensity = await fetchLightIntensity();
    const power_consumption = await fetchPowerConsumption();
    if (light_intensity !== null && power_consumption !== null) {
      setLightIntensity(light_intensity); // Update the state with the fetched value
      setPowerConsumption(power_consumption); // Update the state with the fetched value
    }

    // Fetch initial state from Node-RED or set a default value
    const fetchInitialState = async () => {
        // Assuming you have an endpoint to get the current state
        // Replace with your actual endpoint to fetch the state
        const response = await fetch('http://xxx.xxx.xxx.xxx:xxxx/get-smart-system-state');
        if (response.ok) {
            const data = await response.json();
            console.error(data.state);
            setIsSmartSystemEnabled(data.state);
            
        }
    };

    fetchInitialState();
  };

    fetchData();
    const intervalId = setInterval(fetchData, 30000); // Fetch data every 30 seconds

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, []);

  return (
    <View style={styles.container}>
      {<Text style={styles.title}>Welcome, Admin!</Text>}
      {/*<Button title="Disable Smart System" onPress={toggleSmartSystem} />*/}
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Enable Smart System</Text>
        <Switch
            value={isSmartSystemEnabled}
            onValueChange={toggleSmartSystem}
            thumbColor={isSmartSystemEnabled ? "#f5dd4b" : "#f4f3f4"}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
        />
      </View>
      <View style={styles.container}>
        {/* Welcome message */}
        {<Text style={styles.title}>Current Light Intensity</Text>}

        <View style={styles.row}>
          {/* Gauge graph on the left */}
          <View style={styles.gaugeContainer}>
            <Gauge_Percentage value={lightIntensity} />
          </View>
        </View>
      </View>
      <View style={styles.container}>
        {/* Welcome message */}
        {<Text style={styles.title}>Current Power Consumption</Text>}

        <View style={styles.row}>
          {/* Gauge graph on the left */}
          <View style={styles.gaugeContainer}>
            <GaugeNumber value={powerConsumption} />
          </View>
        </View>
      </View>
    </View>
  );
}

function UserDashboard() {
  return (
    <View style={styles.container}>
      <Text>Welcome, User!</Text>
    </View>
  );
}

// Login Screen
function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === '12345') {
      Alert.alert('Success', 'You are logged in as Admin!');
      navigation.navigate('AdminDashboard');
    } else if (username === 'user' && password === 'user123') {
      Alert.alert('Success', 'You are logged in as a standard user.');
      navigation.navigate('UserDashboard');
    } else {
      Alert.alert('Error', 'Invalid credentials. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Smart System</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry={true}
        onChangeText={setPassword}
      />

      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const Stack = createStackNavigator();

//-------------------------------------------------------------------------------

// Function to fetch light intensity data from Node-RED/InfluxDB API
const fetchLightIntensity = async () => {
  try {
    const response = await fetch('http://xxx.xxx.xxx.xxx:xxxx/get-light-intensity'); // Node-RED endpoint
    const data = await response.json();
    return data[0].light_intensity; // Accessing the light intensity
  } catch (error) {
    console.error('Error fetching light intensity:', error);
    return null; // Return null in case of error
  }
};

// Function to fetch power consumption data from Node-RED/InfluxDB API
const fetchPowerConsumption = async () => {
  try {
    const response = await fetch('http://xxx.xxx.xxx.xxx:xxxx/get-power-consumption'); // Node-RED endpoint
    const data = await response.json();
    return data[0].power_consumption; // Accessing the light intensity
  } catch (error) {
    console.error('Error fetching power consumption:', error);
    return null; // Return null in case of error
  }
};

//Function to Disable Smart System
// Function to disable/enable the Smart System


//Percentage Gauge 
const Gauge_Percentage = ({ value }) => {
  const radius = 50; // Radius of the gauge
  const strokeWidth = 10; // Stroke width
  const circumference = 2 * Math.PI * radius; // Circumference of the circle
  const offset = circumference - (value / 100) * circumference; // Calculate offset based on value

  return (
    <Svg height={120} width={120}>
      <Circle
        stroke="#e6e6e6" // Background color of the gauge
        fill="none"
        strokeWidth={strokeWidth}
        cx={60} // Center x position
        cy={60} // Center y position
        r={radius} // Radius
      />
      <Circle
        stroke="#4caf50" // Gauge color
        fill="none"
        strokeWidth={strokeWidth}
        cx={60}
        cy={60}
        r={radius}
        strokeDasharray={`${circumference} ${circumference}`} // Dash array for stroke
        strokeDashoffset={offset} // Calculate the stroke offset
        rotation="-90" // Rotate the gauge for proper alignment
        originX="60"
        originY="60"
      />
      {/* Center the text in the circle */}
      <SvgText
        x="60" // Center x position
        y="65" // Center y position (slightly adjusted for better vertical centering)
        textAnchor="middle"
        fill="black"
        fontSize={20}
        fontWeight="bold">
        {value}%
      </SvgText>
      <Text
        x="50%"
        y="50%"
        textAnchor="middle"
        strokeWidth={1}
        fill="black"
        fontSize={20}>
        {value}%
      </Text>
    </Svg>
  );
};

//Number Gauge
const GaugeNumber = ({ value }) => {
  const radius = 50; // Radius of the gauge
  const strokeWidth = 10; // Stroke width
  const circumference = 2 * Math.PI * radius; // Circumference of the circle
  const offset = circumference - (value / 100) * circumference; // Calculate offset based on value

  return (
    <Svg height={120} width={120}>
      <Circle
        stroke="#e6e6e6" // Background color of the gauge
        fill="none"
        strokeWidth={strokeWidth}
        cx={60} // Center x position
        cy={60} // Center y position
        r={radius} // Radius
      />
      <Circle
        stroke="#4caf50" // Gauge color
        fill="none"
        strokeWidth={strokeWidth}
        cx={60}
        cy={60}
        r={radius}
        strokeDasharray={`${circumference} ${circumference}`} // Dash array for stroke
        strokeDashoffset={offset} // Calculate the stroke offset
        rotation="-90" // Rotate the gauge for proper alignment
        originX="60"
        originY="60"
      />
      {/* Center the text in the circle */}
      <SvgText
        x="60" // Center x position
        y="65" // Center y position (slightly adjusted for better vertical centering)
        textAnchor="middle"
        fill="black"
        fontSize={20}
        fontWeight="bold">
        {value}
      </SvgText>
      <Text
        x="50%"
        y="50%"
        textAnchor="middle"
        strokeWidth={1}
        fill="black"
        fontSize={20}>
        {value}
      </Text>
    </Svg>
  );
};




//-------------------------------------------------------------------------

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        <Stack.Screen name="UserDashboard" component={UserDashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 15,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
  },
  gaugeContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
