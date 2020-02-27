// 转换小写
export const getLowerCase = (str) => {
    if (isEmpty(str)) return str;
    if (getType(str) !== 'string') return false;
    return str.toLowerCase(); 
}

// 转换大写
export const getUpperCase = (str) => {
    if (isEmpty(str)) return str;
    if (getType(str) !== 'string') return false;
    return str.toUpperCase(); 
}

// 获取类型
export const getType = (data) => {
    const _dict = {
        '[object Object]': 'object',
        '[object String]': 'string',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object Symbol]': 'symbol',
        '[object Regex]': 'regExp',
        '[object Set]': 'set',
        '[object Function]': 'function',
        '[object Map]': 'map',
        '[object Null]': 'null',
        '[object Undefined]': 'undefined',
        '[object WeakSet]': 'weakset',
        '[object WeakMap]': 'weakmap',
        '[object Number]': 'number',
        '[object Boolean]': 'boolean',
    }
    return _dict[Object.prototype.toString.call(data)];
}

// 判断是否为空
export const isEmpty = (data) => {
    const type = getType(data)
    if (type === 'object') {
        for(const key in data) {
            if(data.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    }
    if (type === 'array') {
        return data.length === 0;
    }
    if (type === 'set' || type === 'weakset' || type === 'map' || type === 'weakmap') {
        return data.size === 0;
    }
    if(type === 'number' || type === 'boolean') return false;
    return !data;
}

// 获取localStorage
export const getLocalStorage = (key) => {
    if(isEmpty(key)) return;
    let value = window.localStorage.getItem(key);
    if(!isEmpty(value)) {
        try{
            value = JSON.parse(value);
        }
        catch(e) {}
    } 
    return value;
}

// 设置localStorage
export const setLocalStorage = (key, data) => {
    const type = getType(data);
    if(type === 'object' || type === 'array' || type === 'set' || type === 'weakset' || type === 'map' || type === 'weakmap') {
        data = JSON.stringify(data);
    }
    window.localStorage.setItem(key, data);
}

// 删除localStorage
export const removeLocalStorage = (key) => {
    if(isEmpty(key)) return;
    window.localStorage.removeItem(key);
    return true;
}

// 清空localStorage
export const clearLocalStorage = () => {
    window.localStorage.clear();
    return true;
}

// 获取sessionStorage
export const getSessionStorage = (key) => {
    if(isEmpty(key)) return;
    let value = window.localSessionStorage.getItem(key);
    if(!isEmpty(value)) {
        try{
            value = JSON.parse(value);
        }
        catch(e) {}
    } 
    return value;
}

// 设置sessionStorage
export const setSessionStorage = (key, data) => {
    const type = getType(data);
    if(type === 'object' || type === 'array' || type === 'set' || type === 'weakset' || type === 'map' || type === 'weakmap') {
        data = JSON.stringify(data);
    }
    window.localSessionStorage.setItem(key, data);
}

// 删除sessionStorage
export const removeSessionStorage = (key) => {
    if(isEmpty(key)) return;
    window.localSessionStorage.removeItem(key);
    return true;
}

// 清空sessionStorage
export const clearSessionStorage = () => {
    window.localSessionStorage.clear();
    return true;
}

/**
 *  @设置有效期缓存
 *  @param{string}{any}{second}
 *  @return boolean
 */
export const setExpiresStorage = (key, data, second) => {
    if(isEmpty(key) || (!isEmpty(second) && isNaN(second))) return false;
    const expires = second ? new Date().getTime() + second*1000 : null;
    const obj = {
        key,
        data,
        expires,
    }
    if (isEmpty(expires)) {
        setLocalStorage(key, data);
    }
    else {
        setLocalStorage(key, obj);
    }
    return true;
}

// 获取有效期缓存
export const getExpiresStorage = (key) => {
    if(isEmpty(getLocalStorage(key))) return;
    const obj = getLocalStorage(key);
    const now = new Date().getTime();
    const expires = obj.expires;
    if(now >= expires || isEmpty(expires)) return;
    return obj[key];
}

// 删除有效期缓存
export const removeExpiresStorage = (key) => {
    removeLocalStorage(key);
    return true;
}

// 清空有效期缓存
export const clearExpiresStorage = () => {
    clearLocalStorage();
    return true;
}

// 去掉前后空格
export const trim = (str) => {
    if(getType(str) !== 'string') return;
    return str.trim();
}