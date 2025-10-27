import { Card } from "../Views/Card"
import { ensureElement } from "../../utils/utils"
type ICardFull = {
  category: string;
  src: string;
  image: string;
  description: string;
  price: string;
  title: string
}

export class CardFull extends Card<ICardFull> {

  cardCategory: HTMLElement;
  cardImage: HTMLImageElement;
  cardButton: HTMLButtonElement;
  cardDescripton: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);

    this.cardButton = ensureElement<HTMLButtonElement>(`.card__button`,this.container);
    this.cardImage = ensureElement<HTMLImageElement>(`.card__image`,this.container);
    this.cardCategory = ensureElement<HTMLElement>(`.card__category`,this.container)
    this.cardDescripton = ensureElement<HTMLElement>(`.card__text`,this.container)
  }

  set category(category: string) {
    this.cardCategory.textContent = category;
  }

  set image(src: string) {
    this.cardImage.src = src;
  }

  set Description(text: string){
    this.cardDescripton.textContent = text;
  }
  
}
