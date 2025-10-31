import { Component } from "../base/Component"
import { ensureElement } from "../../utils/utils"
import { IEvents } from "../base/Events";
import { IModal } from "../../types";

export class Modal extends Component<IModal> {

  modalButtonClose: HTMLButtonElement;
  modalContent: HTMLElement;
  eventBroker: IEvents;
  modalContainer: HTMLElement; 

  constructor(container: HTMLElement,eventBroker:IEvents ){
    super(container) 
    this.modalButtonClose = ensureElement<HTMLButtonElement>('.modal__close',this.container)
    this.modalContent = ensureElement<HTMLElement>('.modal__content',this.container)
    this.modalContainer = ensureElement<HTMLElement>('.modal__container',this.container)

    this.eventBroker = eventBroker;

    this.modalButtonClose.addEventListener('click',()=>{
      this.CloseModal()
    })

    this.container.addEventListener('click',()=>{
      this.CloseModal()
    })

    this.modalContainer.addEventListener('click',(e)=>{
      e.stopPropagation()
    })
  }
  
  set content(content: HTMLElement) {
    this.modalContent.replaceChildren(content);
    this.OpenModal()
  }
  
  OpenModal():void {
    this.container.classList.add('modal_active')
    this.eventBroker.emit('modal:open')
  }

  CloseModal():void{
    this.container.classList.remove('modal_active')
    this.eventBroker.emit('modal:close')
  }

}
