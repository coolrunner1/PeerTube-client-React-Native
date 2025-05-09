import {VideoPage} from "@/types/VideoPage";
import {Alert} from "react-native";
import {Video} from "@/types/Video";

export const fetchVideos = async ({pageParam = 0, queryKey}: any): Promise<VideoPage> => {
    const [_key, currentInstance, selectedCategory, search] = queryKey;

    if (!currentInstance) {
        throw new Error(`Failed to fetch videos`);
    }

    const res = await fetch(`${currentInstance}/api/v1/${search ? `search/` : ""}videos?${search ? `search=${search}` : ""}&count=25&start=${pageParam}${selectedCategory ? `&categoryOneOf=${selectedCategory}` : ""}`);
    if (!res.ok) {
        throw new Error(`Failed to fetch videos`);
    }
    return res.json();
}

export const getVideo = async ({queryKey}: any): Promise<Video> => {
    const [_key, videoUrl] = queryKey;

    const res = await fetch(videoUrl);
    if (!res.ok) {
        throw new Error(`Failed to load video`);
    }
    return res.json();
}