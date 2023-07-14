import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlaylistState } from "core/interface/redux";

const initialState: PlaylistState = {
  playlist: null,
  id: null,
  currentPage: null,
  error: null,
};

const reducer = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    resetState: () => ({ ...initialState }),
    setPlaylist: (
      state,
      { payload }: PayloadAction<PlaylistState["playlist"]>
    ) => {
      state.playlist = payload;
    },
    setPlaylistId: (
      state,
      { payload }: PayloadAction<PlaylistState["playlist"]>
    ) => {
      if (payload != null) {
        state.id = payload;
      }
    },
    setPlaylistCurrentPage: (
      state,
      { payload }: PayloadAction<PlaylistState["playlist"]>
    ) => {
      if (payload != null) {
        state.currentPage = payload;
      }
    }
  },
});
export const playlistActions = {
  ...reducer.actions,
};
export const playlistReducer = reducer.reducer;
