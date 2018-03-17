import { decl } from 'bem-react-core';
import React from 'react';
import PropTypes from 'prop-types';
import Stylable from 'b:Stylable';
import File from 'e:File';
import NoFile from 'e:NoFile';

export default decl([Stylable], {
    block : 'Attach',

    willInit() {
        this.state = { value : '' };

        this._onChange = this._onChange.bind(this);
        this._onClearClick = this._onClearClick.bind(this);
        this._setStateValue = this._setStateValue.bind(this);
    },

    tag : 'span',

    content({ noFileText }) {
        return this.state.value ?
            <File key="file" value={this.state.value} onClearClick={this._onClearClick}/> :
            <NoFile key="no-file">{noFileText}</NoFile>;
    },

    _onChange({ target }) {
        this._setStateValue(target.value);
    },

    _onClearClick() {
        this._setStateValue('');
    },

    _setStateValue(value) {
        this.setState(
            { value : value },
            () => this.props.onChange(this.state.value));
    }
}, {
    propTypes : {
        switcher : PropTypes.string,
        text : PropTypes.string,
        noFileText : PropTypes.string,
        onChange : PropTypes.func
    },

    defaultProps : {
        switcher : 'button',
        onChange() {}
    }
});
