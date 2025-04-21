import {Channel} from "@/types/Channel";
import {StreamingPlaylist} from "@/types/StreamingPlaylist";

export type Video = {
    id: number;
    name: string;
    uuid: string;
    thumbnailPath: string;
    publishedAt: string;
    views: number;
    likes: number;
    dislikes: number;
    embedPath: string;
    channel: Channel;
    streamingPlaylists:  StreamingPlaylist[];
    isLive: boolean;
    nsfw: boolean;
}