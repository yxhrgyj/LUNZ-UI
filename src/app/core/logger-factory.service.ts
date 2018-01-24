import { Injectable } from '@angular/core';

import { Logger } from './logger.service';
import { Dialogs } from './dialogs.service';

@Injectable()
export class LoggerFactory {

  constructor(private dialogs: Dialogs) { }

  getLogger(source?: string): Logger {
    return new Logger(this.dialogs, source);
  }

}
