import { createPlanAPI } from "api/plan";
import { newPlan } from "core/interface/models/plan";
import { AppThunk } from "..";

export const createPlanThunk = (payload: newPlan): AppThunk<Promise<void>> =>
    async (dispatch: any) => {
        try {
            await createPlanAPI(payload)
        } catch (error: any) {
            return error;
        }
    }