import React from 'react';
import ReactDom from 'react-dom';
import './simple.css';
import TextInput from 'b:TextInput';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inputValue : 'input value',
            inputFocused : true,
            inputDisabled : false
        };

        this._onTextInputChange = this._onTextInputChange.bind(this);
        this._onTextInputFocusChange = this._onTextInputFocusChange.bind(this);
    }

    componentDidMount() {
        // setTimeout(() => {
        //     this.setState({ inputDisabled : true });
        // }, 1000);

        // setTimeout(() => {
        //     this.setState({ inputFocused: true });
        // }, 1000);

        // setTimeout(() => {
        //     this.setState({ inputValue : 'disabled' });
        // }, 2000);
    }

    _onTextInputChange(inputValue) {
        this.setState({ inputValue });
    }

    _onTextInputFocusChange(inputFocused) {
        this.setState({ inputFocused });
        console.log('focusChange! ' + inputFocused);
    }

    render() {
        return (
            <div>
                <TextInput
                    focused={this.state.inputFocused}
                    disabled={this.state.inputDisabled}
                    value={this.state.inputValue}
                    autoComplete={false}
                    hasClear
                    onChange={this._onTextInputChange}
                    onFocusChange={this._onTextInputFocusChange}/>

                <br/>

                <TextInput
                    type="password"
                    disabled={this.state.inputDisabled}
                    value={this.state.inputValue}
                    hasClear
                    onChange={function(value) { console.log('password not change', value); }}/>
            </div>
        );
    }
}

ReactDom.render(<App/>, document.getElementById('root'));
