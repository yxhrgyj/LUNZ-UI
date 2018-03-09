import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';

import { RouteExtensions } from '../core/route.service';

import { FileUploadDemoComponent } from './partial/file-upload-demo/file-upload-demo.component';
import { UsingDocumentsComponent } from 'app/file-upload/partial/using-documents/using-documents.component';

const routes: Routes =
    RouteExtensions.withHost(
        { path: 'upload', component: FileUploadDemoComponent, data: { title: '文件上传' } },
        [
            { path: 'using-documents', component: UsingDocumentsComponent, data: { title: '文件上传使用文档' } }
        ]);

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})

export class FileUploadRoutingModule { }
