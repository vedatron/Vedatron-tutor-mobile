"use client"
import { TouchableOpacity } from "react-native"
import { Menu } from "lucide-react-native"
import { useNavigation, DrawerActions } from "@react-navigation/native"

export function DrawerToggle() {
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      style={{ marginRight: 12 }}
    >
      <Menu size={24} color="#000" />
    </TouchableOpacity>
  )
}
