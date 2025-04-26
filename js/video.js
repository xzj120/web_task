// 定义包含视频文件路径的数组
const videos = [
    "../radios/video-1.mp4",
    "../radios/video-2.mp4",
    "../radios/video-3.mp4"
    // 可以继续添加更多视频路径
];

// 随机选择一个视频的函数
function getRandomVideo() {
    const randomIndex = Math.floor(Math.random() * videos.length);
    return videos[randomIndex];
}

// 雪花飘落效果
function createSnowflakes() {
    const snowContainer = document.getElementById('snow-container');
    const numSnowflakes = 50;

    for (let i = 0; i < numSnowflakes; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflake.style.left = Math.random() * 100 + 'vw';
        snowflake.style.animationDuration = Math.random() * 10 + 5 + 's';
        snowflake.style.animationDelay = Math.random() * 5 + 's';
        snowContainer.appendChild(snowflake);
    }
}

window.onload = function () {
    const videoElement = document.getElementById('video-player');
    const randomVideo = getRandomVideo();
    console.log('Selected video path:', randomVideo); // 输出选中的视频路径
    videoElement.src = randomVideo;
    videoElement.play();

    createSnowflakes();
};