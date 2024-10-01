import React from 'react';
import { SongProp } from '../types';


interface PlaylistSongProps {
  song: SongProp;
}

const PlaylistSong: React.FC<PlaylistSongProps> = ({ song }) => {
  
  // Function to convert seconds into minutes and seconds
  const formatSongLength = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`; // Add leading zero if needed
  };

  return (
    <div style={styles.container}>
      {/* Placeholder for album art */}
      <div style={styles.albumArt}>
        <div style={styles.placeholder}>Album Art</div>
      </div>

      <div style={styles.songInfo}>
        <div style={styles.title}>{song.title}</div>
        <div style={styles.artist}>{song.artist}</div>
      </div>

      <div style={styles.songLength}>{formatSongLength(song.song_length)}</div>
    </div>
  );
};

// Inline CSS styles for the component
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px',
    borderBottom: '1px solid #ddd',
    fontFamily: 'Arial, sans-serif',
  },
  albumArt: {
    marginRight: '15px',
  },
  placeholder: {
    width: '50px',
    height: '50px',
    backgroundColor: '#ccc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
    color: '#333',
  },
  songInfo: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  artist: {
    fontSize: '14px',
    color: '#555',
  },
  songLength: {
    fontSize: '14px',
    color: '#777',
    marginLeft: '10px',
  },
};

export default PlaylistSong;
