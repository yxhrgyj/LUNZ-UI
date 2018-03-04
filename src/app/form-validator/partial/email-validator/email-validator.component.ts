import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { CustomValidators } from 'ng2-validation';

@Component({
    selector: 'app-email-validator',
    templateUrl: './email-validator.component.html',
    styleUrls: ['./email-validator.component.scss']
})

export class EmailValidatorComponent implements OnInit {
    form: FormGroup;

    constructor() {
        this.form = new FormGroup({
            email: new FormControl('', CustomValidators.email)
        });
    }

    ngOnInit() {
    }

}
