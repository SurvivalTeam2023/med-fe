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
        setPlaylistId: (state, { payload }: PayloadAction<PlaylistState["playlist"]>) => {
            if (state.playlist != null && payload != null) {
                state.playlist.id = payload.id;
              }
          },
    }
});
export const playlistActions = {
    ...reducer.actions,
};
export const playlistReducer = reducer.reducer;
