import React from 'react';
import ReactDom from 'react-dom';
import TextArea from 'b:TextArea';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value : 'text value',
            focused : true,
            disabled : false
        };

        this._onTextAreaChange = this._onTextAreaChange.bind(this);
        this._onTextAreaFocusChange = this._onTextAreaFocusChange.bind(this);
    }

    componentDidMount() {
        // setTimeout(() => {
        //     this.setState({ disabled : true });
        // }, 1000);

        // setTimeout(() => {
        //     this.setState({ focused: true });
        // }, 1000);

        // setTimeout(() => {
        //     this.setState({ value : 'disabled' });
        // }, 2000);
    }

    _onTextAreaChange(value) {
        this.setState({ value });
    }

    _onTextAreaFocusChange(focused) {
        this.setState({ focused });
        console.log('focusChange! ' + focused);
    }

    render() {
        return (
            <div>
                <TextArea
                    focused={this.state.focused}
                    disabled={this.state.disabled}
                    value={this.state.value}
                    autoComplete={false}
                    onChange={this._onTextAreaChange}
                    onFocusChange={this._onTextAreaFocusChange}/>
            </div>
        );
    }
}

ReactDom.render(<App/>, document.getElementById('root'));
