import { Component, Element, Prop, Watch, State } from '@stencil/core';
import { ValidationHelper,  ValidationType } from './uni-valid.models';

  @Component({
    tag: 'uni-valid',
    styleUrl: 'uni-valid.css',
    shadow: false,
  })
  export class UniValid {@Element() public el: HTMLElement;

    @Prop() 
    public key: string;

    @Prop() 
    public config: any;
    
    @State() 
    public showHint: boolean;
    
    @State() 
    public value: any;

    private jsonConfig;
    @Watch('config')
    configDidChangeHandler(newValue) {
       console.log('👍🏻 value change detected in watch ~~~~~~ config');
       this.jsonConfig = JSON.parse(newValue);
    }

    componentWillLoad() {
      this.jsonConfig = JSON.parse(this.config);
      const inputEl: HTMLInputElement | HTMLTextAreaElement = this.el.querySelector('input') || this.el.querySelector('textarea');
              inputEl.addEventListener('keyup', this.listen(), false)
              inputEl.addEventListener('change', this.listen(), false)
              inputEl.addEventListener('mouseover', this.listen(), false)
              inputEl.addEventListener('mouseleave', this.listen(), false)

    }

    public hostData() {
        const inputEl: HTMLInputElement | HTMLTextAreaElement = this.el.querySelector('input') || this.el.querySelector('textarea');
        return {
          class: {
            'uni-valid': true,
            'uni-valid--disabled': inputEl ? inputEl.disabled : false,
          }
        };
    }
    
  private listen(): EventListenerOrEventListenerObject {
    return (event) => {
      this.value = event.currentTarget['value'];
      this.jsonConfig.name.forEach((rule) => {
        switch (rule.type) {
          case ValidationType.MANDATORY:
              rule = ValidationHelper.checkMandatory(rule, this.value);
          case ValidationType.STRING:
              rule =  ValidationHelper.checkString(rule , this.value);                    
          
      }

      })
      this.config = JSON.stringify(this.jsonConfig);
    };
  }

  render() {
      console.log('in   render ☠️ ️ ');
      const container = <div class="uni-valid__input"
                              onMouseEnter={() => this.showHint = true}
                              onMouseLeave={() => this.showHint = false}>
                              <slot />
                        </div>

      const attachment = (this.showHint) ? 
                          (
                              <div class="uni-valid__meta">
                                { 
                                    this.jsonConfig.name.map(el => 
                                    <div class={ (el.valid)  ? 'valid ' : 'invalid' }>{el.message}</div>) 
                                }
                              </div>
                          ) : null;
      return [container, attachment];
  }
}
