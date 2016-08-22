import React from 'react';
import ReactDom from 'react-dom';
import Button from 'b:Button';
import Icon from 'b:Icon';

class App extends React.Component {
    constructor() {
        super();
        this.state = { buttonFocused : true };
    }

    render() {
        return (
            <div>
                <Button
                    focused={ this.state.buttonFocused }
                    text="button"
                    onFocus={() => { this.setState({ buttonFocused : true }); console.log('focus!'); }}
                    onBlur={() => { this.setState({ buttonFocused : false }); console.log('blur!'); }}/>
            </div>
        );
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ buttonFocused : true })
        }, 1000);

        setTimeout(() => {
            this.setState({ buttonFocused : false })
        }, 2000);
    }
}

                // <br/>
                // <Button icon={<Icon url="https://yandex.st/lego/_/pDu9OWAQKB0s2J9IojKpiS_Eho.ico"/>} text="button"/>

ReactDom.render(<App/>, document.getElementById('root'));
