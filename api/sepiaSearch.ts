import {BlockedInstances} from "@/constants/BlockedInstances";
import {VideoPage} from "@/types/VideoPage";

const blockedInstances = BlockedInstances.join("&blockedHosts[]=");

export const fetchSepiaVideos = async ({pageParam = 0, queryKey}: any): Promise<VideoPage> => {
    const [_key, selectedCategory, search] = queryKey;

    const res = await fetch(`https://sepiasearch.org/api/v1/search/videos?${search ? `search=${search}&` : ""}start=${pageParam}${selectedCategory ? `&categoryOneOf=${selectedCategory}` : ""}&blockedHosts[]=${blockedInstances}`);
    if (!res.ok) {
        throw new Error(`Failed to fetch videos`);
    }
    return res.json();
}