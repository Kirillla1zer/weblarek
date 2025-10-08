export type ApiPostMethods = "POST" | "PUT" | "DELETE";

export interface IApi {
  get<T extends object>(uri: string): Promise<T>;
  post<T extends object>(
    uri: string,
    data: object,
    method?: ApiPostMethods
  ): Promise<T>;
}
export interface IProduct {
  id: string;
  title: string;
  image: string;
  category: string;
  price: number | null;
  description: string;
}

export interface IBuyer {
  payment: "card" | "cash" | "";
  address: string;
  email: string;
  phone: string;
}

export interface IGet {
  total: number;
  items: IProduct[];
}

export interface IOrder extends IBuyer {
  total: number;
  items: string[];
}
