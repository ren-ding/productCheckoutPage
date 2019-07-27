import React from 'react';
import PromotionCodePanel from '../PromotionCodePanel';
import renderer from 'react-test-renderer';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
 
Enzyme.configure({ adapter: new Adapter() });

describe('PromotionCodePanel', ()=> {
    let promotionCodePanel;
    let props;

    beforeEach(()=> {
        props = {
            submitPromotionCode: ()=>{},
            codeMessage:""
        }

        promotionCodePanel = () => mount(<PromotionCodePanel {...props} />);        
    });

    describe('render', () => {
       it('should render to match snapshot', () => {
           const tree = renderer.create(<PromotionCodePanel {...props}/>).toJSON();
           expect(tree).toMatchSnapshot();
       }); 
    });

    describe('click submit code button', ()=> {
        it('should call submitPromotionCode event handler', ()=> {
            const mockSubmitPromotionCode = jest.fn();
            props = {
                submitPromotionCode: mockSubmitPromotionCode,
                codeMessage:""
            }
            const panel = promotionCodePanel();
            //reason for this panel using enzyme mount rather than shallow is that
            //the component contains an input cached by ref and used for click event handler 
            //shallow has no facility to mock this up
            panel.find('.code-submit').simulate('click');
            expect(mockSubmitPromotionCode).toHaveBeenCalled();
        });
    });
});