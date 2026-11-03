import router from '@system.router';

export default {
    data: {
        cityName: '',
        cityId: '',
        currentWeather: '',
        currentTemp: '',
        suggestion: [],
        updateTime: ''
    },

    onInit() {
        // 获取传递过来的参数
        const params = router.getParams();
        if (params) {
            this.cityName = params.cityName || '';
            this.cityId = params.cityId || '';
            this.currentWeather = params.currentWeather || '';
            this.currentTemp = params.currentTemp || '';
            // @ts-ignore
            this.suggestion = params.suggestion || [];
            this.updateTime = params.updateTime || '';
        }
    }
}
