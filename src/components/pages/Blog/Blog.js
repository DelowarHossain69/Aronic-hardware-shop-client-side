import React from "react";

const Blog = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-5 py-12">
      <div className="bg-white p-4 rounded space-y-4">
        <h2 className="text-2xl">
        Question : How will you improve the performance of a React Application?
        </h2>
        <p>
          To optimize React rendering, I need to make sure that components
          receive only necessary props.{" "}
        </p>
        <ul>
          <li className="font-bold text-xl">
            To improve the performance of my React app,
          </li>
          <li>Avoid inline functions as much as possible.</li>
          <li>
            Remember that Immutability is the key to avoid unnecessary
            re-renders.
          </li>
          <li>Keeping component state local where necessary.</li>
          <li>Code-splitting in React using dynamic import()</li>
        </ul>
      </div>

      <div className="bg-white p-4 rounded space-y-4">
        <h2 className="text-2xl">
        Question : What are the different ways to manage a state in a React application?
        </h2>
        <ul>
          <li className="font-bold text-xl">The state can manage using : </li>
          <li>Local state.</li>
          <li>Global state.</li>
          <li>Server state.</li>
          <li>Server state etc.</li>
        </ul>
      </div>

      <div className="bg-white p-4 rounded space-y-4">
        <h2 className="text-2xl">
        Question : How does prototypical inheritance work?
        </h2>
        <p>
          When it comes to inheritance, JavaScript only has one construct:
          objects. Each object has a private property which holds a link to
          another object called its prototype. When a function is created in JavaScript, the JavaScript engine adds a prototype property to the function.
        </p>
      </div>

      <div className="bg-white p-4 rounded space-y-4">
      <h2 className="text-2xl">Question : 14.4  Why you do not set the state directly in React. For example, if you have const [products, setProducts] = useState([]). Why you do not set products = [...] instead, you use the setProducts</h2>

        <p>When we declare a state variable with useState, it returns a pair  an array with two items. The first item is the current value, and the second is a function that lets us update it. Using [0] and [1] to access them is a bit confusing because they have a specific meaning. The second returned item is itself a function. It is link this.setState()</p> 
      </div>

      <div className="bg-white p-4 rounded space-y-4">
          <h2 className="text-2xl">Question : 14.5 You have an array of products. Each product has a name, price, description, etc. How will you implement a search to find products by name?</h2>
          <p>products.filter(p => p.name.toLowerCase().includes(lowercase searchText))</p>
      </div>

      <div className="bg-white p-4 rounded space-y-4">
          <h2 className="text-2xl">Question : What is a unit test? Why should write unit tests? </h2>
          <p>Unit testing is a software development process in which the smallest testable parts of an application, called units, are individually and independently scrutinized for proper operation. Unit testing allows software developers to actually think through the design of the software and what has to be done before they write the code. One of the benefits of unit tests is that they isolate a function, class or method and only test that piece of code. </p>
      </div>
    </section>
  );
};

export default Blog;
