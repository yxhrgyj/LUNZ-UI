import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-custom-pattern-validator',
    templateUrl: './custom-pattern-validator.component.html',
    styleUrls: ['./custom-pattern-validator.component.scss']
})

export class CustomPatternValidatorComponent implements OnInit {
    form: FormGroup;
    customerPattern: String;

    constructor() {
        this.form = new FormGroup({
            pattern: new FormControl('', Validators.pattern(''))
        });
    };

    ngOnInit() {
    }

}
