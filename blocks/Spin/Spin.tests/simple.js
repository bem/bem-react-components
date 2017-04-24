import React from 'react';
import ReactDom from 'react-dom';
import Spin from 'b:Spin';

class App extends React.Component {
    render() {
        return (
            <div>
                <Spin progress/>
            </div>
        );
    }
}

ReactDom.render(<App/>, document.getElementById('root'));
