<template>
    <div class="customer">
        <div class="topBar">
            客服系统
            <img @click="reduct('/index')" src="../../assets/img/back-line.png" class="back" alt="">
        </div>
        <div style="height:4rem;"></div> 
        <img :src="data.image" class="erCode" alt="">
        <div class="line">
            <img src="../../assets/img/wx.png" class="sign" alt="">
            微信 {{data.wechat}}
        </div>
        <div class="line">
            <img src="../../assets/img/qq.png" class="sign" alt="">
            QQ号 {{data.qq}}
        </div>
    </div>
</template>

<script>
  import {customer} from '../../../http/api'
    export default {
        name: "customer",
        data(){
            return {
               data:{}
            }
        },
        mounted(){
           this.customerFn()
        },
        methods:{
            reduct(url){
                this.$router.push({path:url})
            },
            customerFn(){
                customer().then(res =>{
                    if(res.status == 0){
                        this.data = res.data
                    }
                })
            },
        }
    }
</script>

<style scoped lang="scss">
    .topBar{
        width:100%;
        height:4rem;
        text-align: center;
        line-height: 4rem;
        color:#fff;
        font-size:1.35rem;
        position: fixed;
        top:0;
        left:0;
        background: #052D54;
        .back{
            position: absolute;
            width:1.5rem;
            height:1.5rem;
            left:3%;
            top:1.25rem ;
        }
    }
    .erCode{
        display: block;
        width:40%;
        margin:4rem auto 2rem auto;
    }
    .line{
        width:100%;
        height:3rem;
        line-height: 3rem;
        font-size:1.2rem;
        color:#141414;
        text-align: center;
        .sign{
            display: inline-block;
            width:1.4rem;
            height:1.4rem;
            vertical-align: middle;
        }
    }

   
</style>
