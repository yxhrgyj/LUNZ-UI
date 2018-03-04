import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { CustomValidators } from 'ng2-validation';

@Component({
    selector: 'app-max-value-validator',
    templateUrl: './max-value-validator.component.html',
    styleUrls: ['./max-value-validator.component.scss']
})

export class MaxValueValidatorComponent implements OnInit {
    form: FormGroup;

    constructor() {
        this.form = new FormGroup({
            min: new FormControl('', CustomValidators.max(5))
        });
    }

    ngOnInit() {
    }

}
