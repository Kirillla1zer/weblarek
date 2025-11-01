import { Component } from "../base/Component"
import { ensureElement } from "../../utils/utils"
import { IEvents } from "../base/Events";
import { eventList } from "../../main";

type IBasket = {
  finalPrice: number;
  items: HTMLElement[];
} & {buttonToggle:boolean}

export class Basket extends Component<IBasket> {

  basketButtonMakeOrder: HTMLButtonElement;
  basketList: HTMLElement;
  basketFinalPrice: HTMLElement;
  eventBroker: IEvents
  constructor(container: HTMLElement,eventBroker:IEvents){
    super(container) 

    this.basketButtonMakeOrder = ensureElement<HTMLButtonElement>('.basket__button',this.container)
    this.basketList = ensureElement<HTMLUListElement>('.basket__list',this.container)
    this.basketFinalPrice = ensureElement<HTMLElement>('.basket__price',this.container)
    this.eventBroker = eventBroker;

    this.basketButtonMakeOrder.addEventListener('click',()=>{
      this.eventBroker.emit(eventList.BasketMakeOrderClick);
    })
  }
  
  set finalPrice(price: number) {
    this.basketFinalPrice.textContent = `${String(price)} синапсов`
  }

  set items(products: HTMLElement[]){
    this.basketList.replaceChildren(...products)
  }
  
  set buttonToggle(value: boolean){
    value == true ? this.basketButtonMakeOrder.disabled = false : this.basketButtonMakeOrder.disabled = true
  }
}