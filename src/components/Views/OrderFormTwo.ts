
import { ensureElement } from "../../utils/utils"
import { Form } from "./Form";

type IOrderFormTwo = {
  errors: string[]
  // кнопка Next?
  // кнопка Payment?
}

export class OrderFormOne extends Form<IOrderFormTwo> {

  orderInputEmail:HTMLInputElement
  orderInputPhone:HTMLInputElement
  orderButtonMakeOrder: HTMLButtonElement
  

  constructor(container: HTMLElement){
    super(container) 
    this.orderInputEmail = ensureElement<HTMLInputElement>('[name="email"]',this.container);
    this.orderButtonMakeOrder = ensureElement<HTMLButtonElement>('order__button',this.container);
    this.orderInputPhone = ensureElement<HTMLInputElement>('modal__actions button',this.container);
  }
  
  //тут метод смены возможности нажатия кнопки и перехода на следующую форму
  // он проверяет есть ли ошибки и если нет то кнопку можно нажать
  
}