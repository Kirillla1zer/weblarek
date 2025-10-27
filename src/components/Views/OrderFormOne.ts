import { ensureElement } from "../../utils/utils"
import { Form } from "./Form";

type IOrderFormOne = {
  errors: string[]
  // кнопка Next?
  // кнопка Payment?
}

export class OrderFormOne extends Form<IOrderFormOne> {

  orderInputAddress: HTMLInputElement;
  orderButtonNext: HTMLButtonElement;
  orderCashButton: HTMLButtonElement;
  orderCardButton: HTMLButtonElement;

  constructor(container: HTMLElement){
    super(container) 
    this.orderInputAddress = ensureElement<HTMLInputElement>('[name="address"]',container);
    this.orderButtonNext = ensureElement<HTMLButtonElement>('order__button',container);
    this.orderCashButton = ensureElement<HTMLButtonElement>('[name="cash"]',container);
    this.orderCardButton = ensureElement<HTMLButtonElement>('[name="card"]',container);
  }
  
  //тут метод смены возможности нажатия кнопки и перехода на следующую форму
  // он проверяет есть ли ошибки и если нет то кнопку можно нажать
  
}