import React from 'react';
import ReactDom from 'react-dom';
import Button from 'b:Button';
import Icon from 'b:Icon';

ReactDom.render(<div>
    <Button text="button" onFocus={() => console.log('focused!')} />
    <br/>
    <Button icon={<Icon url="https://yandex.st/lego/_/pDu9OWAQKB0s2J9IojKpiS_Eho.ico"/>} text="button"/>
</div>, document.getElementById('root'));
