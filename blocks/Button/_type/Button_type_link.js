import { declMod } from 'bem-react-core';

export default declMod(({ type }) => type === 'link', {
    block : 'Button',

    mods({ type }) {
        return { ...this.__base(...arguments), type };
    },

    tag : 'a',

    attrs({ target, disabled, url }) {
        const res = {
            ...this.__base(...arguments),
            target,
            role : 'link'
        };

        disabled?
            res['aria-disabled'] = 'true' :
            res.href = url;

        return res;
    },

    _onKeyUp(e) {
        this.__base(...arguments);
        if(this.state.pressed && e.key === ' ') {
            this.props.onClick(e);
            e.isDefaultPrevented() || (document.location = this.props.url);
        }
    }
});
