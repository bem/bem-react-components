import React from 'react';
import ReactDom from 'react-dom';
import Button from 'b:Button m:type=link';
import Icon from 'b:Icon';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            buttonFocused : true,
            buttonDisabled : false,
            checkButtonChecked : false,
            radioButtonChecked : false
        };
    }

    render() {
        return (
            <div>
                <Button
                    focused={ this.state.buttonFocused }
                    text="button"
                    onFocusChange={buttonFocused => { this.setState({ buttonFocused }); console.log('focusChange! ' + buttonFocused); }}
                    onClick={() => console.log('click!')}
                />
                <br/>
                <Button icon={<Icon url="https://yandex.st/lego/_/pDu9OWAQKB0s2J9IojKpiS_Eho.ico"/>} text="button with icon"/>
                <br/>
                <Button disabled={this.state.buttonDisabled} type="link" text="button link" url="https://yandex.ru" target="_blank"/>
                <br/>
                <Button
                    checked={this.state.checkButtonChecked}
                    togglable="check"
                    onCheckChange={checkButtonChecked => { this.setState({ checkButtonChecked }); }}
                    text="check button"/>
                <br/>
                <Button
                    checked={this.state.radioButtonChecked}
                    togglable="radio"
                    onCheckChange={radioButtonChecked => { this.setState({ radioButtonChecked }); }}
                    text="radio button"/>
            </div>
        );
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
}

ReactDom.render(<App/>, document.getElementById('root'));
