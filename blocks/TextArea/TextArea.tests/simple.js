import React from 'react';
import ReactDom from 'react-dom';
import TextArea from 'b:TextArea';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            value : 'text value',
            focused : true,
            disabled : false
        };
    }

    render() {
        return (
            <div>
                <TextArea
                    focused={this.state.focused}
                    disabled={this.state.disabled}
                    value={this.state.value}
                    autoComplete={false}
                    onChange={value => { this.setState({ value }); }}
                    onFocusChange={focused => { this.setState({ focused }); console.log('focusChange! ' + focused); }}
                />
            </div>
        );
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
}

ReactDom.render(<App/>, document.getElementById('root'));
