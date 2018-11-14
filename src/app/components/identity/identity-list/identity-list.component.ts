import {Component, OnInit, ViewChild} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {MatDialogConfig, MatDialog} from '@angular/material';

import {NotifyService} from 'app/services/notify.service';
import {IdentityResponse} from 'app/models/identity-response';
import {IdentityService} from 'app/services/identity.service';
import {DialogConfirmCancelComponent} from 'app/components/dialog-confirm-cancel/dialog-confirm-cancel.component';
import {IdentityTableComponent} from '../identity-table/identity-table.component';

@Component({
    selector: 'app-identity-list',
    templateUrl: './identity-list.component.html',
    styleUrls: ['./identity-list.component.css'],
    providers: [IdentityService, NotifyService]
})
export class IdentityListComponent implements OnInit {
    @ViewChild(IdentityTableComponent) idTable: IdentityTableComponent;

    searchValue = '';
    emptyRow: IdentityResponse = {'id': -1, 'name': '', 'email': ''};
    selectedRow: IdentityResponse = this.emptyRow;
    identities;

    constructor(
        private _title: Title,
        private _dialog: MatDialog,
        private _notify: NotifyService,
        private _data: IdentityService
    ) {
    }

    ngOnInit() {
        this._title.setTitle('Identity list');
    }

    eventSelectRow(row) {
        this.selectedRow = row;
    }

    deleteIdentity() {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        dialogConfig.data = {
            title: 'Confirm to delete', line1: this.selectedRow.name, line2: this.selectedRow.email
        };

        const dialogRef = this._dialog.open(DialogConfirmCancelComponent,
            dialogConfig);

        dialogRef.afterClosed().subscribe(
            choice => {
                if (!choice) {
                    return;
                }
                this._data
                    .delete(this.selectedRow.id)
                    .catch(resp => {
                        console.log('deleteIdentity catch', resp);
                        this._notify.error('Delete identity error. Please try again!');
                    })
                    .then(resp => {
                        if (resp['hasError']) {
                            this._notify.error('Server\'s message : ' + resp['errorMessage']);
                            return;
                        }
                        this._notify.success(`Identity "${this.selectedRow.name}" was deleted`);
                        this.selectedRow = this.emptyRow;
                        this.idTable.getIdentities(this.searchValue.trim());
                    });
            }
        );
    }

    searchIdentity() {
        this.idTable.getIdentities(this.searchValue.trim());
    }

}
