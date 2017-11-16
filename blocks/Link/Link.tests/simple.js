import React from 'react';
import ReactDom from 'react-dom';
import Link from 'b:Link m:pseudo m:type=button';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            linkFocused : true,
            linkDisabled : true
        };

        this._onLinkFocusChange = this._onLinkFocusChange.bind(this);
    }

    componentDidMount() {
        // setTimeout(() => {
        //     this.setState({ linkDisabled : true })
        // }, 3000);
        //
        // setTimeout(() => {
        //     this.setState({ linkDisabled : false })
        // }, 2000);
    }

    _onLinkFocusChange(linkFocused) {
        this.setState({ linkFocused });
        console.log('focusChange! ' + linkFocused);
    }

    _onLinkClick() {
    }

    _onButtonClickPrevented(e) {
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <Link
                    url="https://yandex.ru"
                    focused={this.state.linkFocused}
                    onFocusChange={this._onLinkFocusChange}
                    onClick={function() { console.log('url click!'); }}>link</Link>
                <br/>
                <Link
                    onFocusChange={this._onLinkFocusChange}
                    onClick={function() { console.log('click!'); }}>link</Link>
                <br/>
                <Link disabled={this.state.linkDisabled} url="https://yandex.ru" target="_blank">link disabled</Link>
                <br/>
                <Link pseudo onClick={function() { console.log('pseudo click!'); }}>pseudo link</Link>
                <br/>
                <Link
                    type="button"
                    url="https://yandex.ru"
                    target="_blank">link type button</Link>
                <br/>
                <Link
                    type="button"
                    url="https://yandex.ru"
                    onClick={this._onButtonClickPrevented}>button link with default prevented</Link>
            </div>
        );
    }
}

ReactDom.render(<App/>, document.getElementById('root'));
