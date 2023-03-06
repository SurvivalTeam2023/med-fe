import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlanState } from "core/interface/redux/plan";

const initialState: PlanState = {
    plan: null,
    error: null,
};

const reducer = createSlice({
    name: "plan",
    initialState,
    reducers: {
        resetState: () => ({ ...initialState }),
        setPlan: (state, { payload }: PayloadAction<PlanState["plan"]>) => {
            state.plan = payload;
        },
    }
});
export const planAction = {
    ...reducer.actions,
};
export const planReducer = reducer.reducer;
