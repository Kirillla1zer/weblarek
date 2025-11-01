import { Card } from "../Views/Card"
import { ensureElement } from "../../utils/utils"
import { IEvents } from "../base/Events";
import { CDN_URL } from "../../utils/constants";
import { IProduct } from "../../types";

type ICardFull = Pick<IProduct,'category'|'description'|'image'|'price'|'title'> & {buttonText:string}

export class CardFull extends Card<ICardFull> {

  cardCategory: HTMLElement;
  cardImage: HTMLImageElement;
  cardButton: HTMLButtonElement;
  cardDescripton: HTMLElement;
  eventBroker: IEvents;

  constructor(container: HTMLElement,eventBroker: IEvents) {
    super(container);
    
    this.cardButton = ensureElement<HTMLButtonElement>(`.card__button`,this.container);
    this.cardImage = ensureElement<HTMLImageElement>(`.card__image`,this.container);
    this.cardCategory = ensureElement<HTMLElement>(`.card__category`,this.container)
    this.cardDescripton = ensureElement<HTMLElement>(`.card__text`,this.container)
    this.eventBroker = eventBroker;

    this.cardButton.addEventListener('click',()=>
    {
      this.eventBroker.emit('cardFull:toggle') 
    })
  }

  set category(category: string) {
    this.cardCategory.textContent = category;
  }

  set image(src: string) {
    this.setImage(this.cardImage,`${CDN_URL}/${src}`)
  }

  set description(text: string){
    this.cardDescripton.textContent = text;
  }
 
  set buttonText(text: string) {
    this.cardButton.textContent = text;
    this.cardButton.disabled = false;

    if(text === 'Недоступно') {
      this.cardButton.disabled = true;
      
    }
  }
  
}
