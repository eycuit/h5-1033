import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
import { noticeNew, notice} from '../../http/api'
/*存储数据*/
var state = {
    notice:{},
    noticeActive:false
};

/*mutations里面放方法，主要用于改变state里面的值*/
var mutations = {
    soundFn(){
        noticeNew().then(res =>{
            if(res.status == 0){
                sessionStorage.setItem("new", res.data.id);
            }
        });
        notice().then(res =>{
            if(res.status == 0){
                sessionStorage.setItem("old", res.data.data[0].id);
            }
        })
    },
};
/*vuex 实例化 Vuex.store*/
const store = new Vuex.Store({
    state,
    mutations
});
export default store
