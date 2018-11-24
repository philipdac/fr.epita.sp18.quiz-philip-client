import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import showdown from 'showdown';

@Component({
    selector: 'app-readme',
    templateUrl: './readme.component.html',
    styleUrls: ['./readme.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class ReadmeComponent implements OnInit, OnDestroy {

    converter = new showdown.Converter();

    subsReadme: any;

    constructor(
        private http: HttpClient,
    ) {
    }

    ngOnInit()
    {
        this.subsReadme = this.http.get('/assets/README.md', {responseType: 'text'})
            .subscribe(resp => {
                const element = document.getElementById('htmlContent');
                element.innerHTML = this.converter.makeHtml(resp);
            });
    }

    ngOnDestroy(): void {
        this.subsReadme.unsubscribe();
    }
}
