import { Base } from "./base";

export interface Plan extends Base {
    id: string
    name:string
    status: string,
    desc:string,
    usageTime:number,
    cost:number,
}

