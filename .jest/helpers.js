import { shallow } from 'enzyme';

export function block(blockName) {
    return node => shallow(node).find(`.${blockName}`);
}

export function getClassNames(node) {
    return getClassName(node).split(' ');
}

function getClassName(node) {
    return shallow(node).props().className;
}
