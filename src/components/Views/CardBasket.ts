import { Card } from "../Views/Card"
import { ensureElement } from "../../utils/utils"
import { ICardActions, IProduct } from "../../types";



type ICardBasket = Pick<IProduct,'price'|'title'> & {index:number}

export class CardBasket extends Card<ICardBasket> {

  cardButtonDelete: HTMLElement;
  cardIndex: HTMLElement;
  
  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    this.cardButtonDelete = ensureElement<HTMLButtonElement>(`.basket__item-delete`, this.container);
    this.cardIndex = ensureElement<HTMLElement>(`.basket__item-index`, this.container)

    this.cardButtonDelete.addEventListener('click',actions!.onclick)  
  }

  set index(index: number){
    this.cardIndex.textContent = String(index)
  } 
}