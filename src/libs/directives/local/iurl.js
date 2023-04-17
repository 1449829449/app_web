// 图片地址拼接
import defaultSettings from "@/libs/settings";
const iurl = {
  inserted(el, name) {
    el.src = defaultSettings.imgurl + (name.value || "500.png");
  },
};

export default iurl;
