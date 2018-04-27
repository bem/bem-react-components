import React from 'react';
import ReactDom from 'react-dom';
import Bem from 'bem-react-core';
import './simple.css';
import Popup from 'b:Popup m:autoclosable m:target=anchor|position';
import Link from 'b:Link m:pseudo';
import Button from 'b:Button';

const directions = [
    'bottom-left', 'bottom-center', 'bottom-right',
    'top-left', 'top-center', 'top-right',
    'right-top', 'right-center', 'right-bottom',
    'left-top', 'left-center', 'left-bottom'
];

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
        this._onLink1Click = this._onLink1Click.bind(this);
        this._refButton1 = this._refButton1.bind(this);
        this._refButton3 = this._refButton3.bind(this);
        this._refButton4 = this._refButton4.bind(this);
        this._refLink1 = this._refLink1.bind(this);
        this._refAll = this._refAll.bind(this);
        this._requestPopup3Hide = this._requestPopup3Hide.bind(this);
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

    _onLink1Click() {
        this.setState({ popupVisible : !this.state.popupVisible });
    }

    _refButton1(button) {
        if(button) this._button1 = button;
        else return this._button1;
    }

    _refButton3(button) {
        if(button) this._button3 = button;
        else return this._button3;
    }

    _refButton4(button) {
        if(button) this._button4 = button;
        else return this._button4;
    }

    _refLink1(link) {
        if(link) this._link1 = link;
        else return this._link1;
    }

    _refAll(all) {
        if(all) this._all = all;
        else return this._all;
    }

    _requestPopup3Hide() {
        this.setState({ popup3Visible : false });
    }

    render() {
        return (
            <Bem block="Examples">
                <Bem block="Example">
                    <Link
                        pseudo
                        onClick={this._onLink1Click}
                        ref={this._refLink1}>
                        toggle with link
                    </Link>
                    <Popup
                        target="anchor"
                        anchor={this._refLink1}
                        visible={this.state.popupVisible}>
                        popup content
                    </Popup>
                </Bem>
                <Bem block="Example">
                    <Button
                        ref={this._refButton1}
                        onClick={this._onButton1Click}>
                        toggle with button
                    </Button>
                    <Popup
                        target="anchor"
                        visible={this.state.popup1Visible}
                        anchor={this._refButton1}>
                        popup content
                    </Popup>
                </Bem>
                <Bem block="Example" mods={{ 'has-tail' : true }}>
                    <Button
                        onClick={this._onButton2Click}>
                        left: 50, top: 50
                    </Button>
                    <Popup
                        visible={this.state.popup2Visible}
                        target="position"
                        position={{ left : 50, top : 50 }}>
                        left: 50, top: 50
                    </Popup>
                </Bem>
                <Bem block="Example" mods={{ autoclosable : true }}>
                    <Button
                        ref={this._refButton3}
                        onClick={this._onButton3Click}>
                        autoclosable
                    </Button>
                    <Popup
                        autoclosable
                        onHide={this._requestPopup3Hide}
                        directions={['right-center']}
                        target="anchor"
                        visible={this.state.popup3Visible}
                        anchor={this._refButton3}>
                        close on outside click
                    </Popup>
                </Bem>
                <Bem block="Example" mods={{ directions : true }} attrs={{ ref : this._refAll }}>
                    <Button
                        onClick={this._onButton4Click}>
                        toggle all
                    </Button>
                    {directions.map(function(direction) {
                        return (<Popup
                            directions={[direction]}
                            key={direction}
                            visible={this.state.popup4Visible}
                            target="anchor"
                            anchor={this._refAll}>
                            {direction}
                        </Popup>);
                    }, this)}
                </Bem>
            </Bem>
        );
    }

}

ReactDom.render(<App/>, document.getElementById('root'));
