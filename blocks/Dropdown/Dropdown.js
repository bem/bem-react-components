import React from 'react';
import PropTypes from 'prop-types';
import { decl } from 'bem-react-core';
import Stylable from 'b:Stylable';
import Popup from 'b:Popup m:autoclosable m:target=anchor';

export default decl([Stylable], {
    block : 'Dropdown',

    willInit() {
        this._id = this.generateId();

        this._onSwitcherClick = this._onSwitcherClick.bind(this);
        this._anchorRef = this._anchorRef.bind(this);
    },

    content({ children, autoclosable, onClose, opened, theme, size }) {
        return (
            <Popup
                key="popup"
                mix={{ block : this.block, elem : 'popup' }}
                theme={theme}
                size={size}
                target="anchor"
                anchor={this._anchorRef}
                autoclosable
                onHide={onClose}
                visible={opened}>
                {children}
            </Popup>
        );
    },

    _onSwitcherClick() {
        const { opened, onClose, onOpen } = this.props;
        opened ? onClose() : onOpen();
    },

    _anchorRef(anchor) {
        if(anchor) this._anchor = anchor;
        else return this._anchor;
    }
}, {
    propTypes : {
        text : PropTypes.string,
        switcher : PropTypes.oneOf(['button', 'link']),
        autoclosable : PropTypes.bool,
        disabled : PropTypes.bool,
        opened : PropTypes.bool.isRequired,
        onOpen : PropTypes.func.isRequired,
        onClose : PropTypes.func.isRequired,
        focused : PropTypes.bool,
        onFocusChange : PropTypes.func
    },

    defaultProps : {
        autoclosable : true,
        onFocusChange() {}
    }
});
