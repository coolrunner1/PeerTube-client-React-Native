import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomeScreen from "@/app/(main)/home";
import Options from "@/app/(main)/options";
import Subscriptions from "@/app/(main)/subscriptions";
import {Colors} from "@/constants/Colors";
import {FontAwesome} from "@expo/vector-icons";
import SepiaSearch from "@/app/(main)/search";
import {useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {setCurrentInstance} from "@/slices/instancesSlice";
import {useDispatch, useSelector} from "react-redux";
import {setPreferredPlayer} from "@/slices/userPreferencesSlice";
import {VideoPlayer} from "@/components/Video/VideoPlayer";
import { RootState } from "@/state/store";
import {setCurrentVideo} from "@/slices/videoPlayerSlice";


export default function HomeLayout() {
    const Tab = createBottomTabNavigator();
    const dispatch = useDispatch();
    const currentVideo = useSelector((state: RootState) => state.videoPlayer.currentVideo);

    useEffect(() => {
        AsyncStorage.getItem("instance")
            .then((instance) =>
                instance ? dispatch(setCurrentInstance(instance)) : dispatch(setCurrentInstance("https://tilvids.com")));
        AsyncStorage.getItem("preferredPlayer")
            .then((preferredPlayer) =>
                preferredPlayer && dispatch(setPreferredPlayer(preferredPlayer)));
    }, []);

    return (
        <>
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
                        title: "Home",
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
                {/*<Tab.Screen
                name={"subscriptions"}
                options={{
                    title: "Subscriptions",
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="inbox" color={color} />,
                }}
                component={Subscriptions}
            />*/}
                <Tab.Screen
                    name={"options"}
                    options={{
                        title: "Options",
                        tabBarIcon: ({ color }) => <FontAwesome size={28} name="gears" color={color} />,
                    }}
                    component={Options}
                />
            </Tab.Navigator>
            {currentVideo &&
                <VideoPlayer
                    videoUrl={currentVideo}
                />
            }
        </>
    );
}
