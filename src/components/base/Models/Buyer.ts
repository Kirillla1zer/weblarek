import { IBuyer } from "../../../types";

export class Buyer {
  private _payment: "card"|"cash"|"" = "";
  private _address: string = "";
  private _email: string = "";
  private _phone: string = "";
  
  
  setPayment(payment: "card"|"cash"|"") {
    this._payment = payment;
  }

  setAddress(address:string){
    this._address = address;
  }

  setEmail(email:string){
    this._email = email;
  }

  setPhone(phone:string) {
    this._phone = phone;
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
    if (this._payment == ""){
      return "Нужно выбрать вид оплаты"
    }
    return ""
  }

  validateAddress(): string{
    if (this._address == ""){
      return "Нужно заполнить поле адрес"
    }
    return ""
  }

  validateEmail(): string{
    if (this._email == ""){
      return "Нужно заполнить поле email"
    }
    return ""
  }

  validatePhone(): string{
    if (this._phone == ""){
      return "Нужно заполнить поле phone"
    }
    return ""
  }
  
}