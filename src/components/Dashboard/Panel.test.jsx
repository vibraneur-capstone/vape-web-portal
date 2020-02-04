import React from 'react';

import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Panel from './Panel';


configure({adapter: new Adapter() });


describe('Testing Login', () => {
    let testConfig = {
        type: 'Single Bearing'
    }
    it ('should render correctly', () => {
        const component = shallow(<Panel config={testConfig}/>);
        expect(component).toMatchSnapshot();
    })
})

describe('Test setTitle()', () => {
    let testConfig = {
        type: 'Single Bearing'
    }
    const component = shallow(<Panel config={testConfig}/>)

    expect(component.state('panelTitle')).toBe(undefined);
    let instance = component.instance();
    instance.setTitle('Coverage');
    expect(component.state('panelTitle')).toBe('Coverage');
})