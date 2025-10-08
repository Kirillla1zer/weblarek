import { IApi, IBodyOrder, IGetProducts, ISendOrder } from "../../types";

export class ApiService {
  api: IApi;

  constructor(api: IApi) {
    this.api = api;
  }

  getProducts(): Promise<IGetProducts> {
    return this.api.get("/product/");
  }

  sendOrder(body: IBodyOrder): Promise<ISendOrder> {
    return this.api.post(`/order/`, body, "POST");
  }
}
