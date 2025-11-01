import { Component } from "../base/Component"
import { ensureElement } from "../../utils/utils"


export abstract class Form<T> extends Component<T> {

  errorsList: HTMLUListElement;
  buttonSubmit: HTMLButtonElement; //
  form:HTMLElement //

  constructor(container: HTMLElement){
    super(container) 
    this.errorsList = ensureElement<HTMLUListElement>(`.form__errors`,this.container)
    this.buttonSubmit = ensureElement<HTMLButtonElement>(`[type="submit"]`,this.container) //
    this.form = this.container//

    this.form.addEventListener('submit', (event) => {
      event.preventDefault(); 
      this.submit()
    }); 
  }

  abstract submit() : void;

  set errors(errors: string[]) {
    this.errorsList.textContent = errors.reduce((acc,item,index,array) =>{
      if (array.length-1 == index){
        return acc += item ;
      }
      return acc += item+ " , ";
    },'')
    
  }
  
  setToggleButton(isDisabled:boolean){ //(всю)
    isDisabled == true ? this.buttonSubmit.disabled = true : this.buttonSubmit.disabled = false
  }

}
