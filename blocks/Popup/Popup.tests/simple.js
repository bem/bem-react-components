import React from 'react';
import ReactDom from 'react-dom';
import Popup from 'b:Popup m:autoclosable m:target=anchor';
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
            <div className='examples'>
{/*
                <div className='example'>
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
                </div>
                <div className='example'>
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
                </div>
                <div className='example example_has-tail'>
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
                </div>
                <div className='example example_autoclosable'>
                    <Button
                        ref={b3 => this._b3 = b3}
                        onClick={this.onButton3Click}>
                        autoclosable
                    </Button>
                    <Popup
                        autoclosable
                        directions={['right-center']}
                        visible={this.state.popup3Visible}
                        anchor={() => this._b3}>
                        close on outside click
                    </Popup>
                </div>
*/}
                <div className='example example_directions' ref={this._refAll} style={{ background: 'green' }}>
                    <Button
                        onClick={this.onButton4Click}>
                        toggle all
                    </Button>
                    {['bottom-center'].map(function(direction) {
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
            </div>
        );
    }

}

ReactDom.render(<App/>, document.getElementById('root'));
