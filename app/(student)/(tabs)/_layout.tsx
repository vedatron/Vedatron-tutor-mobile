
import { Tabs } from "expo-router"
import { Trophy, List, BookA, Telescope, LayoutDashboard } from "lucide-react-native"

import {DrawerToggle} from "@/components/DrawerToogle"

export default function StudentTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerLeft: () => null,
        headerRight: () => (
          <DrawerToggle />
        ),

        tabBarActiveTintColor: "#2563eb",
        tabBarInactiveTintColor: "#6b7280",
        tabBarStyle: {
          backgroundColor: "white",
          borderTopWidth: 1,
          borderTopColor: "#e5e7eb",
          paddingBottom: 8,
          paddingTop: 8,
          height: 80,
        },
        tabBarIconStyle: {
       
          marginBottom: 0,
          marginTop: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 4,
        },
        tabBarItemStyle: {
          paddingVertical: 4,
          paddingHorizontal: 8,
        },
        tabBarActiveBackgroundColor: "#f3f4f6",
        tabBarInactiveBackgroundColor: "#ffffffff",

        
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => <LayoutDashboard color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, size }) => <Telescope color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="mylearning"
        options={{
          title: "Classes",
          tabBarIcon: ({ color, size }) => <BookA color={color} size={size} />,
        }}
      />
  
      <Tabs.Screen
        name="mock/index"
        options={{
          title: "Mock",
          tabBarIcon: ({ color, size }) => <List color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="progress/index"
        options={{
          title: "Progress",
          tabBarIcon: ({ color, size }) => <Trophy color={color} size={size} />,
        }}
      />
    </Tabs>
  )
}
