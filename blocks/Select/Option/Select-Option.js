import React from 'react';
import PropTypes from 'prop-types';
import { decl } from 'bem-react-core';
import MenuItem from 'b:Menu e:Item';

export default decl({
    block : 'Select',
    elem : 'Option',
    render() {
        const { block, elem, props } = this;
        return (<MenuItem
            {...props}
            mix={{ block, elem }}
            id={this.context._optionIdsByValue[props.value]}/>);
    }
}, {
    contextTypes : {
        _optionIdsByValue : PropTypes.object
    }
});
