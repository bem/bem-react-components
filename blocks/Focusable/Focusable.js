import React, {Component, cloneElement, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';

export default class Focusable extends Component {
    render() {
        const { children, onFocus, onBlur } = this.props;
        return React.cloneElement(children, { onFocus, onBlur });
    }

    componentDidMount() {
        this.props.focused?
            this._focus() :
            this._blur();
    }

    componentDidUpdate() {
        this.props.focused?
            this._focus() :
            this._blur();
    }

    _focus() {
        const domNode = findDOMNode(this);
        document.activeElement !== domNode && domNode.focus();
    }

    _blur() {
        const domNode = findDOMNode(this);
        document.activeElement === domNode && domNode.blur();
    }
}

Focusable.propTypes = {
    focused : PropTypes.bool,
    onFocus : PropTypes.func,
    onBlur : PropTypes.func
};


