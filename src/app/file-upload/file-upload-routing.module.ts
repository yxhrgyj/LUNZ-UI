import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';

import { RouteExtensions } from '../core/route.service';

import { FileUploadDemoComponent } from './partial/file-upload-demo/file-upload-demo.component';

const routes: Routes =
    RouteExtensions.withHost(
        { path: 'upload', component: FileUploadDemoComponent, data: { title: '文件上传' } },
        []);

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})

export class FileUploadRoutingModule { }
