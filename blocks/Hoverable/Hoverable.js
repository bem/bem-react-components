import React from 'react';
import { decl } from 'bem-react-core';

export default decl({
    block : 'Hoverable',

    willInit() {
        this.state = {
            hovered : false
        };

        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
    },

    onMouseEnter() {
        this.props.onMouseEnter && this.props.onMouseEnter();
        this.setState({ hovered : true });
    },

    onMouseLeave() {
        this.props.onMouseLeave && this.props.onMouseLeave();
        this.setState({ hovered : false });
    },

    render() {
        const Target = this.props.target;

        return (
            <Target {...{
                ...this.props,
                hovered : this.state.hovered,
                onMouseEnter : this.onMouseEnter,
                onMouseLeave : this.onMouseLeave
            }}/>);
    }
}, {
    connect(target) {
        const Hoverable = this;
        this.displayName = `Hoverable(${target.displayName})`;
        const func = props => <Hoverable {...props} target={target}/>;
        func.displayName = `_Hoverable(${target.displayName})`;
        return func;
    }
});
