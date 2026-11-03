import router from '@ohos.router';

export default {
    data: {
        timeout: 0 // 初始化进度条的百分比为 0
    },
    onInit() {
        this.updateProgress();
    },
    updateProgress() {
        // 每隔 30 毫秒增加 timeout 的值，直到它达到 100
        let intervalId = setInterval(() => {
            if (this.timeout < 100) {
                this.timeout += 1; // 每次增加 1%
            } else {
                clearInterval(intervalId); // 清除计时器
                this.navigateToPage(); // 进度条满了立即调用页面跳转
            }
        }, 30); // 30 毫秒更新一次进度
    },
    navigateToPage() {
        // 直接跳转到 weather 页面
        router.pushUrl({
            url: 'pages/weather/weather' // 跳转至天气页面
        });
    }
}
