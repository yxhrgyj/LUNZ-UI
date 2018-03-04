import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { CustomValidators } from 'ng2-validation';

@Component({
    selector: 'app-url-validator',
    templateUrl: './url-validator.component.html',
    styleUrls: ['./url-validator.component.scss']
})

export class UrlValidatorComponent implements OnInit {
    form: FormGroup;

    constructor() {
        this.form = new FormGroup({
            url: new FormControl('', CustomValidators.url)
        });
    };

    ngOnInit() {
    }

}
