import Vue from 'vue'
import {register} from '../../utils/authentication'

export default Vue.extend({
  data: () => ({
    status: false,
    register: {
      'names':'',
      'nickname':'',
      'email': '',
      'password': '',
      'confirm_password':'',
    }
  }),
  methods: {
    async signUp() {
      
      await register(this.register)
      .then(response => {
        if(response.status ===200){
          this.status = true
          return response.json()
        }
      })
      .then((data) => {
        console.log('esta es la data',data)
        if(this.status){
          this.$swal({
            position: 'center',
            icon: 'success',
            title: 'Welcome!',
            showConfirmButton: false,
            timer: 2500
          });
          localStorage.setItem('access_token', data.access_token)
          this.$router.push('dashboard')
        }else {
          localStorage.removeItem('access_token')
          this.$swal({
            position: 'center',
            icon: 'error',
            title: 'Error processing the login!',
            showConfirmButton: false,
            timer: 2500
          });
        }
      })
    }
    
  }
})