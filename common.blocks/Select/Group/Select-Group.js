import React from 'react';
import { decl } from 'bem-react-core';
import MenuGroup from 'b:Menu e:Group';

export default decl({
    block : 'Select',
    elem : 'Group',
    render() {
        const { block, elem, props } = this;
        return <MenuGroup mix={{ block, elem }} {...props}/>;
    }
});
