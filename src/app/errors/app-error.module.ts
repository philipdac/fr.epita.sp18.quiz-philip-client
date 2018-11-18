import { NgModule, ErrorHandler } from '@angular/core';

import { AppErrorHandler } from './app-error-handler';

@NgModule({
    providers: [
        {
            provide: ErrorHandler,
            useClass: AppErrorHandler,
        },
    ]
})
export class AppErrorModule { }
