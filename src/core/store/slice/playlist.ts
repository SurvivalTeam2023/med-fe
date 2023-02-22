import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlaylistState } from "core/interface/redux";

const initialState: PlaylistState = {
    playlist: null,
    error: null,
};

const reducer = createSlice({
    name: "playlist",
    initialState,
    reducers: {
        resetState: () => ({ ...initialState }),
        setPlaylist: (state, { payload }: PayloadAction<PlaylistState["playlist"]>) => {
            state.playlist = payload;
        },
    }
});
export const playlistActions = {
    ...reducer.actions,
};