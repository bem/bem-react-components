import {declMod} from 'bem-react-core';
import React from 'react';

const VIEWPORT_ACCURACY_FACTOR = 0.99,
    DEFAULT_DIRECTIONS = [
        'bottom-left', 'bottom-center', 'bottom-right',
        'top-left', 'top-center', 'top-right',
        'right-top', 'right-center', 'right-bottom',
        'left-top', 'left-center', 'left-bottom'
    ];

export default declMod(({ target }) => target, {
    block : 'Popup'

    willInit() {
        this.__base.apply(this, arguments);
        this.state = {
            ...this.state,
            top : null,
            left : null,
            direction : null,
            zIndex : null
        };
    },

    didMount() {
        if(this.props.visible) {
            this._redraw();
        }
    },

    didUpdate(prevProps) {
        if(prevProps.visible !== this.props.visible) {
            if(this.props.visible) {
                this._redraw();
            }
        }
    },

    attrs() {
        const { top, left, zIndex } = this.state;
        return {
            ...this.__base.apply(this, arguments),
            style : { top, left, zIndex }
        };
    },

    mods() {
        return {
            ...this.__base.apply(this, arguments),
            direction : this.state.direction
        };
    }

    _redraw() {
        const { top, left, direction } = this._calcBestDrawingParams();
        this.setState({ top, left, direction });
        console.log('!!!', top, left, direction);
    }

    _calcDrawingCss(drawingParams) {
        return {
            top : drawingParams.top,
            left : drawingParams.left
        };
    },

    _calcBestDrawingParams() {
        const popup = this._calcPopupDimensions(),
            target = this._calcTargetDimensions(),
            viewport = this._calcViewportDimensions(),
            directions = this.props.directions;

        let i = 0,
            direction,
            pos,
            viewportFactor,
            bestDirection,
            bestPos,
            bestViewportFactor;

        while(direction = directions[i++]) {
            pos = this._calcPos(direction, target, popup);
            viewportFactor = this._calcViewportFactor(pos, viewport, popup);
            if(i === 1 ||
                    viewportFactor > bestViewportFactor ||
                    (!bestViewportFactor && this.state.direction === direction)) {
                bestDirection = direction;
                bestViewportFactor = viewportFactor;
                bestPos = pos;
            }
            if(bestViewportFactor > VIEWPORT_ACCURACY_FACTOR) break;
        }

        return {
            direction : bestDirection,
            left : bestPos.left,
            top : bestPos.top
        };
    },

    _calcPopupDimensions : function() {
        const domNode = this.findDOMNode(this),
            width = domNode.offsetWidth,
            height = domNode.offsetHeight;

        return { width, height, area : width * height };
    },

    _calcTargetDimensions : function() {
        throw Error('Popup: Not implemented `_target` value.');
    },

    _calcViewportDimensions : function() {
        const top = window.pageYOffset,
            left = window.pageXOffset,
            height = window.innerHeight,
            width = window.innerWidth;

        return {
            top,
            left,
            bottom: top + height,
            right: left + width
        };
    },

    _calcPos : function(direction, target, popup) {
        var top,
            left,
            mainOffset = this.props.mainOffset,
            secondaryOffset = this.props.secondaryOffset;

        if(this._checkMainDirection(direction, 'bottom')) {
            top = target.top + target.height + mainOffset;
        } else if(this._checkMainDirection(direction, 'top')) {
            top = target.top - popup.height - mainOffset;
        } else if(this._checkMainDirection(direction, 'left')) {
            left = target.left - popup.width - mainOffset;
        } else if(this._checkMainDirection(direction, 'right')) {
            left = target.left + target.width + mainOffset;
        }

        if(this._checkSecondaryDirection(direction, 'right')) {
            left = target.left + target.width - popup.width - secondaryOffset;
        } else if(this._checkSecondaryDirection(direction, 'left')) {
            left = target.left + secondaryOffset;
        } else if(this._checkSecondaryDirection(direction, 'bottom')) {
            top = target.top + target.height - popup.height - secondaryOffset;
        } else if(this._checkSecondaryDirection(direction, 'top')) {
            top = target.top + secondaryOffset;
        } else if(this._checkSecondaryDirection(direction, 'center')) {
            if(this._checkMainDirection(direction, 'top', 'bottom')) {
                left = target.left + target.width / 2 - popup.width / 2;
            } else if(this._checkMainDirection(direction, 'left', 'right')) {
                top = target.top + target.height / 2 - popup.height / 2;
            }
        }

        return { top, left };
    },

    _calcViewportFactor : function(pos, viewport, popup) {
        const viewportOffset = this.props.viewportOffset,
            intersectionLeft = Math.max(pos.left, viewport.left + viewportOffset),
            intersectionRight = Math.min(pos.left + popup.width, viewport.right - viewportOffset),
            intersectionTop = Math.max(pos.top, viewport.top + viewportOffset),
            intersectionBottom = Math.min(pos.top + popup.height, viewport.bottom - viewportOffset);

        return intersectionLeft < intersectionRight && intersectionTop < intersectionBottom? // has intersection
            (intersectionRight - intersectionLeft) *
                (intersectionBottom - intersectionTop) /
                popup.area :
            0;
    },

    _checkMainDirection : function(direction, mainDirection1, mainDirection2) {
        return !direction.indexOf(mainDirection1) || (mainDirection2 && !direction.indexOf(mainDirection2));
    },

    _checkSecondaryDirection : function(direction, secondaryDirection) {
        return ~direction.indexOf('-' + secondaryDirection);
    },

}, {
    defaultProps : {
        mainOffset : 0,
        secondaryOffset : 0,
        viewportOffset : 0,
        directions : DEFAULT_DIRECTIONS
    }
});
