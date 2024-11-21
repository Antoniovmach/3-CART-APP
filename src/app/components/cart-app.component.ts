import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { CartComponent } from './cart/cart.component';
import { CartItem } from '../models/cartItem';
import { NavbarComponent } from "./navbar/navbar.component";

@Component({
  selector: 'cart-app',
  standalone: true,
  imports: [CatalogoComponent, CartComponent, NavbarComponent],
  templateUrl: './cart-app.component.html',
})
export class CartAppComponent implements OnInit{

  products: Product[] = [];

  items: CartItem[]= [];

  total: number = 0;

  showCart: boolean = false

constructor (private service : ProductService){}
  ngOnInit(): void {
    this.products= this.service.findAll();
    this.items= JSON.parse(sessionStorage.getItem('datossesion')!) || [];
    this.calculateTotal();
  }

  calculateTotal():void{
    this.total= this.items.reduce ((accumulator, item) => accumulator + item.quantity* item.product.price,0);

  }
  onDeleteCart(id : number){
  //   const hasItem = this.items.find(item => item.product.id === product.id);
  //   if (hasItem) {
  //     hasItem.quantity = hasItem.quantity-1
  //  } 
    this.items = this.items.filter(item=> item.product.id !== id);
  
    this.saveSession()  
    this.calculateTotal()
  }

  onAddCart(product: Product) {
    // Busca si el producto ya existe en el carrito comparando el id del producto
    const hasItem = this.items.find(item => item.product.id === product.id);

    // Si el producto ya está en el carrito (hasItem no es undefined)
    if (hasItem) {
      //  hasItem.quantity = hasItem.quantity+1
      this.items = this.items.map(item =>  {
        if (item.product.id === product.id) {
          return {
            ...item,
            quantity: item.quantity +1
          }
          
        }
        return item
      })
    } else {
        // Si el producto no está en el carrito, se agrega como un nuevo elemento
        // Se usa el operador spread (...) para preservar los elementos existentes en 'items'
        // y agregar un nuevo objeto con el producto y una cantidad inicial de 1
        this.items = [...this.items, { product: { ...product }, quantity: 1 }];
    }
   
    this.saveSession() 
    this.calculateTotal()
}

saveSession(): void{
  sessionStorage.setItem('datossesion',JSON.stringify(this.items))
}

openShowCart(): void{
  this.showCart = !this.showCart
}

}
