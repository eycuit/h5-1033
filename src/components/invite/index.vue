<template>
    <div class="invite">
        <div class="topBar">
            推广邀请
            <img @click="reduct('/index')" src="../../assets/img/back-line.png" class="back" alt="">
        </div>
        <div style="height:4rem;"></div> 
        <div class="centerBox">
            <img :src="image" class="centerImg" alt="">
            <div ref="qrCodeUrl" class="qrcode"></div>
            <div class="doBox">
                <div :data-clipboard-text="link" @click="copyFn" class="doL">复制链接</div> 
                 
                <!--
                    <div @click='createPicture' class="doR">保存图片</div>
                -->
            </div>
        </div>

        <div class="selectBox">
            <div @click="imgFn(v.image)" v-for="(v,k) in data" :key='k' class="selectItem">
                <img :src="v.image" class="selectImg" alt="">
            </div>
           
        </div> 
        <img class="bigImg" :src="image" alt="">
    </div>
</template>

<script>
    import Clipboard from 'clipboard';  
    import {invite,link} from '../../../http/api'
    import QRCode from 'qrcodejs2'
    import html2canvas from 'html2canvas'
    export default {
        name: "invite",
        data(){
            return {
               data:{},
               image:'',
               link:'',
               imgData:'',
            }
        },
        mounted(){
            $('.invite').height(document.documentElement.clientHeight + 'px');
            this.inviteFn();
            this.linkFn();
        },
        methods:{
            creatQrCode() {
                let _this = this;
                var qrcode = new QRCode(this.$refs.qrCodeUrl, {
                    text: _this.link, // 需要转换为二维码的内容
                    width: 90,
                    height: 90,
                    colorDark: '#000000',
                    colorLight: '#ffffff',
                    correctLevel: QRCode.CorrectLevel.H
                })
                // this.createPicture()
            },
            createPicture () {
                html2canvas(document.querySelector("#captureId"))
                .then(canvas => {
                    var imgData = canvas.toDataURL("image/jpeg");
                    this.imgData = imgData;
                })
                .catch(error => {});
                
            },

            imgFn(img){
                this.image = img
            },
            reduct(url){
                this.$router.push({path:url})
            },
            linkFn(){
                link().then(res =>{
                    if(res.status == 0){
                        this.link = res.data.invite_url
                        this.creatQrCode();

                    }
                })
            },
            inviteFn(){
                let data = {
                    position:1,
                    one:0
                }
                invite(data).then(res =>{
                    if(res.status == 0){
                        this.data = res.data
                        this.image = res.data[0].image
                    }
                })
            },
            copyFn(){
                let _this = this;
                var clipboard = new Clipboard('.doL')  ;
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
 
            

        }
    }
</script>

<style scoped lang="scss">
.bigImg{
    width:100%;
    height:100%;
    position: fixed;
    left:0;
    top:0;
    filter: blur(3px);  
}
.invite{
    position: relative;
    .selectBox{
        position: fixed;
        z-index:2;
        width:92%;
        height:7rem;
        left:4%;
        bottom:5%;
        overflow-x:scroll;
        white-space: nowrap;
        .selectItem{
            width:5rem;
            height:7rem;
            margin:0 1.5rem 0 0;
            display: inline-block;
            .selectImg{
                width:5rem;
                height:7rem;
            }
        }

    }
    .centerBox{
        position: absolute;
         z-index:2;
        width:70%;
        left:15%;
        height:60%;
        top:10%;
        .qrcode{
             position: absolute;
             width:90px;
             height:90px;
             right:50%;
             bottom:50%;
             margin:0 -55px -65px 0;
             padding:5px;
             background: #fff;
        }
        .centerImg{
            width:100%;
            height:100%;
        }
        .doBox{
            position: absolute;
             z-index:2;
            left:0;
            bottom:-3.5rem;
            width:100%;
            height:3.5rem;
            .doL, .doR{
                width:100%;
                height:3.5rem;
                float: left;
                height:3.5rem;
                line-height: 3.5rem;
                text-align: center;
                font-size:1.25rem;
                color:#fff;
            }
            .doL{
                background: #41B37D;
            }
            .doR{
                background: #FF6363;
            }
        }
    }
}
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
        z-index:13;
        .back{
            position: absolute;
            width:1.5rem;
            height:1.5rem;
            left:3%;
            top:1.25rem ;
        }
    }
    

   
</style>
