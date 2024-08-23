// List of songs
const songs = ['music/devara_song.mp3', 'music/big_dawgs.mp3'];
const songTitles = ['Chuttamalle', 'Big Dawgs'];

// Track the current song index and repeat mode
let currentSongIndex = 0;
let isRepeatModeOn = false; // Repeat mode is off by default

// Get the audio element, buttons, and other elements
const audio = document.getElementById('audio');
const audioSource = document.getElementById('audio-source');
const prevButton = document.getElementById('prev');
const repeatButton = document.getElementById('repeat');
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

// Play the current song after user interaction
function playSong() {
    audio.play().catch(error => {
        console.error('Playback failed:', error);
        // Optionally, provide feedback to the user
        alert('Please click to start the audio.');
    });
}

// Update the highlight of the playlist
function updatePlaylistHighlight(index) {
    songListItems.forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });
}

// Toggle repeat mode
repeatButton.addEventListener('click', () => {
    isRepeatModeOn = !isRepeatModeOn;
    repeatButton.textContent = isRepeatModeOn ? 'Repeat On' : 'Repeat Off';
});

// Play the previous song
prevButton.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    playSong(); // Play the song after loading
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

// Automatically play next song or repeat the current song
audio.addEventListener('ended', () => {
    if (isRepeatModeOn) {
        audio.currentTime = 0; // Repeat the current song
        playSong();
    } else {
        currentSongIndex = (currentSongIndex + 1) % songs.length; // Move to the next song
        loadSong(currentSongIndex);
        playSong();
    }
});

// Initialize with the first song without playing
loadSong(currentSongIndex);

// Example: Use an initial user interaction to start playing
// You can use any other event that signifies user interaction
document.addEventListener('click', function initialPlay() {
    playSong();
    // Remove this event listener after the first interaction
    document.removeEventListener('click', initialPlay);
}, { once: true });
