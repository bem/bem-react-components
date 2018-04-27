import React from 'react';
import ReactDom from 'react-dom';
import CheckBox from 'b:CheckBox m:type=button';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            checked : true,
            focused : true,
            disabled : false,
            buttonFocused : false,
            buttonChecked : false
        };

        this._onCheckBoxChange = this._onCheckBoxChange.bind(this);
        this._onCheckBoxFocusChange = this._onCheckBoxFocusChange.bind(this);
        this._onCheckBoxButtonChange = this._onCheckBoxButtonChange.bind(this);
        this._onCheckBoxButtonFocusChange = this._onCheckBoxButtonFocusChange.bind(this);
    }

    _onCheckBoxChange(checked) {
        this.setState({ checked });
        console.log('change! ' + checked);
    }

    _onCheckBoxFocusChange(focused) {
        this.setState({ focused });
        console.log('focusChange! ' + focused);
    }

    _onCheckBoxButtonChange(checked) {
        this.setState({ buttonChecked : checked });
        console.log('button change! ' + checked);
    }

    _onCheckBoxButtonFocusChange(buttonFocused) {
        this.setState({ buttonFocused });
        console.log('button focusChange! ' + buttonFocused);
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
                    onChange={this._onCheckBoxChange}
                    onFocusChange={this._onCheckBoxFocusChange}/>
                <br/>
                <CheckBox
                    type="button"
                    focused={this.state.buttonFocused}
                    value="button"
                    checked={this.state.buttonChecked}
                    text="no! check me!!"
                    title="DO IT!!"
                    onChange={this._onCheckBoxButtonChange}
                    onFocusChange={this._onCheckBoxButtonFocusChange}/>
            </div>
        );
    }
}

ReactDom.render(<App/>, document.getElementById('root'));
