# uni-valid



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type     |
| -------- | --------- | ----------- | -------- |
| `config` | --        |             | `any`    |
| `key`    | `key`     |             | `string` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*


```
let mandatory = new ValidationRule(ValidationType.MANDATORY, ValidationMessages.MANDATORY);
let string = new ValidationRule(ValidationType.STRING, ValidationMessages.STRING);
string.meta[MetadataKeys.MIN_LENGTH] = 10;
string.meta[MetadataKeys.MAX_LENGTH] = 100;
let rules = [mandatory, string];
```
