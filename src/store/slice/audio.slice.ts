import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AudioState } from "core/interface/redux/audio";

const initialState: AudioState = {
    audio: null,
    audioId: null,
    currentPage: null,
    error: null,
};

const reducer = createSlice({
    name: "audio",
    initialState,
    reducers: {
        resetState: () => ({ ...initialState }),
        setAudio: (
            state,
            { payload }: PayloadAction<AudioState["audio"]>
        ) => {
            state.audio = payload;
        },
        setAudioId: (
            state: any,
            { payload }: PayloadAction<AudioState["audio"]>
        ) => {
            if (payload != null) {
                state.audioId = payload;
            }
        },
        setAudioCurrentPage: (
            state: any,
            { payload }: PayloadAction<AudioState["audio"]>
        ) => {
            if (payload != null) {
                state.currentPage = payload;
            }
        },
    },
});
export const audioActions = {
    ...reducer.actions,
};
export const audioReducer = reducer.reducer;
