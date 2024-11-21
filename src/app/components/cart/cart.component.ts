import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
})
export class CartComponent {
  // items : Item[]
  @Input() items : CartItem[] = [];

  @Input() total  = 0;

  @Output() idProductEventEmitter = new EventEmitter();

  onDeleteCart(id : number){
     this.idProductEventEmitter.emit(id)

      // Busca el producto en el carrito usando el id
      // const product = this.items.find(item => item.product.id === id);

      // // Si se encuentra el producto, lo emite
      // if (product) {
      //     this.idProductEventEmitter.emit(product.product);
      // }
  }


}
