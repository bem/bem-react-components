import { declMod } from 'bem-react-core';
import { throttle } from 'throttle-debounce';

export default declMod({ autovisible : true }, {
    block : 'Popup',

    willInit() {
        this.__base(...arguments);

        this._calcIsAnchorVisible = this._calcIsAnchorVisible.bind(this);
        this.onAnchorParentsScroll = throttle(100, this.onAnchorParentsScroll.bind(this));
        this.onViewportResize = throttle(100, this.onViewportResize.bind(this));
        this._bindToScroll = this._bindToScroll.bind(this);
        this._unbindFromScroll = this._unbindFromScroll.bind(this);
    },

    mods({ autovisible }) {
        return { ...this.__base.apply(this, arguments), autovisible };
    },

    didUpdate() {
        this.__base(...arguments);

        if(this.isVisible()) {
            this._bindToScroll();
            window.addEventListener('resize', this.onViewportResize);
        } else {
            !this.props.onShow && this._unbindFromScroll();
            window.removeEventListener('resize', this.onViewportResize);
        }
    },

    didUnmount() {
        this._unbindFromScroll();
    },

    onViewportResize() {
        this._redraw();
    },

    onAnchorParentsScroll() {
        const anchorIsVisible = this._calcIsAnchorVisible(),
            popupIsVisible = this.isVisible();

        if(anchorIsVisible) {
            if(this.state.hideRequestedByScroll) {
                this.setState({ hideRequestedByScroll : false });
                this.props.onShow && this.props.onShow();
            }

            popupIsVisible && this._redraw();
        } else {
            popupIsVisible && this.setState({ hideRequestedByScroll : true });
            this.props.onHide && this.props.onHide();
        }
    },

    _calcIsAnchorVisible() {
        const anchor = this._calcTargetDimensions(),
            { direction } = this.state,
            vertBorder = Math.floor(
                checkMainDirection(direction, 'top') || checkSecondaryDirection(direction, 'top') ?
                    anchor.top :
                    anchor.top + anchor.height
            ),
            horizBorder = Math.floor(
                checkMainDirection(direction, 'left') || checkSecondaryDirection(direction, 'left') ?
                    anchor.left :
                    anchor.left + anchor.width
            );

        return !this.scrollParents.some(parent => {
            if(parent === window) return false;

            const { overflowX, overflowY } = window.getComputedStyle(parent),
                checkOverflowY = overflowY === 'scroll' || overflowY === 'hidden' || overflowY === 'auto',
                checkOverflowX = overflowX === 'scroll' || overflowX === 'hidden' || overflowX === 'auto';

            if(checkOverflowY || checkOverflowX) {
                const parentRect = parent.getBoundingClientRect(),
                    viewportRect = document.documentElement.getBoundingClientRect(),
                    left = Math.floor(parentRect.left - viewportRect.left),
                    top = Math.floor(parentRect.top - viewportRect.top),
                    { width, height } = parentRect;

                return vertBorder < top ||
                    top + height < vertBorder ||
                    horizBorder < left ||
                    left + width < horizBorder;
            }

            return false;
        });
    },

    _bindToScroll() {
        this.scrollParents = getScrollParents(this._getAnchorDomNode());
        this.scrollParents.forEach(parent => {
            parent.addEventListener('scroll', this.onAnchorParentsScroll);
        });
    },

    _unbindFromScroll() {
        if(this.scrollParents)
            this.scrollParents.forEach(parent => {
                parent.removeEventListener('scroll', this.onAnchorParentsScroll);
            });

    }

});

function checkMainDirection(direction, mainDirection1, mainDirection2) {
    return !direction.indexOf(mainDirection1) || (mainDirection2 && !direction.indexOf(mainDirection2));
}

function checkSecondaryDirection(direction, secondaryDirection) {
    return ~direction.indexOf('-' + secondaryDirection);
}

function getScrollParents(el) {
    if(!(el instanceof Element)) return [window];


    const { position } = window.getComputedStyle(el) || {},
        parents = [];

    if(position === 'fixed') return [el];


    let parent = el;
    while((parent = parent.parentNode) && parent.nodeType === 1) {
        const parentStyle = window.getComputedStyle(parent);

        if(typeof parentStyle === 'undefined' || parentStyle === null) {
            parents.push(parent);
            return parents;
        }

        if(/(auto|scroll)/.test(parentStyle.overflow + parentStyle.overflowY + parentStyle.overflowX))
            if(position !== 'absolute' || ['relative', 'absolute', 'fixed'].indexOf(parentStyle.position) >= 0) {
                parents.push(parent);
            }

    }

    parents.push(window);

    return parents;
}

