// 引入图片选择工具，用于根据风向选择对应的风向图标
// @ts-ignore
import { imgSelect } from '../../utils/imgSelect'

export default {
    props: {
        weatherData: {
            type: Object,
            default: () => ({}) // 设默认空对象，避免空值报错
        }
    },
    data: {
        Wind: "", // 风向
        WindLevel: "", // 风级
        src: "" // 风向图标的路径
    },
    // 组件初始化时调用的函数
    onInit() {
        this.onChange() // 调用 onChange 函数更新组件数据
        this.$watch('weatherData', 'onChange') // 监听 weatherData 的变化
    },
    // 当 weatherData 属性变化时调用的函数
    onChange() {
        // 设置风向和风级
        this.Wind = this.weatherData.wind_dir
        this.WindLevel = this.weatherData.wind_class
        // 根据风向选择对应的图标
        switch (this.Wind) {
        // 匹配不同风向，设置对应的图标文件路径
            case '北风':
                this.src = "/common/img/plate/north.svg"
                break;
            case '东北风':
                this.src = "/common/img/plate/northeast.svg"
                break;
            case '南风':
                this.src = "/common/img/plate/south.svg"
                break;
            case '西南风':
                this.src = "/common/img/plate/southwest.svg"
                break;
            case '东风':
                this.src = "/common/img/plate/east.svg"
                break;
            case '东南风':
                this.src = "/common/img/plate/southeast.svg"
                break;
            case '西风':
                this.src = "/common/img/plate/west.svg"
                break;
            case '西北风':
                this.src = "/common/img/plate/northwest.svg"
                break;
            default:
                this.src = "/common/img/plate/north.svg"
                break;
        }
        // 输出日志信息
        console.info(this.Wind + this.WindLevel)
    }
}
