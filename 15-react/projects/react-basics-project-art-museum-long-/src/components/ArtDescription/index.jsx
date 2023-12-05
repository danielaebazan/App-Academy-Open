import {useParams, Link} from 'react-router-dom';
function ArtDescription({art, gallery}) {
    //console.log(galleries);
    //const {galleryId} = useParams();
    //const image = art.find(art => art.gallerynumber===galleryId)
    console.log('art-inner', art);
    return(
    <div>
        Back to Gallery &nbsp;
        <Link to={'/galleries/'+String(gallery.id)}>
            {gallery.name}
        </Link>
        <h2>Title: &nbsp; 
            <Link to={art.url}>{art.title}
            </Link>
        </h2>  
        <h3>Description: &nbsp;</h3><p>{art.description}</p>
        <h3>Credit: &nbsp;</h3> <div>{art.creditline}</div>
        <h3>Technique: &nbsp;</h3><span>{art.technique}</span>

        <Link to={art.url}>
            {art.images.map((image, i) => <span key={i}> <img  src= {image.baseimageurl}/> </span>)}
        </Link>
         
    </div>
    
    )
}
export default ArtDescription;
/*  <div>{art.title} {art.id }:</div>*/