// Sample data
const sampleTracks = [
  { id: 1, name: "Blinding Lights", artist: "The Weeknd", duration: "3:20", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&q=80" },
  { id: 2, name: "Shape of You", artist: "Ed Sheeran", duration: "3:53", image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=200&h=200&fit=crop&q=80" },
  { id: 3, name: "Bad Guy", artist: "Billie Eilish", duration: "3:14", image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=200&h=200&fit=crop&q=80" },
  { id: 4, name: "Levitating", artist: "Dua Lipa", duration: "3:23", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&q=80" },
  { id: 5, name: "Watermelon Sugar", artist: "Harry Styles", duration: "2:54", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&q=80" },
  { id: 6, name: "Drivers License", artist: "Olivia Rodrigo", duration: "4:02", image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=200&h=200&fit=crop&q=80" },
  { id: 7, name: "Good 4 U", artist: "Olivia Rodrigo", duration: "2:58", image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=200&h=200&fit=crop&q=80" },
  { id: 8, name: "Industry Baby", artist: "Lil Nas X", duration: "3:32", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&q=80" },
];

const samplePlaylists = {
  1: [
    { id: 1, name: "Blinding Lights", artist: "The Weeknd", duration: "3:20", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&q=80" },
    { id: 2, name: "Shape of You", artist: "Ed Sheeran", duration: "3:53", image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=200&h=200&fit=crop&q=80" },
    { id: 3, name: "Bad Guy", artist: "Billie Eilish", duration: "3:14", image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=200&h=200&fit=crop&q=80" },
  ],
  2: [
    { id: 4, name: "Levitating", artist: "Dua Lipa", duration: "3:23", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&q=80" },
    { id: 5, name: "Watermelon Sugar", artist: "Harry Styles", duration: "2:54", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&q=80" },
  ],
  3: [
    { id: 6, name: "Drivers License", artist: "Olivia Rodrigo", duration: "4:02", image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=200&h=200&fit=crop&q=80" },
    { id: 7, name: "Good 4 U", artist: "Olivia Rodrigo", duration: "2:58", image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=200&h=200&fit=crop&q=80" },
  ],
  4: [
    { id: 8, name: "Industry Baby", artist: "Lil Nas X", duration: "3:32", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&q=80" },
  ]
};

// App state
let currentTrack = null;
let isPlaying = false;
let currentPlaylist = [];
let currentTrackIndex = 0;
let isShuffled = false;
let repeatMode = 0; // 0: no repeat, 1: repeat all, 2: repeat one
let userPlaylists = [];
let likedTracks = [];

// DOM elements
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const tracksList = document.getElementById('tracksList');
const featuredSection = document.getElementById('featuredSection');
const playlistsSection = document.getElementById('playlistsSection');

// Player elements
const currentTrackImage = document.getElementById('currentTrackImage');
const currentTrackName = document.getElementById('currentTrackName');
const currentTrackArtist = document.getElementById('currentTrackArtist');
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const repeatBtn = document.getElementById('repeatBtn');
const likeBtn = document.getElementById('likeBtn');
const progressSlider = document.getElementById('progressSlider');
const progress = document.getElementById('progress');
const currentTime = document.getElementById('currentTime');
const duration = document.getElementById('duration');
const volumeSlider = document.getElementById('volumeSlider');
const volumeBtn = document.getElementById('volumeBtn');

// Modal elements
const createPlaylistModal = document.getElementById('createPlaylistModal');
const createPlaylistBtn = document.getElementById('createPlaylistBtn');
const closeModal = document.getElementById('closeModal');
const cancelBtn = document.getElementById('cancelBtn');
const confirmCreateBtn = document.getElementById('confirmCreateBtn');
const playlistNameInput = document.getElementById('playlistNameInput');
const playlistDescInput = document.getElementById('playlistDescInput');
const playlistsList = document.getElementById('playlistsList');

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
  setupEventListeners();
  updateGreeting();
  loadPlaylists();
  initializePlayer();
});

function setupEventListeners() {
  // Search functionality
  searchInput.addEventListener('input', handleSearch);
  
  // Player controls
  playPauseBtn.addEventListener('click', togglePlayPause);
  prevBtn.addEventListener('click', previousTrack);
  nextBtn.addEventListener('click', nextTrack);
  shuffleBtn.addEventListener('click', toggleShuffle);
  repeatBtn.addEventListener('click', toggleRepeat);
  likeBtn.addEventListener('click', toggleLike);
  
  // Progress and volume
  progressSlider.addEventListener('input', seekTrack);
  volumeSlider.addEventListener('input', changeVolume);
  
  // Playlist modal
  createPlaylistBtn.addEventListener('click', openPlaylistModal);
  closeModal.addEventListener('click', closePlaylistModal);
  cancelBtn.addEventListener('click', closePlaylistModal);
  confirmCreateBtn.addEventListener('click', createNewPlaylist);
  
  // Close modal when clicking outside
  createPlaylistModal.addEventListener('click', function(e) {
    if (e.target === createPlaylistModal) {
      closePlaylistModal();
    }
  });
  
  // Playlist cards
  document.querySelectorAll('.playlist-card').forEach(card => {
    card.addEventListener('click', function() {
      const playlistId = this.dataset.playlist;
      loadPlaylist(playlistId);
    });
    
    const playBtn = card.querySelector('.play-btn');
    playBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      const playlistId = card.dataset.playlist;
      playPlaylist(playlistId);
    });
  });
  
  // Featured cards
  document.querySelectorAll('.featured-card').forEach(card => {
    card.addEventListener('click', function() {
      // Simulate loading a featured playlist
      playPlaylist('1');
    });
  });
}

function updateGreeting() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  document.querySelector('.featured-section h2').textContent = greeting;
}

function handleSearch() {
  const query = searchInput.value.trim().toLowerCase();
  
  if (query.length === 0) {
    searchResults.style.display = 'none';
    featuredSection.style.display = 'block';
    playlistsSection.style.display = 'block';
    return;
  }
  
  const results = sampleTracks.filter(track => 
    track.name.toLowerCase().includes(query) || 
    track.artist.toLowerCase().includes(query)
  );
  
  displaySearchResults(results);
}

function displaySearchResults(tracks) {
  searchResults.style.display = 'block';
  featuredSection.style.display = 'none';
  playlistsSection.style.display = 'none';
  
  tracksList.innerHTML = '';
  
  tracks.forEach(track => {
    const trackElement = createTrackElement(track);
    tracksList.appendChild(trackElement);
  });
}

function createTrackElement(track) {
  const trackDiv = document.createElement('div');
  trackDiv.className = 'track-item';
  trackDiv.innerHTML = `
    <img src="${track.image}" alt="${track.name}">
    <div class="track-info">
      <div class="track-name">${track.name}</div>
      <div class="track-artist">${track.artist}</div>
    </div>
    <div class="track-duration">${track.duration}</div>
  `;
  
  trackDiv.addEventListener('click', () => {
    playTrack(track);
  });
  
  return trackDiv;
}

function loadPlaylist(playlistId) {
  const playlist = samplePlaylists[playlistId];
  if (!playlist) return;
  
  currentPlaylist = [...playlist];
  displaySearchResults(playlist);
}

function playPlaylist(playlistId) {
  const playlist = samplePlaylists[playlistId];
  if (!playlist || playlist.length === 0) return;
  
  currentPlaylist = [...playlist];
  currentTrackIndex = 0;
  playTrack(playlist[0]);
}

function playTrack(track) {
  currentTrack = track;
  updatePlayerUI();
  
  // Find track index in current playlist
  const index = currentPlaylist.findIndex(t => t.id === track.id);
  if (index !== -1) {
    currentTrackIndex = index;
  }
  
  // Simulate playing
  isPlaying = true;
  updatePlayPauseButton();
  
  // Start progress simulation
  simulateTrackProgress();
}

function updatePlayerUI() {
  if (!currentTrack) return;
  
  currentTrackImage.src = currentTrack.image;
  currentTrackName.textContent = currentTrack.name;
  currentTrackArtist.textContent = currentTrack.artist;
  
  // Update like button
  const isLiked = likedTracks.some(track => track.id === currentTrack.id);
  likeBtn.classList.toggle('liked', isLiked);
}

function togglePlayPause() {
  if (!currentTrack) return;
  
  isPlaying = !isPlaying;
  updatePlayPauseButton();
  
  if (isPlaying) {
    simulateTrackProgress();
  }
}

function updatePlayPauseButton() {
  const svg = playPauseBtn.querySelector('svg');
  if (isPlaying) {
    svg.innerHTML = '<rect x="6" y="4" width="4" height="16" fill="currentColor"/><rect x="14" y="4" width="4" height="16" fill="currentColor"/>';
  } else {
    svg.innerHTML = '<polygon points="5,3 19,12 5,21" fill="currentColor"/>';
  }
}

function previousTrack() {
  if (currentPlaylist.length === 0) return;
  
  currentTrackIndex = (currentTrackIndex - 1 + currentPlaylist.length) % currentPlaylist.length;
  playTrack(currentPlaylist[currentTrackIndex]);
}

function nextTrack() {
  if (currentPlaylist.length === 0) return;
  
  if (isShuffled) {
    currentTrackIndex = Math.floor(Math.random() * currentPlaylist.length);
  } else {
    currentTrackIndex = (currentTrackIndex + 1) % currentPlaylist.length;
  }
  
  playTrack(currentPlaylist[currentTrackIndex]);
}

function toggleShuffle() {
  isShuffled = !isShuffled;
  shuffleBtn.classList.toggle('active', isShuffled);
}

function toggleRepeat() {
  repeatMode = (repeatMode + 1) % 3;
  
  const svg = repeatBtn.querySelector('svg');
  repeatBtn.classList.remove('active');
  
  switch (repeatMode) {
    case 0:
      // No repeat - default icon
      break;
    case 1:
      // Repeat all
      repeatBtn.classList.add('active');
      break;
    case 2:
      // Repeat one
      repeatBtn.classList.add('active');
      svg.innerHTML = '<polyline points="17,1 21,5 17,9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7,23 3,19 7,15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/><text x="12" y="18" text-anchor="middle" font-size="8" fill="currentColor">1</text>';
      break;
  }
}

function toggleLike() {
  if (!currentTrack) return;
  
  const isLiked = likedTracks.some(track => track.id === currentTrack.id);
  
  if (isLiked) {
    likedTracks = likedTracks.filter(track => track.id !== currentTrack.id);
  } else {
    likedTracks.push(currentTrack);
  }
  
  likeBtn.classList.toggle('liked');
}

function seekTrack() {
  const value = progressSlider.value;
  progress.style.width = value + '%';
  
  // Convert to time display
  const totalSeconds = 200; // Simulated track length
  const currentSeconds = Math.floor((value / 100) * totalSeconds);
  currentTime.textContent = formatTime(currentSeconds);
}

function changeVolume() {
  const value = volumeSlider.value;
  const volumeBar = document.querySelector('.volume-bar');
  volumeBar.style.setProperty('--volume', value + '%');
  
  // Update volume icon based on level
  const volumeIcon = volumeBtn.querySelector('svg');
  if (value == 0) {
    volumeIcon.innerHTML = '<polygon points="11,5 6,9 2,9 2,15 6,15 11,19 11,5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>';
  } else if (value < 50) {
    volumeIcon.innerHTML = '<polygon points="11,5 6,9 2,9 2,15 6,15 11,19 11,5"/>';
  } else {
    volumeIcon.innerHTML = '<polygon points="11,5 6,9 2,9 2,15 6,15 11,19 11,5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>';
  }
}

function simulateTrackProgress() {
  if (!isPlaying) return;
  
  let progress = 0;
  const interval = setInterval(() => {
    if (!isPlaying) {
      clearInterval(interval);
      return;
    }
    
    progress += 0.5; // Increment progress
    
    if (progress >= 100) {
      clearInterval(interval);
      
      // Handle track end based on repeat mode
      if (repeatMode === 2) {
        // Repeat current track
        simulateTrackProgress();
      } else if (repeatMode === 1 || currentTrackIndex < currentPlaylist.length - 1) {
        // Move to next track
        nextTrack();
      } else {
        // Stop playing
        isPlaying = false;
        updatePlayPauseButton();
      }
      return;
    }
    
    progressSlider.value = progress;
    document.getElementById('progress').style.width = progress + '%';
    
    // Update time display
    const totalSeconds = 200; // Simulated track length
    const currentSeconds = Math.floor((progress / 100) * totalSeconds);
    currentTime.textContent = formatTime(currentSeconds);
  }, 100);
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function initializePlayer() {
  // Set initial duration
  duration.textContent = '3:20';
  
  // Set initial volume bar width
  const volumeBar = document.querySelector('.volume-bar');
  const initialVolume = volumeSlider.value;
  volumeBar.style.setProperty('--volume', initialVolume + '%');
}

// Playlist management
function openPlaylistModal() {
  createPlaylistModal.classList.add('active');
  playlistNameInput.focus();
}

function closePlaylistModal() {
  createPlaylistModal.classList.remove('active');
  playlistNameInput.value = '';
  playlistDescInput.value = '';
}

function createNewPlaylist() {
  const name = playlistNameInput.value.trim() || 'My Playlist #1';
  const description = playlistDescInput.value.trim();
  
  const newPlaylist = {
    id: Date.now(),
    name: name,
    description: description,
    tracks: []
  };
  
  userPlaylists.push(newPlaylist);
  addPlaylistToSidebar(newPlaylist);
  closePlaylistModal();
}

function addPlaylistToSidebar(playlist) {
  const playlistItem = document.createElement('div');
  playlistItem.className = 'playlist-item';
  playlistItem.innerHTML = `<span>${playlist.name}</span>`;
  
  playlistItem.addEventListener('click', () => {
    // Load user playlist (empty for now)
    displaySearchResults([]);
  });
  
  playlistsList.appendChild(playlistItem);
}

function loadPlaylists() {
  // Load any existing playlists from localStorage
  const saved = localStorage.getItem('userPlaylists');
  if (saved) {
    userPlaylists = JSON.parse(saved);
    userPlaylists.forEach(playlist => {
      addPlaylistToSidebar(playlist);
    });
  }
  
  const savedLiked = localStorage.getItem('likedTracks');
  if (savedLiked) {
    likedTracks = JSON.parse(savedLiked);
  }
}

// Save data to localStorage when page unloads
window.addEventListener('beforeunload', () => {
  localStorage.setItem('userPlaylists', JSON.stringify(userPlaylists));
  localStorage.setItem('likedTracks', JSON.stringify(likedTracks));
});

// Add CSS custom property support for volume bar
const style = document.createElement('style');
style.textContent = `
  .volume-bar::before {
    width: var(--volume, 50%) !important;
  }
`;
document.head.appendChild(style);