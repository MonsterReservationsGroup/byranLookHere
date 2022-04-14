# Ssa

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate [component](component) component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

### test-page UI:PAGE

> this is a page that allows for testing of individual components

### state UI:SERVICE

sets/gets query parameters
sets/gets guest fully or partially
sets/gets available destinations
sets/gets a selected destination
sets/gets a selected date
adds an upsell
removes an upsell
gets all upsells

### crm UI:SERVICE

get a guest based on hash
set a guest based on the sale

### nav-bar UI:COMPONENT

monster logo on the left flat white
like us on the right

### button UI:DIRECTIVE

rounded corners
has an option to make bouncy
has an option to make bold
defaults to primary color, optional light, and inverted styles vial coloring property

### timeline UI:SERVICE

this service handles the flow of the app
current index keeps track of the current page
callback is a function that is called when the next method is called,
if it returns false the goToNextRoute is not called
goes to the next route;
goes to the previous route;

### help-button UI:COMPONENT

only shown on screens smaller than 500px;
placed in lower left right hand corner of the screen
scales periodically

### image-offset-card UI:COMPONENT

this component displays a small blurb along with a centered offset image giving a nice layering effect
takes as input an imageUrl and a title
takes the body as ng content

### hero UI:COMPONENT

this component describes the current page
has a title input
a catchphrase input
takes body as ng content

### image-card UI:COMPONENT

this component is used to showcase information along with a nice picture relavent to the information
takes an image url
takes a title
takes a ng content as description, p tag required
takes a footer

### credit-card-panel UI:COMPONENT

displays the type as an icon
displays the last 4
displays the expiration
has a button to add / edit the credit card
defaults to 'add card button'

### nmi-collect UI:SERVICE

private adds collect to the window object
public collects credit card info and returns token as a promise
private configures collect js to charge the card

### shopping-cart UI:COMPONENT

displays an array of items
totals the cost of all items
displays a round picture of item
allows removal of items
allows back button

### cart-total UI:PIPE

adds up the total of all the items in the cart

### smooth-height UI:DIRECTIVE

this directive makes the component adjust to the hight of the content smoothly

### smooth-height UI:COMPONENT

this component changes the height of the container smoothly when an element is removed

### qualifications-form UI:COMPONENT

this component allows us to give the guest the ability to input / edit their:
marital status,
date of birth,
party size,
income,

### marital-select UI:COMPONENT

this component allows you to select from:
married, single, co-hab, married cohab males, married cohab females

### mask UI:DIRECTIVE

makes an input group coerce the into a given mask \* is the wild card character ex:
(\*\*\*) \*\*\*-\*\*\*\*
given the input 4323332222 will give the output
(423) 333-2222

### select UI:COMPONENT

 This component acts as a styled select component.
you can pass an array of values: [&#x27;a&#x27;, &#x27;b&#x27;, &#x27;c&#x27;]
or you can pass values and a set of icons: [{value: &#x27;a&#x27;, icon: &#x27;a&#x27;}, {value: &#x27;b&#x27;, icon: &#x27;b&#x27;}, {value: &#x27;c&#x27;, icon: &#x27;c&#x27;}]


### matts-test-page UI:PAGE 
>
### landing UI:PAGE 
>

### qualifications-page UI:PAGE 
>This page allows the guest to view and correct their data
### input UI:DIRECTIVE

 styles the input according to rafas theme

### input UI:COMPONENT

 this component puts together an input and an optional label

### date-picker UI:COMPONENT

 three selects, month day year
day is disabled if no month
when month is selected it generates all days for that month
outputs a standard javascript date object



### destinations-page UI:PAGE 
> this allows the guest to select a destination
### checkout UI:PAGE 
>this page allows the guest to pay

### date-formatter UI:PIPE

 format the date using date fns 

### calendar UI:COMPONENT

 takes a default day
allows you to pick a month
allows you to pick a year
generates a grid with the days of the month
allows you to select a day

### caledar UI:SERVICE

 provides all headless functions for the date picker
generate months
generate years
generate days for month-year
get the last days between last sunday of last month and first day of this month
get the first days between the first saturday of next month and the last day of this month


### mask UI:COMPONENT
 this component displays all its content in a column oriented flexbox. 
 







### hotel-details UI:PAGE 
>this page displays the hotel details

### number-picker UI:COMPONENT

 
