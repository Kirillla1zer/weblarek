import { Card } from "../Views/Card"
import { ensureElement } from "../../utils/utils"
type ICardCatalog = {
  category: string;
  image: string;
  price: number | null;
  title: string;
}

type ICardActions = {
  onclick:()=> void;
}
export class CardCatalog extends Card<ICardCatalog> {

  cardCategory: HTMLElement;
  cardImage: HTMLImageElement;
  cardButton: HTMLElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    this.cardButton = container;
    this.cardImage = ensureElement<HTMLImageElement>(`.card__image`,this.container);
    this.cardCategory = ensureElement<HTMLElement>(`.card__category`,this.container)

    if(actions?.onclick){
      this.container.addEventListener('click', actions.onclick)
    }
  }

  set category(category: string) {
    this.cardCategory.textContent = category;
  }

  set image(src: string) {
    this.cardImage.src = src;
  }
  
  
}