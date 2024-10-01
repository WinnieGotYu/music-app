import React from "react";
import { Playlist } from "../Playlist";

const Music: React.FC = () => {
  const [showPlaylist, setShowPlaylist] = React.useState<boolean>(false);

  const onCreatePlaylist = (): void => {
    setShowPlaylist(true);
  };

  return (
    <div className="music">
      <button onClick={onCreatePlaylist}>Create a Playlist</button>
      {showPlaylist && <Playlist name="test-playlist" />}
    </div>
  );
};

export default Music;
