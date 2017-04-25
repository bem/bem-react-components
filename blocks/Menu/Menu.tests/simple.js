import React from 'react';
import ReactDom from 'react-dom';
import Menu from 'b:Menu m:mode=radio|check|radio-check';
import MenuItem from 'b:Menu e:Item';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.onChangeRadio = this.onChangeRadio.bind(this);
        this.onChangeCheck = this.onChangeCheck.bind(this);
        this.onChangeRadioCheck = this.onChangeRadioCheck.bind(this);

        this.state = {
            menuRadioValue : 2,
            menuCheckValue : [2],
            menuRadioCheckValue : 2
        };
    }

    onChangeRadio(value) {
        console.log(value);
        this.setState({ menuRadioValue : value });
    }

    onChangeCheck(value) {
        console.log(value);
        this.setState({ menuCheckValue : value });
    }

    onChangeRadioCheck(value) {
        console.log(value);
        this.setState({ menuRadioCheckValue : value });
    }

    render() {
        return (
            <div>
                <Menu
                    mode="radio"
                    value={this.state.menuRadioValue}
                    onChange={this.onChangeRadio}>
                    <MenuItem value={1}>one</MenuItem>
                    <MenuItem value={2}>two</MenuItem>
                    <MenuItem value={3}>three</MenuItem>
                </Menu>
                <br/>
                <Menu
                    mode="check"
                    value={this.state.menuCheckValue}
                    onChange={this.onChangeCheck}>
                    <MenuItem value={1}>one</MenuItem>
                    <MenuItem value={2}>two</MenuItem>
                    <MenuItem value={3}>three</MenuItem>
                </Menu>
                <br/>
                <Menu
                    mode="radio-check"
                    value={this.state.menuRadioCheckValue}
                    onChange={this.onChangeRadioCheck}>
                    <MenuItem value={1}>one</MenuItem>
                    <MenuItem value={2}>two</MenuItem>
                    <MenuItem value={3}>three</MenuItem>
                </Menu>
            </div>
        );
    }
}

ReactDom.render(<App/>, document.getElementById('root'));
