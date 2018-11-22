import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-attendance-loading',
    templateUrl: './attendance-loading.component.html',
    styleUrls: ['./attendance-loading.component.css']
})
export class AttendanceLoadingComponent implements OnInit {
    @Input() initMessage: string;

    constructor() {
    }

    ngOnInit() {
    }

}
