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
        this._refAll = this._refAll.bind(this);
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

    _refAll(all) {
        this._all = all;
    }

    render() {
        return (
            <Bem block="Examples">
                <Bem block="Example">
                    <Link
                        pseudo
                        onClick={() => this.setState({ popupVisible: !this.state.popupVisible })}
                        ref={ref => this._l1 = ref}>
                        toggle with link
                    </Link>
                    <Popup
                        target="anchor"
                        anchor={() => this._l1}
                        visible={this.state.popupVisible}>
                        popup content
                    </Popup>
                </Bem>
                <Bem block="Example">
                    <Button
                        ref={b1 => this._b1 = b1}
                        onClick={this.onButton1Click}>
                        toggle with button
                    </Button>
                    <Popup
                        target="anchor"
                        visible={this.state.popup1Visible}
                        anchor={() => this._b1}>
                        popup content
                    </Popup>
                </Bem>
                <Bem block="Example" mods={{'has-tail' : true }}>
                    <Button
                        onClick={this.onButton2Click}>
                        left: 50, top: 50
                    </Button>
                    <Popup
                        visible={this.state.popup2Visible}
                        target="position"
                        position={{ left: 50, top: 50 }}>
                        left: 50, top: 50
                    </Popup>
                </Bem>
                <Bem block="Example" mods={{ autoclosable : true }}>
                    <Button
                        ref={b3 => this._b3 = b3}
                        onClick={this.onButton3Click}>
                        autoclosable
                    </Button>
                    <Popup
                        autoclosable
                        directions={['right-center']}
                        target="anchor"
                        visible={this.state.popup3Visible}
                        anchor={() => this._b3}>
                        close on outside click
                    </Popup>
                </Bem>
                {/* TODO after bem-react-core/issues/71 */}
                <div className="Example Example_directions" ref={this._refAll}>
                    <Button
                        onClick={this.onButton4Click}>
                        toggle all
                    </Button>
                    {directions.map(function(direction) {
                        return (<Popup
                            directions={[direction]}
                            key={direction}
                            visible={this.state.popup4Visible}
                            target="anchor"
                            anchor={() => this._all}>
                            {direction}
                        </Popup>);
                    }, this)}
                </div>
            </Bem>
        );
    }

}

ReactDom.render(<App/>, document.getElementById('root'));
