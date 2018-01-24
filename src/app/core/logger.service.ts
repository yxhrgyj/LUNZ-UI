import { environment } from '../../environments/environment';
import { Dialogs } from './dialogs.service';

/**
 * Simple logger system with the possibility of registering custom outputs.
 *
 * 4 different log levels are provided, with corresponding methods:
 * - debug   : for debug information
 * - info    : for informative status of the application (success, ...)
 * - warning : for non-critical errors that do not prevent normal application behavior
 * - error   : for critical errors that prevent normal application behavior
 *
 * Example usage:
 * ```
 * import { Logger } from 'app/core/logger.service';
 *
 * const log = new Logger('myFile');
 * ...
 * log.debug('something happened');
 * ```
 *
 * To disable debug and info logs in production, add this snippet to your root component:
 * ```
 * export class AppComponent implements OnInit {
 *   ngOnInit() {
 *     if (environment.production) {
 *       Logger.enableProductionMode();
 *     }
 *     ...
 *   }
 * }
 *
 * If you want to process logs through other outputs than console, you can add LogOutput functions to Logger.outputs.
 */

/**
 * The possible log levels.
 * LogLevel.Off is never emitted and only used with Logger.level property to disable logs.
 */
export enum LogLevel {
  Off = 0,
  Error,
  Warning,
  Info,
  Debug
}

/**
 * Log output handler function.
 */
export type LogOutput = (source: string, level: LogLevel, ...objects: any[]) => void;

export class Logger {

  /**
   * Current logging level.
   * Set it to LogLevel.Off to disable logs completely.
   */
  static level = LogLevel.Debug;

  /**
   * Additional log outputs.
   */
  static outputs: LogOutput[] = [];

  /**
   * Enables production mode.
   * Sets logging level to LogLevel.Warning.
   */
  static enableProductionMode() {
    Logger.level = LogLevel.Info;
  }

  constructor(private dialogs: Dialogs, private source?: string) { }

  /**
   * Logs messages or objects  with the debug level.
   * Works the same as console.log().
   */
  debug(...objects: any[]) {
    this.log(console.log, LogLevel.Debug, objects);
  }

  /**
   * Logs messages or objects  with the info level.
   * Works the same as console.log().
   */
  info(...objects: any[]) {
    this.log(console.info, LogLevel.Info, objects);
  }

  /**
   * Logs messages or objects  with the warning level.
   * Works the same as console.log().
   */
  warn(...objects: any[]) {
    this.log(console.warn, LogLevel.Warning, objects);
  }

  /**
   * Logs messages or objects  with the error level.
   * Works the same as console.log().
   */
  error(...objects: any[]) {
    this.log(console.error, LogLevel.Error, objects);
  }

  private log(func: Function, level: LogLevel, objects: any[]) {
    if (level <= Logger.level) {
      const log = this.source ? ['[' + this.source + ']'].concat(objects) : objects;
      func.apply(console, log);
      this.show(level, objects);
      Logger.outputs.forEach((output) => output.apply(output, [this.source, level].concat(objects)));
    }
  }

  private show(level: LogLevel, objects: any[]) {

    const message = this.getMessage(level, objects);

    switch (level) {
      case LogLevel.Debug:
      case LogLevel.Off:
        break;
      case LogLevel.Info:
        this.dialogs.info(message, environment.production ? null : this.source,
          { enableHtml: true, progressBar: true });
        break;
      case LogLevel.Warning:
        this.dialogs.warning(message, environment.production ? null : this.source,
          { enableHtml: true, progressBar: true });
        break;
      case LogLevel.Error:
        this.dialogs.error(message, environment.production ? null : this.source,
          { enableHtml: true, progressBar: true });
        break;
      default:
        throw new Error('NOT IMPLEMENT!');
    }
  }

  private getMessage(level: LogLevel, objects: any[]): string {
    let message = '';

    objects.forEach(obj => {
      const response = obj;
      this.getMessages(obj).forEach(item => {
        if (message === '') {
          message += item;
        } else {
          message += '<br/>' + item;
        }
      });
    });

    return message;
  }

  private getMessages(obj: any): Array<string> {
    const messages = new Array<string>();

    if (typeof (obj) === 'string') {
      messages.push(obj);
    } else if (typeof (obj) === 'object') {
      for (const prop in obj) {
        if (prop === 'modelState' || !environment.production) {
          this.getMessages(obj[prop]).forEach(item => {
            messages.push(item);
          });
        }
      }
    }

    return messages;
  }
}
