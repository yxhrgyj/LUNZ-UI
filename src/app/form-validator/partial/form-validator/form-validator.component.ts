import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { CustomValidators } from 'ng2-validation';

@Component({
    selector: 'app-form-validator',
    templateUrl: './form-validator.component.html',
    styleUrls: ['./form-validator.component.scss']
})

export class FormValidatorComponent implements OnInit {
    form: FormGroup;
    model:any;

    constructor() {
        this.form = new FormGroup({
            field: new FormControl('', CustomValidators.range([5, 9]))
        });
    };

    ngOnInit() {
    }

};
