import React from 'react';
import ReactDom from 'react-dom';
import Bem from 'bem-react-core';
import './anchor-visibility.css';
import Popup from 'b:Popup m:autovisible m:target=anchor';
import Button from 'b:Button';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            popup1Visible: false
        };

        this.onButton1Click = this.onButton1Click.bind(this);
        this.requestPopup1Hide = this.requestPopup1Hide.bind(this);
        this.requestPopup1Show = this.requestPopup1Show.bind(this);
    }

    onButton1Click() {
        this.setState({popup1Visible: !this.state.popup1Visible});
    }

    requestPopup1Hide() {
        this.setState({popup1Visible: false});
    }

    requestPopup1Show() {
        this.setState({popup1Visible: true});
    }

    render() {
        return (
            <Bem block="Examples">
                <Bem block="Example" mods={{ scroll: true }}>
                    <Bem block="Example" elem="Wrapper">
                        <Button
                            ref={b1 => this._b1 = b1}
                            onClick={this.onButton1Click}>
                            toggle with button
                        </Button>
                        <Popup
                            target="anchor"
                            visible={this.state.popup1Visible}
                            autovisible
                            onHide={this.requestPopup1Hide}
                            onShow={this.requestPopup1Show}
                            directions={['bottom-left']}
                            anchor={() => this._b1}>
                            popup content
                        </Popup>
                    </Bem>
                </Bem>
            </Bem>
        );
    }

}

ReactDom.render(<App/>, document.getElementById('root'));
