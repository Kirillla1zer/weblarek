import { Component } from "../base/Component"
import { ensureElement } from "../../utils/utils"
type IGallery = {
  items:HTMLElement[]
}

export class Gallery extends Component<IGallery> {

  catalogElement: HTMLElement;
  

  constructor(container: HTMLElement){
    super(container) 
    this.catalogElement = ensureElement<HTMLElement>(`.gallery`,this.container);
  }
  
  set items(products: HTMLElement[]) {
    this.catalogElement.replaceChildren(...products)
    console.log('items сработал')
  }
  

}