import { Component } from "../base/Component"
import { ensureElement } from "../../utils/utils"


export abstract class Card<T> extends Component<T>{
  cardTitle: HTMLElement;
  cardPrice: HTMLElement;

  constructor(container: HTMLElement) {
    super(container)
    this.cardTitle = ensureElement<HTMLElement>(`.card__title`,this.container)
    this.cardPrice = ensureElement<HTMLElement>(`.card__price`,this.container)
  }

  set title(title: string) {
    this.cardTitle.textContent = title;
  }

  set price(price: number) {
    this.cardPrice.textContent = `${price} синапсов`;
  }

}