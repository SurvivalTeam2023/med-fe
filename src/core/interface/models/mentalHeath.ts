export type MentalHealthData = MentalHealth[];

export interface MentalHealth {
  id: number;
  createdAt: string;
  lastUpdatedAt: string;
  name: string;
  status: string;
}

export interface newMentalHealth {
  name: string;
  status: any;
}
