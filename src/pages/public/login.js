import React from 'react'
import propTypes from 'prop-types'
import './login.scss'
import { login } from '../../api/login/login'
import { isEmpty, setLocalStorage } from '../../utils/util'

class Login extends React.Component{
    constructor(prop) {
        super(prop);
        this.state = {
            form: {
                username: '',
                password: '',
                remeber: true,
            },
            msg: {
                show: false,
                text: '',
            },
            validated: false,
            loading: false,
        }
        this.changeInput = this.changeInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    changeInput(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        const form = Object.assign({}, this.state.form, {[name]: value});
        this.setState({
            form,
        })
    }

    handleSubmit(e) {
        if(isEmpty(this.state.form.username) && isEmpty(this.state.form.password)) {
            this.setState({
                msg: {
                    show: true,
                    text: '请输入账号和密码'
                }
            })
            return;
        }
        else if(isEmpty(this.state.form.username)) {
            this.setState({
                msg: {
                    show: true,
                    text: '请输入账号'
                }
            })
            return;
        }
        else if(isEmpty(this.state.form.password)) {
            this.setState({
                msg: {
                    show: true,
                    text: '请输入密码'
                }
            })
            return;
        }
        login({
            username: this.state.form.username,
            password: this.state.form.password
        }).then(res => {
            if(res.status === 1) {
                this.setState({
                    msg: {
                        show: true,
                        text: res.msg,
                    }
                })
                setLocalStorage('token', res.token);
                this.props.history.push('/');
            }
            else {
                this.setState({
                    msg: {
                        show: true,
                        text: res.msg,
                    }
                })
            }
        })
    }

    render() {
        return(
            <div className="login-bg">
                <div className="form-wrap">
                    <div className="form-inner">
                        <h5>博客管理系统登录</h5>
                        <form role="form">
                            <div className="login-msg error" style={{display:this.state.msg.show ? 'block' : 'none'}}>
                                {this.state.msg.text}
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">账号</label>
                                <input type="text" className="form-control" name="username" placeholder="请输入密码" onChange={this.changeInput} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">密码</label>
                                <input type="password" className="form-control" name="password" placeholder="请输入密码" onChange={this.changeInput} />
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" onChange={this.changeInput} name="remeber" />记住我
                                </label>
                            </div>
                            <div className="login-btns">
                                {/* <button type="button" className="btn btn-outline-success">注册</button> */}
                                <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>登录</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;