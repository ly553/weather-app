import { imgSelect } from '../../utils/imgSelect'

export default {
    props: {
        weeklyData: {
            type: Array, // 因为weeklyData是数组
            default: () => [] // 默认空数组，避免空值报错
        }
    },
    data: {
        day: [] // 组件数据，存储处理后的每天的天气信息
    },
    // 组件初始化时调用的函数
    onInit() {
        this.onChange() // 调用 onChange 函数更新组件数据
        this.$watch('weeklyData', 'onChange') // 监听 weeklyData 的变化
    },
    // 当 weeklyData 属性变化时调用的函数
    onChange() {
        this.day = []; // 清空当前的天气信息数组
        // 遍历 weeklyData 数组，处理一周每一天的天气信息
        for (let index = 0; index < this.weeklyData.length; index++) {
            const element = this.weeklyData[index];
            // 创建一个新的天气信息对象
            let newItem = {
                "week": element.week, // 星期
                "text_day": element.text_day, // 白天天气状况描述
                // @ts-ignore
                "img":imgSelect(element.text_day), // 天气图标
                "high": element.high, // 最高温度
                "low": element.low, // 最低温度
                "wd_day": element.wd_day, // 风向
                "wc_day": element.wc_day // 风力
            }
            // 将新对象添加到 day 数组中
            this.day.push(Object.assign({}, newItem));
        }
    }
}
