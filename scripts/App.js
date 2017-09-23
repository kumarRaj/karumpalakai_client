import React, {Component} from 'react';
import Palakai from './Palakai';
import '../styles/app.scss'

export default class App extends Component {
    render() {
        return (
            <Palakai source="http://localhost:8080/sentence"/>
        )
    }
};

