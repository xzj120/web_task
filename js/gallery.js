const musicList = [
    "../musics/music-1.mp3",
    "../musics/music-2.mp3",
    "../musics/music-3.mp3"
    // 可以继续添加更多音乐文件路径
];

// 获取音频元素
const audio = document.getElementById('music');
// 当前播放的音乐索引
let currentMusicIndex = 0;

// 设置初始音乐
audio.src = musicList[currentMusicIndex];

// 监听音频播放结束事件
audio.addEventListener('ended', function () {
    // 切换到下一首音乐
    currentMusicIndex = (currentMusicIndex + 1) % musicList.length;
    audio.src = musicList[currentMusicIndex];
    audio.play();
});

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

// 点赞功能
function setupLikeButtons() {
    const likeButtons = document.querySelectorAll('.like-button');
    likeButtons.forEach(button => {
        const imageId = button.dataset.imageId;
        const likeCountElement = document.getElementById(`like-count-${imageId}`);

        // 从 localStorage 中获取点赞数
        let likeCount = localStorage.getItem(`like-count-${imageId}`);
        if (likeCount === null) {
            likeCount = 0;
        } else {
            likeCount = parseInt(likeCount);
        }
        likeCountElement.textContent = likeCount;

        button.addEventListener('click', function () {
            likeCount++;
            likeCountElement.textContent = likeCount;
            // 将点赞数保存到 localStorage
            localStorage.setItem(`like-count-${imageId}`, likeCount);
        });
    });
}

window.onload = function () {
    createSnowflakes();
    audio.play();
    setupLikeButtons();
};