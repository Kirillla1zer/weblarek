import './scss/styles.scss';
import { Buyer } from './components/base/Buyer';
import { Catalog } from './components/base/Catalog'; 
import { ShoppingBasket } from './components/base/ShoppingBasket'; 
import { apiProducts } from './utils/data';
import { ApiService } from './components/base/ApiService';
import { Api } from './components/base/Api';
import { API_URL } from './utils/constants';
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