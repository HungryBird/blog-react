import Login from '../../pages/public/login'
import Main from '../../pages/main'

export default [
    {component: Login, name: 'login', exact: true, path: '/login'},
    {component: Main, name: 'main', exact: false, path: '/main'},
]