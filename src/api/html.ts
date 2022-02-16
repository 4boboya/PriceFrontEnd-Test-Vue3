import axios, { Method } from 'axios';
import { allowedMethods, timeoutSec, headers, apiUrl, formDataHeaders } from '@/config/global/Http';
const priceCenterAjax = axios.create({
    baseURL: apiUrl,
    headers: headers,
    timeout: timeoutSec * 1000
});
/**
 * HTTP請求
 * @param {string} method 請求方法
 * @param {string} url 請求路由
 * @param {object} payload 請求資料
 */

export async function $priceCenterSite(method: Method, url: string, payload: any = {}) {
    if (allowedMethods.indexOf(method) < 0) {
        throw new Error(`Not Allowed Method: '${ method }'`);
    }
    try {
        const response = await priceCenterAjax.request({
            url,
            method,
            data  : payload.body || null,
            params: payload.query || null,
        });
        return response.data;
    } catch (err) {
        console.log(err)
    }
}
