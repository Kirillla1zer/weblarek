import { Component } from "../base/Component"
import { ensureElement } from "../../utils/utils"


export abstract class Form<T> extends Component<T> {

  errorsList: HTMLUListElement;

  constructor(container: HTMLElement){
    super(container) 
    this.errorsList = ensureElement<HTMLUListElement>(`form__errors`,container)
  }
  
  set errors(errors: string[]) {
    this.errorsList.textContent = errors.reduce((acc,item) =>{
      return acc += item;
    },'')
    
  }
  

}
