import { Plan } from "../models/plan";

export interface PlanState {
    plan: Plan | null;
    error: string | null
}

