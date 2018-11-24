import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { User } from 'app/common/user';
import { NotifyService } from 'app/services/notify.service';
import { AttendanceDataService } from 'app/services/attendance-data.service';

import { Attendance } from 'app/models/attendance';
import { Quiz } from 'app/models/quiz';
import { AttendRequest } from 'app/models/attend-request';

@Component({
    selector: 'app-attendance',
    templateUrl: './attendance.component.html',
    styleUrls: ['./attendance.component.css'],
    providers: [AttendanceDataService, NotifyService]
})
export class AttendanceComponent implements OnInit, OnDestroy {
    examRoom = '';
    attendance: Attendance;
    initMessage = 'getting data...';

    reviewMode = false;

    user: User;
    subsAttend: any;

    constructor(
        private _title: Title,
        private _route: ActivatedRoute,
        private _notify: NotifyService,
        private _dataAttend: AttendanceDataService,
    ) {
        this.user = new User();
        this.attendance = new Attendance();
    }

    ngOnInit() {
        this._title.setTitle('Taking an exam');
        this.getData();
    }

    ngOnDestroy(): void {
        this.subsAttend.unsubscribe();
    }

    getData(): void {
        this.examRoom = this._route.snapshot.queryParamMap.get('room');
        if (!this.examRoom) {
            this.initMessage = 'Invalid exam room. Please go back to the sign-in screen!';
            return;
        }

        const attendRequest = new AttendRequest();
        attendRequest.email = this.user.userName;
        attendRequest.examRoom = this.examRoom;

        this.subsAttend = this._dataAttend
            .create(attendRequest)
            .subscribe(resp => {
                console.log('got attd', resp);
                if (!resp['hasError']) {
                    this.attendance = resp['data'] as Attendance;
                } else {
                    this.attendance = new Attendance();
                    this.initMessage = resp['errorMessage'];
                }
            });
    }

    submitExam(): void {
        this.reviewMode = true;
    }
}
