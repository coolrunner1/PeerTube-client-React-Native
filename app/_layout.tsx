import {DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Index from "@/app/index";
import Login from "@/app/login";
import Registration from "@/app/registration";
import HomeScreen from "@/app/(main)/home";
import HomeLayout from "@/app/(main)/_layout";
import {useState} from "react";
import {store} from "@/state/store";
import {Provider} from "react-redux";
import {QueryClient} from "@tanstack/query-core";
import {QueryClientProvider} from "@tanstack/react-query";

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const Stack = createNativeStackNavigator();
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                    <Stack.Navigator>
                        <Stack.Screen name="index" component={Index} options={{ headerShown: false }} />
                        <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
                        <Stack.Screen name="registration" component={Registration} options={{ headerShown: false}} />
                        <Stack.Screen name="(main)" component={HomeLayout} options={{ headerShown: false, orientation: "all" }} />
                    </Stack.Navigator>
                    <StatusBar style="auto" />
                </ThemeProvider>
            </Provider>
        </QueryClientProvider>
    );
}
