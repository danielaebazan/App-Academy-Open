Phase 1: GalleryNavigation
Here's a breakdown of the steps you'll be taking in this phase (more detailed instruction below):

Create src/components folder.
Create src/components/GalleryNavigation folder and add index.js file to this folder.
Create <GalleryNavigation> component.
Export <GalleryNavigation> and include it inside of <App>.
Pass harvardArt.records to <GalleryNavigation> as prop galleries.
Receive galleries prop (using destructuring) to <GalleryNavigation> component.
Investigate (with debugger and/or console.log) the value of galleries prop.
Add <NavLink> to <GalleryNavigation> component.
Add <nav> element to <GalleryNavigation> to contain other elements.
Create component containing <NavLink> for each gallery object.
Create src/components/GalleryNavigation/GalleryNavigation.css.
Make CSS styles for .active elements.
Import GalleryNavigation.css in <GalleryNavigation> component file.
The first React component you'll be creating and rendering in the App component is the GalleryNavigation component. This component should be rendered at every route in the application. It will render links to detail pages for every art gallery.

(1) Make a components folder in src. This folder will hold all your React components besides App and Root.

(2) Make a folder called GalleryNavigation in the components folder with an index.js file.

(3) In this file, define a React functional component named GalleryNavigation. Render an h1 element with the text "Galleries".

(4) Export the component from the file (using export default). Import the component into App.js and render it instead of <h1>Hello from App</h1>.

Refresh http://localhost:3000. If you see "Galleries" displayed on the page, then you successfully rendered a new component in App!

The GalleryNavigation component needs to have access to the names and ids of the galleries. The galleries data is in the App.js file, and the best way to pass in that data into the GalleryNavigation component is through its props.

(5) From App.js, pass in a galleries prop into the GalleryNavigation component with the value of harvardArt.records.

(6) Destructure galleries from the props of GalleryNavigation, i.e., the first argument of GalleryNavigation.

(7) Put a debugger or console.log(galleries) at the top of the GalleryNavigation component to test if you passed down the galleries prop correctly. Refresh http://localhost:3000. When you open up your browser's dev tools console, galleries in GalleryNavigation should be an array of art galleries.

(8) Add a NavLink to the GalleryNavigation component that directs users to the home page, / route. The <NavLink> can be imported from the react-router-dom library. Check out its documentation!

(9) Since there are now two components in your <GalleryNavigation> component, you should wrap the <h1> and <NavLink> components in a <nav> (lowercase n!). A <div> would also work, but we recommend <nav> for semantic reasons.

(10) Next, from each element in the array of art galleries, create a NavLink component that will direct the users to a /galleries/:galleryId route where :galleryId is replaced with the art gallery's id. The text inside of the NavLink should be the gallery's name.

Tips for Step 10:

Remember to use your instructional resources! Raise your hand on Progress Tracker!
You want to make use of the galleries array you have as a prop in <GalleryNavigation>.
Putting curly braces {} in your JSX templates lets you execute any JavaScript you want.
The to property for each <NavLink> should be /galleries/[insert the gallery.id here].
BIG HINT: You can use .map off of your galleries array to create a React component out of each member of the galleries array.
This will be one of your first brushes with the React key prop. You will need to provide a key prop whenever you create components using .map. Usually you will provide the .id of your data object (or some other unique attribute).

Make sure that there is a link to the home page and links to each of the galleries in the navigation bar.

NavLink's active class
NavLinks make it easy to show when a link's path matches the current route. You are going to take advantage of this capability to boldface the NavLink's text for the current route.

(11) Create a GalleryNavigation.css file in the GalleryNavigation folder.

(12) Add styling to boldface elements with the class "active", i.e., .active. .active is the default active class for react-router-dom's <NavLink> elements.

(13) Import the GalleryNavigation.css file at the top of the GalleryNavigation component file. (See src/index.js to see how to import CSS files into a create-react-app JavaScript file.)

In the browser, you should see the active route in boldface in the navigation bar. Make sure that the NavLink to the home page is bolded only at the / route.