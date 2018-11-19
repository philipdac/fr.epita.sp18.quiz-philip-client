import {Injectable, NgZone} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';

@Injectable()
export class NotifyService {
    constructor(
        private snackBar: MatSnackBar,
        private zone: NgZone
    ) {
    }

    private createConfig(duration, msgType) {
        const config = new MatSnackBarConfig();

        config.duration = duration;
        config.panelClass = [msgType === 'error' ? 'notify-error' : (msgType === 'success' ? 'notify-success' : 'notify-warning')];
        config.verticalPosition = 'bottom';
        config.horizontalPosition = 'center';

        return config;
    }

    error(message: string, duration: number = 10000) {
        if (!message) {
            return;
        }

        this.zone.run(() => {
            const config = this.createConfig(duration, 'error');
            this.snackBar.open(message, 'Close', config);
        });
    }

    success(message: string, duration: number = 10000) {
        if (!message) {
            return;
        }

        this.zone.run(() => {
            const config = this.createConfig(duration, 'success');
            this.snackBar.open(message, 'Close', config);
        });
    }

    warning(message: string, duration: number = 10000): void
    {
        if (!message) {
            return;
        }

        this.zone.run(() =>
        {
            const config = this.createConfig(duration, 'warning');
            this.snackBar.open(message, 'OK', config);
        });
    }
}
