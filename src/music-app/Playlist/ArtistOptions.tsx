import React, { useState } from 'react';
import { SongProp } from '../types';

interface ArtistOptionsProps {
  songs: SongProp[];
}

interface AlbumGroup {
  album: string;
  songs: SongProp[];
}

const ArtistOptions: React.FC<ArtistOptionsProps> = ({ songs }) => {
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null);
  const [albumsByArtist, setAlbumsByArtist] = useState<AlbumGroup[]>([]);

  const uniqueArtists = Array.from(new Set(songs.map(song => song.artist)));

  const handleArtistSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const artist = event.target.value;
    setSelectedArtist(artist);

    const artistSongs = songs.filter(song => song.artist === artist);

    const groupedAlbums = artistSongs.reduce((acc: AlbumGroup[], song) => {
      const albumGroup = acc.find(group => group.album === song.album);

      if (albumGroup) {
        albumGroup.songs.push(song);
      } else {
        acc.push({
          album: song.album,
          songs: [song],
        });
      }

      return acc;
    }, []);

    setAlbumsByArtist(groupedAlbums);
  };

  return (
    <div>
      <label htmlFor="artist-select">Select Artist: </label>
      <select id="artist-select" onChange={handleArtistSelect}>
        <option value="">Select an artist</option>
        {uniqueArtists.map((artist, index) => (
          <option key={index} value={artist}>
            {artist}
          </option>
        ))}
      </select>

      {selectedArtist && albumsByArtist.length > 0 && (
        <div>
          <h3>Songs by {selectedArtist}</h3>
          {albumsByArtist.map((albumGroup, index) => (
            <div key={index}>
              <h4>{albumGroup.album}</h4>
              <ul>
                {albumGroup.songs.map((song, i) => (
                  <li key={i}>{song.title}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArtistOptions;
