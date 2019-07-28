import React from 'react';
import ProductSegment from '../ProductSegment';
import renderer from 'react-test-renderer';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
 
Enzyme.configure({ adapter: new Adapter() });

describe('ProductSegment', ()=> {
    let props;
    let productSegment;

    beforeEach(()=> {
        props = {
            product: {},
            addToCheckout: ()=>{}
        }

        productSegment = () => shallow(<ProductSegment {...props} />);    
    });

    describe('render', () => {
       it('should render to match snapshot', () => {
           const tree = renderer.create(<ProductSegment {...props}/>).toJSON();
           expect(tree).toMatchSnapshot();
       }); 
    });

    describe('click add button', ()=> {
        it('should call addToCheckout once with productid', ()=> {
            const mockAddToCheckout = jest.fn();
            props = {
                product:{
                    productId: 'wf',
                    productName:'Workflow',
                    price:199.99
                },
                addToCheckout: mockAddToCheckout
            }
            const segment = productSegment();
            
            segment.find('.add-product-to-checkout').simulate('click');
            expect(mockAddToCheckout).toHaveBeenCalled();
            expect(mockAddToCheckout.mock.calls.length).toBe(1);
            //first call of the first argument is the productId
            expect(mockAddToCheckout.mock.calls[0][0]).toBe('wf');
        });
    });
});