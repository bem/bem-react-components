import React from 'react';
import ReactDom from 'react-dom';
import TextInput from 'b:TextInput';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            inputValue : 'input value',
            inputFocused : true,
            inputDisabled : false
        };
    }

    render() {
        return (
            <div>
                <TextInput
                    focused={this.state.inputFocused}
                    disabled={this.state.inputDisabled}
                    value={this.state.inputValue}
                    autoComplete={false}
                    hasClear={true}
                    onChange={inputValue => { this.setState({ inputValue }); }}
                    onFocusChange={inputFocused => { this.setState({ inputFocused }); console.log('focusChange! ' + inputFocused); }}
                />

                <br/>

                <TextInput
                    type="password"
                    disabled={this.state.inputDisabled}
                    value={this.state.inputValue}
                    hasClear={true}
                    onChange={inputValue => { console.log('password change' + inputValue) }}
                />
            </div>
        );
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
}

ReactDom.render(<App/>, document.getElementById('root'));
