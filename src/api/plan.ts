import { CallAPI } from "core/api";
import { ApiResponse } from "core/interface/api";
import { Plan } from "core/interface/models/plan";

export const getPlanAPI = (
): ApiResponse<Plan[]> => {
    const url = `/plans`;
    return CallAPI.get(url)
}