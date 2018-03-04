import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { CustomValidators } from 'ng2-validation';

@Component({
    selector: 'app-date-validator',
    templateUrl: './date-validator.component.html',
    styleUrls: ['./date-validator.component.scss']
})

export class DateValidatorComponent implements OnInit {
    form: FormGroup;

    constructor() {
        this.form = new FormGroup({
            date: new FormControl('', CustomValidators.date)
        });
    }

    ngOnInit() {
    }

}
