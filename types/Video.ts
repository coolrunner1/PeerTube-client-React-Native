import {Channel} from "@/types/Channel";
import {StreamingPlaylist} from "@/types/StreamingPlaylist";
import {VideoFile} from "@/types/VideoFile";

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
    files: VideoFile[];
    streamingPlaylists:  StreamingPlaylist[];
    isLive: boolean;
    nsfw: boolean;
}