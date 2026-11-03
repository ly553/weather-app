// 导出实时天气更新板组件的定义
export default {
    props: {
        newTime: {
            type: String, // newTime是字符串类型（时间文本）
            default: "" // 默认空字符串，避免空值报错
        }
    },
    data: {
        time: "更新时间：2024年1月2日", // 默认的更新时间
        end: "数据来源：中国天气" // 数据来源信息
    },

    // 组件初始化时调用的函数
    onInit() {
        this.onChange(); // 更新组件数据
        this.$watch("newTime", 'onChange'); // 监听 newTime 属性的变化
    },

    // 当 newTime 属性变化时调用的函数
    onChange() {
        this.time = this.newTime; // 更新最后更新时间
    }
}
