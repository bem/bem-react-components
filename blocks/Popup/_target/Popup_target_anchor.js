import {declMod} from 'bem-react-core';
import React from 'react';
import ReactDom from 'react-dom';

export default declMod(({ target }) => target === 'anchor', {
    block : 'Popup',

    willInit() {
        this.__base(...arguments);

        this._calcIsAnchorVisible = this._calcIsAnchorVisible.bind(this);
        this.onAnchorParentsScroll = this.onAnchorParentsScroll.bind(this); // TODO: throttle
        this.onViewportResize = this.onViewportResize.bind(this); // TODO: throttle
        this._bindToScroll = this._bindToScroll.bind(this);
        this._unbindFromScroll = this._unbindFromScroll.bind(this);
    },

    didUpdate() {
        this.__base(...arguments);
        if(this.isVisible()) {
            this._bindToScroll();
            window.addEventListener('resize', this.onViewportResize);
        } else {
            !this.props.requestShow && this._unbindFromScroll();
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

        if (anchorIsVisible) {
            if (this.state.hideRequestedByScroll) {
                this.setState({ hideRequestedByScroll: false });
                this.props.requestShow && this.props.requestShow();
            }

            popupIsVisible && this._redraw();
        } else {
            popupIsVisible && this.setState({ hideRequestedByScroll: true });
            this.props.requestHide && this.props.requestHide();
        }
    },

    _calcIsAnchorVisible() {
        const anchor = this._calcTargetDimensions(),
            { direction } = this.state,
            vertBorder = Math.floor(
                checkMainDirection(direction, 'top') || checkSecondaryDirection(direction, 'top') ? anchor.top : anchor.top + anchor.height
            ),
            horizBorder = Math.floor(
                checkMainDirection(direction, 'left') || checkSecondaryDirection(direction, 'left') ? anchor.left : anchor.left + anchor.width
            );

        return !this.scrollParents.some(parent => {
            if (parent === window) {
                return false;
            }

            const { overflowX, overflowY } = window.getComputedStyle(parent),
                checkOverflowY = overflowY === 'scroll' || overflowY === 'hidden' || overflowY === 'auto',
                checkOverflowX = overflowX === 'scroll' || overflowX === 'hidden' || overflowX === 'auto';

            if (checkOverflowY || checkOverflowX) {
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

    _getAnchorDomNode() {
        if(!this.props.anchor) throw Error('Popup target=anchor: anchor prop is required.');

        const anchor = this.props.anchor();

        return anchor instanceof Element?
            anchor :
            ReactDom.findDOMNode(anchor);
    },

    _calcTargetDimensions : function() {
        const anchorRect = this._getAnchorDomNode().getBoundingClientRect(),
            viewportRect = document.documentElement.getBoundingClientRect();

        return {
            left : anchorRect.left - viewportRect.left,
            top : anchorRect.top - viewportRect.top,
            width : anchorRect.width,
            height : anchorRect.height
        };
    },

    _bindToScroll() {
        this.scrollParents = getScrollParents(this._getAnchorDomNode());
        this.scrollParents.forEach(parent => {
            parent.addEventListener('scroll', this.onAnchorParentsScroll);
        });
    },

    _unbindFromScroll() {
        if (this.scrollParents) {
            this.scrollParents.forEach(parent => {
                parent.removeEventListener('scroll', this.onAnchorParentsScroll);
            });
        }
    }
}, {
    propTypes : {
        anchor : React.PropTypes.func,
    }
});

function checkMainDirection(direction, mainDirection1, mainDirection2) {
    return !direction.indexOf(mainDirection1) || (mainDirection2 && !direction.indexOf(mainDirection2));
}

function checkSecondaryDirection(direction, secondaryDirection) {
    return ~direction.indexOf('-' + secondaryDirection);
}

function getScrollParents(el) {
    if (!(el instanceof Element)) {
        return [window];
    }

    const { position } = window.getComputedStyle(el) || {},
        parents = [];

    if (position === 'fixed') {
        return [el];
    }

    let parent = el;
    while ((parent = parent.parentNode) && parent.nodeType === 1) {
        const style = window.getComputedStyle(parent);

        if (typeof style === 'undefined' || style === null) {
            parents.push(parent);
            return parents;
        }

        if (/(auto|scroll)/.test(style.overflow + style.overflowY + style.overflowX)) {
            if (position !== 'absolute' || ['relative', 'absolute', 'fixed'].indexOf(style.position) >= 0) {
                parents.push(parent)
            }
        }
    }

    parents.push(window);

    return parents;
}
