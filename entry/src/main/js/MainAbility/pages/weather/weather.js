// 导入 HarmonyOS 的 App 模块和提示模块
import App from '@system.app';
import Prompt from '@system.prompt';
import router from '@system.router';
import prompt from '@ohos.prompt';
import formProvider from '@ohos.app.form.formProvider';

export default {
    // 定义组件的数据对象
    data: {
        tempData: {}, // 存储核心天气数据
        otherData: {}, // 存储其他天气相关数据
        weeklyData: [], // 存储一周的天气数据
        hourData: [], // 存储小时级的天气数据
        airQuality: {}, // 存储空气质量数据
        suggestion: [], // 存储天气建议数据
        time: {}, // 存储时间数据
        path: {}, // 存储城市标题信息
        preTime: -1, // 存储上一次单击返回按钮的时间
        currentCityName: "深圳", // 当前城市名称
        currentCityId: "101280601", // 当前城市ID（深圳的cityId）
    },

    // 组件初始化时调用的函数
    onInit() {
        // 获取路由传递的参数
        const params = router.getParams();
        console.log('接收到的参数:', params);

        // 如果有城市参数，更新当前城市信息
        if (params && params.cityName && params.cityId) {
            this.currentCityName = params.cityName;
            this.currentCityId = params.cityId;
            this.path = params.cityName; // 更新标题显示的城市名
            console.log('更新城市信息:', this.currentCityName, this.currentCityId);
        }

        // 根据城市信息初始化天气数据
        this.initWeatherData();
    },

    // 初始化天气数据
    initWeatherData() {
        console.log('初始化天气数据，城市:', this.currentCityName);

        // 根据城市ID设置不同的天气数据
        const weatherConfig = this.getCityWeatherConfig(this.currentCityId);
        this.path = this.currentCityName; // 更新path用于标题显示

        // 设置温度数据
        this.tempData = {
            temp: weatherConfig.temp,
            text: weatherConfig.weather,
            high: weatherConfig.high,
            low: weatherConfig.low,
            aqi: weatherConfig.aqi,
            aqi_level: weatherConfig.aqiLevel
        };

        // 设置小时数据（根据城市调整温度）
        this.hourData = this.getHourlyData(weatherConfig.baseTemp);

        // 设置周数据
        this.weeklyData = this.getWeeklyData(weatherConfig);

        // 设置其他数据
        this.otherData = {
            "wind_dir": weatherConfig.windDir,
            "wind_class": weatherConfig.windClass,
            "text": weatherConfig.weather,
            "clouds_count": ["90", "90", "90", "90", "90"],
            "rain_count": [200, 240, 150, 250, 120],
            "rh": weatherConfig.humidity,
            "feels_like": weatherConfig.feelsLike,
            "uv": weatherConfig.uv,
            "pressure": weatherConfig.pressure
        };

        // 设置空气质量数据
        this.airQuality = {
            "aqi": weatherConfig.aqi,
            "pm10": weatherConfig.pm10,
            "pm25": weatherConfig.pm25,
            "no2": weatherConfig.no2,
            "so2": weatherConfig.so2,
            "co": weatherConfig.co,
            "o3": weatherConfig.o3
        };

        // 设置建议数据
        this.suggestion = [
            {
                "type": "cl",
                "name": "晨练指数",
                "brief": weatherConfig.exerciseBrief,
                "detail": weatherConfig.exerciseDetail
            },
            {
                "type": "xc",
                "name": "洗车指数",
                "brief": weatherConfig.carWashBrief,
                "detail": weatherConfig.carWashDetail
            },
            {
                "type": "gm",
                "name": "感冒指数",
                "brief": weatherConfig.coldBrief,
                "detail": weatherConfig.coldDetail
            },
            {
                "type": "ys",
                "name": "穿衣指数",
                "brief": weatherConfig.dressBrief,
                "detail": weatherConfig.dressDetail
            },
            {
                "type": "yd",
                "name": "运动指数",
                "brief": weatherConfig.sportBrief,
                "detail": weatherConfig.sportDetail
            },
            {
                "type": "ly",
                "name": "旅游指数",
                "brief": weatherConfig.travelBrief,
                "detail": weatherConfig.travelDetail
            }
        ];

        this.time = this.getCurrentTime();
    },

    // 获取城市天气配置
    getCityWeatherConfig(cityId) {
        // 城市天气配置映射表
        const cityWeatherMap = {
            // 北京
            "101010100": {
                temp: "18",
                weather: "晴",
                high: "20",
                low: "8",
                aqi: "80",
                aqiLevel: "良",
                baseTemp: 18,
                windDir: "北风",
                windClass: "2级",
                humidity: "30",
                feelsLike: "16",
                uv: "5",
                pressure: "1025",
                pm10: "85",
                pm25: "45",
                no2: "30",
                so2: "10",
                co: "0.8",
                o3: "60",
                exerciseBrief: "较适宜",
                exerciseDetail: "天气晴朗，适合晨练",
                carWashBrief: "适宜",
                carWashDetail: "天气较好，适合洗车",
                coldBrief: "较易发",
                coldDetail: "昼夜温差大，注意保暖",
                dressBrief: "较舒适",
                dressDetail: "建议穿长袖衬衫单裤",
                sportBrief: "适宜",
                sportDetail: "天气较好，适合户外运动",
                travelBrief: "适宜",
                travelDetail: "天气晴朗，适合旅游"
            },
            // 上海
            "101020100": {
                temp: "22",
                weather: "多云",
                high: "24",
                low: "18",
                aqi: "60",
                aqiLevel: "良",
                baseTemp: 22,
                windDir: "东南风",
                windClass: "3级",
                humidity: "65",
                feelsLike: "23",
                uv: "4",
                pressure: "1018",
                pm10: "70",
                pm25: "40",
                no2: "35",
                so2: "8",
                co: "0.7",
                o3: "55",
                exerciseBrief: "适宜",
                exerciseDetail: "天气凉爽，适合晨练",
                carWashBrief: "适宜",
                carWashDetail: "无雨，适合洗车",
                coldBrief: "少发",
                coldDetail: "温度适宜，不易感冒",
                dressBrief: "舒适",
                dressDetail: "建议穿单层棉麻面料的短套装",
                sportBrief: "适宜",
                sportDetail: "天气舒适，适合运动",
                travelBrief: "适宜",
                travelDetail: "天气不错，适合出游"
            },
            // 广州
            "101280101": {
                temp: "26",
                weather: "晴",
                high: "28",
                low: "22",
                aqi: "50",
                aqiLevel: "优",
                baseTemp: 26,
                windDir: "南风",
                windClass: "2级",
                humidity: "70",
                feelsLike: "28",
                uv: "7",
                pressure: "1012",
                pm10: "55",
                pm25: "30",
                no2: "25",
                so2: "5",
                co: "0.6",
                o3: "40",
                exerciseBrief: "较适宜",
                exerciseDetail: "早晨温度适宜，适合晨练",
                carWashBrief: "适宜",
                carWashDetail: "天气晴好，适合洗车",
                coldBrief: "少发",
                coldDetail: "温度适宜，不易感冒",
                dressBrief: "热",
                dressDetail: "适合穿T恤、短薄外套",
                sportBrief: "较适宜",
                sportDetail: "气温较高，注意防暑",
                travelBrief: "适宜",
                travelDetail: "天气晴朗，适合旅游"
            },
            // 深圳
            "101280601": {
                temp: "27",
                weather: "多云",
                high: "29",
                low: "24",
                aqi: "45",
                aqiLevel: "优",
                baseTemp: 27,
                windDir: "东南风",
                windClass: "2级",
                humidity: "75",
                feelsLike: "29",
                uv: "6",
                pressure: "1010",
                pm10: "50",
                pm25: "25",
                no2: "20",
                so2: "4",
                co: "0.5",
                o3: "35",
                exerciseBrief: "适宜",
                exerciseDetail: "早晨凉爽，适合晨练",
                carWashBrief: "适宜",
                carWashDetail: "无雨，可以洗车",
                coldBrief: "少发",
                coldDetail: "温度舒适，不易感冒",
                dressBrief: "热",
                dressDetail: "建议穿短袖、短裙",
                sportBrief: "较适宜",
                sportDetail: "注意适当减少运动时间",
                travelBrief: "适宜",
                travelDetail: "天气不错，适合旅游"
            },
            // 杭州
            "101210101": {
                temp: "20",
                weather: "小雨",
                high: "22",
                low: "16",
                aqi: "70",
                aqiLevel: "良",
                baseTemp: 20,
                windDir: "东风",
                windClass: "2级",
                humidity: "80",
                feelsLike: "19",
                uv: "3",
                pressure: "1015",
                pm10: "65",
                pm25: "35",
                no2: "30",
                so2: "9",
                co: "0.8",
                o3: "50",
                exerciseBrief: "较不宜",
                exerciseDetail: "有降水，建议在室内晨练",
                carWashBrief: "不宜",
                carWashDetail: "有雨，不适合洗车",
                coldBrief: "易发",
                coldDetail: "温度低且湿度大，注意保暖",
                dressBrief: "较舒适",
                dressDetail: "建议穿长袖衬衫单裤",
                sportBrief: "较不宜",
                sportDetail: "有降水，建议在室内运动",
                travelBrief: "较不宜",
                travelDetail: "有雨，建议带伞出行"
            },
            // 南京
            "101190101": {
                temp: "19",
                weather: "阴",
                high: "21",
                low: "15",
                aqi: "75",
                aqiLevel: "良",
                baseTemp: 19,
                windDir: "东北风",
                windClass: "2级",
                humidity: "70",
                feelsLike: "18",
                uv: "2",
                pressure: "1018",
                pm10: "70",
                pm25: "38",
                no2: "32",
                so2: "10",
                co: "0.9",
                o3: "48",
                exerciseBrief: "适宜",
                exerciseDetail: "天气阴凉，适合晨练",
                carWashBrief: "较适宜",
                carWashDetail: "无雨，可以洗车",
                coldBrief: "较易发",
                coldDetail: "温差较大，注意保暖",
                dressBrief: "舒适",
                dressDetail: "建议穿长袖衬衫单裤",
                sportBrief: "适宜",
                sportDetail: "天气舒适，适合运动",
                travelBrief: "适宜",
                travelDetail: "天气不错，适合出行"
            },
            // 武汉
            "101200101": {
                temp: "23",
                weather: "晴",
                high: "25",
                low: "18",
                aqi: "65",
                aqiLevel: "良",
                baseTemp: 23,
                windDir: "西南风",
                windClass: "2级",
                humidity: "60",
                feelsLike: "24",
                uv: "5",
                pressure: "1016",
                pm10: "60",
                pm25: "32",
                no2: "28",
                so2: "8",
                co: "0.7",
                o3: "52",
                exerciseBrief: "适宜",
                exerciseDetail: "天气晴朗，适合晨练",
                carWashBrief: "适宜",
                carWashDetail: "天气晴好，适合洗车",
                coldBrief: "少发",
                coldDetail: "温度适宜，不易感冒",
                dressBrief: "舒适",
                dressDetail: "建议穿长袖衬衫单裤",
                sportBrief: "适宜",
                sportDetail: "天气较好，适合户外运动",
                travelBrief: "适宜",
                travelDetail: "天气晴朗，适合旅游"
            },
            // 重庆
            "101040100": {
                temp: "25",
                weather: "多云",
                high: "27",
                low: "20",
                aqi: "85",
                aqiLevel: "良",
                baseTemp: 25,
                windDir: "东南风",
                windClass: "1级",
                humidity: "75",
                feelsLike: "26",
                uv: "4",
                pressure: "980",
                pm10: "75",
                pm25: "42",
                no2: "35",
                so2: "12",
                co: "1.0",
                o3: "58",
                exerciseBrief: "较适宜",
                exerciseDetail: "早晨有雾，注意安全",
                carWashBrief: "较适宜",
                carWashDetail: "无雨，可以洗车",
                coldBrief: "少发",
                coldDetail: "温度适宜，不易感冒",
                dressBrief: "舒适",
                dressDetail: "建议穿T恤、短薄外套",
                sportBrief: "适宜",
                sportDetail: "天气较好，适合户外运动",
                travelBrief: "适宜",
                travelDetail: "天气不错，适合旅游"
            }
        };

        // 如果找不到对应的城市配置，使用默认配置（深圳）
        return cityWeatherMap[cityId] || cityWeatherMap["101280601"];
    },

    // 获取小时数据
    getHourlyData(baseTemp) {
        const hourlyData = [];
        const weatherTypes = ["晴", "多云", "阴", "小雨"];

        for (let i = 0; i < 24; i++) {
            const hour = i.toString().padStart(2, '0');
            // 根据时间调整温度：白天高，晚上低
            let temp = baseTemp;
            if (i >= 6 && i <= 18) {
                temp += Math.floor(Math.random() * 5) - 2; // 白天温度波动
            } else {
                temp -= Math.floor(Math.random() * 3) + 1; // 晚上温度较低
            }

            // 根据时间选择天气类型
            let weatherIndex = Math.floor(Math.random() * weatherTypes.length);
            if (i >= 20 || i <= 6) {
                weatherIndex = 2; // 晚上多为阴天
            }

            hourlyData.push({
                "data_time": `2023-01-02 ${hour}:00:00`,
                "temp_fc": temp.toString(),
                "text": weatherTypes[weatherIndex]
            });
        }

        return hourlyData;
    },

    // 获取周数据
    getWeeklyData(config) {
        const weeklyData = [];
        const days = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"];
        const weatherTypes = ["晴", "多云", "阴", "小雨"];

        for (let i = 0; i < 7; i++) {
            const weatherIndex = Math.floor(Math.random() * weatherTypes.length);
            const high = parseInt(config.high) + Math.floor(Math.random() * 3) - 1;
            const low = parseInt(config.low) + Math.floor(Math.random() * 2) - 1;

            weeklyData.push({
                "week": days[i],
                "text_day": weatherTypes[weatherIndex],
                "high": high.toString(),
                "low": low.toString(),
                "wd_day": config.windDir,
                "wc_day": config.windClass
            });
        }

        return weeklyData;
    },

    // 获取当前时间
    getCurrentTime() {
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    },

    // 跳转到生活指数详情页
    gotoLivingIndexDetail() {
        console.log('跳转到生活指数详情页');

        // 准备传递到详情页的数据
        const livingIndexData = {
            cityName: this.currentCityName,
            cityId: this.currentCityId,
            currentWeather: this.tempData.text,
            currentTemp: this.tempData.temp,
            suggestion: this.suggestion,
            updateTime: this.time
        };

        // 使用router跳转到生活指数详情页
        router.push({
            uri: 'pages/livingIndexDetail/livingIndexDetail',
            params: livingIndexData
        });
    },

    // 处理返回按钮事件的函数
    onBackPress() {
        // 当返回按钮被按下时，打印日志
        console.info("onBackPress!!!")
        // 如果 preTime 为-1，说明是第一次按下返回按钮
        if (-1 === this.preTime) {
            // 记录第一次按下返回按钮的时间戳
            this.preTime = new Date().getTime();
            // 显示提示信息
            Prompt.showToast({
                message: "再次返回退出小鸿天气", // 提示内容
                duration: 2000, // 提示显示时长
                bottom: 30 // 距离底部的距离
            })
            // 返回 true，表示消费了这次返回事件
            return true;
        } else {
            // 如果不是第一次按下，计算与上一次按下的时间差
            let currentTime = new Date().getTime();
            let flag = currentTime - this.preTime;
            // 如果时间差大于 3000 毫秒
            if (flag > 3000) {
                // 重置 preTime
                this.preTime = -1
                return true;
            } else {
                // 如果时间差小于 3000 毫秒，退出应用
                App.terminate()
            }
        }
        return false;
    },

    // 跳转到空气质量详情页
    gotoAQIDetail() {
        console.log('跳转到空气质量详情页');

        // 准备传递到空气质量详情页的数据
        const aqiDetailData = {
            cityName: this.currentCityName,
            aqi: this.airQuality.aqi || 0,
            pm25: this.airQuality.pm25 || 0,
            pm10: this.airQuality.pm10 || 0,
            no2: this.airQuality.no2 || 0,
            so2: this.airQuality.so2 || 0,
            co: this.airQuality.co || 0,
            o3: this.airQuality.o3 || 0,
            updateTime: this.time
        };

        console.log('空气质量详情数据:', aqiDetailData);

        // 使用router跳转到空气质量详情页
        router.push({
            uri: 'pages/aqiDetail/aqiDetail',
            params: aqiDetailData
        });
    }
};
