import {Video} from "@/types/Video";

export const getVideos = async (currentInstance: string, clearVideos: boolean): Promise<Video[]> => {
    await fetch(`${currentInstance}/api/v1/${search ? `search/` : ""}videos?${search ? `search=${search}` : ""}&start=${clearVideos ? 0 : videos.length}${selectedCategory ? `&categoryOneOf=${selectedCategory}` : ""}`)
        .then((res) => res.json())
        .then((json) => {
            setVideos(clearVideos ? json.data : [...videos, ...json.data]);
            setLoading(false);
        })
        .catch((err) => {console.error(err); setError(err.toString())});
    setEndOfScreen(false);
}

export const searchVideos = async (): Promise<Video[]> => {

}