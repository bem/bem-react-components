import React from 'react';
import ReactDom from 'react-dom';
import Input from 'b:Input';

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
                <Input
                    focused={this.state.inputFocused}
                    disabled={this.state.inputDisabled}
                    value={this.state.inputValue}
                    onChange={inputValue => { this.setState({ inputValue });}}
                    onFocusChange={inputFocused => { this.setState({ inputFocused }); console.log('focusChange! ' + buttonFocused); }}
                />
            </div>
        );
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ inputDisabled : true })
        }, 1000);

        setTimeout(() => {
            this.setState({ inputValue : 'disabled' })
        }, 2000);
    }
}

ReactDom.render(<App/>, document.getElementById('root'));
