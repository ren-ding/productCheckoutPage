import React from 'react';
import ProductsPanel from '../ProductsPanel';
import renderer from 'react-test-renderer';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
 
Enzyme.configure({ adapter: new Adapter() });

describe('ProductsPanel', ()=> {
    let productsPanel;
    let props;

    beforeEach(()=> {
        props = {
            products: []
        }

        productsPanel = () => shallow(<ProductsPanel {...props} />, { lifecycleExperimental: true });        
    });

    describe('render', () => {
       it('should render to match snapshot', () => {
           const tree = renderer.create(<ProductsPanel {...props}/>).toJSON();
           expect(tree).toMatchSnapshot();
       }); 
    });
});