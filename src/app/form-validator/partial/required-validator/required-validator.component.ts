import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { CustomValidators } from 'ng2-validation';

@Component({
    selector: 'app-required-validator',
    templateUrl: './required-validator.component.html',
    styleUrls: ['./required-validator.component.scss']
})

export class RequiredValidatorComponent implements OnInit {
    form: FormGroup;

    constructor() {
        this.form = new FormGroup({
            required: new FormControl('', CustomValidators.required),
        });
    }

    ngOnInit() {
    }

}
