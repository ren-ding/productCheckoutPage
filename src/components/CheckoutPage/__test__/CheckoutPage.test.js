import React from 'react';
import CheckoutPage from '../CheckoutPage';
import renderer from 'react-test-renderer';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
 
Enzyme.configure({ adapter: new Adapter() });

describe('CheckoutPage', ()=> {
    let checkoutPage;
    let props;
    let mockDb;

    beforeEach(()=> {
        props = {
            fetchDataForCheckoutPage: () => {},
            submitPromotionCode: () => {},
            calculateTotal:() => {}
        }

        checkoutPage = () => shallow(<CheckoutPage {...props} />, { lifecycleExperimental: true });
        mockDb = {
            products:[{
                productId: 'wf',
                productName:'Workflow',
                price:199.99
            }],
            promotionCodes:[{
                code: 'RRD4D32',
                description:'10% discount for orders above $1000 (pre-discount)',
            }],
            promotionData:[{
                code: 'RRD4D32',
                minPurchase: 1000,
                discountRate: 0.9,
            }]
        }
    });

    describe('render', () => {
       it('should render to match snapshot', () => {
           const tree = renderer.create(<CheckoutPage {...props}/>).toJSON();
           expect(tree).toMatchSnapshot();
       }); 
    });

    describe('CheckoutPage did load', ()=> {
        it('should retrieve products', ()=> {
            const mockFetchingData = jest.fn((setProducts)=> {
                setProducts(mockDb.products);
            });
            props.fetchDataForCheckoutPage = mockFetchingData;
            const page = checkoutPage();
            expect(mockFetchingData.mock.calls.length).toBe(1);
            expect(page.state('products')).toStrictEqual(mockDb.products);
        });
    });

    describe('trigger add a product to checkoutlist', ()=> {
        describe('the will add product does not exist in checkout list', ()=> {
            it('should add this product into the checkout list with quantity set to be 1, and total price should be recalculated',
            ()=> {
                const mockCheckoutList = [ { productId: 'wf', quantity: 1 } ];
                props.calculateTotal = jest.fn();
                props.calculateTotal.mockReturnValue(199.99);
                const page = checkoutPage();
                expect(page.state('total')).toBe(0);
                page.instance().addToCheckout(mockCheckoutList[0].productId);
                expect(page.state('checkoutProducts')).toStrictEqual(mockCheckoutList);
                expect(page.state('total')).toBe(199.99);
            });
        });

        describe('this product already in the checkout list', ()=> {
            it('should increase its quantity to one more, and total price should be recalculated', ()=> {
                props.calculateTotal = jest.fn();
                props.calculateTotal.mockReturnValue(199.99);
                const page = checkoutPage();
                expect(page.state('total')).toBe(0);
                page.setState({checkoutProducts: [ { productId: 'wf', quantity: 1 }, { productId: 'docgen', quantity: 1 } ]});
                page.instance().addToCheckout('wf');
                expect(page.state('checkoutProducts')).toStrictEqual([ { productId: 'wf', quantity: 2 },
                                                                       { productId: 'docgen', quantity: 1 }
                                                                     ]);
                expect(page.state('total')).toBe(199.99);
            });
        });

    });

    describe('trigger remove product from checkoutlist', ()=> {
        it('should remove the product from checkoutlist, and total price should be recalculated', ()=> {
            props.calculateTotal = jest.fn();
            props.calculateTotal.mockReturnValue(199.99);
            const page = checkoutPage();
            page.setState({checkoutProducts: [ { productId: 'wf', quantity: 2 }, { productId: 'docgen', quantity: 1 } ]});
            page.instance().removeFromCheckout('wf');
            expect(page.state('checkoutProducts')).toStrictEqual([ { productId: 'docgen', quantity: 1 }]);
            expect(page.state('total')).toBe(199.99);
        });
    });
});