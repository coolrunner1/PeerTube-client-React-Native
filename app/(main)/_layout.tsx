import {DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Index from "@/app/index";
import Login from "@/app/Login";
import Registration from "@/app/Registration";


export default function HomeLayout() {
    const Tab = createNativeStackNavigator();

    return (
        <Tab.Navigator
            initialRouteName="home"
        >

        </Tab.Navigator>
    );
}
