import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { isEmpty, getLocalStorage } from '../../utils/util'

const M2 = () => <p>这是M2</p>;
const M3 = () => <p>这是M3</p>;
const NF = () => <p>404</p>;

class Main extends React.Component{
    constructor(prop) {
        super(prop);
        const token = getLocalStorage('token');
        this.state = {
            hasToken: !isEmpty(token)
        };
    }

    componentDidMount() {
        const token = getLocalStorage('token');
        if(isEmpty(token)) {
            this.props.history.push('/login');
        }
    }

    render() {
        return(
            <div>
                <div>main</div>
                <Switch>
                    <Route path='/main/m2' component={M2} exact></Route>
                    <Route path='/main/m3' component={M3} exact></Route>
                    <Redirect to='/main/m2' from='/main' exact></Redirect>
                    <Route path='/main/*' component={NF}></Route>
                </Switch>
            </div>
        )
    }
}

export default Main;