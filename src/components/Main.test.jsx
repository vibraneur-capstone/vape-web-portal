import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Main from './Main.jsx';

test('testing jest', () => {
    expect(0).toBe(0);
})

configure({adapter: new Adapter() });

describe('Testing Login', () => {
    it ('should render correctly', () => {
        const component = shallow(<Main/>);
        expect(component).toMatchSnapshot();
    })
})