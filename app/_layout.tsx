import {DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Index from "@/app/index";
import Login from "@/app/Login";
import Registration from "@/app/Registration";
import HomeScreen from "@/app/HomeScreen";

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const Stack = createNativeStackNavigator();

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack.Navigator>
                <Stack.Screen name="index" component={Index} options={{ headerShown: false }} />
                <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="registration" component={Registration} options={{ headerShown: false }} />
                <Stack.Screen name="home" component={HomeScreen} options={{ headerShown: false }} />

            </Stack.Navigator>
            <StatusBar style="auto" />
        </ThemeProvider>
    );
}
