import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { FormValidatorRoutingModule } from './form-validator-routing.module';
import { FormValidatorComponent } from './partial/form-validator/form-validator.component';

import { UsingDocumentsComponent } from './partial/doc/using-documents/using-documents.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        FormValidatorRoutingModule
    ],

    declarations: [
        FormValidatorComponent,
        UsingDocumentsComponent
    ]
})

export class FormValidatorModule { }
