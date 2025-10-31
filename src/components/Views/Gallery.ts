import { IGallery } from "../../types";
import { Component } from "../base/Component"

export class Gallery extends Component<IGallery> {

  catalogElement: HTMLElement;
  

  constructor(container: HTMLElement){
    super(container) 
    this.catalogElement = this.container;
  }
  
  set items(products: HTMLElement[]) {
    this.catalogElement.replaceChildren(...products)
  }
  

}