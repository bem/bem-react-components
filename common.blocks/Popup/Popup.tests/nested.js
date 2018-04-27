import React from 'react';
import ReactDom from 'react-dom';
import Bem from 'bem-react-core';
import './nested.css';
import Popup from 'b:Popup m:autoclosable m:target=anchor|position';
import Button from 'b:Button';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            popupVisible : false,
            popup1Visible : false,
            popup2Visible : false,
            popup3Visible : false
        };

        this._onButton1Click = this._onButton1Click.bind(this);
        this._onButton2Click = this._onButton2Click.bind(this);
        this._onButton3Click = this._onButton3Click.bind(this);
        this._refButton1 = this._refButton1.bind(this);
        this._refButton2 = this._refButton2.bind(this);
        this._refButton3 = this._refButton3.bind(this);

        this.requestPopup1Hide = this.requestPopup1Hide.bind(this);
        this.requestPopup2Hide = this.requestPopup2Hide.bind(this);
        this.requestPopup3Hide = this.requestPopup3Hide.bind(this);
    }

    _onButton1Click() {
        this.setState({ popup1Visible : !this.state.popup1Visible });
    }

    _onButton2Click() {
        this.setState({ popup2Visible : !this.state.popup2Visible });
    }

    _onButton3Click() {
        this.setState({ popup3Visible : !this.state.popup3Visible });
    }

    _refButton1(button) {
        if(button) this._button1 = button;
        else return this._button1;
    }

    _refButton2(button) {
        if(button) this._button2 = button;
        else return this._button2;
    }

    _refButton3(button) {
        if(button) this._button3 = button;
        else return this._button3;
    }

    requestPopup1Hide() {
        this.setState({ popup1Visible : false });
    }

    requestPopup2Hide() {
        this.setState({ popup2Visible : false });
    }

    requestPopup3Hide() {
        this.setState({ popup3Visible : false });
    }

    render() {
        return (
            <Bem block="Examples">
                <Bem block="Example">
                    <Button
                        ref={this._refButton1}
                        onClick={this._onButton1Click}>
                        toggle with button
                    </Button>
                    <Popup
                        target="anchor"
                        visible={this.state.popup1Visible}
                        onHide={this.requestPopup1Hide}
                        directions={['bottom-right']}
                        anchor={this._refButton1}>
                        <Button
                            ref={this._refButton2}
                            onClick={this._onButton2Click}>
                            toggle with button
                        </Button>
                        <Popup
                            target="anchor"
                            autoclosable
                            visible={this.state.popup2Visible}
                            onHide={this.requestPopup2Hide}
                            directions={['bottom-right']}
                            anchor={this._refButton2}>
                            <Button
                                ref={this._refButton3}
                                onClick={this._onButton3Click}>
                                toggle with button
                            </Button>
                            <Popup
                                target="anchor"
                                visible={this.state.popup3Visible}
                                onHide={this.requestPopup3Hide}
                                directions={['bottom-right']}
                                anchor={this._refButton3}>
                                3
                            </Popup>
                            2
                        </Popup>
                        1
                    </Popup>
                </Bem>
            </Bem>
        );
    }

}

ReactDom.render(<App/>, document.getElementById('root'));
