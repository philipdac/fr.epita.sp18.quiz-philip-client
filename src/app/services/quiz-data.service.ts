import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DataService } from './data.service';

@Injectable()
export class QuizDataService extends DataService
{
    constructor(http: HttpClient)
    {
        super('/api/quizzes', http);
    }
}
