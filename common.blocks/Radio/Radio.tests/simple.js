import React from 'react';
import ReactDom from 'react-dom';
import Radio from 'b:Radio m:type=button';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            disabled1 : false,
            checked1 : true,
            focused1 : true,
            buttonFocused1 : false,
            buttonChecked1 : false,
            buttonFocused2 : false,
            buttonChecked2 : false
        };

        this._onRadioChange1 = this._onRadioChange1.bind(this);
        this._onRadioFocusChange1 = this._onRadioFocusChange1.bind(this);
        this._onRadioButtonChange1 = this._onRadioButtonChange1.bind(this);
        this._onRadioButtonFocusChange1 = this._onRadioButtonFocusChange1.bind(this);
        this._onRadioButtonChange2 = this._onRadioButtonChange2.bind(this);
        this._onRadioButtonFocusChange2 = this._onRadioButtonFocusChange2.bind(this);
    }

    _onRadioChange1(checked1) {
        this.setState({ checked1 });
        console.log('change! ' + checked1);
    }

    _onRadioFocusChange1(focused1) {
        this.setState({ focused1 });
        console.log('focusChange! ' + focused1);
    }

    _onRadioButtonChange1(buttonChecked1) {
        this.setState({ buttonChecked1 });
        console.log('button change! ' + buttonChecked1);
    }

    _onRadioButtonFocusChange1(buttonFocused1) {
        this.setState({ buttonFocused1 });
        console.log('button focusChange! ' + buttonFocused1);
    }

    _onRadioButtonChange2(buttonChecked2) {
        this.setState({ buttonChecked2 });
        console.log('button change! ' + buttonChecked2);
    }

    _onRadioButtonFocusChange2(buttonFocused2) {
        this.setState({ buttonFocused2 });
        console.log('button focusChange! ' + buttonFocused2);
    }

    render() {
        return (
            <div>
                <Radio
                    focused={this.state.focused1}
                    disabled={this.state.disabled1}
                    value="checked"
                    checked={this.state.checked1}
                    text="check me!"
                    title="DO IT!!"
                    onChange={this._onRadioChange1}
                    onFocusChange={this._onRadioFocusChange1}/>
                <br/>
                <Radio
                    type="button"
                    focused={this.state.buttonFocused1}
                    value="button"
                    checked={this.state.buttonChecked1}
                    text="no! check me!!"
                    title="DO IT!!"
                    onChange={this._onRadioButtonChange1}
                    onFocusChange={this._onRadioButtonFocusChange1}/>
                <br/>
                <Radio
                    type="button"
                    focused={this.state.buttonFocused2}
                    mode="radio-check"
                    value="button"
                    checked={this.state.buttonChecked2}
                    text="no! check me!! mode radio-check"
                    title="DO IT!!"
                    onChange={this._onRadioButtonChange2}
                    onFocusChange={this._onRadioButtonFocusChange2}/>
            </div>
        );
    }
}

ReactDom.render(<App/>, document.getElementById('root'));
