import {StyleSheet, ActivityIndicator, Animated, Button, View, RefreshControl, FlatList} from "react-native";
import ScrollView = Animated.ScrollView;
import {useEffect, useState} from "react";
import {VideoEntry} from "@/components/Home/VideoEntry";
import {VideoPlayer} from "@/components/Home/VideoPlayer";
import {useTheme} from "@react-navigation/core";
import {Colors} from "@/constants/Colors";
import {ThemedText} from "@/components/Global/ThemedText";
import {Video} from "@/types/Video";
import {Header} from "@/components/Home/Header";
import {ContentFilters} from "@/components/Home/ContentFilters";
import {useSelector} from "react-redux";
import {RootState} from "@/state/store";
import {ThemedButton} from "@/components/Global/ThemedButton";
import {FontAwesome} from "@expo/vector-icons";

const HomeScreen = () => {
    const theme = useTheme();
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [watch, setWatch] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [endOfScreen, setEndOfScreen] = useState<boolean>(false);
    const selectedFilter = useSelector((state: RootState) => state.filters.selectedFilter);
    const currentInstance = useSelector((state: RootState) => state.instances.currentInstance);

    const backgroundColor = theme.dark ?  Colors.dark.backgroundColor : Colors.light.backgroundColor;

    const loadVideos = async (clearVideos: boolean) => {
        await fetch(`${currentInstance}/api/v1/videos?start=${clearVideos ? 0 : videos.length}${selectedFilter ? `&categoryOneOf=${selectedFilter}` : ""}`)
            .then((res) => res.json())
            .then((json) => {
                setVideos(clearVideos ? json.data : [...videos, ...json.data]);
                setLoading(false);
            })
            .catch((err) => {console.error(err); setError(err.toString())});
        setEndOfScreen(false);
    };

    const onRefresh = async () => {
        setLoading(true);
        await loadVideos(true);
    };

    const onReloadPress = async () => {
        setError("");
        await loadVideos(true);
    };

    useEffect(() => {
        setLoading(true);
        loadVideos(true);
    }, [selectedFilter, currentInstance]);

    useEffect(() => {
        loadVideos(false);
    }, [endOfScreen])

    return (
        <>
            {loading && error &&
                <View style={[styles.container, {backgroundColor: backgroundColor}]}>
                    <>
                        <ThemedText
                            style={{fontSize: 18, fontWeight: "bold", marginBottom: 5}}
                        >Selected PeerTube instance might be down</ThemedText>
                        <ThemedText style={{fontWeight: "bold"}}>Error message:</ThemedText>
                        <ThemedText style={{color: "red"}}>{error}</ThemedText>
                        <ThemedButton
                            title={"Reload"}
                            style={{marginTop: 10}}
                            onPress={onReloadPress}
                        />
                    </>
                </View>
            }
            {watch &&
                <ScrollView
                style={{marginTop: 20 }}>
                    <Button
                        title="Back"
                        onPress={() => {setWatch("")}}
                    />
                    <VideoPlayer embedPath={watch} />
                </ScrollView>
            }
            {!watch && !error &&
                <>
                    <Header />
                    <ContentFilters/>
                    {/*
                    <FontAwesome name={"search"} size={50} color={"white"}/>
                    <FontAwesome name={"compass"} size={50} color={"white"}/>
                    */}
                    <View style={[styles.container, {backgroundColor: backgroundColor}]}>
                        {loading &&
                            <ActivityIndicator color={Colors.emphasised.backgroundColor} size={"large"}/>
                        }
                        {!loading &&
                            <View style={styles.flatListContainer}>
                                <FlatList
                                    data={videos}
                                    keyExtractor={(item) => item.uuid}
                                    renderItem={({ item }) => (
                                        <VideoEntry
                                            title={item.name}
                                            thumbnail={`${currentInstance}${item.thumbnailPath}`}
                                            publishedAt={item.publishedAt}
                                            views={item.views}
                                            channelDisplayName={item.channel.displayName}
                                            onPress={() => setWatch(`${currentInstance}${item.embedPath}`)}
                                            isLive={item.isLive}
                                            nsfw={item.nsfw}
                                        />
                                    )}
                                    ItemSeparatorComponent={() => <View style={{height: 10}} />}
                                    style={{flex:1}                                    }
                                    onScroll={(e)=>{
                                        let paddingToBottom = 10;
                                        paddingToBottom += e.nativeEvent.layoutMeasurement.height;
                                        if (e.nativeEvent.contentOffset.y >= e.nativeEvent.contentSize.height - paddingToBottom) {
                                            setEndOfScreen(true);
                                        }
                                    }}
                                    ListFooterComponent={endOfScreen ? <ActivityIndicator color={Colors.emphasised.backgroundColor}/> : <></>}
                                />
                            </View>
                        }
                    </View>
                </>
            }
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    flatListContainer: {
        flex: 1,
        marginHorizontal: "auto",
        marginTop: 5,
        paddingHorizontal: 10,
        gap: 15,
        maxWidth: 900,
    }
});

export default HomeScreen;