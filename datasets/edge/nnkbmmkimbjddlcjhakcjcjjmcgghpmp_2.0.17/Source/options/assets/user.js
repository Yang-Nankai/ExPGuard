import { Z as defineStore } from "./index.js";
const useUserStore = defineStore("user", {
  // 定义状态
  state: () => ({
    count: 100,
    userInfo: {
      headimgurl: "",
      account_name: "",
      mobile: 12345678
    },
    isLogin: false,
    dayNight: true,
    // 日(true)夜(false)模式
    land: "zh-CN"
  }),
  // 定义派生状态
  getters: {
    doubleCount: (state) => state.count * 2
  },
  // 定义修改状态的方法
  actions: {
    toggleTheme() {
      this.dayNight = !this.dayNight;
    }
  },
  persist: {
    // key: 'isLogin', // 持久化存储的 key
    paths: ["isLogin", "userInfo", "dayNight", "land"],
    storage: localStorage
    // 使用 localStorage
  }
});
export {
  useUserStore as u
};
