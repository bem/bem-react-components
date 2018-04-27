import React from 'react';
import ReactDom from 'react-dom';
import Dropdown from 'b:Dropdown m:switcher=button|link';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            openedButton : false,
            openedLink : false
        };

        this.onButtonClose = this.onButtonClose.bind(this);
        this.onButtonOpen = this.onButtonOpen.bind(this);

        this.onLinkClose = this.onLinkClose.bind(this);
        this.onLinkOpen = this.onLinkOpen.bind(this);
    }

    onButtonClose() {
        this.setState({ openedButton : false });
    }

    onButtonOpen() {
        this.setState({ openedButton : true });
    }

    onLinkClose() {
        this.setState({ openedLink : false });
    }

    onLinkOpen() {
        this.setState({ openedLink : true });
    }

    render() {
        return (
            <div>
                <Dropdown
                    text="awesome dropdown with button"
                    switcher="button"
                    opened={this.state.openedButton}
                    onClose={this.onButtonClose}
                    onOpen={this.onButtonOpen}>
                    its popup baby
                </Dropdown>
                <br/>
                <Dropdown
                    text="awesome dropdown with link"
                    switcher="link"
                    opened={this.state.openedLink}
                    onClose={this.onLinkClose}
                    onOpen={this.onLinkOpen}>
                    its popup baby
                </Dropdown>
            </div>
        );
    }
}

ReactDom.render(<App/>, document.getElementById('root'));
