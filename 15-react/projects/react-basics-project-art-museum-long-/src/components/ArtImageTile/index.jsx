import {useParams, Link} from 'react-router-dom';
function ArtImageTile({art}) {
    //console.log(galleries);
    //const {galleryId} = useParams();
    //const image = art.find(art => art.gallerynumber===galleryId)
    console.log('art-inner-inArtImageTile', art);
    return(
    <h2>
        <div>{art.title } {art.id }:</div>
        <Link to={'art/'+String(art.id)}>
            <img src={art.images[0]? art.images[0].baseimageurl:''} alt='Image'></img>
        </Link>        
    </h2>
    
    )
}
export default ArtImageTile;