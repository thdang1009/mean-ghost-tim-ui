import { ElementRef } from '@angular/core';


import { Subscription } from 'rxjs';

export abstract class AbstractMockObservableService {
    protected _subscription: Subscription;
    protected _fakeContent: any;
    protected _fakeError: any;

    set error(err) {
        this._fakeError = err;
    }

    set content(data) {
        this._fakeContent = data;
    }

    get subscription(): Subscription {
        return this._subscription;
    }

    subscribe(next: Function, error?: Function, complete?: Function): Subscription {
        this._subscription = new Subscription();
        spyOn(this._subscription, 'unsubscribe');

        if (next && this._fakeContent && !this._fakeError) {
            next(this._fakeContent);
        }
        if (error && this._fakeError) {
            error(this._fakeError);
        }
        if (complete) {
            complete();
        }
        return this._subscription;
    }
}


export class MockElementRef extends ElementRef { }
