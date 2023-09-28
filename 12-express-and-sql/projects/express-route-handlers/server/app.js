// Phase 2
const {
  getAllArtists,
  getLatestArtist,
  getArtistByArtistId,
  addArtist,
  editArtistByArtistId,
  deleteArtistByArtistId,
  getAlbumsForLatestArtist,
  getAlbumsByArtistId,
  getAlbumByAlbumId,
  addAlbumByArtistId,
  editAlbumByAlbumId,
  deleteAlbumByAlbumId,
  getFilteredAlbums,
  getSongsByArtistId,
  getSongsByAlbumId,
  getSongBySongId,
  addSongByAlbumId,
  editSongBySongId,
  deleteSongBySongId,
  getAlbumsForLatestArtist
} = require('./data');

const express = require('express');
const app = express();

// Your code here
app.use(express.json());

app.use((req, res, next) => {
  console.log('Body:', req.body);
  next();
});

app.get('/artists/latest', (req, res) => {
  const latestArtist = getLatestArtist();

  res.status(200).json({ latest: latestArtist});
})

app.get('/artists/latest/albums', (req, res) => {
  const albumsForLatestArtist = getAlbumsForLatestArtist();

  res.status(200).json({ latest: { albums: albumsForLatestArtist } });
})

app.get('/artists', (req, res) => {
  const artists = getAllArtists();

  res.status(200).json(artists);
});

app.post('/artists', (req, res) => {
 const { name } = req.body;
 const newArtist = addArtist({ name });
 
 res.status(201).json(newArtist);
});



// DO NOT MODIFY
if (require.main === module) {
  const port = 8000;
  app.listen(port, () => console.log('Server is listening on port', port));
} else {
  module.exports = app;
}