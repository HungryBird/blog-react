import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import NotFonud from '../pages/public/404'
import routesMap from './routes/public'

class RouterIndex extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <BrowserRouter>
                <Switch>
                    {
                        routesMap.map(route => {
                            return <Route component={route.component} key={route.name} path={route.path} exact={route.exact}></Route>
                        })
                    }
                    <Redirect from="/" to="/main" exact></Redirect>
                    <Route path="*" component={NotFonud}></Route>
                </Switch>
            </BrowserRouter>
        )
    }

}

export default RouterIndex;