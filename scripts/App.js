import React, {Component} from 'react';
import '../styles/app.scss'

const Sentence = (props) => {
    return (
        <div className={`sentence ${props.alternate}`} >{props.data.text}</div>
    );
};

export default class Palakai extends Component {
    constructor() {
        super();
        this.state = {sentences: []};
        this.loadInterval = 500;
    }

    componentDidMount() {
        this.loadDataFromServer();
    }

    loadDataFromServer() {
        this.loadRequest = $.get(this.props.source, function (result) {
            result = result.reverse();
            this.setState({sentences: result});
            setTimeout(this.loadDataFromServer.bind(this), this.loadInterval)
        }.bind(this));
    }

    componentWillUnmount() {
        this.loadRequest.abort();
        this.saveRequest.abort();
    }

    write() {
        if(this.state.sentence){
            this.saveRequest = $.ajax({
                headers: {
                    'Content-Type': 'application/json'
                },
                'type': 'POST',
                'url': this.props.source,
                'data': JSON.stringify({text: this.state.sentence}),
                'dataType': 'json',
                'success': () => {
                }
            });
            this.setState({sentence: ''})
        }
    }

    sentenceChanged(e) {
        this.setState({sentence: e.target.value})
    }

    render() {
        let sentences = this.state.sentences.map((sentence, index) => {
            let alternate = index % 2 === 0 ? "even": "odd";
            return <Sentence alternate={alternate} key={sentence.id} data={sentence}/>
        });

        return (
            <div>
                <input className="input" onChange={this.sentenceChanged.bind(this)} value={this.state.sentence} type="text"/>
                <button className="post" onClick={this.write.bind(this)}>Write</button>
                <div>{sentences}</div>
            </div>
        );
    }
}

export default class App extends Component {
    render() {
        return (
            <Palakai source="http://192.168.99.102:8080/sentence"/>
        )
    }
};

