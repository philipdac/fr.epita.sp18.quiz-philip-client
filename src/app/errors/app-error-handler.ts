import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';

import {NotifyService} from '../services/notify.service';

@Injectable()
export class AppErrorHandler implements ErrorHandler {
    lastMsg = '';

    constructor(
        private injector: Injector,
    ) {
    }

    handleError(err: Error | HttpErrorResponse) {
        if (this.lastMsg === err.message) {
            // Same message. Do not notify again
            throw err;
        }
        this.lastMsg = err.message;

        let msg = 'Application has error.';

        if (err instanceof HttpErrorResponse) {
            switch (err.status) {
                case 404:
                    msg = 'Forbidden. Please sign in again.';
                    break;

                case 444:
                case 504:
                    msg = 'Can not connect to the server.';
                    break;

                default:
                    msg = 'Error happened at server side.';
            }
        }

        const tag = ' Please try again or call for support. (Dev: see console for more detail)';
        const notify = this.injector.get(NotifyService);
        notify.error(msg + tag);

        console.log('AppErrorHandler captured:', err);
        throw err;
    }
}
