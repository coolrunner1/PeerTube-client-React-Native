import {
    StyleSheet,
    ActivityIndicator,
} from "react-native";
import React, {useEffect, useMemo, useState} from "react";
import {Colors} from "@/constants/Colors";
import {VideoListEntry} from "@/types/VideoListEntry";
import {Header} from "@/components/Search/Header";
import {ContentCategories} from "@/components/Search/ContentCategories";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/state/store";
import {ErrorView} from "@/components/Global/ErrorView";
import {HomeFiltersMenu} from "@/components/Search/HomeFiltersMenu";
import {VideosList} from "@/components/Video/VideosList";
import {fetchVideos} from "@/api/videos";
import { setCurrentVideo } from "@/slices/videoPlayerSlice";
import {useInfiniteQuery} from "@tanstack/react-query";
import {queryClient} from "@/api/queryClient";
import {ThemedView} from "@/components/Global/ThemedView";

const HomeScreen = () => {
    const [showFilters, setShowFilters] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");
    const dispatch = useDispatch();
    const selectedCategory = useSelector((state: RootState) => state.filters.selectedCategory);
    const currentInstance = useSelector((state: RootState) => state.instances.currentInstance);

    const queryKey = useMemo(() =>
        ['videos', currentInstance, selectedCategory, search],
        [currentInstance, selectedCategory, search]);

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
        queryFn: fetchVideos,
        initialPageParam: 0,
        getNextPageParam: (lastPage, pages) => {
            if (lastPage.data.length === 0) return undefined;
            return pages.flatMap(p => p.data).length;
        },
        //gcTime: 60000,
        enabled: currentInstance !== "",
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
    }, [selectedCategory, search, currentInstance]);

    return (
        <>
            {!isLoading && isError &&
                <ErrorView error={error.toString()} onReloadPress={onRefresh} />
            }
            {!isError &&
                <>
                    <Header setSearch={setSearch} search={search} title={"Trending"}/>
                    <ContentCategories
                        onFiltersMenuButtonPress={() => setShowFilters(true)}
                    />
                    <HomeFiltersMenu
                        showFilters={showFilters}
                        onCloseButtonPress={() => setShowFilters(false)}
                    />
                    <ThemedView style={styles.container}>
                        {isLoading
                            ? <ActivityIndicator color={Colors.emphasised.backgroundColor} size={"large"}/>
                            : <VideosList
                                videos={Object.values(videos)}
                                currentInstance={currentInstance}
                                onRefresh={onRefresh}
                                setCurrentVideo={(e) => dispatch(setCurrentVideo(e))}
                                loading={isLoading}
                                isFetchingNextPage={isFetchingNextPage}
                                setEndOfScreen={() => {
                                    if (hasNextPage && !isFetchingNextPage) {
                                        fetchNextPage();
                                    }
                                }}
                            />
                        }
                    </ThemedView>
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
});

export default HomeScreen;