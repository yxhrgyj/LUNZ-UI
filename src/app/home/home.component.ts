import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

    moduleAllList: Array<any>;

    constructor(
        private router: Router
    ) { };

    ngOnInit() {
        setTimeout(() => {
            this.moduleAllList = JSON.parse(localStorage.getItem(`menuListAll`)) || [];
        }, 1000);
    };

    enterModule(row: any) {
        this.router.navigate([row.url]);
    };
}
