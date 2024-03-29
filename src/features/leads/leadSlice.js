import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CallAPI } from "../../Axios/AxiosBase";

export const getLeadsContent = createAsyncThunk("/leads/content", async () => {
  const response = await CallAPI.get("/user/userList", {});
  return response.data;
});

export const leadsSlice = createSlice({
  name: "leads",
  initialState: {
    isLoading: false,
    leads: [],
  },
  reducers: {
    addNewLead: (state, action) => {
      let { newLeadObj } = action.payload;
      state.leads = [...state.leads, newLeadObj];
    },

    deleteLead: (state, action) => {
      let { index } = action.payload;
      state.leads.splice(index, 1);
    },
  },

  extraReducers: {
    [getLeadsContent.pending]: (state) => {
      state.isLoading = true;
    },
    [getLeadsContent.fulfilled]: (state, action) => {
      state.leads = action.payload;
      console.log(state.leads);
      state.isLoading = false;
    },
    [getLeadsContent.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { addNewLead, deleteLead } = leadsSlice.actions;

export default leadsSlice.reducer;
