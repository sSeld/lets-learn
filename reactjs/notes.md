# Notes

**Props** -> Component -> React element (description)

## **React Component**

Has ``this.props`` for holding properties passed from other **Components**.
Has ``this.state`` for holding state

## JSX syntax

```javascript
const element = <h1>Hello, world!</h1>;
```

- This is not a String. 
- This is not HTML.
- You can put any JS expression inside JSX with ``{{expression}}`` braces.

JSX is a syntax extension to JavaScript.




## **React Element**

- Is a JS object
- Can be stored in a variable
- Can be passed around 

## Component **State**

Updated with ``this.setState({})``.

## Other Terms

A **Controlled Component** is essentially where the Component is free from state and only handles input/output (Props, Events) that are managed by a higher level component.

A **Function Component** is a component that only contains the ``render()`` function. Has some nuances with lambdas for onClick.