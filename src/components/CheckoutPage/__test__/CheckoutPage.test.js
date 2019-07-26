import React from 'react';
import CheckoutPage from '../CheckoutPage';
import renderer from 'react-test-renderer';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
 
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
            productId: 'wf',
            productName:'Workflow',
            price:199.99
        }];

        it('should retrieve products', ()=> {
            const mockFetchingData = jest.fn((setProducts)=> {
                setProducts(mockProducts);
            });
            props.fetchDataForCheckoutPage = mockFetchingData;
            const page = checkoutPage();
            expect(mockFetchingData.mock.calls.length).toBe(1);
            expect(page.state('products')).toStrictEqual(mockProducts);
        });
    });
});