import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { CustomValidators } from 'ng2-validation';

@Component({
    selector: 'app-min-value-validator',
    templateUrl: './min-value-validator.component.html',
    styleUrls: ['./min-value-validator.component.scss']
})

export class MinValueValidatorComponent implements OnInit {

    form: FormGroup;

    constructor() {
        this.form = new FormGroup({
            min: new FormControl('', CustomValidators.min(5))
        });
    }

    ngOnInit() {
    }

}
