import React, { useEffect, useState } from "react";
import { useFetchSongs } from "../network";
import PlaylistSong from "./PlaylistSong";
import ShuffleButton from "./ShuffleButton";
import SortOptions from "./SortOptions";
import { SongProp } from "../types";

type PlaylistProps = {
  name: string;
};
interface AlbumGroup {
  album: string;
  songs: SongProp[];
}

const Playlist: React.FC<PlaylistProps> = ({ name }) => {
  const [playlistSongs, setPlaylistSongs] = useState<SongProp[]>([]);
  const [selectedArtist, setSelectedArtist] = useState<string>("");
  const [albumsByArtist, setAlbumsByArtist] = useState<AlbumGroup[]>([]);
  const { songs, loading, error, fetchSongs } = useFetchSongs();

  useEffect(() => {
    const fetchPlaylistSongs = async () => {
      // Note callout: assumes the playlist will always have songs
      if (playlistSongs.length === 0) {
        await fetchSongs();
        setPlaylistSongs(songs);
      }
    };

    fetchPlaylistSongs();
  }, [fetchSongs, playlistSongs.length, songs]);

  useEffect(() => {
    if (selectedArtist) {
      // Filter songs by selected artist
      const artistSongs = playlistSongs.filter(
        (song) => song.artist === selectedArtist
      );

      // Group the filtered songs by album
      const groupedAlbums = artistSongs.reduce((acc: AlbumGroup[], song) => {
        const albumGroup = acc.find((group) => group.album === song.album);
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
    } else {
      setAlbumsByArtist([]); // Reset if no artist is selected
    }
  }, [selectedArtist, playlistSongs]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Extract unique artists from the song list
  const uniqueArtists = Array.from(
    new Set(playlistSongs.map((song) => song.artist))
  );

  return (
    <div style={styles.container}>
      <div style={styles.buttons}>
        <ShuffleButton
          songs={playlistSongs}
          setPlaylistSongs={setPlaylistSongs}
        />
        <div>
          <SortOptions
            songs={playlistSongs}
            setPlaylistSongs={setPlaylistSongs}
          />
        </div>
      </div>

      <h3>{name}</h3>

      {/* Artist Filter */}
      <div style={styles.filter}>
        <label htmlFor="artist-select">Filter by Artist: </label>
        <select
          id="artist-select"
          value={selectedArtist}
          onChange={(e) => setSelectedArtist(e.target.value)}
        >
          <option value="">Select an artist</option>
          {uniqueArtists.map((artist, index) => (
            <option key={index} value={artist}>
              {artist}
            </option>
          ))}
        </select>
      </div>

      {/* Display songs grouped by album if an artist is selected */}
      {selectedArtist && albumsByArtist.length > 0 ? (
        <div>
          <h4>Songs by {selectedArtist}</h4>
          {albumsByArtist.map((albumGroup, index) => (
            <div key={index}>
              <h5>Album: {albumGroup.album}</h5>
              <ul>
                {albumGroup.songs.map((song, songIndex) => (
                  <PlaylistSong key={songIndex} song={song} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <ul>
          {playlistSongs.map((song, index) => (
            <PlaylistSong key={index} song={song} />
          ))}
        </ul>
      )}
    </div>
  );
};

// Inline CSS styles for the component
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    border: "5px solid black",
    padding: "16px",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
  },
  filter: {
    margin: "16px 0",
  },
};

export default Playlist;
