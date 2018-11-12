import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

import { take } from 'rxjs/operators';

import { IdentityResponse } from '../../models/identity-response';
import { IdentityService } from '../../services/identity.service';
import { NotifyService } from '../../services/notify.service';

@Component({
    selector: 'app-identity-table',
    templateUrl: './identity-table.component.html',
    styleUrls: ['./identity-table.component.css'],
    providers: [IdentityService, NotifyService]
})
export class IdentityTableComponent implements OnInit
{
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    @Output() eventSelectRow = new EventEmitter<IdentityResponse>();

    dataSource: MatTableDataSource<IdentityResponse>;

    emptyRow: IdentityResponse = { 'id': -1, 'name': '', 'email': '' };
    selectedRow: IdentityResponse = this.emptyRow;
    selection = new SelectionModel<IdentityResponse>(true, []);

    displayedColumns = ['select', 'uid', 'name', 'email'];

    constructor(
        private _data: IdentityService,
        private _notify: NotifyService,
    )
    {
        this.dataSource = new MatTableDataSource();
    }

    ngOnInit()
    {
        this.getIdentities('');
    }

    getIdentities(filter: string)
    {
        this._data
            .list({ filter: filter })
            .pipe(take(1))
            .subscribe(resp =>
            {
                if (resp['hasError']) {
                    console.log('get resp', resp);
                    this._notify.error('Server\'s message : ' + resp['errorMessage']);
                    return;
                }

                this.dataSource.data = resp['model'] as IdentityResponse[];
            });
    }

    selectRow(row)
    {
        if (this.selectedRow && this.selectedRow.id === row.id) {
            this.selectedRow = this.emptyRow;
        } else {
            this.selectedRow = row;
        }

        this.eventSelectRow.emit(this.selectedRow);
    }

}
