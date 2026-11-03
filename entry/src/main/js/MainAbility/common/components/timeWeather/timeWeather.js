import { imgSelect } from '../../utils/imgSelect'

export default {
    //props: ['hourData'], // 组件属性，用于接收外部传递的每小时天气数据
    props: {
        hourData: {
            type: Array, // 因为hourData是数组类型
            default: () => [] // 默认空数组，避免空值报错
        }
    },
    data: {
        time: [] // 组件数据，用于存储处理后的时刻天气信息
    },
    // 组件初始化时调用的函数
    onInit() {
        this.onChange() // 初始时调用 onChange 函数更新组件的时刻天气信息
        this.$watch('hourData', 'onChange') // 监听 hourData 属性变化
    },
    // 当 hourData 属性变化时调用的函数
    onChange() {
        // 清空当前的时刻天气信息数组
        this.time = [];
        // 遍历传入的 hourData 数组
        for (let index = 0; index < this.hourData.length; index++) {
            const element = this.hourData[index];
            let date = `${element.data_time}`; // 获取时间字符串
            let dateArray = date.split(" "); // 分割日期和时间
            let formattedDate = dateArray[1].split(":"); // 分割小时和分钟
            // 创建一个新的时刻天气信息对象
            let newItem = {
                "data_time": formattedDate[0] + ":" + formattedDate[1], // 格式化时间
                // @ts-ignore
                "img": imgSelect(element.text), // 根据天气情况选择图标
                "text": element.text, // 天气描述
                "temp_fc": element.temp_fc + "℃" // 温度信息
            }
            // 将新创建的时刻天气信息对象添加到 time 数组
            this.time.push(
                Object.assign({}, newItem)
            );
        }
    }
}
