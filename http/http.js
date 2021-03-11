import qs from 'qs'
import cookie from 'js-cookie'
import axios from 'axios'
import router from '@/router'


axios.defaults.timeout = 15000;
if (process.env.NODE_ENV == "development") {
    axios.defaults.baseURL = 'http://api.1033.com/v1';
} else {
    // axios.defaults.baseURL = 'https://api.grandsanhedrin.com/v1';
    axios.defaults.baseURL = 'https://api.dgh666.xyz/v1';
}

//设置请求拦截器
axios.interceptors.request.use(

    config => {
        let platform = 'ios'
        const u = navigator.userAgent;
        const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        if (isiOS) {
            platform = 'ios'
        } else {
            platform = 'android'
        }
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
        config.headers['version-terminal'] = platform;
        if (cookie.get("accessToken")) {
            //每个http header都加上ticket
            config.headers['access-token'] = cookie.get("accessToken");
        }
        return config;
    },
    error => {
        return Promise.reject(error.response);
    }
);

// export default axios;


//
//
//设置响应拦截器
// axios.interceptors.response.use(
//     response => {
// 	    return response;
//     },
//     error => {
// 	    if (error.response !== undefined) {
//             switch (error.response.status) {
//                 case 401:
//                     // 这里写清除token的代码
// 	                router.push({
//                         path: '/login'
//                     })
//             }
//         }
//         return Promise.reject(error.response)   // 返回接口返回的错误信息
//     }
// );
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response !== undefined) {
            switch (error.response.status) {
                case 401:
                    // 这里写清除token的代码
                    router.push({
                        path: '/login'
                    })
            }
        }
        return Promise.reject(error.response)   // 返回接口返回的错误信息
    }
);

export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, { params: params }).then(response => {
            resolve(response.data);
        }).catch(err => {
            reject(err)
        })
    })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, qs.stringify(data))
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.patch(url, qs.stringify(data))
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.put(url, qs.stringify(data))
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}

/**
 * 封装del请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function del(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.delete(url, { params: data })
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}

/**
 * post上传图片用这个
 * @param url
 * @param formData
 * @returns {Promise<any>}
 */

export function postUpload(url, formData = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, formData)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}
