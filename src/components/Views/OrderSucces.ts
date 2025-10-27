import { Component } from "../base/Component"
import { ensureElement } from "../../utils/utils"

type IOrderSucces = {
  writenOff: number;
}

export class OrderSucces extends Component<IOrderSucces> {

  orderSuccessWrittenOff: HTMLElement
  orderSuccessButton: HTMLButtonElement

  constructor(container: HTMLElement){
    super(container) 
    this.orderSuccessWrittenOff = ensureElement<HTMLButtonElement>('order-success__description',this.container)
    this.orderSuccessButton = ensureElement<HTMLButtonElement>('order-success__close',this.container)
  }
  
  set writenOff(writenOff: number) {
    this.orderSuccessWrittenOff.textContent = `Списано ${writenOff} синапсов`;
  }
  

}