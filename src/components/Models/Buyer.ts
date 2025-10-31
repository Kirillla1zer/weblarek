import { IBuyer } from "../../types";
import { IEvents } from "../base/Events";

export class Buyer {
  private _payment: "card"|"cash"|"" = "";
  private _address: string = "";
  private _email: string = "";
  private _phone: string = "";
  
  constructor(protected eventBroker:IEvents){}
  
  setPayment(payment: "card"|"cash"|"") {
    this._payment = payment;
    
    this.eventBroker.emit('orderFormOneModel:changed')
  }

  setAddress(address:string){
    this._address = address;

    this.eventBroker.emit('orderFormOneModel:changed')
  }

  setEmail(email:string){
    this._email = email;
    this.eventBroker.emit('orderFormTwoModel:changed')
  }
  
  setPhone(phone:string) {
    this._phone = phone;
    this.eventBroker.emit('orderFormTwoModel:changed')
  }

  getAllInformation(): IBuyer {
    return {
      'payment':this._payment,
      'address':this._address,
      'email':this._email,
      'phone':this._phone
    }
  }

  clearAllInformation(){
    this.setPayment("");
    this.setAddress("");
    this.setEmail("");
    this.setPhone("")
    
  }

  validatePayment(): string{
    return this._payment == "" ? "Нужно выбрать вид оплаты" : ""
  }

  validateAddress(): string{
    return this._address == "" ? "Нужно заполнить поле адрес" : ""
  }

  validateEmail(): string{
    return this._email == "" ? "Нужно заполнить поле email" : ""
  }

  validatePhone(): string{
    return this._phone == "" ? "Нужно заполнить поле phone" : ""
  }
  
}