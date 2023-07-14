
const video = document.querySelector('#video')
const play = document.querySelector('#play')
const stop = document.querySelector('#stop')
const progress = document.querySelector('#progress')
const timestamp = document.querySelector('#timestamp')

function toggleVideoStatus(){
    if(video.paused){
        video.play()
    }
    else{
        video.pause()
    }
}

function updatePlayIcon(){
    if(video.paused){
        play.innerHTML = '<i class="fa fa-play fa-2x"></i>'
    }
    else{
        play.innerHTML = '<i class="fa fa-pause fa-2x"></i>'
    }
}

function updateProgess(){
    progress.value = (video.currentTime / video.duration) * 100

    let mins = Math.floor(video.currentTime / 60)
    if(mins < 10){
        mins = '0' + String(mins)
    }
    let secs = Math.floor(video.currentTime % 60)
    if(secs < 10){
        secs = '0' + String(secs)
    }

    timestamp.innerHTML = `${mins}:${secs}`
}

function stopVideo(){
    video.currentTime = 0
    video.pause()
}

function setVideoProgress(){
    video.currentTime = (+progress.value * video.duration) / 100
}

video.addEventListener('click', toggleVideoStatus)
video.addEventListener('pause', updatePlayIcon)
video.addEventListener('play', updatePlayIcon)
video.addEventListener('timeupdate', updateProgess)

play.addEventListener('click', toggleVideoStatus)

stop.addEventListener('click', stopVideo)

progress.addEventListener('change', setVideoProgress)