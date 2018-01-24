webpackJsonp(["common"],{

/***/ "../../../../../src/app/utils/bs-datepicker-config.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export createBsDatepickerConfigProvider */
/* harmony export (immutable) */ __webpack_exports__["a"] = createDatepickerConfig;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ngx_bootstrap__ = __webpack_require__("../../../../ngx-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_bs_moment__ = __webpack_require__("../../../../ngx-bootstrap/bs-moment/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_locale__ = __webpack_require__("../../../../ngx-bootstrap/locale.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");



Object(__WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_bs_moment__["a" /* defineLocale */])('zh-CN', __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_locale__["a" /* zhCn */]);

function createBsDatepickerConfigProvider() {
    return {
        provide: __WEBPACK_IMPORTED_MODULE_0_ngx_bootstrap__["a" /* BsDatepickerConfig */],
        useFactory: createDatepickerConfig
    };
}
function createDatepickerConfig() {
    var config = new __WEBPACK_IMPORTED_MODULE_0_ngx_bootstrap__["a" /* BsDatepickerConfig */]();
    config.locale = __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].localeId;
    config.containerClass = 'theme-blue';
    return config;
}
//# sourceMappingURL=bs-datepicker-config.js.map

/***/ })

});
//# sourceMappingURL=common.140451a88c0fd65de613.chunk.js.map