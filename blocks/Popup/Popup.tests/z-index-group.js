import React from 'react';
import ReactDom from 'react-dom';
import Bem, {decl} from 'bem-react-core';
import Popup from 'b:Popup m:target=anchor';
import Button from 'b:Button';
import ZIndexGroup from 'b:ZIndexGroup';
import './z-index-group.css';

class Example extends React.Component {
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
    zIndexGroupStyle: React.PropTypes.object
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            popupVisible: false,
            popup1Visible: false,
            popup2Visible: false,
            popup3Visible: false,
            popup4Visible: false
        };

        this.onButton1Click = this.onButton1Click.bind(this);
        this.onButton2Click = this.onButton2Click.bind(this);
        this.onButton3Click = this.onButton3Click.bind(this);
        this.onButton4Click = this.onButton4Click.bind(this);

        this.requestPopup1Hide = this.requestPopup1Hide.bind(this);
        this.requestPopup2Hide = this.requestPopup2Hide.bind(this);
        this.requestPopup3Hide = this.requestPopup3Hide.bind(this);
        this.requestPopup4Hide = this.requestPopup4Hide.bind(this);
    }

    onButton1Click() {
        this.setState({popup1Visible: !this.state.popup1Visible});
    }

    onButton2Click() {
        this.setState({popup2Visible: !this.state.popup2Visible});
    }

    onButton3Click() {
        this.setState({popup3Visible: !this.state.popup3Visible});
    }

    onButton4Click() {
        this.setState({popup4Visible: !this.state.popup4Visible});
    }

    requestPopup1Hide() {
        this.setState({popup1Visible: false});
    }

    requestPopup2Hide() {
        this.setState({popup2Visible: false});
    }

    requestPopup3Hide() {
        this.setState({popup3Visible: false});
    }

    requestPopup4Hide() {
        this.setState({popup4Visible: false});
    }

    render() {
        return (
            <Bem block="Examples">
                <ZIndexGroup level={1}>
                    <Example>
                        some header with level 1
                        <Button
                            ref={b1 => this._b1 = b1}
                            onClick={this.onButton1Click}>
                            toggle 1
                        </Button>
                        <Popup
                            target="anchor"
                            visible={this.state.popup1Visible}
                            requestHide={this.requestPopup1Hide}
                            directions={['bottom-center']}
                            anchor={() => this._b1}>
                            1
                        </Popup>
                    </Example>
                </ZIndexGroup>
                <hr/>
                <Example>
                    default level
                    <Button
                        ref={b2 => this._b2 = b2}
                        onClick={this.onButton2Click}>
                        toggle 2
                    </Button>
                    <Popup
                        target="anchor"
                        visible={this.state.popup2Visible}
                        requestHide={this.requestPopup2Hide}
                        directions={['bottom-left']}
                        anchor={() => this._b2}>
                        2
                    </Popup>
                    <Button
                        ref={b3 => this._b3 = b3}
                        onClick={this.onButton3Click}>
                        toggle 3
                    </Button>
                    <Popup
                        target="anchor"
                        visible={this.state.popup3Visible}
                        requestHide={this.requestPopup3Hide}
                        directions={['bottom-right']}
                        anchor={() => this._b3}>
                        3
                    </Popup>
                </Example>
                <ZIndexGroup level={2}>
                    <Example>
                        level 2
                        <Button
                            ref={b4 => this._b4 = b4}
                            onClick={this.onButton4Click}>
                            toggle 4
                        </Button>
                        <Popup
                            target="anchor"
                            visible={this.state.popup4Visible}
                            requestHide={this.requestPopup4Hide}
                            directions={['bottom-center']}
                            anchor={() => this._b4}>
                            4
                        </Popup>
                    </Example>
                </ZIndexGroup>
            </Bem>
        );
    }

}

ReactDom.render(<App/>, document.getElementById('root'));
