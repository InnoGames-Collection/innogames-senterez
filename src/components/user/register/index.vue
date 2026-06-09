<script>
import UserService from '../../../services/user'
import { setUser } from '../../../vuex/actions'
export default {
  template: require('./template.html'),
  data () {
    var _user = {
      age: 26,
      sexo: 'mascul',
      password: '',
      passwordRepit: '',
      firstName: '',
      lastName: '',
      name: '',
      username: ''
    }
    return {
      editPassword: true,
      formValid: false,
      user: UserService.getUser() || _user,
      error: '',
      formValidMsg: {
        password: {
          success: 'Looks good',
          error: 'Too short'
        },
        passwordRepit: {
          success: 'Looks good',
          error: 'Passwords do not match'
        },
        user: {
          success: 'Looks good',
          error: 'Must be 4–10 characters'
        }
      }
    }
  },
  vuex: {
    actions: {
      setUser
    }
  },
  methods: {
    validPassword () {
      // algoritmo de validacion de passwords
      if (!this.editPassword) {
        return true
      }
      if (this.user.password.length < 5) {
        this.formValidMsg.errorMsgPasswrd = 'Password is too short'
        return false
      }
      return true
    },
    repitPasswordValidate () {
      if (!this.editPassword) {
        return true
      }
      if (this.user.password !== this.user.passwordRepit) {
        return false
      }
      return true
    },
    validUser () {
      if (this.user.username.length < 4 || this.user.username.length > 10) {
        return false
      }
      return true
    },
    registerUser () {
      if (!this.validUser() || !this.repitPasswordValidate() || !this.validPassword()) {
        return
      }
      this.error = this.$t('register.errors.consultando')
      UserService.signin(this, this.user).then(function (response) {
        console.log(response)
        if (this.user._id) {
          window.location.reload()
        } else {
          this.$route.router.go(this.user._id ? 'user/' + this.user.username : '/')
        }
      }, function (response) {
        for (var i in response.data.errors) {
          var msg = response.data.errors[i].message
          var translated = this.$t('login.errors.' + msg)
          this.error = translated.indexOf('login.errors.') === 0 ? msg : translated
        }
      })
    }
  },
  created () {
    this.user.password = ''
  }
}
</script>