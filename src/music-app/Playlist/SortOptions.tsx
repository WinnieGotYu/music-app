import React, { ChangeEvent } from 'react';
import { SongProp } from '../types';


interface SortOptionsProps {
  songs: SongProp[]; 
  setPlaylistSongs: React.Dispatch<React.SetStateAction<SongProp[]>>; 
}

const SortOptions: React.FC<SortOptionsProps> = ({ songs, setPlaylistSongs }) => {
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    let sortedSongs: SongProp[] = [...songs];
    switch (value) {
      case 'title':
        sortedSongs = sortedSongs.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'artist':
        sortedSongs = sortedSongs.sort((a, b) => a.artist.localeCompare(b.artist));
        break;
      case 'album':
        sortedSongs = sortedSongs.sort((a, b) => a.album.localeCompare(b.album));
        break;
      case 'song_length':
        sortedSongs = sortedSongs.sort((a, b) => a.song_length - b.song_length);
        break;
      default:
        break;
    }

    setPlaylistSongs(sortedSongs);
  };

  return (
    <div>
      <label htmlFor="sort-options">Sort by: </label>
      <select id="sort-options" onChange={handleSort}>
        <option value="">Select...</option>
        <option value="title">Title</option>
        <option value="artist">Artist</option>
        <option value="album">Album</option>
        <option value="song_length">Song Length</option>
      </select>
    </div>
  );
};

export default SortOptions;
