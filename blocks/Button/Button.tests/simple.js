import React from 'react';
import ReactDom from 'react-dom';
import './simple.css';
import Button from 'b:Button m:type=link';
import Icon from 'b:Icon';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            buttonFocused : true,
            buttonDisabled : false,
            checkButtonChecked : false,
            radioButtonChecked : false
        };

        this._onButtonFocusChange = this._onButtonFocusChange.bind(this);
        this._onButtonCheckChange = this._onButtonCheckChange.bind(this);
        this._onRadioButtonCheckChange = this._onRadioButtonCheckChange.bind(this);
    }

    componentDidMount() {
        // setTimeout(() => {
        //     this.setState({ buttonDisabled : true })
        // }, 3000);
        //
        // setTimeout(() => {
        //     this.setState({ buttonDisabled : false })
        // }, 2000);
    }

    _onButtonFocusChange(buttonFocused) {
        this.setState({ buttonFocused });
        console.log('focusChange! ' + buttonFocused);
    }

    _onButtonCheckChange(checkButtonChecked) {
        this.setState({ checkButtonChecked });
    }

    _onRadioButtonCheckChange(radioButtonChecked) {
        this.setState({ radioButtonChecked });
    }

    _onButtonClickPrevented(e) {
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <Button
                    focused={this.state.buttonFocused}
                    text="button"
                    onFocusChange={this._onButtonFocusChange}
                    onClick={function() { console.log('click!'); }}/>
                <br/>
                <Button
                    icon={<Icon url="https://yandex.st/lego/_/pDu9OWAQKB0s2J9IojKpiS_Eho.ico"/>}
                    text="button with icon"/>
                <br/>
                <Button
                    disabled={this.state.buttonDisabled}
                    type="link"
                    text="button link"
                    url="https://yandex.ru"
                    target="_blank"/>
                <br/>
                <Button
                    type="link"
                    text="button link with default prevented"
                    url="https://yandex.ru"
                    onClick={this._onButtonClickPrevented}/>
                <br/>
                <Button
                    checked={this.state.checkButtonChecked}
                    togglable="check"
                    onCheckChange={this._onButtonCheckChange}
                    text="check button"/>
                <br/>
                <Button
                    checked={this.state.radioButtonChecked}
                    togglable="radio"
                    onCheckChange={this._onRadioButtonCheckChange}
                    text="radio button"/>
            </div>
        );
    }
}

ReactDom.render(<App/>, document.getElementById('root'));
