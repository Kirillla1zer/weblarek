import { Card } from "../Views/Card"
import { ensureElement } from "../../utils/utils"
type ICardCatalog = {
  price: number;
  title: string;
  index: number;
}

export class CardCatalog extends Card<ICardCatalog> {

  cardButtonDelete: HTMLElement;
  cardIndex: HTMLElement;
  
  constructor(container: HTMLElement) {
    super(container);

    this.cardButtonDelete = ensureElement<HTMLButtonElement>(`gallery__item card`, container);
    this.cardIndex = ensureElement<HTMLElement>(`basket__item-index`, container)
  }

  set index(index: number){
    this.cardIndex.textContent = String(index)
  }
  
  
}