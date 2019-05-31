  import { Component, Element, Prop, Watch, State } from '@stencil/core';

  @Component({
    tag: 'uni-valid',
    styleUrl: 'uni-valid.css',
    shadow: false,
  })
  export class UniValid {
    @Element() public el: HTMLElement;

    @Prop() public config: string;

    @State() public hint: boolean;

    @Watch('hint') public showHintHandler(newValue: boolean, oldValue: boolean) {
      console.log('👍🏻 in Watch', oldValue, newValue);
    }
    

    public hostData() {
      const inputEl: HTMLInputElement | HTMLTextAreaElement = this.el.querySelector('input') || this.el.querySelector('textarea');

      return {
        class: {
          'as-input-wrapper': true,
          'as-input-wrapper--disabled': inputEl ? inputEl.disabled : false,
        }
      };
    }

    public onMouseEnter(e) {
      console.log('enterd', e); 
      this.hint=true;
      console.log("showhiunt: " , this.hint);

    }
    public onMouseLeave(e) {
      console.log('left', e); 
      this.hint = false;
      console.log("showhiunt: " , this.hint);
    }

    public render() {
      console.log('in   render ☠️ ️ ')
      const inputEl = <div class="as-input-wrapper__input"
                           onMouseEnter={() => this.onMouseEnter(event)}
                           onMouseLeave={() => this.onMouseLeave(event)}><slot />
                      </div>
      const hintEl = (this.hint) ? (<div class="as-input-wrapper__hint">{ this.config }</div>) : null;

      return [ inputEl, hintEl, (<div>{this.hint}</div>) ];
    }
  }
