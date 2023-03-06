import { Base } from "./base";

export interface Plan extends Base {
    id: string
    name: string
    status: string,
    desc: string,
    usageTime: number,
    cost: number,
}

export interface newPlan {
    name: string
    desc: string
    usageTime: number
    cost: number
}

