import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartAppComponent } from '../cart-app.component';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',

})
export class NavbarComponent {

  @Input() items: CartItem[]=[]

  @Output() openCart = new EventEmitter()

  openShowCart(): void{
    this.openCart.emit()
  }

  
}
