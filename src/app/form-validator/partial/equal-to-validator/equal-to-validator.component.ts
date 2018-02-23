import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { CustomValidators } from 'ng2-validation';

const password = new FormControl('', CustomValidators.required);
const certainPassword = new FormControl('', CustomValidators.equalTo(password));

@Component({
    selector: 'app-equal-to-validator',
    templateUrl: './equal-to-validator.component.html',
    styleUrls: ['./equal-to-validator.component.scss']
})


export class EqualToValidatorComponent implements OnInit {
    form: FormGroup;

    constructor() {
        this.form = new FormGroup({
            password: password,
            certainPassword: new FormControl('', CustomValidators.equalTo(password))
        });
    }

    ngOnInit() {
    }

}
