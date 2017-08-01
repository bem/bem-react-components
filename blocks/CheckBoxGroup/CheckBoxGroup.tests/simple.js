import React from 'react';
import ReactDom from 'react-dom';
import CheckBoxGroup from 'b:CheckBoxGroup';
import CheckBoxGroupOption from 'b:CheckBoxGroup e:Option';

class App extends React.Component {
    constructor(props) {
        super(props);

        // this.state = {
        //     opened : false,
        //     openedAutoclosable : false
        // };

        // this.onLinkClick = this.onLinkClick.bind(this);
        // this.onLinkAutoclosabeClick = this.onLinkAutoclosabeClick.bind(this);
        // this.onModalClose = this.onModalClose.bind(this);
    }

    // onLinkClick() {
    //     this.setState({ opened : !this.state.opened });
    // }

    // onLinkAutoclosabeClick() {
    //     this.setState({ openedAutoclosable : true });
    // }

    // onModalClose() {
    //     this.setState({ openedAutoclosable : false });
    // }

    render() {
        return (
            <div>
                <CheckBoxGroup value={[2]} name="default1">
                    <CheckBoxGroupOption value={1} text="first"/>
                    <CheckBoxGroupOption value={2} text="second"/>
                    <CheckBoxGroupOption value={3} text="third" disabled/>
                </CheckBoxGroup>
                <br/>
                <CheckBoxGroup value={[2]} name="default2" disabled>
                    <CheckBoxGroupOption value={1} text="first"/>
                    <CheckBoxGroupOption value={2} text="second"/>
                </CheckBoxGroup>
                <br/>
                <CheckBoxGroup type="button" value={[2, 4]} name="default3">
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
