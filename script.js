console.log("Welcome to Spotify");

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: "Ye Chota Nuvvuna", filePath: "songs/1.mp3", coverPath: "covers/1.jpeg" },
    { songName: "Kalumoosi", filePath: "songs/2.mp3", coverPath: "covers/2.jpeg" },
    { songName: "Arere Aakasam", filePath: "songs/3.mp3", coverPath: "covers/3.jpeg" },
    { songName: "Gaali Vaaluga", filePath: "songs/4.mp3", coverPath: "covers/4.jpeg" },
    { songName: "Hridayam Lopala", filePath: "songs/5.mp3", coverPath: "covers/5.jpeg" },
    { songName: "Koppamga Koppamga", filePath: "songs/6.mp3", coverPath: "covers/6.jpeg" },
    { songName: "Mella Mellaga", filePath: "songs/7.mp3", coverPath: "covers/7.jpeg" },
    { songName: "Ninnila", filePath: "songs/8.mp3", coverPath: "covers/8.jpeg" },
    { songName: "Vellipomaake", filePath: "songs/9.mp3", coverPath: "covers/9.jpeg" },
    { songName: "Yevevo", filePath: "songs/10.mp3", coverPath: "covers/10.jpeg" },
];

let songContainer = document.getElementById('songContainer');
songItems = [];
songs.forEach((song, i) => {
    const songItem = document.createElement('div');
    songItem.className = 'songItem';
    songItem.innerHTML = `
        <img src="${song.coverPath}" alt="cover">
        <span class="songName">${song.songName}</span>
        <span class="songlistplay"><button class="songItemPlay" id="${i}">▶️</button></span>
    `;
    songContainer.appendChild(songItem);
    songItems.push(songItem);
});

const makeAllPlays = () => {
    document.querySelectorAll('.songItemPlay').forEach(btn => btn.innerText = '▶️');
};

const playSongAtIndex = (index) => {
    songIndex = index;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.innerText = '⏸️';
    makeAllPlays();
    document.getElementById(songIndex).innerText = '⏸️';
};

document.querySelectorAll('.songItemPlay').forEach((button) => {
    button.addEventListener('click', (e) => {
        const index = parseInt(e.target.id);
        if (songIndex === index && !audioElement.paused) {
            audioElement.pause();
            e.target.innerText = '▶️';
            masterPlay.innerText = '▶️';
            gif.style.opacity = 0;
        } else {
            playSongAtIndex(index);
        }
    });
});

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.innerText = '⏸️';
        gif.style.opacity = 1;
        document.getElementById(songIndex).innerText = '⏸️';
    } else {
        audioElement.pause();
        masterPlay.innerText = '▶️';
        gif.style.opacity = 0;
        document.getElementById(songIndex).innerText = '▶️';
    }
});

audioElement.addEventListener('timeupdate', () => {
    const progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    playSongAtIndex(songIndex);
});

document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    playSongAtIndex(songIndex);
});

audioElement.addEventListener('ended', () => {
    songIndex = (songIndex + 1) % songs.length;
    playSongAtIndex(songIndex);
});
