import React from 'react';
import CheckoutPanel from '../CheckoutPanel';
import renderer from 'react-test-renderer';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
 
Enzyme.configure({ adapter: new Adapter() });

describe('CheckoutPanel', ()=> {
    let checkoutPanel;
    let props;

    beforeEach(()=> {
        props = {
            checkoutProducts: [],
            removeFromCheckout: ()=>{}
        }

        checkoutPanel = () => shallow(<CheckoutPanel {...props} />, { lifecycleExperimental: true });        
    });

    describe('render', () => {
       it('should render to match snapshot', () => {
           const tree = renderer.create(<CheckoutPanel {...props}/>).toJSON();
           expect(tree).toMatchSnapshot();
       }); 
    });
});