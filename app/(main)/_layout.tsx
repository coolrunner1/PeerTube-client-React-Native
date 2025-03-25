import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomeScreen from "@/app/(main)/home";
import Options from "@/app/(main)/options";
import Subscriptions from "@/app/(main)/subscriptions";
import {Colors} from "@/constants/Colors";
import {FontAwesome} from "@expo/vector-icons";
import SepiaSearch from "@/app/(main)/search";


export default function HomeLayout() {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            initialRouteName="home"
            screenOptions={{
                tabBarActiveTintColor: Colors.emphasised.backgroundColor,
                headerShown: false
        }}
        >
            <Tab.Screen
                name={"home"}
                options={{
                    title: "Search",
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
                }}
                component={HomeScreen}
            />
            <Tab.Screen
                name={"search"}
                options={{
                    title: "Sepia Search",
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="search" color={color} />,
                }}
                component={SepiaSearch}
            />
            <Tab.Screen
                name={"subscriptions"}
                options={{
                    title: "Subscriptions",
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="inbox" color={color} />,
                }}
                component={Subscriptions}
            />
            <Tab.Screen
                name={"options"}
                options={{
                    title: "Options",
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="gears" color={color} />,
                }}
                component={Options}
            />
        </Tab.Navigator>
    );
}
