import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[app-ladda], [ladda]'
})
export class LaddaDirective {

  @Input('ladda')
  set loading(val: boolean) {
    if (val !== this._loading) {
      this._loading = val;
      this.updateLadda(this._loading);
    }
  }
  get loading(): boolean {
    return this._loading;
  }

  @Input()
  set settings(val: Array<string>) {
    this.settingsChanged(val);
  }

  private _element: HTMLElement;
  private _loading = false;
  private _settings: Array<string>;

  constructor(private elementRef: ElementRef) {
    this._element = this.elementRef.nativeElement;
    this.settingsChanged();
  }

  private updateLadda(loading: boolean): void {
    if (this.elementRef) {
      if (loading) {
        this._element.setAttribute('disabled', 'disabled');

        for (const c of this._settings) {
          this._element.classList.add(c);
        }
      } else {
        this._element.removeAttribute('disabled');

        for (const c of this._settings) {
          this._element.classList.remove(c);
        }
      }
    }
  }

  private settingsChanged(val?: Array<string>): void {
    this._settings = [];
    this._settings.push('m-loader');
    if (val === undefined || val.length === 0) {
      this._settings.push('m-loader--light');
      this._settings.push('m-loader--right');
    } else {
      for (const v of val) {
        this._settings.push(v);
      }
    }
  }
}
