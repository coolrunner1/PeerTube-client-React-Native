import {VideoFile} from "@/types/VideoFile";

export type StreamingPlaylist = {
    playlistUrl: string;
    files: VideoFile[];
}