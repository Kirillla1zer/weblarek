import { Component } from "../base/Component"
import { ensureElement } from "../../utils/utils"
import { IEvents } from "../base/Events";
import { IHeader } from "../../types";
import { eventList } from "../../main";

export class Header extends Component<IHeader> {

  basketButton: HTMLButtonElement;
  counterElement: HTMLElement;
  eventBroker: IEvents;

  constructor(container: HTMLElement, eventBroker: IEvents){
    super(container) 
    this.basketButton = ensureElement<HTMLButtonElement>('.header__basket',this.container)
    this.counterElement = ensureElement<HTMLElement>('.header__basket-counter',this.container)
    this.eventBroker = eventBroker;

    this.basketButton.addEventListener('click',()=>{
        eventBroker.emit(eventList.HeaderBasketClick); 
      }
    )
  }
  
  set counter(counter: number) {
    this.counterElement.textContent = String(counter);
  }
  

}
