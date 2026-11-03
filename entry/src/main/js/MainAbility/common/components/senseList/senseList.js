// 导出舒适度指标展示组件的定义
export default {
    //props: ['weatherData'], // 组件属性，用于接收天气数据
    props: {
        weatherData: {
            type: Object, // 因为weatherData是对象类型
            default: () => ({}) // 默认空对象，避免空值报错
        }
    },
    data: {
        // 添加本地数据来存储处理后的值
        humidity: "",
        feelsLike: "",
        uvIndex: "",
        pressureValue: ""
    },
    // 组件初始化时调用的函数
    onInit() {
        this.onChange();
        // 监听 weatherData 属性变化
        this.$watch('weatherData', 'onChange');
    },
    // 当 weatherData 属性变化时调用的函数
    onChange() {
        // 处理数据，提供默认值
        this.humidity = this.weatherData.rh ? this.weatherData.rh + "%" : "未知";
        this.feelsLike = this.weatherData.feels_like ? this.weatherData.feels_like + "℃" : "未知";
        this.uvIndex = this.weatherData.uv ? this.weatherData.uv + "级" : "未知";
        this.pressureValue = this.weatherData.pressure ? this.weatherData.pressure + "hPa" : "未知";

        // 输出日志信息，包含所有的舒适度指标
        console.info(
            "舒适度指标: ",
            "湿度:" + this.humidity + ','
            + "体感:" + this.feelsLike + ","
            + "紫外线:" + this.uvIndex + ","
            + "气压:" + this.pressureValue
        );
    }
}
