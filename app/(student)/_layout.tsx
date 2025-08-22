// import { Stack, Redirect } from "expo-router"
// import { useAuthStore } from "../../lib/stores/auth"
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { Drawer } from "expo-router/drawer";
// import { View } from "react-native";
// import { DrawerToggleButton } from "@react-navigation/drawer";


// export default function StudentLayout() {
//   const { user } = useAuthStore()

//   if (!user || user.role !== "STUDENT") {
//     return <Redirect href="/(auth)/login" />
//   }

//   return (
//     // <Stack screenOptions={{ headerShown: false }}>
//     //   <Stack.Screen name="(tabs)" />
//     //   <Stack.Screen name="course/[courseCode]" />
//     //   <Stack.Screen name="play/[lessonId]" />
//     //   <Stack.Screen name="class-room/[classId]" />
//     //   <Stack.Screen name="mock/index" />
//     //   <Stack.Screen name="mock/attempt/[mockPaperId]" />
//     //   <Stack.Screen name="mock/score/[mockAttemptId]" />
//     //   <Stack.Screen name="prev-papers/index" />
//     //   <Stack.Screen name="assignments/index" />
//     //   <Stack.Screen name="notes/index" />
//     //   <Stack.Screen name="certificates/index" />
//     //   <Stack.Screen name="downloads/index" />
//     // </Stack>

//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <Drawer
//         screenOptions={{
//           drawerPosition: "right",
//           headerShown: false,

//           // Hide the right header button

//           drawerStyle: { backgroundColor: "#f3f5f7" },
//           drawerActiveTintColor: "#4282f0",
//           drawerInactiveTintColor: "#333",
//         }}
//       >
//         {/* Main app tabs inside drawer */}
//         <Drawer.Screen
//           name="index"
//           options={{ drawerLabel: "Home" }}
//         />

//         {/* Secondary menu items */}
//         <Drawer.Screen name="session" options={{ drawerLabel: "session" }} />
//         <Drawer.Screen name="payment" options={{ drawerLabel: "Payment" }} />
//         <Drawer.Screen name="profile" options={{ drawerLabel: "Profile" }} />
//         <Drawer.Screen name="logout" options={{ drawerLabel: "Logout" }} />


//         {/*  */}
//       </Drawer>
//     </GestureHandlerRootView>
//   )
// }








import { Redirect ,useRouter} from "expo-router"
import { useAuthStore } from "../../lib/stores/auth"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { Drawer } from "expo-router/drawer"
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer"
import { Home, User, CreditCard, BookOpen, LogOut, Settings, BadgeInfo } from "lucide-react-native"

export default function StudentLayout() {
  const router= useRouter()
  const { user, logout } = useAuthStore()

  if (!user || user.role !== "STUDENT") {
    return <Redirect href="/(auth)/login" />
  }

  // ✅ Custom Drawer Content
  function CustomDrawerContent(props: any) {
    return (
      <DrawerContentScrollView {...props}>
        {/* Default list = Home/Session/Payment/Profile (with icons) */}
        {/* <DrawerItemList {...props} /> */}

        <DrawerItem
          label="Home"
          icon={({ color, size }) => <Home color={color} size={size} />}
          onPress={() => props.navigation.navigate("(tabs)/dashboard")}
        />
        <DrawerItem
          label="Session"
          icon={({ color, size }) => <BadgeInfo color={color} size={size} />}
          onPress={() => props.navigation.navigate("(tabs)/session")}
        />
        <DrawerItem
          label="Payment"
          icon={({ color, size }) => <CreditCard color={color} size={size} />}
          onPress={() => props.navigation.navigate("(tabs)/payment/index")}
        />
        <DrawerItem
          label="Profile"
          icon={({ color, size }) => <User color={color} size={size} />}
          onPress={() => props.navigation.navigate("(tabs)/profile")}
        />






        {/* Divider */}
        <DrawerItem
          label="Settings"
          icon={({ color, size }) => <Settings color={color} size={size} />}
          onPress={() => console.log("Settings pressed")}
        />
        <DrawerItem
          label="Logout"
          icon={({ color, size }) => <LogOut color="red" size={size} />}
          labelStyle={{ color: "red" }}
          onPress={() => logout()}
        />
      </DrawerContentScrollView>
    )
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerPosition: "right",
          headerShown: false,
          headerRight: () => null,
          headerLeft: () => null,

          drawerStyle: { backgroundColor: "#f3f5f7" },
          drawerActiveTintColor: "#4282f0",
          drawerInactiveTintColor: "#333",
        }}
      >

        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerLabel: "Home",
            drawerIcon: ({ color, size }) => <Home color={color} size={size} />,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  )
}
