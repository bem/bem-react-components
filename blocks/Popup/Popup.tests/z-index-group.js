import React from 'react';
import ReactDom from 'react-dom';
import Bem from 'bem-react-core';
import Popup from 'b:Popup m:target=anchor';
import Button from 'b:Button';
import ZIndexGroup from 'b:ZIndexGroup';
import './z-index-group.css';

class Example extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <Bem block="Example"
                attrs={{
                    style : {
                        ...this.context.zIndexGroupStyle,
                        position : 'relative'
                    }
                }}>
                {this.props.children}
            </Bem>
        );
    }
}

Example.contextTypes = {
    zIndexGroupStyle : React.PropTypes.object
};

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            popupVisible : false,
            popup1Visible : false,
            popup2Visible : false,
            popup3Visible : false,
            popup4Visible : false
        };

        this._onButton1Click = this._onButton1Click.bind(this);
        this._onButton2Click = this._onButton2Click.bind(this);
        this._onButton3Click = this._onButton3Click.bind(this);
        this._onButton4Click = this._onButton4Click.bind(this);
        this._refButton1 = this._refButton1.bind(this);
        this._refButton2 = this._refButton2.bind(this);
        this._refButton3 = this._refButton3.bind(this);
        this._refButton4 = this._refButton4.bind(this);
        this._requestPopup1Hide = this._requestPopup1Hide.bind(this);
        this._requestPopup2Hide = this._requestPopup2Hide.bind(this);
        this._requestPopup3Hide = this._requestPopup3Hide.bind(this);
        this._requestPopup4Hide = this._requestPopup4Hide.bind(this);
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

    _onButton4Click() {
        this.setState({ popup4Visible : !this.state.popup4Visible });
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

    _refButton4(button) {
        if(button) this._button4 = button;
        else return this._button4;
    }


    _requestPopup1Hide() {
        this.setState({ popup1Visible : false });
    }

    _requestPopup2Hide() {
        this.setState({ popup2Visible : false });
    }

    _requestPopup3Hide() {
        this.setState({ popup3Visible : false });
    }

    _requestPopup4Hide() {
        this.setState({ popup4Visible : false });
    }

    render() {
        return (
            <Bem block="Examples">
                <ZIndexGroup level={1}>
                    <Example>
                        some header with level 1
                        <Button
                            ref={this._refButton1}
                            onClick={this._onButton1Click}>
                            toggle 1
                        </Button>
                        <Popup
                            target="anchor"
                            visible={this.state.popup1Visible}
                            onHide={this._requestPopup1Hide}
                            directions={['bottom-center']}
                            anchor={this._refButton1}>
                            1
                        </Popup>
                    </Example>
                </ZIndexGroup>
                <hr/>
                <Example>
                    default level
                    <Button
                        ref={this._refButton2}
                        onClick={this._onButton2Click}>
                        toggle 2
                    </Button>
                    <Popup
                        target="anchor"
                        visible={this.state.popup2Visible}
                        onHide={this._requestPopup2Hide}
                        directions={['bottom-left']}
                        anchor={this._refButton2}>
                        2
                    </Popup>
                    <Button
                        ref={this._refButton3}
                        onClick={this._onButton3Click}>
                        toggle 3
                    </Button>
                    <Popup
                        target="anchor"
                        visible={this.state.popup3Visible}
                        onHide={this._requestPopup3Hide}
                        directions={['bottom-right']}
                        anchor={this._refButton3}>
                        3
                    </Popup>
                </Example>
                <ZIndexGroup level={2}>
                    <Example>
                        level 2
                        <Button
                            ref={this._refButton4}
                            onClick={this._onButton4Click}>
                            toggle 4
                        </Button>
                        <Popup
                            target="anchor"
                            visible={this.state.popup4Visible}
                            onHide={this._requestPopup4Hide}
                            directions={['bottom-center']}
                            anchor={this._refButton4}>
                            4
                        </Popup>
                    </Example>
                </ZIndexGroup>
            </Bem>
        );
    }

}

ReactDom.render(<App/>, document.getElementById('root'));
