import {decl} from 'bem-react-core';
import ReactDom from 'react-dom';

export default decl({
    block : 'CheckBox',

    elem : 'Control',

    willInit() {
        this._onChange = this._onChange.bind(this);
        this._onFocus = this._onFocus.bind(this);
        this._onBlur = this._onBlur.bind(this);
    },

    didMount() {
        this.props.focused?
            this._focus() :
            this._blur();
    },

    didUpdate() {
        this.props.focused?
            this._focus() :
            this._blur();
    },

    tag : 'input',

    attrs({ id, name, tabIndex, value, checked, disabled }) {
        let res = {
            id,
            name,
            tabIndex,
            type : 'checkbox',
            autoComplete : 'off',
            value,
            checked,
            disabled,
            onChange : this._onChange,
            onBlur : this._onBlur
        };

        disabled || (res.onFocus = this._onFocus);

        return res;
    },

    _onChange({ target }) {
        this.props.onChange(target.checked);
    },

    _onFocus() {
        this.props.onFocusChange(true);
    },

    _onBlur() {
        this.props.onFocusChange(false);
    },

    _focus() {
        const domNode = ReactDom.findDOMNode(this);
        document.activeElement !== domNode && domNode.focus();
    },

    _blur() {
        const domNode = ReactDom.findDOMNode(this);
        document.activeElement === domNode && domNode.blur();
    }
});
