import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { CustomValidators } from 'ng2-validation';

@Component({
    selector: 'app-phone-validator',
    templateUrl: './phone-validator.component.html',
    styleUrls: ['./phone-validator.component.scss']
})

export class PhoneValidatorComponent implements OnInit {
    form: FormGroup;

    constructor() {
        this.form = new FormGroup({
            phone: new FormControl('', CustomValidators.phone('zh-CN'))
        });
    };

    ngOnInit() {
    }

}
