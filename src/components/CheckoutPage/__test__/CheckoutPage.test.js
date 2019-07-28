import React from 'react';
import CheckoutPage from '../CheckoutPage';
import ProductListPanel from '../../ProductListPanel';
import renderer from 'react-test-renderer';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
 
Enzyme.configure({ adapter: new Adapter() });

describe('CheckoutPage', ()=> {
    let checkoutPage;
    let props;

    beforeEach(()=> {
        props = {
            fetchDataForCheckoutPage: () => {},
            submitPromotionCode: () => {}
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

    describe('trigger add a product to checkoutlist', ()=> {
        describe('the will add product does not exist in checkout list', ()=> {
            it('should add this product into the checkout list with quantity set to be 1', ()=> {
                const page = checkoutPage();
                page.instance().addToCheckout('wf');
                expect(page.state('checkoutProducts')).toStrictEqual([ { productId: 'wf', quantity: 1 } ]);
            });
        });

        describe('this product already in the checkout list', ()=> {
            it('should increase its quantity to one more', ()=> {
                const page = checkoutPage();
                page.setState({checkoutProducts: [ { productId: 'wf', quantity: 1 }, { productId: 'docgen', quantity: 1 } ]});
                page.instance().addToCheckout('wf');
                expect(page.state('checkoutProducts')).toStrictEqual([ { productId: 'wf', quantity: 2 },
                                                                       { productId: 'docgen', quantity: 1 }
                                                                     ]);
            });
        });

    });

    describe('trigger remove product from checkoutlist', ()=> {
        it('should remove the product from checkoutlist', ()=> {
            const page = checkoutPage();
            page.setState({checkoutProducts: [ { productId: 'wf', quantity: 2 }, { productId: 'docgen', quantity: 1 } ]});
            page.instance().removeFromCheckout('wf');
            expect(page.state('checkoutProducts')).toStrictEqual([ { productId: 'docgen', quantity: 1 }]);
        });

    });
});