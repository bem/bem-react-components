import React from 'react';
import ReactDom from 'react-dom';
import Link from 'b:Link';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            linkFocused : true,
            linkDisabled : false
        };
    }

    render() {
        return (
            <div>
                <Link
                    url="https://yandex.ru"
                    focused={ this.state.linkFocused }
                    onFocusChange={linkFocused => { this.setState({ linkFocused }); console.log('focusChange! ' + linkFocused); }}
                    onClick={() => console.log('click!')}
                >link</Link>
                <br/>
                <Link
                    onFocusChange={linkFocused => { this.setState({ linkFocused }); console.log('focusChange! ' + linkFocused); }}
                    onClick={() => console.log('click!')}
                >link</Link>
                <br/>
                <Link disabled={this.state.linkDisabled} url="https://yandex.ru" target="_blank">link disabled</Link>
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
