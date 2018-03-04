import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { CustomValidators } from 'ng2-validation';

@Component({
    selector: 'app-max-date-validator',
    templateUrl: './max-date-validator.component.html',
    styleUrls: ['./max-date-validator.component.scss']
})

export class MaxDateValidatorComponent implements OnInit {
    form: FormGroup;

    constructor() {
        this.form = new FormGroup({
            maxdate: new FormControl('', CustomValidators.maxDate('2018-02-14'))
        });
    };

    ngOnInit() {
    }

}
