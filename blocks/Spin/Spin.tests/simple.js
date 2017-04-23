import React from 'react';
import ReactDom from 'react-dom';
import Spin from 'b:Spin';

class App extends React.Component {

    render() {
        return (
            <div>
                <Spin size='xxs' progress />
                <Spin size='xs' progress />
                <Spin size='s' progress />
                <Spin size='m' progress />
                <Spin size='l' progress />
            </div>
        );
    }

}

ReactDom.render(<App/>, document.getElementById('root'));
