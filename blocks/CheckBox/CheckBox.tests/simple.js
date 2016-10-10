import React from 'react';
import ReactDom from 'react-dom';
import CheckBox from 'b:CheckBox m:type=button';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            checked : true,
            focused : true,
            disabled : false,
            buttonFocused : false,
            buttonChecked : false
        };
    }

    render() {
        return (
            <div>
                <CheckBox
                    focused={this.state.focused}
                    disabled={this.state.disabled}
                    value="checked"
                    checked={this.state.checked}
                    text="check me!"
                    title="DO IT!!"
                    onChange={checked => { this.setState({ checked }); console.log('change! ' + checked); }}
                    onFocusChange={focused => { this.setState({ focused }); console.log('focusChange! ' + focused); }}
                />
                <br/>
                <CheckBox
                    type="button"
                    focused={this.state.buttonFocused}
                    value="button"
                    checked={this.state.buttonChecked}
                    text="no! check me!!"
                    title="DO IT!!"
                    onChange={checked => { this.setState({ buttonChecked : checked }); console.log('button change! ' + checked); }}
                    onFocusChange={focused => { this.setState({ buttonFocused : focused }); console.log('button focusChange! ' + focused); }}
                />
            </div>
        );
    }
}

ReactDom.render(<App/>, document.getElementById('root'));
