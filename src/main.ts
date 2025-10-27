import './scss/styles.scss';
import { Buyer } from './components/Models/Buyer';
import { Catalog } from './components/Models/Catalog'; 
import { ShoppingBasket } from './components/Models/ShoppingBasket'; 
import { apiProducts } from './utils/data';
import { ApiService } from './components/base/ApiService';
import { Api } from './components/base/Api';
import { API_URL } from './utils/constants';

import { Gallery } from './components/Views/Gallery';
import { cloneTemplate, ensureElement } from './utils/utils';
import { CardCatalog } from './components/Views/CardCatalog';
import { EventEmitter } from './components/base/Events';
import { Modal }  from './components/Views/Modal'
import { CardFull } from './components/Views/CardFull';
import { Header } from './components/Views/Header';
//проверка класса Catalog
console.log("------проверка класса Catalog---------")

const catalog = new Catalog(apiProducts.items) //в конструкторе setItems

console.log('Массив товаров из каталога: ', catalog.getItems())
//проверка метода получения карточки по id с существующим id и нет
console.log(`Получаем товар по id(сущ)`,catalog.getProductById("854cef69-976d-4c2a-a18c-2aa45046c390"))
console.log(`Получаем товар по id(несущ)`,catalog.getProductById("23"))
//проверка метода по сохранению выбранной карточки и вывода её
catalog.getProductCard()
catalog.setProductCard(catalog.getItems()[2])
console.log(`Получаем выбранную карточку которую установили ранннее`,catalog.getProductCard())

//проверка класса ShoppingBasket

//Проверил (addProduct,deleteProduct,getLength,getProducts,getPrice,checkProduct,clearAll)
console.log("------проверка класса  ShoppingBasket---------")
const basket = new ShoppingBasket();
basket.addProduct(apiProducts.items[3])
console.log('Добавил в корзину товар')
console.log('Возращаю кол-во товаров:',basket.getLength())
console.log('Возращаю сумму корзины:',basket.getPrice())
basket.addProduct(apiProducts.items[0])
console.log('Добавил ещё товар')
console.log('Возращаю кол-во товаров:',basket.getLength())
console.log('Возращаю сумму корзины:',basket.getPrice())
console.log('Возращаю список товаров',basket.getProducts())
console.log('Проверяю есть ли в корзине товар по id:asd',basket.checkProduct("854cef69-976d-4c2a-a18c-2aa45046c390"))
basket.deleteProduct(basket.getProducts()[1])
console.log('Возращаю список товаров после удаления',basket.getProducts())
basket.clearAll()
console.log('Возращаю список товаров после очистки корзины',basket.getProducts())

//проверка класса Buyer
console.log("------проверка класса Buyer---------")
const user = new Buyer();
console.log('Валидация',user.validateAddress())
console.log('Валидация',user.validateEmail())
console.log('Валидация',user.validatePayment())
console.log('Валидация',user.validatePhone())
user.setPayment("cash")
user.setAddress("asd")
user.setEmail("asdasdasdasd")
user.setPhone("")
console.log('Валидация после set',user.validateAddress())
console.log('Валидация после set',user.validateEmail())
console.log('Валидация после set',user.validatePayment())
console.log('Валидация после set',user.validatePhone())

console.log('Информация о пользователе',user.getAllInformation())
user.clearAllInformation()
console.log('Информация о пользователе после очистки',user.getAllInformation())
//запрос к серверу
console.log("------проверка класса ApiService---------")
const api = new Api(API_URL)
const apiService = new ApiService(api)
const data = await apiService.getProducts()
console.log(`Данные с сервера приходят:`,data.items)
//сохранение данные в каталог
const catalog2 = new Catalog(data.items)

console.log('Массив товаров из каталога: ', catalog2.getItems())
//проверка метода получения карточки по id с существующим id и нет
console.log(`Получаем товар по id(сущ)`,catalog2.getProductById('90973ae5-285c-4b6f-a6d0-65d1d760b102'))
console.log(`Получаем товар по id(несущ)`,catalog2.getProductById("23"))
//проверка метода по сохранению выбранной карточки и вывода её
catalog2.getProductCard()
catalog2.setProductCard(catalog2.getItems()[5])
console.log(`Получаем выбранную карточку которую установили ранннее`,catalog2.getProductCard())

console.log("------проверка КЛАССОВ ПРЕДСТАВЛЕНИЯ---------")
console.log("------проверка класса Catalog + CardCatalog---------")

console.log(`Данные с сервера приходят:`,data.items)
const gallery = new Gallery(document.querySelector('.page')!);

//Создаём брокер событий для снижения связанности модели и представления
const events = new EventEmitter()
const catalogModel = new Catalog(apiProducts.items)
// events.on(событие,обработчик на это событие)
// events.emit(событие которое должно сработать если где то брокер его установил,передаётся item(как раз чтобы знать что отрисовать))
// Для каждой карточки создаём из класса представления(CardCatalog) инстанс 
// и передаём обработчик который сработает если на карточку в каталоге нажали(нужно чтобы класс представления знал что отрисовать
// а хранить данные он не может по SOLID и по MVC)
events.on(`catalog:changed`,()=>{
  const cardsInCatalog = catalogModel.getItems().map(item =>{
  const cardOfCatalog = new CardCatalog(cloneTemplate('#card-catalog'),{
    onclick: () => { events.emit(`card:select`, item)}
  })
  return  cardOfCatalog.render(item)
})
gallery.items = cardsInCatalog;
gallery.render({items:cardsInCatalog})
})
//Проверяем проверку события catalog:changed сверху
events.emit(`catalog:changed`)
console.log("------проверка Modal класс представления,а так же нажатия на карточку в gallery и вывод CardFull---------")
//Создание модального окна 
const modal = new Modal(document.querySelector('.modal')!)
//модальное окно открывается если установить что то в контент
events.on('card:select',(item)=>{
  modal.content = new CardFull(cloneTemplate('#card-preview'),events).render(item);
})

console.log("------проверка Header класс представления,а так же CardBasket---------")
const header = new Header(document.querySelector('.header')!,events)
