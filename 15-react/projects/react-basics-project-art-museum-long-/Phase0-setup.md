Phase 0: Setup
Here's a breakdown of the steps you'll be taking in this phase (more detailed instruction below):

Create a new React project called art-museum using create-react-app!
cd __art-museum__ and then npm install react-router-dom@^5 for project.
Start your development server.
Create <Root> component.
Render <Root> component to DOM.
Include <App> in <Root>.
Import <BrowserRouter> to wrap around <App>.
Create data folder in src folder.
Create harvardArt.js file in data folder and copy contents of seed file data.
Import harvardArt and console.log it.
(1) Create a new React project called art-museum using create-react-app with the template @appacademy/react-v17 and using npm.

Create your project:

npx create-react-app art-museum --template @appacademy/react-v17 --use-npm
This command may take a while to run because it should automatically run npm install for you. Take the time to read ahead while this is running.

(2) Once the above command finishes, cd art-museum and then npm install react-router-dom@^5 to install the React Router library.

(3) Start your development server by running:

npm start
You should see "Hello from App" when you navigate to http://localhost:3000.

Root component
Now you'll format the entry file for the React application to render a <Root> component instead of the <App> component.

(4) In your entry file, src/index.js, create a functional component called Root. Return <h1>Hello from Root</h1> from this component.

(5) In the ReactDOM.render function, render the <Root> component instead of the <App> component. ReactDOM.render takes in two arguments: The first is a React element, and the second should be an actual HTML DOM element to nest the rendered React elements. Remember, React elements are not real HTML DOM elements. In the background, React takes the rendered React elements and turns them into actual HTML DOM elements.

If you refresh at http://localhost:3000, you should see the text, "Hello from Root" instead of "Hello from App". Take a look at the HTML elements tree in your browser's development tools (under the "Elements" tab). You should see an h1 tag with the text "Hello from Root" underneath a div with an id of "root". This div is the element selected to render the <Root> component when ReactDOM.render was invoked. The h1 element is the actual element created by React when rendering the <Root> component.

(6) Instead of rendering the <h1>Hello from Root</h1> inside of the Root component, render the imported App component. Now if you refresh at http://localhost:3000, you should see "Hello from App" again, not "Hello from Root".

The purpose for the Root component is to wrap the App component with any Providers that can give your React app more functionality. BrowserRouter from the React Router library is a provider you'll be using in all your App Academy React projects to simulate navigation in a single page app.

(7) In your index.js file, import BrowserRouter from react-router-dom and wrap the App component (found in your <Root> component) with the BrowserRouter component.

Your Root component should now look like this:

function Root() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
If you refresh at http://localhost:3000, you should still see the text, "Hello from App".

Art Gallery Data
(8) Make a folder in src called data.

(9) Create a file in src/data/ called hardvardArt.js to contain the art data inside the newly created data folder. Go to this URL and copy the contents into your harvardArt.js file.

Take a look at the imported data. Note the structure of the object and the export statement at the bottom of the file!

(10) Import the exported object from this file into src/App.js and name the object harvardArt. console.log the harvardArt object. Go to http://localhost:3000 and open the browser's Dev Tools console. There you should see the printed harvardArt object. The records key in that object is an array of information on Harvard's art galleries. The objects key in each art gallery is an array of information on the gallery's art pieces. You'll be using this data throughout this project, so get familiar with the structure of this data!

You can remove the console.log.