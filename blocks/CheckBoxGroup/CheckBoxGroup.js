import React, { Children } from 'React';
import PropTypes from 'prop-types';
import { decl } from 'bem-react-core';

export default decl({
    block : 'CheckBoxGroup',

    getChildContext() {
        const { name, type, value, disabled } = this.props;
        return {
            _checkBoxGroupName : name,
            _checkBoxGroupType : type,
            _checkBoxGroupValue : value,
            _checkBoxGroupDisabled : disabled
        };
    },

    content({ children }) {
        const res = [];

        Children.forEach(children, (option, i) => {
            i && res.push(<br key={i}/>);
            res.push(option);
        });

        return res;
    }
}, {
    propTypes : {
        name : PropTypes.string,
        type : PropTypes.string,
        value : PropTypes.array,
        disabled : PropTypes.bool
    },

    defaultProps : {
        value : []
    },

    childContextTypes : {
        _checkBoxGroupName : PropTypes.string,
        _checkBoxGroupType : PropTypes.string,
        _checkBoxGroupValue : PropTypes.array,
        _checkBoxGroupDisabled : PropTypes.bool
    }
});
