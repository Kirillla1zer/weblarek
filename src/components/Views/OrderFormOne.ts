import { ensureElement } from "../../utils/utils"
import { IEvents } from "../base/Events";
import { Form } from "./Form";

type IOrderFormOne = {
  errors: string[]
  buttonActive: "card" | "cash" | ""
} 

export class OrderFormOne extends Form<IOrderFormOne> {

  orderInputAddress: HTMLInputElement;
  orderButtonNext: HTMLButtonElement;
  orderCashButton: HTMLButtonElement;
  orderCardButton: HTMLButtonElement;
  eventBroker: IEvents;

  constructor(container: HTMLElement, eventBroker:IEvents){
    super(container) 
    this.orderInputAddress = ensureElement<HTMLInputElement>('[name="address"]',this.container);
    this.orderButtonNext = ensureElement<HTMLButtonElement>('.order__button',this.container);
    this.orderCashButton = ensureElement<HTMLButtonElement>('[name="cash"]',this.container);
    this.orderCardButton = ensureElement<HTMLButtonElement>('[name="card"]',this.container);
    this.eventBroker = eventBroker;
    
    this.orderCardButton.addEventListener('click',()=>{
      this.eventBroker.emit('payment:new',{payment:'card'})
    })

    this.orderCashButton.addEventListener('click',()=>{
      this.eventBroker.emit('payment:new',{payment:'cash'})
    })

    this.orderInputAddress.addEventListener('input',()=>{
      eventBroker.emit('address:new',{textField:this.orderInputAddress.value})
    })

    this.orderButtonNext.addEventListener('click',()=>{
      this.eventBroker.emit('orderFormOne:next')
    })
  }
  
  set buttonActive(value:"card" | "cash" | ""){

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