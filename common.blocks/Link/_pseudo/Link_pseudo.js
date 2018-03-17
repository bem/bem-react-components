import { declMod } from 'bem-react-core';

export default declMod({ pseudo : true }, {
    block : 'Link',

    willInit() {
        this.__base(...arguments);
        this._onKeyDown = this._onKeyDown.bind(this);
    },

    tag({ url }) {
        return url? 'a' : 'span';
    },

    attrs({ url }) {
        const res = this.__base(...arguments);

        url || (res.role = 'button');

        this.state.focused && (res.onKeyDown = this._onKeyDown);

        return res;
    },

    _onClick(e) {
        e.preventDefault();

        this.__base(...arguments);
    },

    _onKeyDown : function(e) {
        e.key === 'Enter' && this._onClick(e);
    }
});
