import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomeScreen from "@/app/(main)/HomeScreen";
import {NavigationContainer} from "@react-navigation/native";
import Options from "@/app/(main)/Options";
import Subscriptions from "@/app/(main)/Subscriptions";


export default function HomeLayout() {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            initialRouteName="home"
            screenOptions={{
                tabBarActiveTintColor: "#f9526c",
                headerShown: false
        }}
        >
            <Tab.Screen name={"home"} component={HomeScreen}/>
            <Tab.Screen name={"subscriptions"} component={Subscriptions}/>
            <Tab.Screen name={"options"} component={Options}/>
        </Tab.Navigator>
    );
}
