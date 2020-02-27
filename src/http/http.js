import axios from 'axios'
import { config, baseURL } from './config'
import { getExpiresStorage, isEmpty, getLowerCase } from '../utils/util'
import qs from 'qs'

export const http = (url, method, options, headers = {}) => {
    const token = getExpiresStorage('token');
    const token_type = getExpiresStorage('token_type')
    if (!isEmpty(token)) {
        config.auth = token;
    }
    config.url = baseURL + url;
    config.method = getLowerCase(method) || 'get';
    if(!isEmpty(headers)) {
        for(const key in headers) {
            if(headers.hasOwnProperty(key)) {
                config.headers[key] = headers[key];
            }
        }
    }
    if (config.method === 'get') {
        config.params = options;
    }
    else if (config.method === 'post') {
        config.data = qs.stringify(options);
        config.params = {};
    }
    return new Promise(resolve => {
        axios(config).then(res => {
            console.log('http: ', res)
            resolve(res.data);
        })
    });
}