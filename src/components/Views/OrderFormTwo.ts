
import { eventList } from "../../main";
import { ensureElement } from "../../utils/utils"
import { IEvents } from "../base/Events";
import { Form } from "./Form";

type IOrderFormTwo = {
  errors: string[]
}

export class OrderFormTwo extends Form<IOrderFormTwo> {

  orderInputEmail:HTMLInputElement
  orderInputPhone:HTMLInputElement
  eventBroker:IEvents;

  constructor(container: HTMLElement,eventBroker:IEvents){
    super(container) 
    this.orderInputEmail = ensureElement<HTMLInputElement>('[name="email"]',this.container);
    this.orderInputPhone = ensureElement<HTMLInputElement>('[name="phone"]',this.container);
    this.eventBroker = eventBroker;

    this.orderInputEmail.addEventListener('input',()=>{
      this.eventBroker.emit(eventList.EmailNew,{textField:this.orderInputEmail.value})
    })

    this.orderInputPhone.addEventListener('input',()=>{
      eventBroker.emit(eventList.PhoneNew,{textField:this.orderInputPhone.value})
    })
  }

  submit(): void {
    this.eventBroker.emit(eventList.OrderFormTwoMakeOrder)
  }
}