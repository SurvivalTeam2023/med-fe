import { CallAPI } from "core/api";
import { ApiResponse } from "core/interface/api";
import { newPlan, Plan } from "core/interface/models/plan";

export const getPlanAPI = (
): ApiResponse<Plan[]> => {
    const url = `/plans`;
    return CallAPI.get(url)
}

export const createPlanAPI = (payload: newPlan): ApiResponse<newPlan> => {
    const url = `/plans`;
    const { name, desc, usageTime, cost } = payload
    return CallAPI.post(url, { name, desc, usageTime, cost })
}