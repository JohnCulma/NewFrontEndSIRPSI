import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from "../../../shared/model/e-commerce/cart.model";
import { CartService } from "../../../shared/services/e-commerce/cart.service";
import { Observable, of } from 'rxjs';
import { ProductsService } from 'src/app/shared/services/e-commerce/products.service';

@Component({
  selector: 'app-add-cart',
  templateUrl: './add-cart.component.html',
  styleUrls: ['./add-cart.component.scss']
})
export class AddCartComponent implements OnInit {
  public cartItems: Observable<CartItem[] | any> = of([]);
  public selectCartItems: CartItem[] |any = [];
  public quantity: number;

  constructor(private route: ActivatedRoute, private cartService: CartService, public productsService:ProductsService) {
  }

  //remove cart
  public remove(item) {
    this.cartService.removeCartItem(item);
  }

  //get total amount
  public getTotal(): Observable<number> {
    return this.cartService.getTotalAmount();
  }

  //product quentity decrement
  public decrement(product: any, quantity: number = -1) {
    this.cartService.updateCartQuantity(product, quantity)

  }

  //product quentity increment
  public increment(product: any, quantity: number = +1) {
    this.cartService.updateCartQuantity(product, quantity)
  }
  
  ngOnInit() {
    this.cartItems = this.cartService.getAll();
    this.cartItems.subscribe(selectCartItems => this.selectCartItems = selectCartItems)
  }

}
