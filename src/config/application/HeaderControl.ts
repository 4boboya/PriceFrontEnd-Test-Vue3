import { IHeaderControl } from '@/type/Header'

export const HeaderControl: IHeaderControl = {
    Customer: {
        "Become an Expert": "",
        "Become a Subscriber": "",
        "Orders And Cancel Order": "",
        "Notifications": "",
        "Documents For API": "",
        "Sample": "",
        "Contact Support": "",
        "About Us": "",
        "Use of the Site": "",
        "Posting Content on the Site": "",
        "Registering for an account": "",
        "Programs": "",
        "Content on the Site": "",
        "General Term": "",
    },
    Feeback: {
        "Help And FAQ": "",
    },
    Language: {
        "繁體中文": "zh-TW",
        "简体中文": "zh-CN",
        "English": "en-US",
        "日本語": "ja-JP",
        "Tiếng Việt": "vi-VN",
        "ยาสึฟุมิ": "th-TH",
    }
}

export const UserControl = [
    { name: "Header.Info", link: "/user", key: "Info" },
    { name: "Header.Rank", link: "", key: "Rank" },
    { name: "Header.Order", link: "", key: "Order" },
    { name: "Header.Notifications", link: "", key: "Notifications" },
    { name: "Header.Export", link: "", key: "Export" },
    { name: "Header.LogOut", link: "LogOut", key: "LogOut" },
]