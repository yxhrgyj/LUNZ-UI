import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-phone-validator',
    templateUrl: './phone-validator.component.html',
    styleUrls: ['./phone-validator.component.scss']
})

export class PhoneValidatorComponent implements OnInit {
    form: FormGroup;

    constructor() {
        this.form = new FormGroup({
            phone: new FormControl('', Validators.pattern(''))
        });
    };

    ngOnInit() {
    }

}
