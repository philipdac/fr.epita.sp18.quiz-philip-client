import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DataService } from './data.service';

@Injectable()
export class AttendanceDataService extends DataService
{
    constructor(http: HttpClient)
    {
        super('/api/attendances', http);
    }
}
