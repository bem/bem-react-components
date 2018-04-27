import { decl } from 'bem-react-core';

export default decl({
    block : 'Radio',

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
            ref : ref => this._domNode = ref,
            id,
            name,
            tabIndex,
            type : 'radio',
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
        this.props.onChange(target.checked, this.props.value);
    },

    _onFocus() {
        this.props.onFocusChange(true);
    },

    _onBlur() {
        this.props.onFocusChange(false);
    },

    _focus() {
        document.activeElement !== this._domNode && this._domNode.focus();
    },

    _blur() {
        document.activeElement === this._domNode && this._domNode.blur();
    }
});
