<template>
    <div class="login">
        <div class="topBox">
            <div class="topBg"></div>
            <div class="topInfoBox">
                <div class="userPhotoBox">
                    <img class="userPhoto" :src="userData.avatar" alt="">
                </div>
                <div class="infoBox">
                    <div class="phone">{{userData.login_name}}</div>
                    <div class="ID">ID：{{userData.id}}
                        <div :data-clipboard-text="userData.id" @click="copy" class="copy">复制</div>
                    </div> 
                </div> 
            </div>
        </div> 
        <div class="box">
            <img @click="reduct('/invite')" class="invite" src="../../assets/img/2.png" alt="">
            <div class="lineBox">
                <div @click="reduct('/team')" class="line">
                    <img src="../../assets/img/3.png" class="img" alt="">
                    <div class="name">我的团队</div>
                    <img src="../../assets/img/right.png" class="right" alt="">
                    <div class="num">{{userData.team_users}}人</div>
                </div>
                <div class="lineLine"></div> 
                <div @click="reduct('/customer')" class="line">
                    <img src="../../assets/img/4.png" class="img" alt="">
                    <div class="name">联系客服</div>
                    <img src="../../assets/img/right.png" class="right" alt="">
                </div>
            </div> 
            <div @click="putOff" class="putOff">退出</div> 
        </div>
    </div>
</template>

<script>
  import {userCenter} from '../../../http/api'
  import Clipboard from 'clipboard';  
    export default {
        name: "login",
        data(){
            return {
               userData:{
                   avatar:'',
                   login_name:'',id:'',
                   team_users:'',
               },
            }
        },
        mounted(){
            this.userCenterFn()
        },
        methods:{
            putOff(){
                 this.$cookies.remove('accessToken');
                 this.$router.push({path:'/login'})
            },
            copy(){
                let _this = this;
                var clipboard = new Clipboard('.copy')  ;
                clipboard.on('success', e => {  
                    this.$notify({ type: 'success', message: '复制成功', duration:1000 });
                    // 释放内存  
                    clipboard.destroy()  
                    })  
                    clipboard.on('error', e => {  
                        // 不支持复制  
                         _this.$notify({ type: 'danger', message: '复制失败', duration:1000 });
                        // 释放内存  
                        clipboard.destroy()  
                    })  
            },
            reduct(url){
                this.$router.push({path:url})
            },
            userCenterFn(){
                userCenter().then(res =>{
                    if(res.status == 0){
                        this.userData = res.data.user
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">

.topBox{
    background: url(../../assets/img/1.gif) no-repeat;
    background-size: 100% 100%;
    width:92%;
    height:5rem;
    border-bottom-left-radius: 2rem;
    border-bottom-right-radius: 2rem;
    padding:3.5rem 4% 2.5rem 4%;
    position: relative;
    .topBg{
        width:100%;
        height:11rem;
        background: rgba(0,0,0,0.4);
        position: absolute;
        left:0;
        top:0;
        border-bottom-left-radius: 2rem;
        border-bottom-right-radius: 2rem;
    }
    .topInfoBox{
        width:100%;
        height:5rem;
        position: relative;
        z-index:1;
        .userPhotoBox{
            width:5rem;
            height:5rem;
            border-radius: 50%;
            float:left;
            .userPhoto{
                width:5rem;
                height:5rem;
                border-radius: 50%;
            }
        }
        .infoBox{
            width:50%;
            height:5rem;
            float:left;
            margin:0 0 0 1rem;
            .phone{
                width:100%;
                height:3rem;
                line-height: 3.5rem;
                color:#fff;
                font-size:1.4rem;
                font-weight: bold;
            }
            .ID{
                width:100%;
                height:2rem;
                color:#8591A2;
                font-size:1.2rem;
                .copy{
                    width:3rem;
                    height:1.5rem;
                    float:right;
                    line-height: 1.5rem;
                    font-size:0.9rem;
                    text-align: center;
                    background: #FF6363;
                    color:#fff;
                }
            }
        }
    }
}
.box{
    width:92%;
    padding:2rem 4%;
    .invite{
        width:100%;
    }
    .lineBox{
        width:92%;
        padding:1rem 4%;
        border-radius: 0.6rem;
        background: #fff;
        margin:2rem 0 0 0;
        .lineLine{
            width:100%;
            height:1px;
            background: #EAEDF5;
            margin:0.7rem 0;
        }
        .line{
            width:100%;
            height:3rem;
            .img{
                display: block;
                width:2rem;
                height:2rem;
                float:left;
                margin:0.5rem 1rem 0 0;
            }
            .name{
                width:20%;
                height:3rem;
                line-height: 3rem;
                font-size:1.2rem;
                color:#141414;
                float:left;
            }
            .num{
                float:right;
                width:20%;
                height:3rem;
                line-height: 3rem;
                font-size:1.1rem;
                color:#141414;
                text-align: right;
            }
            .right{
                float:right;
                display: block;
                width:1.6rem;
                height:1.6rem;
                margin:0.7rem 0 0 0.5rem;
            }
        }
    }
    .putOff{
            width:100%;
            border-radius: 0.3rem;
            background: #FF6363;
            height:4rem;
            line-height: 4rem;
            color:#fff;
            text-align: center;
            margin:4rem 0 0 0;
        }
}
   
</style>
