import { IApi, IOrder, IGet } from "../../../types";

export class ApiService {
  api: IApi;

  constructor(api: IApi) {
    this.api = api;
  }

  get(): Promise<IGet> {
    return this.api.get("/product/");
  }

  post(body: IOrder) {
    return this.api.post(`/order/`, body, "POST");
  }
}
