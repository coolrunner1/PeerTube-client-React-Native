import {Channel} from "@/types/Channel";
import {StreamingPlaylist} from "@/types/StreamingPlaylist";
import {VideoFile} from "@/types/VideoFile";
import {Language} from "@/types/Language";

export type Video = {
    id: number;
    name: string;
    truncatedDescription: string;
    uuid: string;
    thumbnailPath: string;
    publishedAt: string;
    views: number;
    likes: number;
    dislikes: number;
    embedPath: string;
    channel: Channel;
    tags: string[];
    files: VideoFile[];
    language: Language;
    streamingPlaylists:  StreamingPlaylist[];
    isLive: boolean;
    nsfw: boolean;
}