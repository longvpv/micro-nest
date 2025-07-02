/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { createCustomElement } from '@angular/elements';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
    standalone: true,
    imports: [CommonModule],
    selector: 'mfe-order-button',
    template: `<a
        (click)="navigateToCart()"
        class="p-2 mx-1 position-relative cursor-pointer"
    >
        <svg width="24" height="24">
            <g fill="none" stroke="currentColor" stroke-width="1.5">
                <path
                    d="M3.864 16.455c-.858-3.432-1.287-5.147-.386-6.301C4.378 9 6.148 9 9.685 9h4.63c3.538 0 5.306 0 6.207 1.154c.901 1.153.472 2.87-.386 6.301c-.546 2.183-.818 3.274-1.632 3.91c-.814.635-1.939.635-4.189.635h-4.63c-2.25 0-3.375 0-4.189-.635c-.814-.636-1.087-1.727-1.632-3.91Z"
                ></path>
                <path
                    d="m19.5 9.5l-.71-2.605c-.274-1.005-.411-1.507-.692-1.886A2.5 2.5 0 0 0 17 4.172C16.56 4 16.04 4 15 4M4.5 9.5l.71-2.605c.274-1.005.411-1.507.692-1.886A2.5 2.5 0 0 1 7 4.172C7.44 4 7.96 4 9 4"
                ></path>
                <path
                    d="M9 4a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1Z"
                ></path>
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8 13v4m8-4v4m-4-4v4"
                ></path>
            </g>
        </svg>
        <span
            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary"
        >
            {{ count }}
        </span>
    </a>`,
})
export class RemoteEntryComponent implements OnInit, OnDestroy {
    count = 0;
    constructor() {
        const cart = localStorage.getItem('cartItems');
        this.count = cart ? JSON.parse(cart).length : 0;
    }
    navigateToCart() {
        window.location.href = '/pages/cart';
    }
    updateCartCount = () => {
        const items = JSON.parse(localStorage.getItem('cartItems') || '[]');
        this.count = items.length;
    };

    ngOnInit() {
        this.updateCartCount();
        window.addEventListener('cart:add', this.updateCartCount);
        window.addEventListener('storage', this.updateCartCount);
    }

    ngOnDestroy() {
        window.removeEventListener('cart:add', this.updateCartCount);
        window.removeEventListener('storage', this.updateCartCount);
    }
}

export default function defineOrderButtonElement() {
    if (!customElements.get('mfe-order-button')) {
        bootstrapApplication(RemoteEntryComponent).then((ref) => {
            const injector = ref.injector;
            const element = createCustomElement(RemoteEntryComponent, {
                injector,
            });
            customElements.define('mfe-order-button', element);
        });
    }
}
