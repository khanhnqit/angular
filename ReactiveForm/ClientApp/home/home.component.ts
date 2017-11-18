import { Component, OnInit,ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/delay';

@Component({
    selector: 'home',
    template: require('./home.component.html')
})
export class HomeComponent implements OnInit, AfterViewInit {
    @ViewChild("getdata") button: ElementRef;
    aTest = [1, 5, 10];
    someText: string;
    // it doesn't matter if the data is arriving asynchronously, or later, it is isolated from obverable

    ngOnInit(): void {
        
    }

    ngAfterViewInit(): void {
        this.onClickObservable();
    }

    onClickObservable() {
        let click = Observable.fromEvent(this.button.nativeElement, "click"); // observe the event click from button

        click.flatMap(e => this.loadData("url"))
            .subscribe(data => console.log(data));
    }

    loadData(url: string): Observable<string> {
        return Observable.create(observer => {
            let xhr = new XMLHttpRequest();
            xhr.addEventListener("load", () => {
                let data = JSON.parse(xhr.responseText);
                // spit out the data to any observer
                observer.next(data);
                observer.complete();
            });

            xhr.open("GET", url);
            xhr.send();
        });
    }

    onEventObservable(): void {
        let source = Observable.fromEvent(document, 'mousemove')
            .map((e: MouseEvent) => {
                return {
                    xCord: e.clientX,
                    ycord: e.clientY
                };
            }).delay(300);
        //.map(x => x * 2)
        //.filter(x => x > 4);
        let track = (value) => {
            //this.circle.nativeElement.style.left = value.xCord;
            //this.circle.nativeElement.style.top = value.ycord;
        }

        source.subscribe(
            track
        );
    }

    onObservale(): void {
        var source = Observable.create(observer => {
                let index = 0;
                let produceValue = () => {
                    observer.next(this.aTest[index++]);
                    if (index < this.aTest.length) {
                        setTimeout(produceValue, 200);
                    } else {
                        observer.complete();
                    }
                }

                produceValue();
            }).map(x => x * 2)
            .filter(x => x > 4); // produce a stream of number when there is a value, observer do something with the value
        // should have the same functions as the observer class before in the subscribe
        // declare an observer that listen to changes on array
        source.subscribe(value => {
                console.log(value);
            },
            error => console.log(error),
            () => console.log("Complete")
        );
        this.someText = this.aTest.toString();
    }
}

//class MyObserver implements Observer<number> {
//    next(value) {
//        console.log(value);
//    } // this will be called when there is a value to produce

//    error(e) {
//        console.log(e);
//    }

//    complete() {
//        console.log("complete");
//        // when it has exhaused all resources
//        // you can have multiple observers for the same observable
//    }

//    closed: boolean;
//}
