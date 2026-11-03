// 导出天气简要信息组件的定义
export default {
    props: ['tempData'], // 接收外部传入的 tempData 属性
    data: {
        title: "", // 温度值初始化为空
        C: "℃", // 温度单位
        weather: "", // 天气情况初始化为空
        air: "", // 空气质量信息初始化为空
        tempData:{}
    },
    // 组件初始化时调用的函数
    onInit() {
        this.onChange() // 调用 onChange 方法更新组件数据
        this.$watch('tempData', 'onChange') // 监听 tempData 属性变化
    },
    // 当 tempData 属性变化时调用的函数
    onChange() {
        // 更新温度值
        this.title = this.tempData.temp;
        // 更新天气情况
        this.weather = `${this.tempData.text} ${this.tempData.high}°/${this.tempData.low}°`;
        // 更新空气质量信息
        this.air = "空气" + this.tempData.aqi_level + " " + this.tempData.aqi;
    }
}
