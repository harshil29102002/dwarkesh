export type RowStatus = "in-stock" | "reserved" | "sold";

export interface Row {
  id: number;
  model: string;
  godown: string;
  mfgDate: string;
  chassis: string;
  colour: string;
  engineNo: string;
  amount: number;
  status: RowStatus;
}