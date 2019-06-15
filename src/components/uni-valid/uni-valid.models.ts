/**
* -------------------------------------------------- *
* Single validation rule *
* -------------------------------------------------- *
*/

export class ValidationRule {
    
    message: string;
    type: string;
    valid: boolean;
    meta: any;

    constructor(t,m) {
        this.type = t;
        this.message = m;

        // initialization done here
        this.valid = false;        
        this.meta = {};
    }

    addMessage(message) {
        this.message = message;
        return this;
    }
}

export class FormSchema {
    [key: string]: ValidationRule[]; 
}

export class ValidationType {
    static MANDATORY = "MANDATORY";
    static NUMBER = "NUMBER"; //meta for min/mas is requied
    static STRING = "STRING";  //meta for min/mas is requied 
}
export class ValidationMessages {
    static MANDATORY = "Requied field";
    static NUMBER = "Not a valid number between {~1~} and {~2~}"; //meta for min/mas is requied
    static STRING = "Not a valid string";  //meta for regex is requied 
}

export class MetadataKeys {
    static MIN = "MIN";
    static MAX = "MAX"; 
    static MIN_LENGTH = "MIN_LENGTH";  
    static MAX_LENGTH = "MAX_LENGTH"; 
}

export class ValidationHelper {

    static schema: FormSchema;
    static getInstance(formSchema: FormSchema) {
        ValidationHelper.schema = formSchema;
        return this;
    }

    static validate(key: string, val: any): FormSchema {
        this.schema.key.forEach((rule: ValidationRule) => {

            switch (rule.type) {
                case ValidationType.MANDATORY:
                    rule = ValidationHelper.checkMandatory(rule, val);
                case ValidationType.STRING:
                    rule =  ValidationHelper.checkString(rule , val);                    
                case ValidationType.NUMBER:
                    rule =  ValidationHelper.checkRegExp(rule , val);
            }
        });

        return this.schema;
    }

    static checkMandatory(rule: ValidationRule, val: any): ValidationRule{
        rule.valid  = (val && val.length > 0) ;
        return JSON.parse(JSON.stringify(rule));
    }
    static checkString(rule: ValidationRule, val: any): ValidationRule{
        rule.valid = (val && val.length >= rule.meta[MetadataKeys.MIN_LENGTH] && val.length <= rule.meta[MetadataKeys.MAX_LENGTH]);
        return JSON.parse(JSON.stringify(rule));
    }
    static checkRegExp(rule: ValidationRule, val: any): ValidationRule {
        return rule;
    }
}

// class FormTest {
//     schema = new FormSchema();
//     constructor() {
//         let mandatory = new ValidationRule(ValidationType.MANDATORY, ValidationMessages.MANDATORY);
//         let string = new ValidationRule(ValidationType.STRING, ValidationMessages.STRING);
//         string.meta[MetadataKeys.MIN_LENGTH] = 10;
//         string.meta[MetadataKeys.MAX_LENGTH] = 100;

//         let rules = [mandatory, string];
//         this.schema['Name'] = rules;
//         console.log(new FormTest());
//     }
    
// }


