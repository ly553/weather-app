// 导出标题组件的定义
import Router from '@system.router';
export default {
    // 声明组件的属性
    props: ['path'],
    // 组件的数据对象
    data: {
        title: "", // 标题初始为空
    },
    // 组件初始化时调用的函数
    onInit() {
        this.title = "北京"; // 默认标题为北京
        this.onChange(); // 调用 onChange()方法更新标题
        // 监听 path 属性的变化，当 path 变化时调用 onChange 更新标题
        this.$watch('path', 'onChange');
    },
    // 当 path 属性变化时调用的函数
    onChange() {
        // 更新标题为 path 属性的值
        // @ts-ignore
        this.title = this.path;
    },
    // 点击加号跳转到城市选择页面
    selectCity() {
        // 跳转到城市选择页面
        // @ts-ignore
        Router.push({
            uri:"pages/CitySelect/index",
        });
    }
}
