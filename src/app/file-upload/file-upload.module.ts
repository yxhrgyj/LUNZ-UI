import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'app/shared/shared.module';
import { FileUploadRoutingModule } from './file-upload-routing.module'

import { FileUploadDemoComponent } from './partial/file-upload-demo/file-upload-demo.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FileUploadRoutingModule
    ],
    declarations: [
        FileUploadDemoComponent
    ]
})
export class FileUploadModule { }
