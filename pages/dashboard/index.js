
import Vue from 'vue'
import { filmAll, filmCreate, filmID, filmUpdate, filmDelete} from '../../utils/operation'

export default Vue.extend({
  middleware: 'authenticated',
  data: () => ({
    movieAll: [],
    modalShow: false,
    min: '1900',
    max: '',
    create: {
      id: null,
      title: '',
      sipnosis: '',
      year: ''
    }, 
    state: {
      titleState: null,
      yearState: null
    }
  }),
  mounted(){
    var fecha = new Date();
    this.max = fecha.getFullYear()
    this.films()
  },
  methods: {
    
    signOff() {
      localStorage.removeItem('access_token')
      this.$router.push('/')
    },
    async filmId(id) {
      await filmID(id)
      .then(response => {
        if(response.status ===200){
          this.status = true
          return response.json()
        }
      })
      .then((data) => {
        this.create.id = data.id
        this.create.title = data.title
        this.create.sipnosis = data.sipnosis
        this.create.year = data.year
      })
    },

    async films() {
      await filmAll()
      .then(response => {
        if(response.status ===200){
          this.status = true
          return response.json()
        }
      })
      .then((data) => {
        if(this.status){
          this.movieAll = data;
        }else {
          this.$swal({
            position: 'center',
            icon: 'error',
            title: 'Error processing the consult!',
            showConfirmButton: false,
            timer: 2500
          });
        }
      })
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity()
      this.state.titleState = valid
      this.state.yearState = valid
      return valid
    },
    resetModal() {
      this.create.title = ''
      this.create.sipnosis = ''
      this.create.year = ''
      this.state.titleState = null
      this.state.yearState = null
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.createMovie()
    },
    handleUpdate(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.createUpdate()
    },
    handleDelete(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.deleteMovie()
    },
    async createMovie() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }
      // Push the object create to submitted data
      await filmCreate(this.create)
      .then(response => {
        if(response.status ===200){
          this.status = true
          return response.json()
        }
      })
      .then((data) => {
        if(this.status){
          this.films()
          this.$swal({
            position: 'center',
            icon: 'success',
            title: 'Register complete!',
            showConfirmButton: false,
            timer: 2500
          });
        }else {
          this.$swal({
            position: 'center',
            icon: 'error',
            title: 'Error processing the consult!',
            showConfirmButton: false,
            timer: 2500
          });
        }
      })
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('modal-prevent-closing')
      })
    },
    async createUpdate() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }
      // Push the object create to submitted data
      await filmUpdate(this.create)
      .then(response => {
        if(response.status ===200){
          this.status = true
          return response.json()
        }
      })
      .then((data) => {
        if(this.status){
          this.films()
          this.$swal({
            position: 'center',
            icon: 'success',
            title: 'Update complete!',
            showConfirmButton: false,
            timer: 2500
          });
          this.$nextTick(() => {
            this.$bvModal.hide('modal-edit')
          })
        }else {
          this.$swal({
            position: 'center',
            icon: 'error',
            title: 'Error processing update!',
            showConfirmButton: false,
            timer: 2500
          });
        }
      })
      // Hide the modal manually
      
    },
    async deleteMovie() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }
      // Push the object create to submitted data
      await filmDelete(this.create.id)
      .then(response => {
        if(response.status ===200){
          this.status = true
          return response.json()
        }
      })
      .then((data) => {
        if(this.status){
          this.films()
          this.$swal({
            position: 'center',
            icon: 'success',
            title: 'Delete complete!',
            showConfirmButton: false,
            timer: 2500
          });
          this.$nextTick(() => {
            this.$bvModal.hide('modal-delete')
          })
        }else {
          this.$swal({
            position: 'center',
            icon: 'error',
            title: 'Error processing delete!',
            showConfirmButton: false,
            timer: 2500
          });
        }
      })
    }
  }
})