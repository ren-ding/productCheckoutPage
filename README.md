Nintex product checkout page
===================

Description
-----------
- This is a React single page application created by create-react-app

- The application is a single checkout page, where you'll be able to select products, insert a promotion code (if any available), and being shown the payable amount.

## Installation

### `npm install`
Install node_modules

### `npm run build`
Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

## Excution

### `npm start`
Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Testing

### `npm test`
Launches the test runner in the interactive watch mode.<br>

## Project folder structure

| First Level   | Second level        |  Description                                                            |
| ------------- | ------------------- | ------------------------------------------------------------------------|
| public        | index.html          |  html view                                                              |
| src           | db                  |  Mock fake database including promotion code calculation rule data      |
|               | service             |  Mock business domain services                                          |
|               | components          |  frontend React components                                              |
|               | index.tsx           |  ReactDom render root component                                         |


| Second level        |  Files/Folder             | Description                                                                                             |
| ------------------- | --------------------------|---------------------------------------------------------------------------------------------------------|
| db                  | fakedatabase.js           | tables: products, promotionCodes and promotionData(used for checkout total price calculation)           |
| service             | productService.js         | contains fetch products function and get product price by Id function                                   |
|                     | promotionCodeService.js   | contains get promotion code info by code function and promotion code calculation rule data              |
|                     | checkoutService.js        | contains calculate checkout total price function and rule data read from db rather than hard code       |
| components          | CheckoutPage              | root container component contains states, fetching data and all other presentation components           |
|                     | PromotionCodePanel        | presentation component shows input box for user to enter promotion code                                 |
|                     | ProductListPanel          | presentation component shows product list                                                               |
|                     | ProductSegment            | presentation component shows single product information and a button for adding into checkout           |
|                     | CheckoutPanel             | presentation component shows checkout product list and summary of total price                           |
|                     | CheckoutProductSegment    | presentation component shows single checkout product with quantity and a button to remove from checkout |
|                     | CheckoutSummarySegment    | presentation component shows checkout summary detail in terms of promotion code and total price         |

### note
Each folder has a __test__ folder contains its unit tests.<br>

## Project assumptions

  - One promotion code can be applied at a time
  - promotion calculation rules are frequently changing

## Project Design specification
    
### business domain

- products: a list of products contains productId, productName and price fields
- checkoutProducts: a list of checkout products contains productId and quantity fields
- promotionCode: a string coupon code that discount rules behind
- promotionData: data using for discount calculation in terms of minPurchase amount user can get a discountRate, minPurchasedProductId and minPurchasedProductQuantity so that user can get a discountProductId with price as discountProductPrice

### project structure explaination

The project has three parts: db, service and components.<br>
<br>
Db contains business domain data that explained above.<br>
<br>
Under service folder, the core service is to calculate checkout total based on different promotion rules. Rather than hard code the rule in<br>
service, the calculation rule data abstract and stored in database. So for example if BlackFriday, Christmast or any other on sale period,<br>
if rate or threshold change frequently, backend service dont need to change and redeploy(only need to change database).<br>
<br>
Under component folder, each component has it's component class, __test__ folder for its unit test and index.js for if want to release independently.<br>
CheckoutPage is the root component which is a container component that maintains states, data fetching.<br>
All other components are presentation components that they are immutable and same input can snapshoot same results.<br>
<br>
Service are totally seperated from components only inject into root container components.<br>
<br>

### test

Each module has a __test__ folder contains its unit tests.<br>
The project test framework using jest and enzyme and react-test-renderer to snapshoot static component

### Style sheet
The project is using semantic-ui which support for making page responsive.


### Project extending and tech consideration

- Currently the CheckoutPage contains three big components: PromotionCodePanel, ProductListPanel and CheckoutPanel.
  Some event handlers like addToCheckout, removeFromCheckout passing through ProductListPanel and CheckoutPanel into
  ProductSegment or CheckoutProductSegment. So it's total three levels<br>
  If extend the project into more levels and to avoid passing some props through many levels, React Context or Redux
  can be used. But disadvantage of these tech is that makes component reuse more difficult. So if three level I prefer
  to keep it without using Context

- ProductSegment and CheckoutProductSegment, it could create a more generic components for these two. However if extending
  each components with more different UI items, two components are better than one generic.




