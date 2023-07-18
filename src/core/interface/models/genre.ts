import { Base } from "./base";

export interface Genre extends Base {
  id: string;
  createdAt: string;
  lastUpdatedAt: string;
  name: string;
  desc: string;
  image: string;
  status: string;
  emotion: string;
}

export interface newPlan {
  name: string;
  desc: string;
  usageTime: number;
  cost: number;
}
