import './scss/styles.scss';
import { cloneTemplate, ensureElement } from './utils/utils';
// import { Buyer } from './components/Models/Buyer';
import { Catalog } from './components/Models/Catalog'; 
import { ShoppingBasket } from './components/Models/ShoppingBasket'; 
// import { apiProducts } from './utils/data';
import { ApiService } from './components/base/ApiService';
import { Api } from './components/base/Api';
import { API_URL } from './utils/constants';

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
eventBroker.on('сatalog:changed',()=>{ //тут вешаем эмит card:productSelect
  const cardsOfCatalog = catalogModel.getItems().map(item =>{
    const cardOfCatalog = new CardCatalog(cloneTemplate('#card-catalog'),{onclick:()=>{
      eventBroker.emit('card:productSelect',item)
    }})
    
    return cardOfCatalog.render(item)
    
  })
  catalogView.render({items:cardsOfCatalog})
  
})

const data = await apiService.getProducts() // получение данных с сервера
catalogModel.setItems(data.items) 

//слушатель события на клик по карточке в галерее,идёт установка этой карточки в моделях данных каталога в поле _productCard
eventBroker.on('card:productSelect',(item: IProduct)=>{
  catalogModel.setProductCard(item)
})

//слушатель изменения выбранной карточки для изменения текста кнопки
//в зависимости от того есть ли у неё цена и находится ли она в корзине
eventBroker.on('card:setProductCard',(item: IProduct)=>{

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
eventBroker.on('headerBasket:click',()=>{
  
  let i = 1;
  const cardsInBasketView = basketModel.getProducts().map(item=>{
    const cardBasket = new CardBasket(cloneTemplate('#card-basket'),{onclick: ()=>
      eventBroker.emit('cardBasket:delete',item)
    })
    return cardBasket.render({...item,index:i++})
  })
  const buttonBasketToggle = basketModel.getLength() == 0 ? false : true
  modal.content = basketView.render({items:cardsInBasketView,finalPrice:basketModel.getPrice(),buttonToggle:buttonBasketToggle});
})

//cлушатель события нажатия кнопки в модальном окне с полной информацией о продукте
eventBroker.on('cardFull:toggle',()=>{
  modal.CloseModal()
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
eventBroker.on('basket:changed',()=> {
  let i = 1;

  //перерисовка корзины 
  const cardsBasket = basketModel.getProducts().map((item) => {
    const cardBasket = new CardBasket(cloneTemplate('#card-basket'),{onclick: ()=>
      eventBroker.emit('cardBasket:delete',item)
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
eventBroker.on('cardBasket:delete',(item:IProduct)=>{
  if (basketModel.checkProduct(item.id)){
    basketModel.deleteProduct(item)
  } 
})

//слушатель нажатия кнопки оформления заказа в корзине
eventBroker.on('basketMakeOrder:click',()=>{
  modal.content = orderFormOne.render()
  }
)

// --------------------------Слушатели на первую форму с адресом и выбором оплаты---------------
//с представления формы будет передавать через emit данные
eventBroker.on('payment:new',(value:{payment:"card"|"cash"})=>{
  buyer.setPayment(value.payment)
})

eventBroker.on('address:new',(value:{textField:string})=>{
  buyer.setAddress(value.textField)
})

//общая для первой формы изменение адреса и выбора оплаты
eventBroker.on('orderFormOneModel:changed',()=>{
  const errors:string[] = []
  // если была прожата кнопка выбора оплаты,она станет активной
  const buttonActive = buyer.getAllInformation().payment != "" ? buyer.getAllInformation().payment : ""
  if (buyer.validatePayment()){
    errors.push(buyer.validatePayment())
  }
  
  if (buyer.validateAddress()){
    errors.push(buyer.validateAddress())
  }

  errors.length == 0 ? orderFormOne.orderButtonNext.disabled = false : orderFormOne.orderButtonNext.disabled = true
  orderFormOne.render({errors:errors,buttonActive:buttonActive})
})

eventBroker.on('orderFormOne:next',()=>{
  modal.render({content:orderFormTwo.render()})
  //очистить данные прошлые с инпута и выбор кнопки
  orderFormOne.orderInputAddress.value = ""
  orderFormOne.render()
})
// --------------------------Слушатели на вторую форму с телефоном,емэйлом---------------


eventBroker.on('email:new',(value:{textField:string})=>{
 
  buyer.setEmail(value.textField)
})


eventBroker.on('phone:new',(value:{textField:string})=>{

  buyer.setPhone(value.textField)
})

//общая для второй формы изменение email и телефона
eventBroker.on('orderFormTwoModel:changed',()=>{
  const errors:string[] = []
  if (buyer.validatePhone()){
    errors.push(buyer.validatePhone())
  }

  if (buyer.validateEmail()){
    errors.push(buyer.validateEmail())
  }

  errors.length == 0 ? orderFormTwo.orderButtonMakeOrder.disabled = false : orderFormTwo.orderButtonMakeOrder.disabled = true
  orderFormTwo.render({errors:errors})
})

eventBroker.on('orderFormTwo:makeOrder',()=>{
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
      //очистка инпутов второй формы
      orderFormTwo.orderInputPhone.value = ""
      orderFormTwo.orderInputEmail.value = ""

    })
    .catch(data => console.log('error',data))
    

})

eventBroker.on('orderSuccesButton:click',()=>{
  modal.CloseModal();
})

//Слушатель открытия modal и закрытия,чтобы навешать на страницу overflow:hidden и убрать прокрутку
eventBroker.on('modal:open',()=>{
  document.querySelector('html')!.style.overflow = 'hidden'
})
eventBroker.on('modal:close',()=>{
  document.querySelector('html')!.style.overflow = 'visible'
})