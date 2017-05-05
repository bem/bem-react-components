import { decl } from 'bem-react-core';

export default decl({
    block : 'KeyCodes'
}, {
    BACKSPACE : 8,
    TAB : 9,
    ENTER : 13,
    CAPS_LOCK : 20,
    ESC : 27,
    SPACE : 32,
    PAGE_UP : 33,
    PAGE_DOWN : 34,
    END : 35,
    HOME : 36,
    LEFT : 37,
    UP : 38,
    RIGHT : 39,
    DOWN : 40,
    INSERT : 45,
    DELETE : 46,

    /**
     * @example
     * Keycodes.is(e.keyCode, 'SPACE', 'ENTER');
     *
     * @param {Number} code
     * @param {...String|String[]} name
     * @returns {Boolean}
     */
    is : function(code, name) {
        return (Array.isArray(name) ? name : Array.prototype.slice.call(arguments, 1)).some(function(name) {
            return this[name] === code;
        }, this);
    }
});
