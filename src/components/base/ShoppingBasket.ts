import { IProduct } from "../../types";

export class ShoppingBasket {

  private _products: IProduct[] = [];

  addProduct(product:IProduct){
    if(product.price){
      this._products.push(product)
    }
    else {
      console.log("Должна быть цена или товар уже добавлен")
    }
  }

  deleteProduct(product: IProduct){
    this._products = this._products.filter(item => item.id != product.id)
  }

  getLength():number {
    return this._products.length
  }

  getProducts(): IProduct[] {
    return this._products
  }

  getPrice():number{
    return this._products.reduce((acc,item)=>
    {
      if(item.price != null)
      {
        acc += item.price
      }
      return acc
    },0)
  }

  checkProduct(productId: string): boolean{
    return this._products.some(item=> item.id === productId)
  }

  clearAll(){
    this._products = [];
  }
}