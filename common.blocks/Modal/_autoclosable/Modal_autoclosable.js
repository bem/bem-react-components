import { declMod } from 'bem-react-core';

export default declMod({ autoclosable : true }, {
    block : 'Modal',

    mods({ autoclosable }) {
        return { autoclosable };
    },

    willInit() {
        this.__base(...arguments);

        if(this.props.onClose === this.__self.defaultProps.onClose)
            throw Error('Modal_autoclosable: you must provide prop onClose');

        this._isClickInside = false;

        this._onDocumentClick = this._onDocumentClick.bind(this);
    },

    didUpdate({ opened }) {
        opened !== this.props.opened && (opened?
            document.removeEventListener('click', this._onDocumentClick) :
            document.addEventListener('click', this._onDocumentClick));
    },

    _onClick() {
        this._isClickInside = true;
    },

    _onDocumentClick() {
        this._isClickInside || this.props.onClose();
        this._isClickInside = false;
    },

    _popupProps({ autoclosable }) {
        return {
            ...this.__base(...arguments),
            autoclosable
        };
    }
});
