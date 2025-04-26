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
    // 添加 console.log 语句来打印切换后的音频路径
    console.log('Switched to music:', audio.src);
    audio.play();
});

const images = [
    "../images/index-1.jpg",
    "../images/index-2.jpg",    
    "../images/index-3.jpg",
    "../images/index-4.jpg",
    "../images/index-5.jpg",
    "../images/index-6.jpg",
    "../images/index-7.jpg",
    "../images/index-8.jpg",
    "../images/index-9.jpg",
    "../images/index-10.jpg",
    "../images/index-11.jpg",
    "../images/index-12.jpg",
    "../images/index-13.jpg",
    "../images/index-14.jpg",
    "../images/index-15.jpg"
];

function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
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

// 图片转场效果
function startImageSlider() {
    const images = document.querySelectorAll('.image-slider img');
    let currentIndex = 0;

    function showNextImage() {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
    }

    function showPrevImage() {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        images[currentIndex].classList.add('active');
    }

    // 获取按钮元素
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');

    // 为按钮添加点击事件
    prevButton.addEventListener('click', showPrevImage);
    nextButton.addEventListener('click', showNextImage);

    setInterval(showNextImage, 5000);
}

const commentInput = document.getElementById('comment-input');
const submitButton = document.getElementById('submit-comment');
const commentContainer = document.getElementById('comment-container');

// 删除评论的函数
function deleteComment(index) {
    let storedComments = localStorage.getItem('comments');
    let comments = storedComments? JSON.parse(storedComments) : [];
    // 从数组中移除指定索引的评论
    comments.splice(index, 1);
    // 更新本地存储
    localStorage.setItem('comments', JSON.stringify(comments));
    // 重新渲染评论列表
    commentContainer.innerHTML = '';
    comments.forEach((comment, i) => {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.textContent = comment;
        const deleteButton = document.createElement('span');
        deleteButton.textContent = '×';
        deleteButton.classList.add('delete-comment');
        deleteButton.addEventListener('click', () => deleteComment(i));
        commentElement.appendChild(deleteButton);
        commentContainer.appendChild(commentElement);
    });
}

// 页面加载时从本地存储中获取评论
window.addEventListener('load', function () {
    const storedComments = localStorage.getItem('comments');
    if (storedComments) {
        const comments = JSON.parse(storedComments);
        comments.forEach((comment, index) => {
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment');
            commentElement.textContent = comment;
            const deleteButton = document.createElement('span');
            deleteButton.textContent = '×';
            deleteButton.classList.add('delete-comment');
            deleteButton.addEventListener('click', () => deleteComment(index));
            commentElement.appendChild(deleteButton);
            commentContainer.appendChild(commentElement);
        });
    }
});

// 封装评论提交逻辑
function submitComment() {
    const commentText = commentInput.value;
    if (commentText.trim()!== '') {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.textContent = commentText;
        const deleteButton = document.createElement('span');
        deleteButton.textContent = '×';
        deleteButton.classList.add('delete-comment');
        deleteButton.addEventListener('click', () => {
            const comments = Array.from(commentContainer.children);
            const index = comments.indexOf(commentElement);
            deleteComment(index);
        });
        commentElement.appendChild(deleteButton);
        commentContainer.appendChild(commentElement);

        // 将新评论添加到本地存储
        let storedComments = localStorage.getItem('comments');
        let comments = storedComments? JSON.parse(storedComments) : [];
        comments.push(commentText);
        localStorage.setItem('comments', JSON.stringify(comments));

        commentInput.value = '';
    }
}

// 监听输入框的 keydown 事件
if (commentInput) {
    commentInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // 阻止默认的换行行为
            submitComment();
        }
    });
}

submitButton.addEventListener('click', submitComment);

// 打开评论模态框
const openCommentModalButton = document.getElementById('open-comment-modal');
const commentModal = document.getElementById('comment-modal');
const closeCommentModal = document.querySelector('.close');

openCommentModalButton.addEventListener('click', function () {
    commentModal.style.display = 'block';
});

// 关闭评论模态框
closeCommentModal.addEventListener('click', function () {
    commentModal.style.display = 'none';
});

// 当用户点击模态框外部时关闭模态框
window.addEventListener('click', function (event) {
    if (event.target === commentModal) {
        commentModal.style.display = 'none';
    }
});

window.onload = function () {
    const heroSection = document.querySelector('.hero-section');
    const randomImage = getRandomImage();
    heroSection.style.backgroundImage = `url('${randomImage}')`;
    createSnowflakes();
    startImageSlider();
    audio.play();
    console.log('Initial music path:', audio.src);
};
    