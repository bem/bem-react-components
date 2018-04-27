import React from 'react';
import ReactDom from 'react-dom';
import Select from 'b:Select m:mode=radio|check|radio-check';
import SelectOption from 'b:Select e:Option';
import SelectGroup from 'b:Select e:Group';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            openedRadio : false,
            openedCheck : false,
            openedRadioCheck : false
        };

        this.onRadioClose = this.onRadioClose.bind(this);
        this.onRadioOpen = this.onRadioOpen.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this);

        this.onCheckClose = this.onCheckClose.bind(this);
        this.onCheckOpen = this.onCheckOpen.bind(this);
        this.onCheckChange = this.onCheckChange.bind(this);

        this.onRadioCheckClose = this.onRadioCheckClose.bind(this);
        this.onRadioCheckOpen = this.onRadioCheckOpen.bind(this);
        this.onRadioCheckChange = this.onRadioCheckChange.bind(this);
    }

    onRadioClose() {
        this.setState({ openedRadio : false });
    }

    onRadioOpen() {
        this.setState({ openedRadio : true });
    }

    onRadioChange(value) {
        console.log('onRadioChange', value);
        this.setState({ valueRadio : value });
    }

    onCheckClose() {
        this.setState({ openedCheck : false });
    }

    onCheckOpen() {
        this.setState({ openedCheck : true });
    }

    onCheckChange(value) {
        console.log('onCheckChange', value);
        this.setState({ valueCheck : value });
    }

    onRadioCheckClose() {
        this.setState({ openedRadioCheck : false });
    }

    onRadioCheckOpen() {
        this.setState({ openedRadioCheck : true });
    }

    onRadioCheckChange(value) {
        console.log('onRadioCheckChange', value);
        this.setState({ valueRadioCheck : value });
    }

    render() {
        return (
            <div>
                <Select
                    text="–"
                    name="s1"
                    mode="radio"
                    value={this.state.valueRadio}
                    opened={this.state.openedRadio}
                    onChange={this.onRadioChange}
                    onClose={this.onRadioClose}
                    onOpen={this.onRadioOpen}
                    disabled>
                    <SelectOption value={1}>One</SelectOption>
                    <SelectOption value={2}>Two</SelectOption>
                    <SelectOption value={3}>Three</SelectOption>
                </Select>
                <br/>
                <Select
                    text="–"
                    name="s2"
                    mode="check"
                    value={this.state.valueCheck}
                    opened={this.state.openedCheck}
                    onChange={this.onCheckChange}
                    onClose={this.onCheckClose}
                    onOpen={this.onCheckOpen}>
                    <SelectOption value={1}>One</SelectOption>
                    <SelectOption value={2}>Two</SelectOption>
                    <SelectOption value={3}>Three</SelectOption>
                    <SelectGroup title="group">
                        <SelectOption value={4}>Fore</SelectOption>
                        <SelectOption value={5}>Five</SelectOption>
                        <SelectOption value={6}>Six</SelectOption>
                    </SelectGroup>
                </Select>
                <br/>
                <Select
                    text="–"
                    name="s3"
                    mode="radio-check"
                    value={this.state.valueRadioCheck}
                    opened={this.state.openedRadioCheck}
                    onChange={this.onRadioCheckChange}
                    onClose={this.onRadioCheckClose}
                    onOpen={this.onRadioCheckOpen}>
                    <SelectOption disabled value={1}>One disabled</SelectOption>
                    <SelectOption value={2}>Two</SelectOption>
                    <SelectOption value={3}>Three</SelectOption>
                </Select>
            </div>
        );
    }
}

ReactDom.render(<App/>, document.getElementById('root'));
