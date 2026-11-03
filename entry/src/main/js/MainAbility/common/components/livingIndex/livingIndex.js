// 导出生活指数展示组件的定义
export default {
    //props: ["suggest"], // 组件属性，用于接收生活指数建议
    props: {
        suggest: {
            type: Array, // 因为suggest是数组形式的数据
            default: () => [] // 默认空数组，避免空值报错
        }
    },
    data: {
        // 初始化组件数据
        title: "生活指数", // 标题
        exercise: "", // 运动指数
        dress: "", // 穿衣指数
        sunshine: "", // 紫外线指数
        cold: "", // 感冒指数
        carWashing: "", // 洗车指数
        sun_cure: "" // 晾晒指数
    },

    // 组件初始化时调用的函数
    onInit() {
        this.onChange(); // 更新组件数据
        this.$watch("suggest", 'onChange'); // 监听 suggest 属性变化
    },

    // 当 suggest 属性变化时调用的函数
    onChange() {
        // 更新生活指数数据
        this.exercise = this.suggest[0].brief; // 运动建议
        this.dress = this.suggest[1].brief; // 穿衣建议
        this.sunshine = this.suggest[2].brief; // 紫外线建议
        this.cold = this.suggest[3].brief; // 感冒建议
        this.carWashing = this.suggest[4].brief; // 洗车建议
        this.sun_cure = this.suggest[0].brief; // 晾晒建议
    }
}
