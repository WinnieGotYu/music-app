import React from 'react';
import { SongProp } from '../types';
  

interface ShuffleButtonProps {
  songs: SongProp[]; // The list of songs to shuffle
  setPlaylistSongs: React.Dispatch<React.SetStateAction<SongProp[]>>;
}

const ShuffleButton: React.FC<ShuffleButtonProps> = ({ songs, setPlaylistSongs }) => {
  const shuffleSongs = () => {
    const shuffledSongs = [...songs];

    for (let i = shuffledSongs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledSongs[i], shuffledSongs[j]] = [shuffledSongs[j], shuffledSongs[i]];
    }

    setPlaylistSongs(shuffledSongs);
  };

  return (
    <button onClick={shuffleSongs}>
      Shuffle Playlist
    </button>
  );
};

export default ShuffleButton;
