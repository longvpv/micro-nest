import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
    standalone: true,
    imports: [NxWelcomeComponent, RouterModule],
    selector: 'mfe-storefront-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'Storefront';
    handler = (e: any) => {
        const items = JSON.parse(localStorage.getItem('cartItems') || '[]');
        items.push(e.detail);
        localStorage.setItem('cartItems', JSON.stringify(items));
    };

    ngOnInit() {
        window.addEventListener('cart:add', this.handler);
    }

    ngOnDestroy() {
        window.removeEventListener('cart:add', this.handler);
    }
}
