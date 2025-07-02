/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './order.component';

@Component({
    standalone: true,
    imports: [CommonModule, OrderListComponent],
    selector: 'mfe-order',
    template: `<app-order-list></app-order-list>`,
})
export class RemoteEntryComponent {}
