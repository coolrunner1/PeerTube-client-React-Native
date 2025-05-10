import {
    StyleSheet,
    ActivityIndicator,
    View,
    Alert
} from "react-native";
import React, {useEffect, useMemo, useState} from "react";
import {Colors} from "@/constants/Colors";
import {Header} from "@/components/Search/Header";
import {ContentCategories} from "@/components/Search/ContentCategories";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/state/store";
import {ErrorView} from "@/components/Global/ErrorView";
import {VideoListEntry} from "@/types/VideoListEntry";
import {VideosList} from "@/components/Video/VideosList";
import {setCurrentVideo} from "@/slices/videoPlayerSlice";
import {useInfiniteQuery} from "@tanstack/react-query";
import {queryClient} from "@/api/queryClient";
import {fetchSepiaVideos} from "@/api/sepiaSearch";
import { useBackgroundColor } from "@/hooks/useBackgroundColor";

const SepiaSearch = () => {
    const [search, setSearch] = useState<string>("");
    const dispatch = useDispatch();
    const selectedCategory = useSelector((state: RootState) => state.filters.selectedSepiaCategory);

    const backgroundColor = useBackgroundColor();

    const queryKey = useMemo(() =>
            ['sepiaVideos', selectedCategory, search],
        [selectedCategory, search]);

    const {
        data,
        isLoading,
        error,
        isError,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        refetch
    } = useInfiniteQuery({
        queryKey,
        queryFn: fetchSepiaVideos,
        initialPageParam: 0,
        getNextPageParam: (lastPage, pages) => {
            if (lastPage.data.length === 0) return undefined;
            return pages.flatMap(p => p.data).length;
        },
    });

    const videos = useMemo(() => {
        const videoObject: { [key: string]: VideoListEntry } = {};
        data?.pages?.flatMap(page =>
            page.data.map((video) => {
                videoObject[video.uuid] = video;
            })
        );
        return videoObject;
    }, [data?.pages]);

    const onRefresh = () => {
        queryClient.removeQueries({queryKey});
        refetch();
    }

    useEffect(() => {
        refetch()
    }, [selectedCategory, search]);

    useEffect(() => {
        Alert.alert('Warning', 'Sepia search is a global search utility that gathers videos from hundreds of instances. You might come across illegal content, nsfw content and insane conspiracy theories. Proceed with discretion.', [
            {text: 'OK'},
        ]);
    }, []);

    return (
        <>
            {isLoading && isError &&
                <ErrorView error={error} onReloadPress={onRefresh}/>
            }
            {!isError &&
                <>
                    <Header setSearch={setSearch} search={search} title={"Sepia Search"} />
                    <ContentCategories
                        onFiltersMenuButtonPress={() => {}}
                        sepiaSearch={true}
                    />
                    <View style={[styles.container, {backgroundColor: backgroundColor}]}>
                        {isLoading &&
                            <ActivityIndicator color={Colors.emphasised.backgroundColor} size={"large"}/>
                        }
                        {!isLoading &&
                            <VideosList
                                videos={Object.values(videos)}
                                onRefresh={onRefresh}
                                setCurrentVideo={e => dispatch(setCurrentVideo(e))}
                                loading={isLoading}
                                isFetchingNextPage={isFetchingNextPage}
                                setEndOfScreen={() => {
                                    if (hasNextPage && !isFetchingNextPage) {
                                        fetchNextPage();
                                    }
                                }}
                            />
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

export default SepiaSearch;