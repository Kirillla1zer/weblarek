import { IProduct } from "../../../types";

export class Catalog {
  private _products: IProduct[] = [];
  private _productCard: IProduct | undefined;

  constructor(products: IProduct[]) {
    this.setItems(products);
  }

  setItems(products: IProduct[]) {
    this._products = products;
  }

  getItems(): IProduct[] {
    return this._products;
  }

  setProductCard(productCard: IProduct) {
    if (productCard != undefined) {
      this._productCard = productCard;
    }
  }

  getProductCard(): IProduct | undefined {
    return this._productCard;
  }

  getProductById(id: string): IProduct | undefined {
    return this._products.find((item) => {
      return item.id === id;
    });
  }
}
