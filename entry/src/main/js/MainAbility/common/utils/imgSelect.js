/**
 * 根据天气描述选择对应的图标
 * @param {string} weatherText - 天气描述文本
 * @returns {string} 对应的图片路径
 */
export function imgSelect(weatherText) {
    console.log('imgSelect 调用，参数:', weatherText);

    // 如果天气文本为空或未定义，返回默认图标
    if (!weatherText || weatherText === '') {
        return '/common/img/weatherIcon/sunny.png';
    }

    // 常见天气类型映射 - 使用硬编码路径测试
    const weather = weatherText.toString().toLowerCase();

    if (weather.includes('晴') || weather.includes('sun')) {
        return '/common/img/weatherIcon/sunny.png';
    }

    if (weather.includes('多云') || weather.includes('cloud')) {
        return '/common/img/weatherIcon/cloudy.png';
    }

    if (weather.includes('雨') || weather.includes('rain')) {
        return '/common/img/weatherIcon/rain.png';
    }

    if (weather.includes('小雪') || weather.includes('snow')) {
        return '/common/img/weatherIcon/snow.png';
    }

    if (weather.includes('阴') || weather.includes('yin')) {
        return '/common/img/weatherIcon/yin.png';
    }

    // 默认返回晴天图标（确保这个图片存在）
    console.log('未匹配到天气类型，使用默认图标:', weatherText);
    return '/common/img/weatherIcon/sunny.png';
}
