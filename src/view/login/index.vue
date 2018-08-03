<template>
  <div class="login-container">

    <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
      <div class="title-container">
        <img src="../../assets/image/login/logo.jpg" alt="">
      </div>

      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <i class="iconfont icon-shuruxingming"></i>
        </span>
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="账号"/>
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <i class="iconfont icon-shuruxinmima"></i>
        </span>
        <el-input name="password" :type="passwordType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="密码" />
        <span class="show-pwd" @click="showPwd">
          <i class="iconfont icon-see"></i>
        </span>
      </el-form-item>

      <el-button type="primary" class="LoginBtn" :loading="loading" @click.native.prevent="handleLogin">提交</el-button>
    </el-form>

  </div>
</template>

<script>
import { isvalidUsername } from 'assets/js/common'
import SvgIcon from 'components/SvgIcon'
import { mapGetters, mapMutations } from 'vuex'

// ...mapMutations([]) 可以在组件中提交Mutaitions
// ...mapActions([]) 可以在组件中分发actions

export default {
  components: { 
    SvgIcon
    },
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码必须6位数以上'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '1111111'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      loading: false,
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          //actions 通过store.dispatch方法触发
          this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: '/' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    afterQRScan() {
    }
  },
  computed: {
    ...mapGetters({
      Lang: 'language' //可以给getter去别的名字
    })
  },
  created() {
    console.log(this.Lang)
    console.log(this.$store.state.token)  //访问状态值
  },
  destroyed() {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */
 
  $bg:#fff;
  $light_gray:#eee;
  $cursor: #fff;
  $font-color: #000;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input{
      color: $font-color;
      &::first-line {
        color: $font-color;
      }
    }
  }

  /* reset element-ui css */
  .login-container {
    background-image: url('../../assets/image/login/background_2.png'), url('../../assets/image/login/background_1.jpg');
    background-color: none;
    background-repeat: no-repeat, no-repeat;
    background-position:20% 40%, center bottom;
    background-size: 42%, cover;
    .el-input {
      display: inline-block;
      height: 47px;
      width: 75%;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $font-color !important;
        height: 47px;
        caret-color: #000;
        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $font-color !important;
        }
      }
    }
    .el-form-item__content{
      line-height: 0;
      border-bottom: 1px solid $light_gray;
      background: $cursor;
      margin-bottom: 10px;
    }
    .el-form-item {
      border-radius: 5px;
      color: $font-color;
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#fff;
$dark_gray:#00a0e9;
$light_gray:#000;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  // text-align: center;
  .login-form {
    position: absolute;
    top: 22%;
    right: 20%;
    width: 320px;
    padding: 35px 35px 15px 35px;
    background:#fff;
    border-radius: 6px;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title-container {
    position: relative;
    padding:10px 20px;
    text-align: center;
    margin-bottom: 25px;
    img{
      width: auto;
      height:auto;
      max-width:100%;
      max-height:100%;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 26px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
  .LoginBtn{
    position: relative;
    left: 50%;
    margin-left: -30%;
    margin-top: 20px;
    margin-bottom: 30px;
    width:60%;
    height:50px;
    border-radius: 40px;
    text-align: center;
    background: $dark_gray;
  }
}
</style>
