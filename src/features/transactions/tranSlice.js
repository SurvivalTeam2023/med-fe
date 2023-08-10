import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CallAPI } from "../../Axios/AxiosBase";

export const getTransContent = createAsyncThunk(
  "trans/getContent",
  async () => {
    const response = await CallAPI.get("/subscriptions", {});
    return response.data.items;
  }
);

export const transSlice = createSlice({
  name: "trans",
  initialState: {
    isLoading: false,
    trans: [],
  },
  reducers: {
    // addNewTrans: (state, action) => {
    //   let { newTranObj } = action.payload;
    //   state.trans = [...state.trans, newTranObj];
    // },
    // deleteTrans: (state, action) => {
    //   let { index } = action.payload;
    //   state.trans.splice(index, 1);
    // },
  },

  extraReducers: {
    [getTransContent.pending]: (state) => {
      state.isLoading = true;
    },
    [getTransContent.fulfilled]: (state, action) => {
      state.trans = action.payload;
      console.log("Slice", state.trans);
      state.isLoading = false;
    },
    [getTransContent.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const {} = transSlice.actions;

export default transSlice.reducer;
