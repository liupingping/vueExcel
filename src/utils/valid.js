import AsyncValidator from 'async-validator';

export default {
  data() {
    return {
      baseRules: {
      },
      errorText: {},
    };
  },
  methods: {
    /** **
     * 获取表单所用的规则
     */
    getRules(form, rules) {
      const temp = {};
      for (const index in form) {
        rules[index] && (temp[index] = rules[index]);
      }
      return temp;
    },
    /** **
     * 验证单个表单
     */
    validationField(field, value, rules = this.baseRules) {
      return new Promise((resolve) => {
        let valid = true;
        const form = {};
        form[field] = value;
        const validator = new AsyncValidator(this.getRules(form, rules));
        validator.validate(form, (errors) => {
          if (errors) {
            valid = false;
            for (let i = 0; i < errors.length; i++) {
              this.errorText[errors[i].field] = errors[i].message;
            }
          } else {
            delete this.errorText[field];
          }
          resolve(valid);
        });
      });
    },
    /** *
     * 验证表单
     */
    validation(form, rules = this.baseRules) {
      return new Promise((resolve) => {
        let valid = true;
        const validator = new AsyncValidator(this.getRules(form, rules));
        validator.validate(form, (errors) => {
          this.errorText = {};
          if (errors) {
            valid = false;
            for (let i = 0; i < errors.length; i++) {
              this.errorText[errors[i].field] = errors[i].message;
            }
          }
          resolve(valid);
        });
      });
    },
    toastError() {
      for (const index in this.errorText) {
        this.$toast(this.errorText[index]);
        break;
      }
    },
  },
};
