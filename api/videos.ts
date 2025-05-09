import {VideoPage} from "@/types/VideoPage";

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