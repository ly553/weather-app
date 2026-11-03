import router from '@system.router';

export default {
    data: {
        aqiData: {
            aqi: 0,
            level: "",
            description: "",
            pm25: 0,
            pm10: 0,
            no2: 0,
            so2: 0,
            co: 0,
            o3: 0,
            cityName: ""
        },
        pm25Percent: 0,
        pm10Percent: 0,
        no2Percent: 0,
        so2Percent: 0,
        coPercent: 0,
        o3Percent: 0,
        healthAdvice: "",
        updateTime: ""
    },

    onInit() {
        // 获取传递的参数
        const params = router.getParams();
        console.log('空气质量详情页接收到的参数:', params);

        if (params) {
            this.aqiData = {
                aqi: params.aqi || 0,
                level: this.getAQILevel(params.aqi || 0),
                description: this.getAQIDescription(params.aqi || 0),
                pm25: params.pm25 || 0,
                pm10: params.pm10 || 0,
                no2: params.no2 || 0,
                so2: params.so2 || 0,
                co: params.co || 0,
                o3: params.o3 || 0,
                cityName: params.cityName || "当前城市"
            };

            // 计算百分比
                        // @ts-ignore
            this.pm25Percent = Math.min((params.pm25 || 0) / 250 * 100, 100);
                        // @ts-ignore
            this.pm10Percent = Math.min((params.pm10 || 0) / 420 * 100, 100);
                        // @ts-ignore
            this.no2Percent = Math.min((params.no2 || 0) / 200 * 100, 100);
                        // @ts-ignore
            this.so2Percent = Math.min((params.so2 || 0) / 500 * 100, 100);
                        // @ts-ignore
            this.coPercent = Math.min((params.co || 0) / 10 * 100, 100);
                        // @ts-ignore
            this.o3Percent = Math.min((params.o3 || 0) / 200 * 100, 100);
            // 健康建议
            this.healthAdvice = this.getHealthAdvice(params.aqi || 0);

        }
    },

    getAQILevel(aqi) {
        if (aqi <= 50) return "优";
        if (aqi <= 100) return "良";
        if (aqi <= 150) return "轻度污染";
        if (aqi <= 200) return "中度污染";
        if (aqi <= 300) return "重度污染";
        return "严重污染";
    },

    getAQIDescription(aqi) {
        if (aqi <= 50) return "空气质量令人满意，基本无空气污染";
        if (aqi <= 100) return "空气质量可接受，某些污染物可能对极少数异常敏感人群有较弱影响";
        if (aqi <= 150) return "易感人群症状有轻度加剧，健康人群出现刺激症状";
        if (aqi <= 200) return "进一步加剧易感人群症状，可能对健康人群心脏、呼吸系统有影响";
        if (aqi <= 300) return "心脏病和肺病患者症状显著加剧，运动耐受力降低，健康人群普遍出现症状";
        return "健康人群运动耐受力降低，有明显强烈症状，提前出现某些疾病";
    },

    getHealthAdvice(aqi) {
        if (aqi <= 50) return "各类人群可正常活动。";
        if (aqi <= 100) return "极少数异常敏感人群应减少户外活动。";
        if (aqi <= 150) return "儿童、老年人及心脏病、呼吸系统疾病患者应减少长时间、高强度的户外锻炼。";
        if (aqi <= 200) return "儿童、老年人及心脏病、肺病患者应停留在室内，停止户外运动，一般人群减少户外运动。";
        if (aqi <= 300) return "儿童、老年人和心脏病、肺病患者应停留在室内，停止户外运动，一般人群避免户外活动。";
        return "儿童、老年人和病人应当留在室内，避免体力消耗，一般人群应避免户外活动。";
    },

    getColorByValue(value) {
        if (value <= 50) return "#00E400";      // 优 - 绿色
        if (value <= 100) return "#FFFF00";     // 良 - 黄色
        if (value <= 150) return "#FF7E00";     // 轻度污染 - 橙色
        if (value <= 200) return "#FF0000";     // 中度污染 - 红色
        if (value <= 300) return "#99004C";     // 重度污染 - 紫色
        return "#7E0023";                       // 严重污染 - 褐红色
    },

    getPM25Level(pm25) {
        if (pm25 <= 35) return "优";
        if (pm25 <= 75) return "良";
        if (pm25 <= 115) return "轻度污染";
        if (pm25 <= 150) return "中度污染";
        if (pm25 <= 250) return "重度污染";
        return "严重污染";
    },

    getPM10Level(pm10) {
        if (pm10 <= 50) return "优";
        if (pm10 <= 150) return "良";
        if (pm10 <= 250) return "轻度污染";
        if (pm10 <= 350) return "中度污染";
        if (pm10 <= 420) return "重度污染";
        return "严重污染";
    },

    getNO2Level(no2) {
        if (no2 <= 40) return "优";
        if (no2 <= 80) return "良";
        if (no2 <= 180) return "轻度污染";
        if (no2 <= 280) return "中度污染";
        if (no2 <= 565) return "重度污染";
        return "严重污染";
    },

    getSO2Level(so2) {
        if (so2 <= 50) return "优";
        if (so2 <= 150) return "良";
        if (so2 <= 475) return "轻度污染";
        if (so2 <= 800) return "中度污染";
        if (so2 <= 1600) return "重度污染";
        return "严重污染";
    },

    getCOLevel(co) {
        if (co <= 2) return "优";
        if (co <= 4) return "良";
        if (co <= 14) return "轻度污染";
        if (co <= 24) return "中度污染";
        if (co <= 36) return "重度污染";
        return "严重污染";
    },

    getO3Level(o3) {
        if (o3 <= 100) return "优";
        if (o3 <= 160) return "良";
        if (o3 <= 215) return "轻度污染";
        if (o3 <= 265) return "中度污染";
        if (o3 <= 800) return "重度污染";
        return "严重污染";
    },

    goBack() {
        router.back();
    }
};
