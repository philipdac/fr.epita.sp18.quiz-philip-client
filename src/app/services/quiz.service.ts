import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DataService } from './data.service';

@Injectable()
export class QuizService extends DataService
{
    constructor(http: HttpClient)
    {
        super('/api/quizzes', http);
    }

}
