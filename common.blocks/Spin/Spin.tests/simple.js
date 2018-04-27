import React from 'react';
import ReactDom from 'react-dom';
import Spin from 'b:Spin';

function App() {
    return (
        <div>
            <Spin progress/>
        </div>
    );
}

ReactDom.render(<App/>, document.getElementById('root'));
