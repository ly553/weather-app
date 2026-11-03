// 导出综合气象展示板组件的定义
export default {
    props: ["weatherData"], // 从父组件获取天气数据的属性
    data: {
        // 此组件无须独立数据，所有数据从 props 接收
    },

    // 组件初始化时调用的函数
    onInit() {
        // 可在此处添加初始化逻辑（如监听数据变化）
    }
}
