# Lunz+

这个项目是使用 [ngX-Rocket](https://github.com/ngx-rocket/generator-ngx-rocket/)
version 1.3.1 生成的。

# 快速开始

1. 使用 [VS Code](https://code.visualstudio.com/) 打开项目并使用如下命令安装依赖的包:
 ```bash
 npm install
 ```
 
2. 使用如下命令启动项目，在浏览器中打开 `localhost:9200` 浏览本项目 :
 ```bash
 npm start
 ```
# 开发环境及工具

1. [NodeJs](https://nodejs.org/en/)
2. [Angular CLI](https://cli.angular.io/)
3. [VS Code](https://code.visualstudio.com/)

# 代码规范

详细参见 [Angular 风格指南](https://angular.cn/guide/styleguide)。

# 项目结构

```
dist/                           编译目录（发布目录）
docs/                           项目文档及编码指南
e2e/                            end-to-end 测试
src/                            项目源代码
|- app/                         应用程序组件集合
|  |- core/                     core module (singleton services and single-use components)
|  |  |- authentication         与认证相关的服务
|  |  |- http                   与服务器通信相关的服务
|  |  |- profile                与当前登录人相关的服务
|  |  |- shell                  app shell
|  |  |  |- applications        相关应用程序菜单
|  |  |  |- breadcrumbs         breadcrumbs component
|  |  |  |- footer              shell footer component
|  |  |  |- header              shell header component
|  |  |  |- navigation          主导航菜单
|  |  |  |- page-header         常规页头
|  |  |  |- shell.component.*   框架（shell)
|  |- shared/                   shared module  (common components, directives and pipes)
|  |- app.component.*           app root component (shell)
|  |- app.module.ts             app root module definition
|  |- app-routing.module.ts     app routes
|  +- ...                       其它 modules 和 components
|- assets/                      应用程序资源 (images, fonts, sounds...)
|- environments/                编译时使用的环境变量
|- theme/                       应用程序公共的主题（app global scss variables and theme）
|- translations/                多语言文件
|- index.html                   应用程序入口（HTML）
|- main.scss                    公共样式文件入口
|- main.ts                      应用程序入口（Javascript）
|- polyfills.ts                 polyfills needed by Angular
+- test.ts                      单元测试入口
reports/                        测试报告
proxy.conf.js                   后台代理配置（未使用）
```
# 如何开发？

本节介绍如何开发一个CRUD的功能，将以订单管理（Order Management）为例。

#### 技巧
1. 使用 log.info(), log.error() 等代替 dialogs.info() 和 dialogs.error() 方法。
2. 使用 `ng g [module/component/service/pipe/class]` 命令创建相应文件。

## 创建Module

1. 使用 VS Code 打开项目。
2. 使用 Ctrl+` 快捷键打开命令行
3. 定位到 `src\app` 目录
4. 使用 `ng g module OderManagement` 命令创建 OrderManagement module(`order-management.module.ts`)。
5. 在 module 文件中，引入需要使用的组件，详细参见文件 `order-management.module.ts`。
6. 注意：需要将 `SharedModule` 引入到这个 Module 中。

## 配置Routing

1. 在 VS Code 中，右键 `order-management` 文件夹，新建文件 `order-management-routing.module.ts`。
2. 在 module 文件中，配置路由，详细参见文件 `order-management-routing.module.ts`。
3. 将 OrderManagementRoutingModule 引入到 OrderManagementModule 中。
4. 打开 `src\app\core\core-routing.module.ts` 文件，将 OrderManagementRoutingModule 配置到路由中，详细参见文件 `core-routing.module.ts`。

## 创建Service

1. 在 VS Code 中，右键 `order-management` 文件夹，新建文件夹 `shared`。
2. 在 VS Code 命令行中，定位到 `src\app\order-management\shared` 目录。
3. 使用 `ng g service Orders` 命令创建 OrdersService。
4. 打开 `orders.service.ts` 文件，填充服务器通信方法，详细参见文件 `orders.service.ts`。

## 创建列表组件

1. 在 VS Code 中，右键 `order-management` 文件夹，新建文件夹 `partial`。
2. 在 VS Code 命令行中，定位到 `src\app\order-management\partial` 目录。
3. 使用 `ng g component Orders` 命令创建 orders.component.* 组件文件。
4. 引入需要的组件，详细参见文件 `create-order.component.ts`。
5. 将 ngx-query 引入到 `create-order.component.html`，并在 `create-order.component.ts` 中对其进行配置。
6. 将 ngx-datatable 引入到 `create-order.component.html`，并在 `create-order.component.ts` 中对其进行配置。
7. 在 loadOrders() 方法中，调用 ordersService.getOrders() 从服务器获取数据。

## 创建编辑组件

1. 在 VS Code 中，右键 `order-management` 文件夹，新建文件夹 `partial`。
2. 在 VS Code 命令行中，定位到 `src\app\order-management\partial` 目录。
3. 使用 `ng g component EditOrder` 命令创建 edit-order.component.* 组件文件。
4. 使用 `ng g component CreateOrder` 命令创建 create-order.component.* 组件文件。
5. 删除 edit-order.component.html 和 edit-order.component.scss 两个文件，CreateOrderComponent 使用 EditOrderComponent 同样的界面和样式。
6. 修改 CreateOrderComponent 类，将 templateUrl 和 styleUrls 两属性值指向 `edit-order` 文件夹。
7. 引入需要的组件，详细参见文件 `create-order.component.ts`。
8. 在 构造函数 中调用 buildForm() 方法，初始化表单；buildForm() 方法中有对字段数据效验的方法。
9. 在 ngOnInit() 方法中，初始化 Order(订单) 实体。
10. 在 submit() 方法中，调用 OrdersService.createOrder() 方法保存数据到服务器。
11. 在 `edit-order.component.html` 中布局表单，详细参见该文件。

# 管理 CSS & JS

## 管理 CSS

### 方式一

在 `src\main.scss` 文件中引入样式文件。

### 方式二

在 `.angular-cli.json` 文件 `apps\styles` 节点下引入样式文件。

## 管理 JS

在 `.angular-cli.json` 文件 `apps\scripts` 节点下引入 JS 文件。

# 配置路由

注意：Angular路由是大小写敏感的。

## 具有框架的路由配置

具有框架的界面是指具有导航栏的界面，即登录后的界面。

1. 在 xxx-routing.module.ts 中配置路由，参见 order-management-routing.module.ts
2. 将 XxxRoutingModule 引用到 XxxModule，参见 order-management.module.ts 
3. 将路由配置添加到 src\app\core\core-routing.module.ts，参见此文件。

## 无框架的路由配置

无框架的界面是指没有导航栏的界面，如登录页面。

无框架的路由配置与具有框架的路由配置一致，只是不需要第三步，更接近 Angular 原生路由配置规则。

1. 在 xxx-routing.module.ts 中配置路由，参见 order-management-routing.module.ts
2. 将 XxxRoutingModule 引用到 XxxModule，参见 order-management.module.ts 

路由的层级关系，同时也会用在 Breadcrumbs，所以，定义路由时，需要考虑这些。

# 组件

## 1. [ng-bootsrap](https://ng-bootstrap.github.io/)

[ng-bootsrap](https://ng-bootstrap.github.io/) 提供了 [Bootstrap 4](http://getbootstrap.com/) 中组件 Angular 使用的封装。

## 2. [file-upload](https://www.npmjs.com/package/@uniprank/ngx-file-uploader)

[file-upload](https://www.npmjs.com/package/@uniprank/ngx-file-uploader) 提供了文件上传功能。

### 如何使用？

1. 在 你的 apps module 中导入 `FileUploadComponent`，以便我们可以引用它。

        import { Component, NgModule } from '@angular/core';
        import { FileUploadComponent } from './components/file-upload/file-upload.component';

        @NgModule({
            declarations: [
              FileUploadComponent
            ],
            exports: [
              FileUploadComponent
            ]
        })
        export class MyModule {}

2. 简单用例

     Template Code

        <app-file-upload [multiple]="false" [(ngValue)]="company.LogoId" 
                        (success)="uploadSuccess($event)" (error)="uploadError($event)">
        </app-file-upload>

     Component Code

        uploadSuccess(data: any) {
          this.log.info('上传成功!');
        }

        uploadError(e: any) {
          this.log.error('上传失败! ' + e.error);
        }
     
### 功能列表

属性或事件                     | 说明
------------------------------|---------------------------------------------------------------------------------------
multiple                      | true: 多文件上传; false: 单个文件上传
ngValue                       | 上传方法成功返回值（只适用单个文件上传）
success                       | 上传成功后触发事件，参数：上传方法成功返回值
error                         | 上传失败后触发事件，参数：错误信息（ErrorObservable）

## 3. dialogs

dialogs 是一个对话框组件集合，使用了 [ngx-toastr](https://github.com/scttcper/ngx-toastr) 和 [ngsweetalert2](https://github.com/toverux/ngsweetalert2) 两个组件。

### 如何使用？

1. 在你的 apps Component 中引用 `Dialogs`

        import { Component, Input, OnInit, EventEmitter } from '@angular/core';
        import { Dialogs } from '../core/dialogs.service';

        @Component({
          selector: 'app-my-com',
          templateUrl: './my.component.html',
          styleUrls: ['./my.component.scss']
        })

        export class MyComponent implements OnInit {

           constructor(private dialogs: Dialogs) {}

          ngOnInit() {}
        }

2. 简单用例

         this.dialogs.alert('This is a test.', 'Title');

### 功能列表

方法                           | 说明
----------------------------- |---------------------------------------------------------------------------------------
success                       | 成功提示框
info                          | 信息提示框
warning                       | 警告提示框
error                         | 错误提示框
alert                         | 信息弹出框
confirm                       | 问题询问框 
wait                          | 等待提示框

## 4. [angular2-ladda](https://github.com/moff/angular2-ladda)

[angular2-ladda](https://github.com/moff/angular2-ladda) 组件提供了按钮处理中状态服务。

## 5. logger

### 如何使用？

1. 在的 apps Component 中导入 `Logger` 和 `LoggerFactory`

        import { Component, Input, OnInit, EventEmitter } from '@angular/core';
        import { Logger } from '../../core/logger.service';
        import { LoggerFactory } from '../../core/logger-factory.service';

        @Component({
          selector: 'app-my-com',
          templateUrl: './my.component.html',
          styleUrls: ['./my.component.scss']
        })

        export class MyComponent implements OnInit {

            log: Logger;

            constructor(private loggerFactory: LoggerFactory) {
                  this.log = this.loggerFactory.getLogger();
             }

            ngOnInit() {}
        }

2. 简单用例

         this.log.info('Success!');

### 功能列表

方法                           | 说明
----------------------------- |---------------------------------------------------------------------------------------
debug                         | logs messages or objects  with the debug level.
info                          | logs messages or objects  with the info level.
warn                          | logs messages or objects  with the warn level.
error                         | logs messages or objects  with the error level.

## 6. [ngx-datatable](https://github.com/swimlane/ngx-datatable)

[ngx-datatable](https://github.com/swimlane/ngx-datatable) 提供数据列表显示功能。

### 如何使用？

1.  documentation & demos

       [https://swimlane.gitbooks.io/ngx-datatable/](https://swimlane.gitbooks.io/ngx-datatable/)

2. 简单用例

     在你的 apps module 引入

         import { NgxDatatableModule } from '@swimlane/ngx-datatable';
         import { NgxDataTableDirective } from './directives/ngx-datatable.directive';
         import { NgxDatatableFooterComponent } from './components/ngx-datatable-footer/ngx-datatable-footer.component';
         import { NgxDatatablePagerComponent } from './components/ngx-datatable-pager/ngx-datatable-pager.component';
         import { NgxDatatableActionsComponent } from './components/ngx-datatable-actions/ngx-datatable-actions.component';

         @NgModule({
           imports: [
             NgxDatatableModule
           ], 
           declarations: [
              NgxDataTableDirective,
              NgxDatatableFooterComponent,
              NgxDatatablePagerComponent,
              NgxDatatableActionsComponent
           ],
           exports: [
               NgxDataTableDirective,
               NgxDatatableFooterComponent,
               NgxDatatablePagerComponent,
               NgxDatatableActionsComponent
             ]
         })
         export class MyModule {}

     Component Code
      
          定义:
              orders: Array<any>;
              private datatable: any;

     Template Code

             <div class="col-lg-12">
                <ngx-datatable #dt class="material" [scrollbarH]="true" [rows]="orders" [loadingIndicator]="loading" 
                        appNgxDataTable [ngxQuery]="ngxQuery" (data)="loadOrders($event)">
                   <app-ngx-datatable-footer></app-ngx-datatable-footer>
                   <ngx-datatable-column name="摘要" width="120" prop="subject"> </ngx-datatable-column>
                   <ngx-datatable-column name="日期" width="60" prop="date">
                      <ng-template let-row="row" ngx-datatable-cell-template>
                          {{row.date | date}}
                      </ng-template>
                   </ngx-datatable-column>
                   <ngx-datatable-column name="付款" width="40" prop="paid">
                       <ng-template let-row="row" ngx-datatable-cell-template>
                          <span class="label" [ngClass]="{'label-primary': row.paid }">Paid</span>
                       </ng-template>
                   </ngx-datatable-column>
                   <ngx-datatable-column maxWidth="200">
                       <ng-template let-column="column" ngx-datatable-header-template>
                          <app-ngx-datatable-actions [datatable]="dt"></app-ngx-datatable-actions>
                       </ng-template>
                      <ng-template let-row="row" ngx-datatable-cell-template>
                          <div class="btn-group btn-group-xs">
                            <a [routerLink]="['./', row.id]" class="btn btn-default"><i class="fa fa-file-o"></i> 详细</a>
                            <a [routerLink]="['./', row.id,'edit']" class="btn btn-default"><i class="fa fa-edit"></i> 编辑</a>
                            <a (click)="delete(row)" class="btn btn-danger"><i class="fa fa-times"></i> 删除</a>
                         </div>
                      </ng-template>
                    </ngx-datatable-column>
                 </ngx-datatable>
             </div>

### 功能列表

自定义指令或组件                | 说明
------------------------------|---------------------------------------------------------------------------------------
appNgxDataTable               | 初始化 datatable
app-ngx-datatable-footer      | 实现 datatable 表尾显示
app-ngx-datatable-pager       | 实现 datatable 分页功能
app-ngx-datatable-actions     | 按钮下拉框，下拉列表显示 datatable 的所有列名，实现列显示/隐藏，以及列是否固定左侧的功能

## 7. [ngx-query](https://github.com/xuemingfeng/ngx-query)

[ngx-query](https://github.com/xuemingfeng/ngx-query) 提供了自定查询界面组件，包括简单查询和复杂查询。

### 如何使用？
  
1.  documentation & demos

      [https://xuemingfeng.github.io/ngx-query/](https://xuemingfeng.github.io/ngx-query/)

2. 简单用例

     在你的 apps module 引入 `NgxQueryModule`

         import { Component, NgModule } from '@angular/core';
         import { NgxQueryModule } from 'ngx-query';
         
         const ngxQuerySettings: any = {
           labels: {
             buttons: {
               'quick': '快速',
               'advanced': '高级',
               'reset': '重置',
               'search': '查询'
             },
             groupOp: {
               'and': '并且',
               'or': '或者'
             },
             fieldOp: {
               'eq': '等于',
               'ne': '不等于',
               'lt': '小于',
               'le': '小于等于',
               'gt': '大于',
               'ge': '大于等于',
               'bw': '开头是',
               'bn': '开头不是',
               'ew': '结尾是',
               'en': '结尾不是',
               'cn': '包含',
               'nc': '不包含',
               'bt': '介于'
             }
           }
         };

         @NgModule({
           imports: [
             NgxQueryModule.forRoot(ngxQuerySettings)
           ]
         })
         export class MyModule {}

     Component Code

         import { Component, OnInit, ViewChild } from '@angular/core';
         import { QueryComponent } from 'ngx-query/query.component';

         @Component({
           selector: 'app-list',
           templateUrl: './list.component.html',
           styleUrls: ['./list.component.scss']
         })
         export class MylistComponent {
            queryTemplates: any = [{
               name: 'Default',
               template: {
                  op: 'or',
                  rules: [
                    { field: 'subject', op: 'cn', data: '' },
                    { field: 'date', op: 'bt' }
                  ],
                  groups: []
               }
            }];
         }

     Template Code

         <div class="col-lg-12">
            <ngx-query #ngxQuery [title]="'订单管理'" [queryTemplates]="queryTemplates" [showModeButtons]="true">
              <ngx-query-field [name]="'subject'" [label]="'订单简要'" [type]="'string'"></ngx-query-field>
              <ngx-query-field name="date" label="日期" type="date"></ngx-query-field>
              <ng-template ngx-query-toolbar-template>
                 <div class="btn-group btn-group-xs">
                 <a routerLink="./new" class="btn btn-primary"><i class="fa fa-plus"></i> 新建</a>
              </div>
              </ng-template>
            </ngx-query>
        </div>

## 8. validation-message

表单字段验证组件，可自定义验证函数。

### 如何使用？

1. 在你的 apps module 中导入 `ValidationMessageComponent`，以便我们可以引用它。

        import { Component, NgModule } from '@angular/core';
        import { ValidationMessageComponent } from './components/validation-message/validation-message.component';

        @NgModule({
            declarations: [
              ValidationMessageComponent
            ],
            exports: [
              ValidationMessageComponent
            ]
        })
        export class MyModule {}

2. 简单用例

     Template Code

          <div class="form-group">
              <label>公司全称 <span class="text-danger">*</span></label>
              <input type="text" formControlName="name" placeholder="公司全称" class="form-control" [(ngModel)]="company.Name" />
              <app-validation-message [control]="form.controls['name']" label="公司全称"></app-validation-message>
          </div>
          <div class="form-group">
              <label>公司简称</label>
              <input type="text" formControlName="abbr" placeholder="公司简称" class="form-control" [(ngModel)]="company.Abbreviation" />
              <app-validation-message [formGroup]="form" for="abbr" label="公司简称" [validationMessages]="{pattern: '{label}首字母必须为A。'}">
              </app-validation-message>
          </div>

     Component Code

        private buildForm() {
           this.form = this.formBuilder.group({
                name: [null, [Validators.required, Validators.maxLength(50)]],
                abbr: [null, [Validators.pattern(/^A/)]],
                summary: []
            });
        }


### 功能列表

属性                           | 说明
------------------------------|---------------------------------------------------------------------------------------
formGroup                     | 规定 app-validation-message 所属的表单
control                       | 规定 app-validation-message 绑定到哪个表单元素的自定义验证规则
for                           | 规定 app-validation-message 绑定到哪个表单元素
label                         | 标注
validationMessages            | 要显示的信息

## 9. rmb pipe

格式化货币（人民币）的 Pipe。

### 如何使用？

1. 在你的 apps module 中导入 `RmbPipe`，以便我们可以引用它。

        import { Component, NgModule } from '@angular/core';
        import { RmbPipe } from './pipes/rmb.pipe';

        @NgModule({
            declarations: [
              RmbPipe
            ],
            exports: [
              RmbPipe
            ]
        })
        export class MyModule {}

2. 简单用例

        <div class="form-group">
             <label>单价</label>
             <span class="form-control">{{order.price | rmb}}</span>
        </div>

### 功能列表。

    将 number 数值转化成为货币格式

## 10. [URI.js](http://medialize.github.io/URI.js/)

[URI.js](http://medialize.github.io/URI.js/) 组件提供了对符合 URI 格式字符串的解析。

# 命令列表

命令是基于 [NPM scripts](https://docs.npmjs.com/misc/scripts) 创建的。

命令                           | 说明
------------------------------|---------------------------------------------------------------------------------------
npm start                     | 运行开发环境 `http://localhost:9200/`
npm run build                 | 以生产环境编译项目到 `dist/` 目录
npm run build:stage           | 以测试环境编译项目到 `dist/` 目录
npm run state                 | 发布到测试环境，依赖 [Kudu](https://github.com/projectkudu/kudu)
npm run live                  | 发布到生产环境，依赖 [Kudu](https://github.com/projectkudu/kudu)
npm run clean                 | 清空编译目录 `dist/` 目录
npm test                      | 以观察模式运行单元测试，使用 [Karma](https://karma-runner.github.io) 工具
npm run test:ci               | Lint code and run unit tests once for continuous integration
npm run e2e                   | Run e2e tests using [Protractor](http://www.protractortest.org)
npm run lint                  | 代码规范检查
npm run translations:extract  | Extract strings from code and templates to `src/app/translations/template.json`
npm run docs                  | Display project documentation

When building the application, you can specify the target environment using the additional flag `--env <name>` (do not
forget to prepend `--` to pass arguments to npm scripts).

The default build environment is `prod`.

## Development server

在开发环境运行 `npm start` 命令，导航到 `http://localhost:9200/`。当你改变源代码并保存后，浏览器将自动加载更新。

使用 `Ctrl+C` 键退出运行环境。

注意，可能由于缓存等原因，你的更改不能更新到浏览器中，请先退出Angular运行环境，重新启动可解决此问题。

You should not use `ng serve` directly, as it does not use the backend proxy configuration by default.

## Code scaffolding

运行 `npm run generate -- component <name>` 命令生成一个新的组件（Component）。你也可以使用
`npm run generate -- directive|pipe|service|class|module`。

假如你使用 `npm install -g @angular/cli` 安装了 [angular-cli](https://github.com/angular/angular-cli)，你可以直接地使用 [ng generate](https://github.com/angular/angular-cli/wiki/generate) 或者 `ng g` 命令。

命令                           | 说明
------------------------------|---------------------------------------------------------------------------------------
ng g module [name]              | 生成 module
ng g component [name]           | 生成 component
ng g directive [name]           | 生成 directive
ng g pipe [name]                | 生成 pipe
ng g service [name]             | 生成 service
ng g class [name]               | 生成 class
ng g enum [name]                | 生成 enum
ng g interface [name]           | 生成 interface

# NPM 包管理

使用 [NPM](https://www.npmjs.com/) 管理依赖的包, 可以在 [www.npmjs.com](https://www.npmjs.com/) 上查找更多的包。查看[这里](https://docs.npmjs.com/)关于 NPM 包更多的使用帮助。

命令                                   | 说明
--------------------------------------|--------------------------------------------------------------------------------------
npm install [package_name]@[version]  | 安装包到本地，如 `npm install sax@0.1.1`, `npm install sax`, `npm install sax@latest`
npm install [package_name] --save     | 安装包到本地，同时写入 package.json 文件中，如 `npm install sax@0.1.1 --save`
npm install [package_name] --dev      | 只作为开发时使用安装包到本地
npm install                           | 安装 package.json 文件中所有依赖的包到本地
npm update [package_name]             | 更新包
npm update                            | 更新 package.json 文件中所有依赖的包

# [Kudu](https://github.com/projectkudu/kudu) 自动部署

## 准备

1. 在 Kudu 中创建 Application
2. 打开 Application -> Configuration 页签，在 Git Branch 中输入 stage （测试环境） 或者 live (生产环境)
3. 在 Add custom property 区域，输入 property name = `PROJECT` & property value = `./dist`，单击 `Add property` 按钮，将其添加到 Custom properties 中

## 配置 git

1. 打开 SourceTree
2. 将 Kudu 的 git 路径添加 git 的远程路径中

## 发布

1. 打开 SourceTree
2. 确认全部更改已提交到 git
3. 使用 VS Code 打开项目
4. 使用 Ctrl+` 快捷键打开命令行
5. 执行 `npm run stage` 发布到测试环境
6. 执行 `npm run live` 发布到生产环境

# 自定义发布命令

1. 打开 package.json 文件
2. 定位到 `scripts\stage`："stage": "npm run lint && git checkout stage && git merge master --no-edit --no-ff && npm run build:stage && git add . && git commit -m \"release stage\" && git push && git checkout master"
3. 这是一个组合命令，命令分别为：

命令                  | 说明
---------------------|--------------------------------
npm run lint         | 检查代码规范
git checkout stage    | 检出 stage 分支
git merge master --no-edit --no-ff  | 将 master 分支合并到 stage 分支中
npm run build:stage   | 以 stage 方式编译项目
git add .             | 将更改内容添加到索引
git commit -m \"release stage\"   | 提交更改，注释为 "release stage"
git push                          | 推送到远程服务器
git checkout master"              | 切换回 master 分支

4. 根据需要修改或添加新命令

# 这个模板包含什么？

应用程序模板使用了 [HTML5](http://whatwg.org/html), [TypeScript](http://www.typescriptlang.org) 和
[Sass](http://sass-lang.com)，多语言文件使用了标准的 [JSON](http://www.json.org) 格式。

#### Tools

开发，编译和质量管理全部基于 [angular-cli](https://github.com/angular/angular-cli) 和
[NPM scripts](https://docs.npmjs.com/misc/scripts)，包含：

- 使用 [Webpack](https://webpack.github.io) 优化编译和打包HTML等
- 使用 [Development server](https://webpack.github.io/docs/webpack-dev-server.html) 作为开发服务器
- 使用 [autoprefixer](https://github.com/postcss/autoprefixer) 和
  [browserslist](https://github.com/ai/browserslist) 解决 CSS 兼容多浏览器
- Asset revisioning for [better cache management](https://webpack.github.io/docs/long-term-caching.html)
- 使用 [Jasmine](http://jasmine.github.io) 和 [Karma](https://karma-runner.github.io) 进行单元测试
- End-to-end tests using [Protractor](https://github.com/angular/protractor)
- 静态代码分析： [TSLint](https://github.com/palantir/tslint), [Codelyzer](https://github.com/mgechev/codelyzer),
  [Stylelint](http://stylelint.io) and [HTMLHint](http://htmlhint.com/)
- Local knowledgebase server using [Hads](https://github.com/sinedied/hads)

#### Libraries

- [Angular 4](https://angular.io)
- [Bootstrap 4](https://v4-alpha.getbootstrap.com)
- [Font Awesome](http://fontawesome.io)
- [RxJS](http://reactivex.io/rxjs)
- [ng-bootsrap](https://ng-bootstrap.github.io/)
- [ngx-translate](https://github.com/ngx-translate/core)
- [Lodash](https://lodash.com)

#### Coding guides

- [Angular](docs/coding-guides/angular.md)
- [TypeScript](docs/coding-guides/typescript.md)
- [Sass](docs/coding-guides/sass.md)
- [HTML](docs/coding-guides/html.md)
- [Unit tests](docs/coding-guides/unit-tests.md)
- [End-to-end tests](docs/coding-guides/e2e-tests.md)

#### Other documentation

- [I18n guide](docs/i18n.md)
- [Working behind a corporate proxy](docs/corporate-proxy.md)
- [Updating dependencies and tools](docs/updating.md)
- [Using a backend proxy for development](docs/backend-proxy.md)
- [Browser routing](docs/routing.md)
