// 导出空气质量展示组件的定义
export default {
    // 组件属性，用于接收空气质量指数数据
    props: {
        aqi: {
            type: Object,
            default: () => ({}) // 设默认空对象，避免空值报错
        }
    },

    data: {
        // 标题默认为"空气质量"
        title: "空气质量",
        airNumber: 0, // 空气质量指数数值
        percentNumber: 0, // 空气质量指数百分比表示
        airQuality: "", // 空气质量级别描述
        PM2_5: 0, // PM2.5数值
        PM10: 0, // PM10数值
        SO2: 0, // SO₂数值
        NO2: 0, // NO₂数值
        CO: 0, // CO数值
        O3: 0 // O₃数值
    },

    // 组件初始化时调用的函数
    onInit() {
        this.onChange(); // 调用 onChange 函数更新组件数据
        this.$watch('aqi', 'onChange'); // 监听 AQI 属性的变化
    },

    // 当 AQI 属性变化时调用的函数
    onChange() {
        // 更新空气质量数据 - 使用小写字段名
        this.airNumber = this.aqi.aqi || 0;
        this.PM10 = this.aqi.pm10 || 0;      // 使用小写 pm10
        this.PM2_5 = this.aqi.pm25 || 0;     // 使用小写 pm25
        this.NO2 = this.aqi.no2 || 0;        // 使用小写 no2
        this.SO2 = this.aqi.so2 || 0;        // 使用小写 so2
        this.CO = this.aqi.co || 0;          // 使用小写 co
        this.O3 = this.aqi.o3 || 0;          // 使用小写 o3

        // 计算百分比（AQI最大值一般为500，这里按500计算百分比）
        const aqiValue = parseInt(this.airNumber) || 0;
        this.percentNumber = Math.min((aqiValue / 500) * 100, 100);

        // 根据AQI值判断空气质量级别
        if (aqiValue <= 50) {
            this.airQuality = "优";
        } else if (aqiValue <= 100) {
            this.airQuality = "良";
        } else if (aqiValue <= 150) {
            this.airQuality = "轻度污染";
        } else if (aqiValue <= 200) {
            this.airQuality = "中度污染";
        } else if (aqiValue <= 300) {
            this.airQuality = "重度污染";
        } else {
            this.airQuality = "严重污染";
        }

        console.info("空气质量数据已更新:", {
            airNumber: this.airNumber,
            PM2_5: this.PM2_5,
            PM10: this.PM10,
            NO2: this.NO2,
            SO2: this.SO2,
            CO: this.CO,
            O3: this.O3
        });
    }
}
