  import { Component, Element, Prop, Watch, State } from '@stencil/core';

  @Component({
    tag: 'uni-valid',
    styleUrl: 'uni-valid.css',
    shadow: false,
  })
  export class UniValid {
    @Element() public el: HTMLElement;
    
    @Prop() 
    public config: string;
    
    @State() 
    public hint: boolean;
    @Watch('hint') 
    public showHintHandler(newValue: boolean, oldValue: boolean) {
      console.log('👍🏻 in Watch for hint', oldValue, newValue);
    }

    @State() 
    public value: any;
    @Watch('value') 
    public valueChangeHandler(newValue: boolean, oldValue: boolean) {
      console.log('👍🏻 in Watch for val', oldValue, newValue);
    }


    public hostData() {
      const inputEl: HTMLInputElement | HTMLTextAreaElement = this.el.querySelector('input') || this.el.querySelector('textarea');
      inputEl.addEventListener('change', (event) => {
        this.value = event.currentTarget['value'];
      }, false)

      return {
        class: {
          'uni-valid': true,
          'uni-valid--disabled': inputEl ? inputEl.disabled : false,
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
      const inputEl = <div class="uni-valid__input"
                           onMouseEnter={() => this.onMouseEnter(event)}
                           onMouseLeave={() => this.onMouseLeave(event)}><slot />
                      </div>
      // const attachment =  (<div class="uni-valid__meta">{ this.config }</div>);
      const attachment = (this.hint) ? (<div class="uni-valid__meta">{ this.config }</div>) : null;

      return [ inputEl, attachment];
    }
}
