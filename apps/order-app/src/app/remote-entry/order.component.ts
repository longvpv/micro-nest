import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-order-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './order.component.html',
    styles: [],
    encapsulation: ViewEncapsulation.None,
})
export class OrderListComponent {
    cartData: {
        id: string;
        name: string;
        description: string;
        price: number;
    }[] = [];

    totalPrice = this.cartData
        ? this.cartData.reduce((sum, item) => sum + item.price, 0)
        : 0;

    handleRemoveItem() {
        this.cartData = [];
        this.totalPrice = 0;
        localStorage.setItem('cartItems', JSON.stringify(this.cartData));
    }

    constructor() {
        const cart = localStorage.getItem('cartItems');
        this.cartData = cart ? JSON.parse(cart) : [];

        this.totalPrice = this.cartData.reduce(
            (sum, item) => sum + item.price,
            0
        );
    }
}
