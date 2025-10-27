import { Component } from "../base/Component"
import { ensureElement } from "../../utils/utils"
type IModal= {
  content: HTMLElement
}

export class Modal extends Component<IModal> {

  modalButtonClose: HTMLButtonElement;
  modalContent: HTMLElement;
  
  constructor(container: HTMLElement ){
    super(container) 
    this.modalButtonClose = ensureElement<HTMLButtonElement>('.modal__close',this.container)
    this.modalContent = ensureElement<HTMLElement>('.modal__content',this.container)

    this.modalButtonClose.addEventListener('click',()=>{
      this.CloseModal()
    })
  }
  
  set content(content: HTMLElement) {
    this.modalContent.replaceChildren(content);
    this.OpenModal()
  }
  
  OpenModal():void {
    this.container.classList.add('modal_active')

  }

  CloseModal():void{
    this.container.classList.remove('modal_active')
  }

}
