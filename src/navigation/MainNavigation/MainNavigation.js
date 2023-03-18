import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

import HomeScreen from 'src/screens/Home';
import TransactionScreen from 'src/screens/Transaction';
import BalancesScreen from 'src/screens/Details/Balances';
import PieChartScreen from 'src/screens/Details/Pie';
import AccountScreen from 'src/screens/Accounts';
import ToBuyScreen from 'src/screens/ToBuy';
import CategoryScreen from 'src/screens/Category';
import ProfileScreen from 'src/screens/Profile';
import AboutScreen from 'src/screens/Profile/About';
import LoadingScreen from 'src/screens/LoadingScreen';

function HomeScreenNavigation() {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Transaction"
        component={TransactionScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Loading"
        component={LoadingScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

function HomeTabNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          var iconName = 'ios-people';
          switch (route.name) {
            case 'To Buy':
              iconName = 'cart-outline';
              break;
            case 'Accounts':
              iconName = 'ios-people';
              break;
            case 'Balances':
              iconName = 'ios-bar-chart';
              break;
            case 'Charts':
              iconName = 'pie-chart-outline';
              break;
            case 'Details':
              iconName = 'ios-list';
              break;
            default:
              iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
          // return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="Balances"
        component={BalancesScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Charts"
        component={PieChartScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Dashboard"
        component={HomeScreenNavigation}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Accounts"
        component={AccountScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="To Buy"
        component={ToBuyScreen}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
export default function Navitagion() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeTabNavigation} />
      <Drawer.Screen name="Categories" component={CategoryScreen} />
      <Drawer.Screen name="About" component={AboutScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}
