
import { ensureElement } from "../../utils/utils"
import { IEvents } from "../base/Events";
import { Form } from "./Form";

type IOrderFormTwo = {
  errors: string[]
}

export class OrderFormTwo extends Form<IOrderFormTwo> {

  orderInputEmail:HTMLInputElement
  orderInputPhone:HTMLInputElement
  orderButtonMakeOrder: HTMLButtonElement
  eventBroker:IEvents;

  constructor(container: HTMLElement,eventBroker:IEvents){
    super(container) 
    this.orderInputEmail = ensureElement<HTMLInputElement>('[name="email"]',this.container);
    this.orderButtonMakeOrder = ensureElement<HTMLButtonElement>('.modal__actions .button',this.container);
    this.orderInputPhone = ensureElement<HTMLInputElement>('[name="phone"]',this.container);
    this.eventBroker = eventBroker;

    this.orderInputEmail.addEventListener('input',()=>{
      this.eventBroker.emit('email:new',{textField:this.orderInputEmail.value})
    })

    this.orderInputPhone.addEventListener('input',()=>{
      eventBroker.emit('phone:new',{textField:this.orderInputPhone.value})
    })

    this.orderButtonMakeOrder.addEventListener('click',(event)=>{
      event.preventDefault()
      this.eventBroker.emit('orderFormTwo:makeOrder')
    })

  }
  
}