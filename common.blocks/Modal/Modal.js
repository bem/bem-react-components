import React from 'react';
import PropTypes from 'prop-types';
import Bem, { decl } from 'bem-react-core';
import Stylable from 'b:Stylable';
import Popup from 'b:Popup';

export default decl([Stylable], {
    block : 'Modal',

    willInit() {
        this._onClick = this._onClick.bind(this);
    },

    render() {
        const { props, block } = this;
        return (
            <Popup {...this._popupProps(props)}>
                <Bem block={block} elem="table">
                    <Bem elem="cell">
                        <Bem elem="content" attrs={{ onClick : this._onClick }}>
                            {props.children}
                        </Bem>
                    </Bem>
                </Bem>
            </Popup>
        );
    },

    _onClick() {},

    _popupProps(props) {
        return {
            mix : [{ block : this.block, mods : this.mods(props) }, ...this.mix(props)],
            zIndexGroup : props.zIndexGroup || 20,
            onHide : props.onClose,
            visible : props.opened,
            theme : props.theme,
            size : props.size,
            role : 'dialog'
        };
    }
}, {
    propTypes : {
        autoclosable : PropTypes.bool,
        opened : PropTypes.bool.isRequired,
        onClose : PropTypes.func
    },

    defaultProps : {
        onClose() {}
    }
});
