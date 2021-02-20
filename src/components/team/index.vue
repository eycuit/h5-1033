<template>
    <div class="customer">
        <div class="topBar">
            我的团队
            <img @click="reduct('/index')" src="../../assets/img/back-line.png" class="back" alt="">
        </div>
        <div class="box">
            <van-list
            class="listBox"
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
                >
                <van-cell  v-for="(v,k) in list" :key="k">
                    <div class="itemBox">
                        <div class="item">
                            <img :src="v.avatar" class="userPhone" alt="">
                            <div class="info">
                                <div class="nameBox">
                                    <div class="name1">{{v.nick_name}}</div>
                                    <div class="type">
                                        <img :src="v.level.icon" class="sign" alt="">
                                        <div class="typeWords">{{v.level.name}}</div>
                                    </div>
                                </div> 
                                <div class="time">注册时间 {{v.register_time}}</div>
                                <div class="time">手机号 {{v.phone == null || v.phone.length == 0 ? '暂无' : v.phone  }}</div>
                            </div>
                        </div>
                        <div class="numBox">
                            <div class="numItem">联盟总算力:{{v.team_hashrate}}</div>
                            <div class="numItem">使者:{{v.first_users}}</div>
                            <div class="numItem">联盟:{{v.second_users}}</div>
                        </div>
                    </div> 
                </van-cell>
            </van-list>
            
        </div>
    </div>
</template>

<script>
   import {team} from '../../../http/api'
    export default {
        name: "customer",
        data(){
            return {
               list:[],
                loading: false,
                finished: false,
                page: 1,//请求第几页
                pageSize: 5,//每页请求的数量
                total: 0,//总共的数据条数
            }
        },
        mounted(){
             $('.listBox').height((document.documentElement.clientHeight-50) + 'px');
            this.listFn();
        },
        methods:{
            reduct(url){
                this.$router.push({path:url})
            },
            listFn(){
                let data = {
                    page:this.page,
                    size:this.pageSize
                }
                team(data).then(res =>{
                    let list = res.data.data;
                    this.loading = false;
                    this.total = res.data.total; 
                    if (list == null || list.length === 0) {
                        // 加载结束
                        this.finished = true;
                        return;
                    }
                    this.list = this.list.concat(list);
                    //如果列表数据条数>=总条数，不再触发滚动加载
                    if (this.list.length >= this.total) {
                        this.finished = true;
                    }
                })
            },
            //滚动加载时触发，list组件定义的方法
            onLoad() {
                console.log(this.list.length)
                console.log(this.total)
                if(this.list.length < this.total){
                      this.page ++ 
                    this.listFn();
                }
              
            }
        }
    }
</script>

<style scoped lang="scss">
.van-list__finished-text{
    line-height: 30px;
    height:30px;
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
        background: #052D54;
        z-index:10;
        .back{
            position: absolute;
            width:1.5rem;
            height:1.5rem;
            left:3%;
            top:1.25rem ;
        }
    }
    .van-cell{
        background: none;
        padding:0;

    }
    .listBox{
        overflow-y: scroll;
        padding:5rem 4% 0 4%;
        width:92%;
    }
    .box{
        width:100%;
        overflow-y: scroll;
        .itemBox{
            width:94%;
            padding:1rem 3%;
            border-radius: 5px;
            box-shadow: 0 3px 6px 0 rgba(0,0,0,0.16);
            margin:0 0 1.5rem 0;
                background: #fff;

            .item{
                width:100%;
                display: flex;
                justify-content: space-between;
                .userPhone{
                    width:4rem;
                    height:4rem;
                    border-radius: 50%;
                    margin:1.95rem 0 0 0;
                }
                .info{
                    display: inline-block;
                    width:75%;
                    .nameBox{
                        width:100%;
                        height:2rem;
                        margin:0 0 0.5rem 0;
                        .name1{
                            width:25%;
                            height:2rem;
                            line-height: 2rem;
                            float:left;
                            color:#052D54;
                            overflow:hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            font-weight: bold;
                        }
                        .type{
                            float:left;
                            margin:-0 0 0 1rem;
                            width:8.5rem;
                            height:2rem;
                            background:#FEE33E ;
                            border-radius: 5px;
                            .typeWords{
                                width:6rem;
                                height:2rem;
                                line-height: 2rem;
                                float:right;
                                font-size:1.3rem;

                            }
                            .sign{
                                width:1.4rem;
                                height:1.4rem;
                                margin:0.3rem 0 0  0.6rem;
                                display: block;
                                float:left;
                            }
                        }
                    }
                    .time{
                        width:100%;
                        height:1.7rem;
                        line-height: 1.7rem;
                        font-size:1.2rem;
                        color:#8591A2;
                    }
                    
                }
                
            }
            .numBox{
                overflow:hidden;
                .numItem{
                    min-width: 1rem;
                    padding:0 0.5rem ;
                    border-radius: 7px;
                    font-size: 1rem;
                    background:#F4F6FB ;
                    color:#8591A2;
                    float:right;
                    margin:0.5rem 0 0 1rem ;
                    
                }
            }
        }
        
    }

   
</style>
