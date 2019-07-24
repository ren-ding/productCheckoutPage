import React from 'react';
import CheckoutPage from '../CheckoutPage';
import renderer from 'react-test-renderer';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {v4} from 'node-uuid';
 
Enzyme.configure({ adapter: new Adapter() });

describe('CheckoutPage', ()=> {
    let checkoutPage;
    let props;

    beforeEach(()=> {
        props = {
            fetchDataForCheckoutPage: () => {}
        }

        checkoutPage = () => shallow(<CheckoutPage {...props} />, { lifecycleExperimental: true });        
    });

    describe('render', () => {
       it('should render to match snapshot', () => {
           const tree = renderer.create(<CheckoutPage {...props}/>).toJSON();
           expect(tree).toMatchSnapshot();
       }); 
    });

    describe('CheckoutPage did load', ()=> {
        const mockProducts = [{
            uid: v4(),
            productId: 'wf',
            productName:'Workflow',
            price:199.99
        }];
        const mockPromotionCode = [{
            uid: v4(),
            code: 'RRD4D32',
            description:'10% discount for orders above $1000 (pre-discount)',
        }];
        it('should retrieve products and promotion codes', ()=> {
            const mockFetchingData = jest.fn((setProducts, setPromotionCodes)=> {
                setProducts(mockProducts);
                setPromotionCodes(mockPromotionCode);
            });
            props.fetchDataForCheckoutPage = mockFetchingData;
            const page = checkoutPage();
            expect(mockFetchingData.mock.calls.length).toBe(1);
            expect(page.state('products')).toStrictEqual(mockProducts);
            expect(page.state('promotionCodes')).toStrictEqual(mockPromotionCode);
        });
    });
});