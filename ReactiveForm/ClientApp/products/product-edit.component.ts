import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ViewChild, ElementRef } from '@angular/core';
import { MyProduct } from './my-product';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';

@Component({
    template: require("./product-edit.component.html")
})

export class ProductEditComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChildren(FormControlName, {read: ElementRef}) inputElements: ElementRef[];
    product: MyProduct;
    pageTitle: string = 'Product Edit';
    productForm: FormGroup;

    constructor(private fb: FormBuilder,// form builder service
        private route: ActivatedRoute,
        private router: Router) {
    }

    ngOnInit(): void {
        this.productForm = this.fb.group({
            productName: ['', [Validators.required,
                Validators.minLength(3),
                Validators.maxLength(50)]],
            productCode: ['', Validators.required],
            description: ''
        });
    }

    ngAfterViewInit(): void {
         console.log(this.inputElements);
    }

    ngOnDestroy(): void {
    }
}