import React from 'react';
import ReactDom from 'react-dom';
import ProgressBar from 'b:ProgressBar';
import Button from 'b:Button';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            progressValue: 0
        };

        this.onClick = this.onClick.bind(this);
        this.onClickLinear = this.onClickLinear.bind(this);
        this.onClickFull = this.onClickFull.bind(this);
    }

    onClick() {
        this.setState({progressValue: 0.1, progressTiming: 'custom'});
    }

    onClickLinear() {
        this.setState({progressValue: 0.5, progressTiming: 'linear'});
    }

    onClickFull() {
        this.setState({progressValue: 1, progressTiming: undefined});
    }

    render() {
        return (
            <div>
                <ProgressBar value={this.state.progressValue} timing={this.state.progressTiming} />
                <Button onClick={this.onClick}>Update 0.1, custom</Button>
                <Button onClick={this.onClickLinear}>Update 0.5, linear</Button>
                <Button onClick={this.onClickFull}>Update 1</Button>
            </div>
        );
    }

}

ReactDom.render(<App/>, document.getElementById('root'));
