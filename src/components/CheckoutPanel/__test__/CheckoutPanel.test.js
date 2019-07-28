import React from 'react';
import CheckoutPanel from '../CheckoutPanel';
import renderer from 'react-test-renderer';

describe('CheckoutPanel', ()=> {
    let props;

    beforeEach(()=> {
        props = {
            checkoutProducts: [],
            removeFromCheckout: ()=>{},
            code:'',
            total:399
        }        
    });

    describe('render', () => {
       it('should render to match snapshot', () => {
           const tree = renderer.create(<CheckoutPanel {...props}/>).toJSON();
           expect(tree).toMatchSnapshot();
       }); 
    });
});