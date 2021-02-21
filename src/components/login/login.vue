<template>
    <div class="login">
       <img src="../../../static/12.png" class="logo" alt="">
        <div style="margin-top: 30px" class="inputBox">
            <input
            placeholder="请输入手机号"
            class="input-style"
            type="text"
            v-model="form.login_name"
            />
        </div>
        <div class="inputBox">
            <input
            placeholder="登录密码"
            class="input-style"
            type="password"
            v-model="form.password"
            />
        </div>
        <van-button
                @click="loginFn"
                loading-text="登录中..."
                class="loginBtn"
                type="info"
            >
            登 录
        </van-button>
        <div @click='register' class="register">没有账号？ <span style="color:#FF6363;">去注册</span></div> 
    </div>
</template>

<script>
    import {login} from '../../../http/api'
    export default {
        name: "login",
        data(){
            return {
                form:{
                    login_name:'',
                    password:''
                },
                loginLoading:false
            }
        },
        mounted(){
            $('.login').height(document.documentElement.clientHeight + 'px');
           
        },
        methods:{
            register(){
                this.$router.push({path:'/register'})
            },
            loginFn(){
                let _this = this;
                if(this.form.login_name == '' || this.form.password == ''){
                    this.$notify({ type: 'danger', message: '信息不完整', duration:1000 });
                    return false
                }
                if( this.loginLoading == true){
                    return false
                }
                this.loginLoading = true
                let data = {
                    login_name:this.form.login_name,
                    password:this.form.password
                }
                login(data ).then(res =>{
                    if(res.status == 0){
                        this.$notify({ type: 'success', message: res.message, duration:1000 });
                        this.$cookies.set('accessToken',res.data.access_token);
                        this.loginLoading = false;
                        setTimeout(function(){
                            _this.$router.push({path:'/index'})
                        },700)
                    } else {
                        this.$notify({ type: 'danger', message: res.message, duration:1000 });
                        this.loginLoading = false;
                    }
                }, err=>{
                    this.$notify({ type: 'danger', message: '网络错误', duration:1000 });
                    this.loginLoading = false;
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .login{
        padding:0 5%;
        width:100%;
        background: url('../../../static/bgNewv2.jpg');
        background-size: 100% 100%;
        padding:30% 0 0 0;
        .logo{
            width:40%;
            display: block;
            margin:0 auto;
        }
        .inputBox{
            padding:0 5%;
            height:45px;
            .input-style {
                width: 98%;
                height: 45px;
                padding-left: 2%;
                color:#cecece;
                border: none;
                font-size: 14px;
                margin-bottom: 5px;
                float: right;
                border-bottom:1px solid #EAEDF5;
                background: none;
            }
        }
        .input-style::-webkit-input-placeholder {
        /* placeholder颜色  */
            color: #90A5BA;
        /* placeholder字体大小  */
            font-size: 14px;
        /* placeholder位置  */
        }
        .loginBtn {
            width: 90%;
            margin:50px auto 0 auto;
            display: block;
            border-radius: 5px;
            background-color: #0056ed;
            border: none;
        }
        .register{
            width:100%;
            height:40px;
            line-height: 40px;
            font-size:14px;
            color:#fff;
            font-weight: bold;
            position: fixed;
            left:0;
            bottom:30px;
            text-align: center;
        }
        
    }
</style>
