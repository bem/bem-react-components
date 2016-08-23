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
        };
    }

    render() {
        return (
            <div>
                <Button
                    focused={ this.state.buttonFocused }
                    text="button"
                    onFocus={() => { this.setState({ buttonFocused : true }); console.log('focus!'); }}
                    onBlur={() => { this.setState({ buttonFocused : false }); console.log('blur!'); }}
                    onClick={() => console.log('click!')}
                />
                <br/>
                <Button icon={<Icon url="https://yandex.st/lego/_/pDu9OWAQKB0s2J9IojKpiS_Eho.ico"/>} text="button with icon"/>
                <br/>
                <Button disabled={this.state.buttonDisabled} type="link" text="button link" url="https://yandex.ru" target="_blank"/>
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
