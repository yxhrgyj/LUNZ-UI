import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { CustomValidators } from 'ng2-validation';

@Component({
    selector: 'app-range-length-validator',
    templateUrl: './range-length-validator.component.html',
    styleUrls: ['./range-length-validator.component.scss']
})

export class RangeLengthValidatorComponent implements OnInit {

    form: FormGroup;

    constructor() {
        this.form = new FormGroup({
            range: new FormControl('', CustomValidators.range([4, 10]))
        });
    }

    ngOnInit() {
    }

}
