import Vue from 'vue'
import {login} from '../utils/authentication'

export default Vue.extend({
  data: () => ({
    login: {
      email: '',
      password: ''
    }
  }),
  methods: {
    async loguin() {
      await login(this.login)
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
            title: 'Your account was registered!',
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
            title: 'Error processing the record!',
            showConfirmButton: false,
            timer: 2500
          });
        }
      })
    }
  }
})