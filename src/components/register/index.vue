<template>
    <div class="boxBody">
        <img src="../../../static/12.png" class="logo" alt="" />
        <!--    <div class="logo">牛牛电竞</div>-->
        <div class="line" style="margin-top: 30px">
            <div class="inputBox">
                <!-- <div class="icon">
          <img :src="require('../../assets/img/phone.png')" />
        </div> -->
                <input
                    placeholder="填写登录手机号"
                    class="input-style"
                    type="text"
                    v-model="form.login_name"
                />
            </div>
        </div>
        <div class="line">
            <div class="inputBox">
                <!-- <div class="icon">
          <img :src="require('../../assets/img/code.png')" />
        </div> -->
                <input
                    placeholder="填写验证码"
                    class="input-style"
                    type="text"
                    v-model="form.code"
                />
                <div @click="getCode()" class="append">{{ codeWords }}</div>
            </div>
        </div>

        <div class="line">
            <div class="inputBox">
                <!-- <div class="icon">
          <img :src="require('../../assets/img/pass.png')" />
        </div> -->
                <input
                    placeholder="填写登录密码"
                    class="input-style"
                    type="password"
                    v-model="form.password"
                />
            </div>
        </div>
        <div class="line">
            <div class="inputBox">
                <!-- <div class="icon">
          <img :src="require('../../assets/img/pass.png')" />
        </div> -->
                <input
                    placeholder="确认登录密码"
                    class="input-style"
                    type="password"
                    v-model="form.re_password"
                />
            </div>
        </div>
        <div class="line">
            <div class="inputBox">
                <!-- <div class="icon">
          <img :src="require('../../assets/img/payPass.png')" />
        </div> -->
                <input
                    placeholder="填写支付密码"
                    class="input-style"
                    type="password"
                    v-model="form.pay_password"
                />
            </div>
        </div>
        <div class="line">
            <div class="inputBox">
                <!-- <div class="icon">
          <img :src="require('../../assets/img/payPass.png')" />
        </div> -->
                <input
                    placeholder="确认支付密码"
                    class="input-style"
                    type="password"
                    v-model="form.re_pay_password"
                />
            </div>
        </div>
        <div class="line">
            <div class="inputBox">
                <!-- <div class="icon">
          <img :src="require('../../assets/img/invite.png')" />
        </div> -->
                <input
                    placeholder="请填写邀请码"
                    class="input-style"
                    style="margin: 0 0 40px 0"
                    type="text"
                    v-model="form.invite_code"
                />
            </div>
        </div>
        <van-button
            @click="doRegister"
            loading-text="注册中..."
            class="loginBtn"
            type="info"
        >
            注 册
        </van-button>
        <!--
        <div style="height:10px"></div>  
    <van-button
      @click="appDown"
      class="loginBtnDown"
      type="info"
    >
      下载APP
    </van-button>
      -->

        <div class="register">
            <div @click="login" class="left">
                已有账号？ <span style="color: #ff6363">去登录</span>
            </div>
            <!-- <div @click="appDown" class="right">下载APP</div> -->
        </div>
    </div>
</template>

<script>
import { register, registerCode, downLoad } from "../../../http/api";
export default {
    name: "register",
    props: ["login_way", "login_loading"],
    data() {
        return {
            form: {
                login_name: "",
                password: "",
                re_password: "",
                invite_code: "",
                code: "",
                pay_password: "",
                re_pay_password: "",
            },
            //验证码
            codeWords: "获取验证码",
            code: 60,
            timer: null,
            codeLock: false,
            url: "",
        };
    },
    mounted() {
        if (this.$route.query.p) {
            this.form.invite_code = this.$route.query.p;
        }
        $(".boxBody").height(document.documentElement.clientHeight + "px");
        if (this.$route.query.c) {
            this.form.channel = this.$route.query.c;
        }
        this.downLoadFn();
    },
    methods: {
        //获取下载地址
        downLoadFn() {
            downLoad().then((res) => {
                if (res.status == 0) {
                    this.url = res.data.downloadUrl;
                }
            });
        },
        appDown() {
            // this.url = 'https://www.weibo.com'
            console.log(this.url);
            window.location.href = this.url;
            // window.open(this.url)
        },
        //获取验证码
        getCode() {
            let _this = this;
            if (this.form.login_name == "") {
                this.$notify({ type: "warning", message: "请填写手机号" });
                return false;
            }
            if (!/^1[3456789]\d{9}$/.test(this.form.login_name)) {
                this.$notify({ type: "warning", message: "手机号格式错误" });
                return false;
            }
            if (this.codeLock == true && this.codeWords != "获取验证码") {
                return false;
            }
            this.codeLock = true;
            registerCode({ login_name: this.form.login_name }).then((res) => {
                console.log(res);
                if (res.status == 0) {
                    _this.timer = setInterval(() => {
                        _this.code = _this.code - 1;
                        _this.codeWords = _this.code + "s";
                        if (_this.code == 0) {
                            _this.codeWords = "获取验证码";
                            clearInterval(_this.timer);
                            _this.code = 60;
                            _this.codeLock = true;
                        }
                    }, 1000);
                    this.$notify({ type: "success", message: res.message });
                } else {
                    this.$notify({ type: "warning", message: res.message });
                }
            });
        },
        login() {
            this.$router.push({ path: "/login" });
        },
        doRegister() {
            let data = {
                login_name: this.form.login_name,
                password: this.form.password,
                re_password: this.form.re_password,
                invite_code: this.form.invite_code,
                code: this.form.code,
                pay_password: this.form.pay_password,
                re_pay_password: this.form.re_pay_password,
            };
            register({ ...data }).then((res) => {
                if (res.status == 0) {
                    this.$notify({ type: "success", message: res.message });
                    this.appDown();
                    return true;
                }
                this.$notify({ type: "danger", message: res.message });
            });
        },
    },
};
</script>

<style scoped lang="scss">
.register {
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    color: #fff;
    font-weight: bold;
    margin: 30px 0 0 0;
    .left {
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
    }
    .right {
        width: 40%;
        float: right;
        height: 40px;
        line-height: 40px;
        text-align: right;
    }
}
.boxBody {
    background: url("../../../static/bgNewv2.jpg");
    background-size: 100% 100%;
    position: fixed;
    width: 100%;
    color: #2b2b2b;
    /*font-family: 'Cabin', sans-serif;*/
    font-family: "Lato", sans-serif;
    font-size: 14px;
    line-height: 16px;
    padding: 0 5%;
    width: 90%;
    overflow-y: scroll;
}
.logo {
    width: 35%;
    display: block;
    margin: 30px auto;
}
.inputBox {
    position: relative;
    .icon {
        position: absolute;
        top: 14px;
        left: 15px;
        img {
            width: 17px;
        }
    }
    .append {
        position: absolute;
        top: 15px;
        right: 15px;
        color: #ebff00;
        font-size: 14px;
    }
    .input-style {
        width: 98%;
        height: 45px;
        padding-left: 2%;
        color: #cecece;
        border: none;
        font-size: 14px;
        margin-bottom: 5px;
        float: right;
        border-bottom: 1px solid #eaedf5;
        background: none;
    }
    .input-style::-webkit-input-placeholder {
        /* placeholder颜色  */
        color: #90a5ba;
        /* placeholder字体大小  */
        font-size: 14px;
        /* placeholder位置  */
    }
}

.loginBtn {
    width: 100%;
    display: block;
    border-radius: 5px;
    background-color: #0056ed;
    border: none;
}
.loginBtnDown {
    width: 100%;
    display: block;
    margin: 0 auto;
    border-radius: 5px;
    color: #fff;
    background: none;
    border: 1px solid #fff;
}

// input:focus {
//     outline: none;
//     border-color: transparent;
//     box-shadow: 0 0 5px rgba(207, 220, 0, 0);
//     border-radius: 45px;
// }
input::-webkit-input-placeholder {
    /* placeholder颜色 */
    color: #aaa;
    /* placeholder字体大小 */
    font-size: 12px;
}

.register-btn-box {
    margin-top: 30px;
    .register-btn {
        background: #ff8b1a;
        border-radius: 50px;
        width: 100%;
        color: white;
        height: 100%;
    }
}
.reg-footer {
    margin-top: 30px;
    font-size: 12px;
    color: white;
    p {
        text-align: center;
        line-height: 20px;
    }
}
</style>
