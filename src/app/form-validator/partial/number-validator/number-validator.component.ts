import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { CustomValidators } from 'ng2-validation';

@Component({
    selector: 'app-number-validator',
    templateUrl: './number-validator.component.html',
    styleUrls: ['./number-validator.component.scss']
})
export class NumberValidatorComponent implements OnInit {
    form: FormGroup;

    constructor() {
        this.form = new FormGroup({
            number: new FormControl('', CustomValidators.number)
        });
    }

    ngOnInit() {
    }

}
