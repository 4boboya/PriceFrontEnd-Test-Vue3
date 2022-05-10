import { createI18n } from "vue-i18n";
import zhtw from "./language/zhtw"
import enus from "./language/enus"
import jajp from "./language/jajp"
import thth from "./language/thth"
import zhcn from "./language/zhcn"
import vivn from "./language/vivn"

const i18n = createI18n({
    legacy: false,
    locale: "zh-TW",
    fallbackLocale: "zh-TW",
    messages: {
        "zh-TW": zhtw,
        "en-US": enus,
        "zh-CN": zhcn,
        "ja-JP": jajp,
        "th-TH": thth,
        "vi-VN": vivn,
    }
});

export default i18n