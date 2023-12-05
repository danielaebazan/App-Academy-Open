import './index.css'
import  { NavLink }  from 'react-router-dom'
function GalleryNavigation({ galleries }) {
    //debugger
    return (
        <nav>
            <h1>Galleries:</h1>
            <NavLink to={'/'}>
                HOME 
            </NavLink>
            {galleries.map(gal => {
                return (
                    <NavLink key={gal.id} to={'/galleries/' + gal.id}>
                        {gal.name}
                    </NavLink>
                )
            })}          
        </nav>
    )
}
export default GalleryNavigation;