import { IProduct } from "../../types";
import { IEvents } from "../base/Events";
import { eventList } from "../../main";

export class Catalog {
  private _products: IProduct[] = [];
  private _productCard: IProduct | undefined;
  protected _eventBroker: IEvents;

  constructor(products: IProduct[],eventBroker:IEvents) {
    this._eventBroker = eventBroker;
    this.setItems(products);
    
  }

  setItems(products: IProduct[]) {
    this._products = products;
    this._eventBroker.emit(eventList.CatalogChanged)
  }

  getItems(): IProduct[] {
    return this._products;
  }

  setProductCard(productCard: IProduct) {
    if (productCard != undefined) {
      this._productCard = productCard;
      this._eventBroker.emit(eventList.CardSetProductCard,this._productCard)
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
