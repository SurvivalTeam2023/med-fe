import { Audio } from "../models/audio";

export interface AudioState {
    audio: Audio | null;
    audioId: Audio | null,
    currentPage: Audio | null,
    error: string | null;
}
