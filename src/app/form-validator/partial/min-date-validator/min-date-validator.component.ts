import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { CustomValidators } from 'ng2-validation';

@Component({
    selector: 'app-min-date-validator',
    templateUrl: './min-date-validator.component.html',
    styleUrls: ['./min-date-validator.component.scss']
})

export class MinDateValidatorComponent implements OnInit {
    form: FormGroup;

    constructor() {
        this.form = new FormGroup({
            mindate: new FormControl('', CustomValidators.minDate('2018-02-14'))
        });
    };

    ngOnInit() {
    };

}
