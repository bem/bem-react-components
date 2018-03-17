import React from 'react';
import ReactDom from 'react-dom';
import Attach from 'b:Attach m:switcher=button';
import Icon from 'b:Icon';

function App() {
    return (
        <div>
            <Attach text="Choose file" noFileText="no file"/>
            <br/>
            <Attach icon={<Icon url="https://yandex.st/lego/_/pDu9OWAQKB0s2J9IojKpiS_Eho.ico"/>}/>
        </div>
    );
}

ReactDom.render(<App/>, document.getElementById('root'));
