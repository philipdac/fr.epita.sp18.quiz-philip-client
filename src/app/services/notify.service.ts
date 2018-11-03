import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable()
export class NotifyService
{
    constructor(
        private snackBar: MatSnackBar,
        private zone: NgZone
    ) { }

    private static createConfig(duration, msgType)
    {
        const config = new MatSnackBarConfig();

        config.duration = duration;
        config.panelClass = [msgType === 'error' ? 'notify-error' : 'notify-success'];
        config.verticalPosition = 'bottom';
        config.horizontalPosition = 'center';

        return config;
    }

    error(message: string, duration: number = 10000)
    {
        this.zone.run(() =>
        {
            const config = NotifyService.createConfig(duration, 'error');
            this.snackBar.open(message, 'Close', config);
        });
    }

    success(message: string, duration: number = 10000)
    {
        this.zone.run(() =>
        {
            const config = NotifyService.createConfig(duration, 'success');
            this.snackBar.open(message, 'Close', config);
        });
    }
}
