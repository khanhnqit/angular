import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import {ProductEditComponent} from './product-edit.component';

@NgModule({
    imports: [
        SharedModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {
                path: 'productEdit/:id',
                component: ProductEditComponent
            }
        ])
    ],
    providers: [

    ],
    declarations: [
        ProductEditComponent
    ]
})
export class ProductModule {
    
}