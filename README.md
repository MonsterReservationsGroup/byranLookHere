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
goes to the next route
goes to the previous route

### help-button UI:COMPONENT

only shown on screens smaller than 500px
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

