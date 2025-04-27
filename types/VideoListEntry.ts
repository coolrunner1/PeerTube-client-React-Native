import {Channel} from "@/types/Channel";

export type VideoListEntry = {
    id: number;
    name: string;
    host: string;
    uuid: string;
    thumbnailUrl: string;
    thumbnailPath: string;
    publishedAt: string;
    views: number;
    likes: number;
    dislikes: number;
    embedUrl: string;
    embedPath: string;
    channel: Channel;
    duration: number;
    isLive: boolean;
    nsfw: boolean;
}