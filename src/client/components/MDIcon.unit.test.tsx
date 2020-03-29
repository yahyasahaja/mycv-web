import React from 'react';
import { shallow } from 'enzyme';
import MDIcon from './MDIcon';

describe('Test for component <MDIcon />', () => {
  it('Should render the given children', () => {
    const wrapper = shallow(<MDIcon icon="home" />);

    expect(wrapper.hasClass('mdi-home')).toEqual(true);
    wrapper.unmount();
  });
});
