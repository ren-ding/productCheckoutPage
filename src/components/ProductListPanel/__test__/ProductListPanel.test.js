import React from 'react';
import ProductListPanel from '../ProductListPanel';
import renderer from 'react-test-renderer';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
 
Enzyme.configure({ adapter: new Adapter() });

describe('ProductListPanel', ()=> {
    let productListPanel;
    let props;

    beforeEach(()=> {
        props = {
            products: [],
            addToCheckout: ()=> {}
        }

        productListPanel = () => shallow(<ProductListPanel {...props} />, { lifecycleExperimental: true });        
    });

    describe('render', () => {
       it('should render to match snapshot', () => {
           const tree = renderer.create(<ProductListPanel {...props}/>).toJSON();
           expect(tree).toMatchSnapshot();
       }); 
    });
});