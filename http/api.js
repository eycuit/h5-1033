import { get, post, patch, put, del, postUpload } from "./http"


//注册
export const register = (params) => post('/account/register', params);

//登录
export const login = (params) => post('/account/in-pass', params);

//发送注册验证码
export const registerCode = (params) => put('/sms/register-code', params);
// export const registerCode = (params) => postUpload('/login/register-code', params);

//下载APP
export const downLoad = (params) => get('/versions/app', params);

// 个人中心
export const userCenter = (params) => get('/user/center', params);

// 团队
export const team = (params) => get('/user/team', params);

// 客服
export const customer = (params) => get('/home/service', params);

// 推广邀请
export const invite = (params) => get('/images/images', params);

// 链接
export const link = (params) => get('/user/invite-config', params);