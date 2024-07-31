const tracks = [
  {
    albumCover: {
      source: "assets/images/ac-img-1.jpg",
      alt: "Foo",
    },
    name: "Empire Ants",
    album: "Plastic Beach",
    artist: "Gorillaz",
    duration: 284,
  },
  {
    albumCover: {
      source: "assets/images/ac-img-2.jpg",
      alt: "Foo",
    },
    name: "New Gold (feat. Bootie Brown & Tame Impala)",
    album: "Cracker Island",
    artist: "Gorillaz",
    duration: 215,
  },
  {
    albumCover: {
      source: "assets/images/ac-img-3.jpg",
      alt: "Foo",
    },
    name: "BYE",
    album: "GÉNESIS",
    artist: "Peso Pluma",
    duration: 213,
  },
  {
    albumCover: {
      source: "assets/images/ac-img-4.jpeg",
      alt: "Foo",
    },
    name: "AMG",
    album: "AMG - Single",
    artist: "Natanael Cano, Peso Pluma & Gabito Ballesteros",
    duration: 175,
  },
  {
    albumCover: {
      source: "assets/images/ac-img-5.jpeg",
      alt: "Foo",
    },
    name: "Lucy In The Sky with Diamonds",
    album: "Sgt. Pepper's Lonely Hearts Club Band",
    artist: "The Beatles",
    duration: 315,
  },
  {
    albumCover: {
      source: "assets/images/ac-img-6.webp",
      alt: "Foo",
    },
    name: "Barbie Dreams",
    album: "Queen",
    artist: "Nicki Minaj",
    duration: 325,
  },
  {
    albumCover: {
      source: "assets/images/ac-img-7.jpg",
      alt: "Foo",
    },
    name: "Breezin'",
    album: "Breezin'",
    artist: "George Benson",
    duration: 395,
  },
  {
    albumCover: {
      source: "assets/images/ac-img-8.jpg",
      alt: "Foo",
    },
    name: "Weak for Your Love",
    album: "Thee Sacred Souls",
    artist: "Thee Sacred Souls",
    duration: 305,
  },
  {
    albumCover: {
      source: "assets/images/ac-img-9.jpg",
      alt: "Foo",
    },
    name: "Talking In Your Sleep",
    album: "The Romantics: Super Hits",
    artist: "The Romantics",
    duration: 319,
  },
  {
    albumCover: {
      source: "assets/images/ac-img-10.jpg",
      alt: "Foo",
    },
    name: "Funny Thing",
    album: "It Is What It Is",
    artist: "Thundercat",
    duration: 299,
  },
  {
    albumCover: {
      source: "assets/images/ac-img-11.jpeg",
      alt: "Foo",
    },
    name: "La Vida Es Fría",
    album: "La Vida Es Fría",
    artist: "Jason Joshua",
    duration: 312,
  },
  {
    albumCover: {
      source: "assets/images/ac-img-12.jpg",
      alt: "Foo",
    },
    name: "Parachute",
    album: "Parachute b/w Si Me Faltaras",
    artist: "Thee Lakesiders",
    duration: 301,
  },
];

const state = {
  nowPlaying: null,
  history: [],
  isPlaying: false,
  isFavoritePlaylist: false,
  isShuffleToggled: false,
  isRepeatToggled: false,
  togglePlayback: function () {
    this.isPlaying = !this.isPlaying;
    console.log(`isPlaying: ${this.isPlaying}`);
  },
  toggleFavoritePlaylist: function () {
    this.isFavoritePlaylist = !this.isFavoritePlaylist;
    console.log(`isFavoritePlaylist: ${this.isFavoritePlaylist}`);
  },
  toggleShuffle: function () {
    this.isShuffleToggled = !this.isShuffleToggled;
    console.log(`isShuffleToggled: ${this.isShuffleToggled}`);
  },
  toggleRepeat: function () {
    this.isRepeatToggled = !this.isRepeatToggled;
    console.log(`isRepeatToggled: ${this.isRepeatToggled}`);
  },
  playTrackAtOffset: function (offset) {
    // Update the history and nowPlaying property.
    this.isPlaying = true;
    this.nowPlaying === null ? {} : this.history.push(this.nowPlaying);
    this.nowPlaying = tracks[offset];
    console.log(
      `Now playing ${this.nowPlaying.name} by ${this.nowPlaying.artist}.`
    );
  },
  playTrack: function () {},
};

function timestampFromSeconds(duration) {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  const fmtSeconds = `${seconds}`.padStart(2, "0");
  return `${minutes}:${fmtSeconds}`;
}

const playbackButtons = document.getElementsByClassName("btn-pb");
for (const button of playbackButtons) {
  button.addEventListener("click", function () {
    // Cannot toggle buttons if there are no tracks in the playlist.
    if (tracks.length === 0) {
      return;
    }

    for (const button of playbackButtons) {
      let currentIconClass, newIconClass;
      if (state.isPlaying) {
        currentIconClass = "bi-pause-fill";
        newIconClass = "bi-play-fill";
      } else {
        currentIconClass = "bi-play-fill";
        newIconClass = "bi-pause-fill";
      }
      // Update the icon on the playback button from a Play icon to a Pause icon
      // if the player is currently playing. Otherwise, update the Pause icon to
      // the Play icon.
      button.children[0].classList.replace(currentIconClass, newIconClass);
    }
    state.togglePlayback();
  });
}

const favoritePlaylistButton = document.getElementById("btn-favorite");
favoritePlaylistButton.addEventListener("click", function () {
  let currentIconClass, newIconClass;
  if (state.isFavoritePlaylist) {
    currentIconClass = "bi-heart-fill";
    newIconClass = "bi-heart";
  } else {
    currentIconClass = "bi-heart";
    newIconClass = "bi-heart-fill";
  }
  // Update the Heart icon on the favorite button from being unfilled to filled
  // when the playlist is marked as a favorite. Unfill the heart if the
  // playlist is not marked as favorite.
  this.children[0].classList.replace(currentIconClass, newIconClass);
  state.toggleFavoritePlaylist();
});

const trackRowListDiv = document.getElementById("tracks-list");
for (let i = 0; i < tracks.length; i++) {
  const track = tracks[i];
  // Append each track in the tracks list to the "tracks-list" HTML element.
  trackRowListDiv.innerHTML += `
    <div class="track-row row border-bottom border-1 border-dark bg-black py-1">
      <!-- Track number -->
      <small class="track-num col-1 px-0 py-2">${i + 1}</small>
      <!-- Track album cover -->
      <div class="track-cover-img col-2 col-md-1 text-start px-0 ps-3">
        <img src="${track.albumCover.source}" alt="${track.albumCover.alt}" />
      </div>
      <!-- Track name -->
      <small class="track-name col py-2 text-start">${track.name}</small>
      <!-- Track album name -->
      <small
        class="track-album col-md-3 col-lg-2 d-none d-md-block py-2 text-start"
      >
        ${track.album}
      </small>
      <!-- Track artist name -->
      <small class="track-artist col-lg-2 d-none d-lg-block py-2 text-start">
        ${track.artist}
      </small>
      <!-- Track duration -->
      <small class="track-duration col-2 px-0 py-2">${timestampFromSeconds(
        track.duration
      )}</small>
    </div>
  `;
}
// Append some extra spacing after the last element to prevent the media player
// footer from covering tracks in the playlist.
trackRowListDiv.innerHTML += `<div class="row p-5 bg-black"></div>`;

const trackRowDivs = document.getElementsByClassName("track-row");
for (let i = 0; i < trackRowDivs.length; i++) {
  trackRowDivs[i].addEventListener("click", function () {
    // Play the selected track.
    state.playTrackAtOffset(i);
    // Set the playback buttons to reflect the media playing.
    for (const button of playbackButtons) {
      button.children[0].classList.replace("bi-play-fill", "bi-pause-fill");
    }
    // Reset the color of each trackRow in trackRowDivs to be deselected.
    for (const trackRow of trackRowDivs) {
      trackRow.style.color = "white";
    }
    // Set the text color of the selected track to be green.
    this.style.color = "var(--green)";
  });
}

const shuffleButton = document.getElementById("btn-pb-shuffle");
shuffleButton.addEventListener("click", function () {
  // Highlight the shuffle button if it is toggled on.
  this.children[0].style.color = state.isShuffleToggled
    ? "gray"
    : "var(--green)";
  // Update the shuffle state.
  state.toggleShuffle();
});

const repeatButton = document.getElementById("btn-pb-repeat");
repeatButton.addEventListener("click", function () {
  // Highlight the repeat button if it is toggled on.
  this.children[0].style.color = state.isRepeatToggled
    ? "gray"
    : "var(--green)";
  // Update the repeat state.
  state.toggleRepeat();
});
