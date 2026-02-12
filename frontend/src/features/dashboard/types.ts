export type StatColor = "blue" | "green" | "orange" | "red";

export interface StatCard {
  title: string;
  value: number;
  color: StatColor;
}