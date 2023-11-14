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
  deleteSongBySongId
} = require('./data');

const express = require('express');
const app = express();

// Your code here

// Endpoint to get a specific artist's details based on artistId
app.get('/artists/:artistId', (req, res) => {
  const artistId = parseInt(req.params.artistId); // Extract artistId from URL parameter
  const artistDetails = getArtistByArtistId(artistId); // Fetch artist details

  if (artistDetails) {
    res.status(200).json(artistDetails); // Send JSON response with artist details
  } else {
    res.status(404).json({ error: 'Artist not found' }); // Handle case where artist is not found
  }
});

// Edit a specified artist by artistId
app.put('/artists/:artistId', (req, res) => {
  const artistId = parseInt(req.params.artistId);
  const { name } = req.body;
  const editedArtist = editArtistByArtistId(artistId, { name });

  if (editedArtist) {
    res.status(200).json(editedArtist);
  } else {
    res.status(404).json({ error: 'Artist not found' });
  }
});

// Delete a specified artist by artistId
app.delete('/artists/:artistId', (req, res) => {
  const artistId = parseInt(req.params.artistId);
  const deleted = deleteArtistByArtistId(artistId);

  if (deleted) {
    res.status(200).json({ message: 'Successfully deleted' });
  } else {
    res.status(404).json({ error: 'Artist not found' });
  }
});

// Get all albums of a specific artist based on artistId
app.get('/artists/:artistId/albums', (req, res) => {
  const artistId = parseInt(req.params.artistId);
  const albums = getAlbumsByArtistId(artistId);

  res.status(200).json(albums);
});

// Get a specific album's details based on albumId
app.get('/albums/:albumId', (req, res) => {
  const albumId = parseInt(req.params.albumId);
  const albumDetails = getAlbumByAlbumId(albumId);

  if (albumDetails) {
    res.status(200).json(albumDetails);
  } else {
    res.status(404).json({ error: 'Album not found' });
  }
});

// Add an album to a specific artist based on artistId
app.post('/artists/:artistId/albums', (req, res) => {
  const artistId = parseInt(req.params.artistId);
  const { name } = req.body;
  const newAlbum = addAlbumByArtistId(artistId, { name });

  res.status(201).json(newAlbum);
});

// Edit a specified album by albumId
app.put('/albums/:albumId', (req, res) => {
  const albumId = parseInt(req.params.albumId);
  const { name } = req.body;
  const editedAlbum = editAlbumByAlbumId(albumId, { name });

  if (editedAlbum) {
    res.status(200).json(editedAlbum);
  } else {
    res.status(404).json({ error: 'Album not found' });
  }
});

// Delete a specified album by albumId
app.delete('/albums/:albumId', (req, res) => {
  const albumId = parseInt(req.params.albumId);
  const deleted = deleteAlbumByAlbumId(albumId);

  if (deleted) {
    res.status(200).json({ message: 'Successfully deleted' });
  } else {
    res.status(404).json({ error: 'Album not found' });
  }
});

// Get all albums with names filtered by first letter
app.get('/albums', (req, res) => {
  const startsWith = req.query.startsWith;
  const filteredAlbums = getFilteredAlbums(startsWith);

  res.status(200).json(filteredAlbums);
});

// Get all songs of a specific artist based on artistId
app.get('/artists/:artistId/songs', (req, res) => {
  const artistId = parseInt(req.params.artistId);
  const songs = getSongsByArtistId(artistId);

  res.status(200).json(songs);
});

// Get all songs of a specific album based on albumId
app.get('/albums/:albumId/songs', (req, res) => {
  const albumId = parseInt(req.params.albumId);
  const songs = getSongsByAlbumId(albumId);

  res.status(200).json(songs);
});

// Get a specific song's details based on songId
app.get('/songs/:songId', (req, res) => {
  const songId = parseInt(req.params.songId);
  const songDetails = getSongBySongId(songId);

  if (songDetails) {
    res.status(200).json(songDetails);
  } else {
    res.status(404).json({ error: 'Song not found' });
  }
});

// Add a song to a specific album based on albumId
app.post('/albums/:albumId/songs', (req, res) => {
  const albumId = parseInt(req.params.albumId);
  const { name, trackNumber, lyrics, albumId: reqAlbumId } = req.body;

  if (reqAlbumId !== albumId) {
    res.status(400).json({ error: 'Album ID in the URL does not match the body' });
  } else {
    const newSong = addSongByAlbumId(albumId, { name, trackNumber, lyrics, albumId });

    res.status(201).json(newSong);
  }
});

// Edit a specified song by songId
app.put('/songs/:songId', (req, res) => {
  const songId = parseInt(req.params.songId);
  const { name, trackNumber, lyrics } = req.body;
  const editedSong = editSongBySongId(songId, { name, trackNumber, lyrics });

  if (editedSong) {
    res.status(200).json(editedSong);
  } else {
    res.status(404).json({ error: 'Song not found' });
  }
});

// Delete a specified song by songId
app.delete('/songs/:songId', (req, res) => {
  const songId = parseInt(req.params.songId);
  const deleted = deleteSongBySongId(songId);

  if (deleted) {
    res.status(200).json({ message: 'Successfully deleted' });
  } else {
    res.status(404).json({ error: 'Song not found' });
  }
});

// DO NOT MODIFY
if (require.main === module) {
  const port = 8000;
  app.listen(port, () => console.log('Server is listening on port', port));
} else {
  module.exports = app;
}