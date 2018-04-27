import { decl } from 'bem-react-core';
import ReactDom from 'react-dom';

export default decl({
    block : 'Popup',

    elem : 'Portal',

    willInit() {
        this._rootNode = null;
    },

    didMount() {
        this._renderPortal();
    },

    willUnmount() {
        ReactDom.unmountComponentAtNode(this._rootNode);
        document.body.removeChild(this._rootNode);
    },

    didUpdate() {
        this._renderPortal();
    },

    render() {
        return null;
    },

    _renderPortal() {
        this._rootNode ||
            (this._rootNode = document.body.appendChild(document.createElement('div')));

        ReactDom.unstable_renderSubtreeIntoContainer(this, this.props.children, this._rootNode);
    }
});
