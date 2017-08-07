import React from 'react';
import ReactDom from 'react-dom';
import RadioGroup from 'b:RadioGroup m:type=button m:mode=radio-check';
import RadioGroupOption from 'b:RadioGroup e:Option';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value1 : 2,
            value2 : 1,
            value3 : 1,
            value4 : 3,
            value5 : 3
        };

        this.onChange1 = this.onChange1.bind(this);
        this.onChange2 = this.onChange2.bind(this);
        this.onChange3 = this.onChange3.bind(this);
        this.onChange4 = this.onChange4.bind(this);
        this.onChange5 = this.onChange5.bind(this);
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
        this.setState({ value4 });
    }

    onChange5(value5) {
        this.setState({ value5 });
    }

    render() {
        return (
            <div>
                <RadioGroup value={this.state.value1} name="default1" onChange={this.onChange1}>
                    <RadioGroupOption value={1} text="first"/>
                    <RadioGroupOption value={2} text="second"/>
                    <RadioGroupOption value={3} text="third" disabled/>
                </RadioGroup>
                <br/>
                <RadioGroup
                    value={this.state.value2}
                    name="default2"
                    onChange={this.onChange2}
                    disabled>
                    <RadioGroupOption value={1} text="first"/>
                    <RadioGroupOption value={2} text="second"/>
                </RadioGroup>
                <br/>
                <RadioGroup
                    type="line"
                    value={this.state.value3}
                    name="default3"
                    onChange={this.onChange3}>
                    <RadioGroupOption value={1} text="first"/>
                    <RadioGroupOption value={2} text="second"/>
                    <RadioGroupOption value={3} text="third" disabled/>
                </RadioGroup>
                <br/>
                <RadioGroup
                    type="button"
                    value={this.state.value4}
                    name="default4"
                    onChange={this.onChange4}>
                    <RadioGroupOption value={1} text="first"/>
                    <RadioGroupOption value={2} text="second"/>
                    <RadioGroupOption value={3} text="third" disabled/>
                    <RadioGroupOption value={4} text="fourth" disabled/>
                </RadioGroup>
                <br/>
                <RadioGroup
                    type="button"
                    mode="radio-check"
                    value={this.state.value5}
                    name="default4"
                    onChange={this.onChange5}>
                    <RadioGroupOption value={1} text="first"/>
                    <RadioGroupOption value={2} text="second"/>
                    <RadioGroupOption value={3} text="third"/>
                </RadioGroup>
            </div>
        );
    }
}

ReactDom.render(<App/>, document.getElementById('root'));
