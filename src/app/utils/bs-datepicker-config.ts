import { BsDatepickerConfig } from 'ngx-bootstrap';
import { defineLocale } from 'ngx-bootstrap/bs-moment';
import { zhCn } from 'ngx-bootstrap/locale';

defineLocale('zh-CN', zhCn);

import { environment } from '../../environments/environment';

export function createBsDatepickerConfigProvider() {
    return {
        provide: BsDatepickerConfig,
        useFactory: createDatepickerConfig
    };
}

export function createDatepickerConfig() {
    const config: BsDatepickerConfig = new BsDatepickerConfig();

    config.locale = environment.localeId;
    config.containerClass = 'theme-blue';

    return config;
}
