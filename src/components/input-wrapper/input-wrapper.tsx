  import { Component, Element, Prop } from '@stencil/core';

  @Component({
    tag: 'as-input-wrapper',
    styleUrl: 'input-wrapper.css',
    shadow: false,
  })
  export class InputWrapper {
    @Element() public el: HTMLElement;

    @Prop() public label: string;
    @Prop() public hint: string;
    @Prop() public error: string;

    public hostData() {
      const inputEl: HTMLInputElement | HTMLTextAreaElement = this.el.querySelector('input') || this.el.querySelector('textarea');

      return {
        class: {
          'as-input-wrapper': true,
          'as-input-wrapper--has-error': this.error,
          'as-input-wrapper--disabled': inputEl ? inputEl.disabled : false,
          'as-input-wrapper--required': inputEl ? inputEl.required : false,
        }
      };
    }

    public render() {
      const labelEl = this.label ? (<div class="as-input-wrapper__label">{ this.label }</div>) : null;
      const inputEl = <div class="as-input-wrapper__input"><slot /></div>
      const hintEl = this.hint ? (<div class="as-input-wrapper__hint">{ this.hint }</div>) : null;
      const errorEl = this.error ? (<div class="as-input-wrapper__error">{ this.error }</div>) : null;

      return [ labelEl, inputEl, hintEl, errorEl ];
    }
  }
