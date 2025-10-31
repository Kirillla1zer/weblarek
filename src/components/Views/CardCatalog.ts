import { Card } from "../Views/Card"
import { ensureElement } from "../../utils/utils"
import { CDN_URL } from "../../utils/constants"
import { categoryMap } from "../../utils/constants"
import { ICardActions, IProduct } from "../../types"

type ICardCatalog = Pick<IProduct,'category'|'image'|'price'|'title'>


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

  set category(category: 'софт-скил' | 'хард-скил'|'кнопка' |'дополнительное' |'другое') {
    this.cardCategory.textContent = category;
    this.cardCategory.classList.add(categoryMap[category])
  }

  set image(src: string) {
    this.cardImage.src = `${CDN_URL}/${src}`;
  }
  
}