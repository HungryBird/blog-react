import { http } from '../../http/http'

export const login = (data) => {
    return http('/api/login', 'post', data);
}