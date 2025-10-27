import { Component } from "../base/Component"
import { ensureElement } from "../../utils/utils"

type IBasket = {
  finalPrice: number;
  items: HTMLElement[];
}

export class OrderSucces extends Component<IBasket> {

  basketButtonMakeOrder: HTMLButtonElement;
  basketList: HTMLElement;
  basketFinalPrice: HTMLElement;
  
  constructor(container: HTMLElement){
    super(container) 
    this.basketButtonMakeOrder = ensureElement<HTMLButtonElement>('order-success__description',container)
    this.basketList = ensureElement<HTMLElement>('order-success__description',container)
    this.basketFinalPrice = ensureElement<HTMLElement>('basketFinalPrice',container)
  }
  
  set finalPrice(price: number) {
    this.basketFinalPrice.textContent = `${String(price)} синапсов`
  }

  set items(products: HTMLElement[]){
    this.basketList.replaceChildren(...products)
  }
  

}