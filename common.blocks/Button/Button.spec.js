import React from 'react';
import sinon from 'sinon';
import Button from 'b:Button';
import { block, getClassNames } from '../../.jest/helpers';

const renderer = block('Button');

it('should be disabled', () => {
    expect(getClassNames(<Button disabled/>)).toContain('Button_disabled');
});

it('should be clicked', () => {
    const onButtonClick = sinon.spy();
    renderer(<Button onClick={onButtonClick}/>).simulate('click');

    expect(onButtonClick).toHaveProperty('callCount', 1);
});

