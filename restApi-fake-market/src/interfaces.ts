export interface IProduct {
  id: number;
  name: string;
  price: number;
  weight: number;
  section: "food" | "cleaning";
  expirationDate: string;
}

export interface ICleaningProduct extends IProduct {}

export interface IFoodProduct extends IProduct {
  calories: number;
}

export type IProductNoDateNoId = Omit<IProduct, "expirationDate" | "id">;
