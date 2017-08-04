import React from 'react';
import ReactDom from 'react-dom';
import CheckBoxGroup from 'b:CheckBoxGroup m:type=button';
import CheckBoxGroupOption from 'b:CheckBoxGroup e:Option';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value1 : [2],
            value2 : [1, 2],
            value3 : [1],
            value4 : [1, 3]
        };

        this.onChange1 = this.onChange1.bind(this);
        this.onChange2 = this.onChange2.bind(this);
        this.onChange3 = this.onChange3.bind(this);
        this.onChange4 = this.onChange4.bind(this);
    }

    onChange1(value1) {
        this.setState({ value1 });
    }

    onChange2(value2) {
        this.setState({ value2 });
    }

    onChange3(value3) {
        this.setState({ value3 });
    }

    onChange4(value4) {
        console.log(value4);
        this.setState({ value4 });
    }

    render() {
        return (
            <div>
                <CheckBoxGroup value={this.state.value1} name="default1" onChange={this.onChange1}>
                    <CheckBoxGroupOption value={1} text="first"/>
                    <CheckBoxGroupOption value={2} text="second"/>
                    <CheckBoxGroupOption value={3} text="third" disabled/>
                </CheckBoxGroup>
                <br/>
                <CheckBoxGroup
                    value={this.state.value2}
                    name="default2"
                    onChange={this.onChange2}
                    disabled>
                    <CheckBoxGroupOption value={1} text="first"/>
                    <CheckBoxGroupOption value={2} text="second"/>
                </CheckBoxGroup>
                <br/>
                <CheckBoxGroup
                    type="line"
                    value={this.state.value3}
                    name="default3"
                    onChange={this.onChange3}>
                    <CheckBoxGroupOption value={1} text="first"/>
                    <CheckBoxGroupOption value={2} text="second"/>
                    <CheckBoxGroupOption value={3} text="third" disabled/>
                </CheckBoxGroup>
                <br/>
                <CheckBoxGroup
                    type="button"
                    value={this.state.value4}
                    name="default4"
                    onChange={this.onChange4}>
                    <CheckBoxGroupOption value={1} text="first"/>
                    <CheckBoxGroupOption value={2} text="second"/>
                    <CheckBoxGroupOption value={3} text="third" disabled/>
                    <CheckBoxGroupOption value={4} text="fourth" disabled/>
                </CheckBoxGroup>
            </div>
        );
    }
}

ReactDom.render(<App/>, document.getElementById('root'));
