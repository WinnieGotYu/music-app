import { useState } from 'react';
import { SongProp } from '../types';

interface SongsApiResponse {
  songs: SongProp[];
}

export const useFetchSongs = (): {
  songs: SongProp[];
  loading: boolean;
  error: string | null;
  fetchSongs: () => Promise<void>;
} => {
  const [songs, setSongs] = useState<SongProp[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);


  const fetchSongs = async (): Promise<void> => {
    setLoading(true); 
    setError(null);

    try {
      const response = await fetch(
        'https://storage.googleapis.com/atticus-frontend-assessment/api/songs.json'
      );

      if (!response.ok) {
        alert("Oops something went wrong. Unable to retrieve songs.");
      }

      const data: SongsApiResponse = await response.json();
      setSongs(data.songs);
    } catch (error) {
      setError(`Error fetching songs: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  return { songs, loading, error, fetchSongs };
};
