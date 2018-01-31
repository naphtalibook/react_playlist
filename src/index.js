import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import './index.css';
import App from './App';




class Root extends React.Component{
        render(){
            return(
                <Router>
                    <div>
                        <Switch>
                            <App />
                        </Switch>
                    </div>
                </Router>
             ); 
        }
    }


ReactDOM.render(<Root />, document.getElementById('root'));

























// import registerServiceWorker from './registerServiceWorker';
// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
