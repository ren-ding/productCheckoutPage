import React from 'react';
import CheckoutProductSegment from '../CheckoutProductSegment';
import renderer from 'react-test-renderer';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
 
Enzyme.configure({ adapter: new Adapter() });

describe('CheckoutProductSegment', ()=> {
    let props;
    let checkoutProductSegment;

    beforeEach(()=> {
        props = {
            product: {},
            removeFromCheckout: ()=>{}
        }

        checkoutProductSegment = () => shallow(<CheckoutProductSegment {...props} />);    
    });

    describe('render', () => {
       it('should render to match snapshot', () => {
           const tree = renderer.create(<CheckoutProductSegment {...props}/>).toJSON();
           expect(tree).toMatchSnapshot();
       }); 
    });

    describe('click add button', ()=> {
        it('should call addToCheckout once with productid', ()=> {
            const mockRemoveFromCheckout = jest.fn();
            props = {
                product:{
                    productId: 'wf',
                    quantity:1
                },
                removeFromCheckout: mockRemoveFromCheckout
            }
            const segment = checkoutProductSegment();
            
            segment.find('.remove-product-from-checkout').simulate('click');
            expect(mockRemoveFromCheckout).toHaveBeenCalled();
            expect(mockRemoveFromCheckout.mock.calls.length).toBe(1);
            //first call of the first argument is the productId
            expect(mockRemoveFromCheckout.mock.calls[0][0]).toBe('wf');
        });
    });
});