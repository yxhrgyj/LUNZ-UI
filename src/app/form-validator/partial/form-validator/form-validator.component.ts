import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { CustomValidators } from 'ng2-validation';

const password = new FormControl('', CustomValidators.required);
const certainPassword = new FormControl('', CustomValidators.equalTo(password));

@Component({
    selector: 'app-form-validator',
    templateUrl: './form-validator.component.html',
    styleUrls: ['./form-validator.component.scss']
})


export class FormValidatorComponent implements OnInit {
    form: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
    ) {
        this.form = this.formBuilder.group({
            required: [null, [Validators.required]],
            email: [null, [CustomValidators.email]],
            number: [null, [CustomValidators.number]],
            min: [null, [CustomValidators.min(5)]],
            max: [null, [CustomValidators.max(5)]],
            rangeLength: [null, [CustomValidators.rangeLength([5, 9])]],
            date: [null, [CustomValidators.date]],
            minDate: [null, [CustomValidators.minDate('2018-03-07')]],
            maxDate: [null, [CustomValidators.maxDate('2018-03-07')]],
            phone: [null, [Validators.pattern(/^((0\d{2,3}-\d{7,8})|(1[3|4|5|7|8][0-9]\d{8}))$/)]],
            url: [null, [CustomValidators.url]],
            password: password,
            equalTo: certainPassword,
        });
    }

    ngOnInit() {
    }

};
