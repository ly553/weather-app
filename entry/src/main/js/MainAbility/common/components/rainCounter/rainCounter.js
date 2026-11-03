export default {
    //props: ['weatherData'], // 组件属性，用于接收天气数据
    props: {
        // 把props改成对象形式，明确类型（避免数组形式的模糊定义）
        weatherData: {
            type: Object,
            default: () => ({}) // 默认值设为空对象，防止空值报错
        }
    },
    data: {
        title: "云量:", // 默认标题为云量
        cloud: "", // 云量百分比
        clouds: '/common/img/cloud1.png', // 默认云量图标
        isRain: false, // 标记是否有降雨
        // 初始化rainBarData为符合chart要求的格式
        rainBarData: [{
            data: [] // 明确data是数组
        }],
        // 初始化rainBarOps为chart的配置对象（避免空对象）
        rainBarOps: {
            xAxis: { type: 'category' },
            yAxis: { type: 'value' }
        },
        weather: "" // 新增：定义weather变量
    },
    // 组件初始化时调用的函数
    onInit() {
        this.onChange() // 调用 onChange 函数更新组件数据
        this.$watch('weatherData', 'onChange') // 监听 weatherData 的变化
    },
    // 当 weatherData 属性变化时调用的函数
    onChange() {
        this.weather = this.weatherData.text; // 获取天气状况
        if (this.weather.indexOf('雨') === -1) {
            // 如果天气中不包含“雨”
            this.isRain = false; // 设置降雨标记为 false
            this.cloud = " " + this.weatherData.clouds_count[0] + "%"; // 设置云量百分比
            // 根据云量百分比选择对应的云量图标
            if (this.weatherData.clouds_count[0] >= 67) {
                this.clouds = "/common/img/other/cloud3.png";
            } else if (this.weatherData.clouds_count[0] >= 33) {
                this.clouds = "/common/img/other/cloud2.png";
            } else if (33 > this.weatherData.clouds_count[0] && this.weatherData.clouds_count[0] > 0) {
                this.clouds = "/common/img/other/cloud1.png";
            }
        } else {
            // 如果天气中包含“雨”
            this.title = "降雨量/h:"; // 设置标题为降雨量
            this.isRain = true; // 设置降雨标记为 true
            // 更新降雨量统计图数据
            this.rainBarData[0].data = this.weatherData.rain_count.slice();
        }
    }
}
