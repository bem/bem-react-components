import React from 'react';
import ReactDom from 'react-dom';
import Link from 'b:Link m:pseudo';
import Popup from 'b:Popup m:autoclosable';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            popupVisible : false,
        };
    }

    render() {
        return (
            <div>
                <Link pseudo onClick={() => this.setState({ popupVisible: !this.state.popupVisible })}>Open popup</Link>
                <Popup
                    autoclosable
                    visible={this.state.popupVisible}
                    onVisibleChange={visible => this.setState({ popupVisible: visible })}
                >
                    Blah-blah
                </Popup>
            </div>
        );
    }

    componentDidMount() {
        // setTimeout(() => {
        //     this.setState({ buttonDisabled : true })
        // }, 3000);
        //
        // setTimeout(() => {
        //     this.setState({ buttonDisabled : false })
        // }, 2000);
    }
}

ReactDom.render(<App/>, document.getElementById('root'));
