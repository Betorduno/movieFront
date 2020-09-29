import Vue from 'vue'
import { extend, localize, ValidationObserver, ValidationProvider } from 'vee-validate'

import { alpha_num, email, max, min, numeric, required, confirmed, alpha } from 'vee-validate/dist/rules'

extend('required', required)
extend('min', min)
extend('max', max)
extend('email', email)
extend('alpha', alpha)
extend('alpha_num', alpha_num)
extend('numeric', numeric)
extend('confirmed', confirmed)
extend('verify_password', {
  message: field =>
    'The password must be alphanumeric. Ejemplo Bxp01AAA',
  validate: (value) => {
    const strongRegex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})'
    )
    return strongRegex.test(value)
  }
})
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
