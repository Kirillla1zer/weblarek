import { eventList } from "../../main";
import { ensureElement } from "../../utils/utils"
import { IEvents } from "../base/Events";
import { Form } from "./Form";

type IOrderFormOne = {
  errors: string[]
  buttonPaymentActive: "card" | "cash" | ""
} 

export class OrderFormOne extends Form<IOrderFormOne> {

  orderInputAddress: HTMLInputElement;
  orderCashButton: HTMLButtonElement;
  orderCardButton: HTMLButtonElement;
  eventBroker: IEvents;

  constructor(container: HTMLElement, eventBroker:IEvents){
    super(container) 
    this.orderInputAddress = ensureElement<HTMLInputElement>('[name="address"]',this.container);
    this.orderCashButton = ensureElement<HTMLButtonElement>('[name="cash"]',this.container);
    this.orderCardButton = ensureElement<HTMLButtonElement>('[name="card"]',this.container);
    this.eventBroker = eventBroker;
    
    this.orderCardButton.addEventListener('click',()=>{
      this.eventBroker.emit(eventList.PayementNew,{payment:'card'})
    })

    this.orderCashButton.addEventListener('click',()=>{
      this.eventBroker.emit(eventList.PayementNew,{payment:'cash'})
    })

    this.orderInputAddress.addEventListener('input',()=>{
      eventBroker.emit(eventList.AddressNew,{textField:this.orderInputAddress.value})
    })  
    
  }

  submit(): void {
    this.eventBroker.emit(eventList.OrderFormOneNext)
  }

  set buttonPaymentActive(value:"card" | "cash" | ""){

    //очищаем прошлый результат
    this.orderCardButton.classList.remove('button_alt-active')
    this.orderCashButton.classList.remove('button_alt-active')

    //ставим обводку на нужную кнопку
    if(value == "card" ){
      this.orderCardButton.classList.add('button_alt-active')
    }

    if(value == "cash" ){
      this.orderCashButton.classList.add('button_alt-active')
    }
    
  }
  
}