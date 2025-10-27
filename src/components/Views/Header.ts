import { Component } from "../base/Component"
import { ensureElement } from "../../utils/utils"

type IHeader = {
  counter: number
}

export class Header extends Component<IHeader> {

  basketButton: HTMLButtonElement;
  counterElement: HTMLElement;

  constructor(container: HTMLElement){
    super(container) 
    this.basketButton = ensureElement<HTMLButtonElement>('.header__basket',this.container)
    this.counterElement = ensureElement<HTMLElement>('.header__basket-counter',this.container)
  }
  
  set counter(counter: number) {
    this.counterElement.textContent = String(counter);
  }
  

}
