import './scss/styles.scss';
import { cloneTemplate, ensureElement } from './utils/utils';
// import { Buyer } from './components/Models/Buyer';
import { Catalog } from './components/Models/Catalog'; 
import { ShoppingBasket } from './components/Models/ShoppingBasket'; 
// import { apiProducts } from './utils/data';
import { ApiService } from './components/base/ApiService';
import { Api } from './components/base/Api';
import { API_URL} from './utils/constants';

import { Gallery } from './components/Views/Gallery';
import { CardCatalog } from './components/Views/CardCatalog';
import { EventEmitter } from './components/base/Events';
import { Modal } from './components/Views/Modal';
import { CardFull } from './components/Views/CardFull';
import { IProduct } from './types';
import { Basket } from './components/Views/Basket';
import { CardBasket } from './components/Views/CardBasket';
import { Header } from './components/Views/Header';
import { OrderFormOne } from './components/Views/OrderFormOne';
import { Buyer } from './components/Models/Buyer';
import { OrderFormTwo } from './components/Views/OrderFormTwo';
import { OrderSuccess } from './components/Views/OrderSucces';

export enum eventList {
  CatalogChanged = 'сatalog:changed',
  CardProductSelect = 'card:productSelect',
  CardSetProductCard ='card:setProductCard',
  HeaderBasketClick =  'headerBasket:click',
  CardFullToggle = 'cardFull:toggle',
  BasketChanged = 'basket:changed',
  CardBasketDelete = 'cardBasket:delete',
  BasketMakeOrderClick ='basketMakeOrder:click',
  PayementNew =  'payment:new',
  AddressNew =  'address:new',
  OrderFormOneModelChanged =  'orderFormOneModel:changed',
  OrderFormOneNext = 'orderFormOne:next',
  EmailNew =  'email:new',
  PhoneNew = 'phone:new',
  OrderFormTwoModelChanged= 'orderFormTwoModel:changed',
  OrderFormTwoMakeOrder ='orderFormTwo:makeOrder',
  OrderSuccesButtonClick = 'orderSuccesButton:click',
  ModalOpen =  'modal:open',
  ModalClose = 'modal:close'
}

const api = new Api(API_URL) //создание инстанса базового класса api
const apiService = new ApiService(api) //создание инстанса нужно для нашей работы с данными с сервера
const eventBroker = new EventEmitter() //Для снижения связанности у классов используем брокер событий
const modal = new Modal(ensureElement('.modal'),eventBroker) //Создание  инстанса модального окна
const catalogView = new Gallery(ensureElement('.gallery')) // каталог представления
const catalogModel = new Catalog([], eventBroker) // Создаём каталог Модели
const cardFullView = new CardFull(cloneTemplate('#card-preview'),eventBroker)
const header = new Header(ensureElement('.header'),eventBroker) // Представление шапки
const basketModel = new ShoppingBasket(eventBroker) // Модель корзины
const basketView = new Basket(cloneTemplate('#basket'),eventBroker) // Представление корзины
const orderFormOne = new OrderFormOne(cloneTemplate('#order'),eventBroker)
const orderFormTwo = new OrderFormTwo(cloneTemplate('#contacts'),eventBroker)
const buyer = new Buyer(eventBroker)
const orderSuccessView = new OrderSuccess(cloneTemplate('#success'),eventBroker)



// слушатель события изменения  данных в модели каталога и перерисовка представления галлерии карточек
eventBroker.on(eventList.CatalogChanged,()=>{ //тут вешаем эмит card:productSelect
  const cardsOfCatalog = catalogModel.getItems().map(item =>{
    const cardOfCatalog = new CardCatalog(cloneTemplate('#card-catalog'),{onclick:()=>{
      eventBroker.emit(eventList.CardProductSelect,item)
    }})
    return cardOfCatalog.render(item)
    
  })
  catalogView.render({items:cardsOfCatalog})
  
})

// получение данных с сервера
apiService.getProducts()
.then(data => catalogModel.setItems(data.items))
.catch(error => console.log(`Ошибка при загрузке товаров:${error}`))




//слушатель события на клик по карточке в галерее,идёт установка этой карточки в моделях данных каталога в поле _productCard
eventBroker.on(eventList.CardProductSelect,(item: IProduct)=>{
  console.log(item)
  catalogModel.setProductCard(item)
})

//слушатель изменения выбранной карточки для изменения текста кнопки
//в зависимости от того есть ли у неё цена и находится ли она в корзине
eventBroker.on(eventList.CardSetProductCard,(item: IProduct)=>{

  //Проверка на то есть ли товар в корзине чтобы отрисовать кнопку
  const text = basketModel.checkProduct(item.id)
  ? 'Удалить из корзины'
  : 'Купить'
  // так же проверка на ценник(есть ли он)
  item.price != null 
  ? modal.content = cardFullView.render({...item,buttonText:text})
  : modal.content = cardFullView.render({...item,buttonText:"Недоступно"})
  
})

//слушатель события открытия корзины
eventBroker.on(eventList.HeaderBasketClick,()=>{
  
  let i = 1;
  const cardsInBasketView = basketModel.getProducts().map(item=>{
    const cardBasket = new CardBasket(cloneTemplate('#card-basket'),{onclick: ()=>
      eventBroker.emit(eventList.CardBasketDelete,item)
    })
    return cardBasket.render({...item,index:i++})
  })
  const buttonBasketToggle = basketModel.getLength() == 0 ? false : true
  modal.content = basketView.render({items:cardsInBasketView,finalPrice:basketModel.getPrice(),buttonToggle:buttonBasketToggle});
})

//cлушатель события нажатия кнопки в модальном окне с полной информацией о продукте
eventBroker.on(eventList.CardFullToggle,()=>{
  modal.closeModal()
  //так как мы тыкнули по карточке,она сохраняется в модели выбранной карточки
  const cardSelect:IProduct = catalogModel.getProductCard()!

  //Проверяем есть ли эта карточка(продукт) уже в корзине и если нет то добавляем иначе удаляем
  if(!basketModel.checkProduct(cardSelect.id)){
    basketModel.addProduct(cardSelect)
  }
  else {
    basketModel.deleteProduct(cardSelect)
  }

})

//корзина поменялась и произошла перерисовка корзины и перерисовка в шапке counter
eventBroker.on(eventList.BasketChanged,()=> {
  let i = 1;

  //перерисовка корзины 
  const cardsBasket = basketModel.getProducts().map((item) => {
    const cardBasket = new CardBasket(cloneTemplate('#card-basket'),{onclick: ()=>
      eventBroker.emit(eventList.CardBasketDelete,item)
    })
    
    return cardBasket.render({...item,index:i++})
  })

  //Есть модель корзины имеет 0 товаров то кнопка для оформления недоступна и наоборот
  const buttonBasketToggle = basketModel.getLength() == 0 ? false : true
  basketView.render({items:cardsBasket,finalPrice:basketModel.getPrice(),buttonToggle:buttonBasketToggle})

  //перерисовка counter в шапке
  const counterBasket = basketModel.getLength();
  header.render({counter:counterBasket})

  
})

// удаления карточки из корзины
eventBroker.on(eventList.CardBasketDelete,(item:IProduct)=>{
  if (basketModel.checkProduct(item.id)){
    basketModel.deleteProduct(item)
  } 
})

//слушатель нажатия кнопки оформления заказа в корзине
eventBroker.on(eventList.BasketMakeOrderClick,()=>{

  modal.content = orderFormOne.render()
  }
)

// --------------------------Слушатели на первую форму с адресом и выбором оплаты---------------
//с представления формы будет передавать через emit данные
eventBroker.on(eventList.PayementNew,(value:{payment:"card"|"cash"})=>{
  buyer.setPayment(value.payment)
})

eventBroker.on(eventList.AddressNew,(value:{textField:string})=>{
  buyer.setAddress(value.textField)
})

//общая для первой формы изменение адреса и выбора оплаты
eventBroker.on(eventList.OrderFormOneModelChanged,()=>{
  const errors:string[] = []
  // если была прожата кнопка выбора оплаты,она станет активной
  const buttonActive = buyer.getAllInformation().payment != "" ? buyer.getAllInformation().payment : ""
  if (buyer.validatePayment()){
    errors.push(buyer.validatePayment())
  }
  
  if (buyer.validateAddress()){
    errors.push(buyer.validateAddress())
  }

  // errors.length == 0 ? orderFormOne.orderButtonNext.disabled = false : orderFormOne.orderButtonNext.disabled = true
  errors.length == 0 ? orderFormOne.setToggleButton(false) : orderFormOne.setToggleButton(true)
  orderFormOne.render({errors:errors,buttonPaymentActive:buttonActive})
})

eventBroker.on(eventList.OrderFormOneNext,()=>{
  modal.render({content:orderFormTwo.render()})
})
// --------------------------Слушатели на вторую форму с телефоном,емэйлом---------------


eventBroker.on(eventList.EmailNew,(value:{textField:string})=>{
 
  buyer.setEmail(value.textField)
})


eventBroker.on(eventList.PhoneNew,(value:{textField:string})=>{

  buyer.setPhone(value.textField)
})

//общая для второй формы изменение email и телефона
eventBroker.on(eventList.OrderFormTwoModelChanged,()=>{
  
  const errors:string[] = []

  if (buyer.validatePhone()){
    errors.push(buyer.validatePhone())
  }

  if (buyer.validateEmail()){
    errors.push(buyer.validateEmail())
  }

  errors.length == 0 ? orderFormTwo.setToggleButton(false) : orderFormTwo.setToggleButton(true)
  orderFormTwo.render({errors:errors})
})

eventBroker.on(eventList.OrderFormTwoMakeOrder,()=>{
  const itemsId = basketModel.getProducts().map(item=>{
    const itemId = item.id;
    return itemId
  })
  const totalPrice = basketModel.getPrice()
  //Отправляем информацию о итоговой покупке на сервер
  apiService.sendOrder(
    {
    items:itemsId,
    total:totalPrice,
    ...buyer.getAllInformation()
    }).then(()=>{

      modal.render({content:orderSuccessView.render({writenOff:basketModel.getPrice()})})
      basketModel.clearAll()
      buyer.clearAllInformation()
      //очистка инпутов первой формы
      orderFormOne.orderInputAddress.value = "";
      orderFormOne.buttonPaymentActive = "";
      //очистка инпутов второй формы
      orderFormTwo.orderInputPhone.value = ""
      orderFormTwo.orderInputEmail.value = ""
      orderFormOne.render({errors:[]})
      orderFormTwo.render({errors:[]})
    })
    .catch(data => console.log('error',data))
    

})

eventBroker.on(eventList.OrderSuccesButtonClick,()=>{
  modal.closeModal();
})

// Слушатель открытия modal и закрытия,чтобы навешать на страницу overflow:hidden и убрать прокрутку
eventBroker.on(eventList.ModalOpen,()=>{
  document.querySelector('html')!.style.overflow = 'hidden'
})
eventBroker.on(eventList.ModalClose,()=>{
  document.querySelector('html')!.style.overflow = 'visible'
})

