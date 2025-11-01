import { Component } from "../base/Component"
import { ensureElement } from "../../utils/utils"
import { IEvents } from "../base/Events";
import { IOrderSuccess } from "../../types";
import { eventList } from "../../main";

export class OrderSuccess extends Component<IOrderSuccess> {

  orderSuccessWrittenOff: HTMLElement
  orderSuccessButton: HTMLButtonElement
  eventBroker:IEvents

  constructor(container: HTMLElement,eventBroker:IEvents){
    super(container) 
    this.orderSuccessWrittenOff = ensureElement<HTMLButtonElement>('.order-success__description',this.container)
    this.orderSuccessButton = ensureElement<HTMLButtonElement>('.order-success__close',this.container)
    this.eventBroker = eventBroker;
    
    this.orderSuccessButton.addEventListener('click',()=>{
      eventBroker.emit(eventList.OrderSuccesButtonClick)
    })
  }
  
  set writenOff(writenOff: number) {
    this.orderSuccessWrittenOff.textContent = `Списано ${writenOff} синапсов`;
  }
  

}