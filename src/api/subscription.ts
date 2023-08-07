import { CallAPI } from "core/axiosCore";
import { ApiResponse } from "core/interface/api";
import { Subscription } from "../core/interface/models/subscription";

export const getSubscriptionAPI = (): ApiResponse<Subscription> => {
    const url = `/subscriptions?status=ACTIVE`;
    return CallAPI.get(url);
};