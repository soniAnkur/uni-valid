import { Component, Element, Prop, Watch } from '@stencil/core';

// NOTE: this is not fully implemented but was only used for testing purposes!

@Component({
  tag: 'as-input',
  styleUrl: '../input-wrapper/input-wrapper.css',
  shadow: false,
})
export class Input {
  @Element() public el: HTMLElement;

  @Prop() public label: string;
  @Prop() public hint: string;
  @Prop() public error: string;
  @Prop() public name: string = 'anonymous';
  @Prop() public value: string;

  public componentDidLoad(): void {
    this.el.classList.add('as-input-wrapper');

    const inputEl: HTMLInputElement | HTMLTextAreaElement = this.el.getElementsByTagName('input')[ 0 ] || this.el.getElementsByTagName('textarea')[ 0 ];

    if (!inputEl) {
      return;
    }

    if (inputEl.disabled) {
      this.el.classList.add('as-input-wrapper--disabled');
    }

    if (inputEl.required) {
      this.el.classList.add('as-input-wrapper--required');
    }

    this.setErrorClass();
  }

  @Watch('error')
  public setErrorClass(): void {
    if (this.error) {
      this.el.classList.add('as-input-wrapper--has-error');
    } else {
      this.el.classList.remove('as-input-wrapper--has-error');
    }
  }

  public render() {
    const labelEl = this.label ? (<div class="as-input-wrapper__label">{ this.label }</div>) : null;
    const inputEl = <div class="as-input-wrapper__input"><input name={ this.name } value={ this.value } /></div>;
    const hintEl = this.hint ? (<div class="as-input-wrapper__hint">{ this.hint }</div>) : null;
    const errorEl = this.error ? (<div class="as-input-wrapper__error">{ this.error }</div>) : null;

    return [ labelEl, inputEl, hintEl, errorEl ];
  }
}
