import React from 'react';
import ReactDom from 'react-dom';
import Modal from 'b:Modal m:autoclosable';
import Link from 'b:Link m:pseudo';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            opened : false,
            openedAutoclosable : false
        };

        this.onLinkClick = this.onLinkClick.bind(this);
        this.onLinkAutoclosabeClick = this.onLinkAutoclosabeClick.bind(this);
        this.onModalClose = this.onModalClose.bind(this);
    }

    onLinkClick() {
        this.setState({ opened : !this.state.opened });
    }

    onLinkAutoclosabeClick() {
        this.setState({ openedAutoclosable : true });
    }

    onModalClose() {
        this.setState({ openedAutoclosable : false });
    }

    render() {
        return (
            <div>
                <Link pseudo onClick={this.onLinkClick}>
                    Open simple modal
                </Link>
                <Modal
                    opened={this.state.opened}
                    onClose={this.onModalClose}>
                    Simple modal content
                </Modal>
                <br/>
                <Link pseudo onClick={this.onLinkAutoclosabeClick}>
                    Open autoclosable modal
                </Link>
                <Modal
                    autoclosable
                    opened={this.state.openedAutoclosable}
                    onClose={this.onModalClose}>
                    Autoclosable modal content
                </Modal>
            </div>
        );
    }
}

ReactDom.render(<App/>, document.getElementById('root'));
