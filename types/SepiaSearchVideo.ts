import {Channel} from "@/types/Channel";

export type SepiaSearchVideo = {
    id: number;
    name: string;
    uuid: string;
    host: string;
    thumbnailPath: string;
    thumbnailUrl: string;
    publishedAt: string;
    views: number;
    likes: number;
    dislikes: number;
    embedPath: string;
    embedUrl: string;
    channel: Channel;
    duration: number;
    isLive: boolean;
    nsfw: boolean;
}