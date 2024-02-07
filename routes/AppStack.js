import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TrackParcel from '../screens/TrackParcel';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export const AppStack = () => {
  return (
    <Tab.Navigator screenOptions={{
      tabBarInactiveTintColor:"#8C8FA5",
      tabBarActiveTintColor:"#4CA7A8",
      headerShown:false,
    }}>
      <Tab.Screen name="TrackParcel" component={TrackParcel}
        options={{
          title:"",
          tabBarIcon: () => <AntDesign name="home" size={24} color="#8C8FA5" />
        }}
      />
      <Tab.Screen name="Track" component={TrackParcel}
        options={{
          title:"",
          tabBarIcon: () => <FontAwesome6 name="location" size={24} color="#8C8FA5" />
        }}
      />
      <Tab.Screen name="Receipt" component={TrackParcel}
        options={{
          title:"",
          tabBarIcon: () => <FontAwesome5 name="receipt" size={24} color="#8C8FA5" />
        }}
      />
    </Tab.Navigator>
  );
};