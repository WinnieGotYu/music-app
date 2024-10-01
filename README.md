### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.


Clicking "Create a Playlist" will display an existing playlist. In a real-world scenario, this would create a new playlist, but for the purposes of this assignment, we’re assuming the playlist is already created. 

When a playlist is mounted, it triggers the fetchSongs API call, storing the retrieved songs in local state.

Due to time constraints, all styles are applied inline. The "Shuffle Playlist" button will randomly shuffle the songs in the state, and selecting an option from the "Sort By" dropdown will update the songs state based on the chosen criteria. The "Filter by Artist" dropdown is dynamically populated based on the songs stored in the state.

If given more time, I would refactor the Playlist components to make reusable elements that could be applied outside of this specific context.
