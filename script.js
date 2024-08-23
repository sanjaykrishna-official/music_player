// List of songs
const songs = ['music/devara_song.mp3', 'music/big_dawgs.mp3'];
const songTitles = ['Chuttamalle', 'big dawgs'];

// Track the current song index
let currentSongIndex = 0;

// Get the audio element, buttons, and other elements
const audio = document.getElementById('audio');
const audioSource = document.getElementById('audio-source');
const prevButton = document.getElementById('prev');
const replayButton = document.getElementById('replay');
const nextButton = document.getElementById('next');
const currentSongTitle = document.getElementById('current-song-title');
const songListItems = document.querySelectorAll('.song-item');

// Load the current song
function loadSong(index) {
    audioSource.src = songs[index];
    currentSongTitle.textContent = `Now Playing: ${songTitles[index]}`;
    updatePlaylistHighlight(index);
    audio.load(); // Reload the audio element with the new source
}

// Play the current song (after user interaction)
function playSong() {
    audio.play().catch(error => {
        console.error('Playback failed:', error);
        alert('Please interact with the document first.');
    });
}

// Update the highlight of the playlist
function updatePlaylistHighlight(index) {
    songListItems.forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });
}

// Play the previous song
prevButton.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    playSong(); // Play the song after loading
});

// Replay the current song
replayButton.addEventListener('click', () => {
    audio.currentTime = 0;
    playSong(); // Replay the song
});

// Play the next song
nextButton.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    playSong(); // Play the song after loading
});

// Handle song list item click
songListItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentSongIndex = index;
        loadSong(currentSongIndex);
        playSong(); // Play the song after loading
    });
});

// Initialize with the first song
loadSong(currentSongIndex);

// Add an event listener to the play button or any user interaction event
document.addEventListener('click', () => {
    // Only play the song after the first user interaction
    if (!audio.paused) {
        playSong();
    }
}, { once: true }); // The listener is removed after the first interaction
