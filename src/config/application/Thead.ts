import { IThead } from "@/type/Global"

export const BuyRecordThead: Array<IThead> = [
    { key:"id", name: "交易編號" },
    { key:"name", name: "名稱" },
    { key:"point", name: "點數" },
    { key:"date", name: "交易日期" },
]

export const StoreRecordThead: Array<IThead> = [
    { key:"id", name: "儲值單號" },
    { key:"date", name: "交易日期" },
    { key:"name", name: "方案名稱" },
    { key:"point", name: "點數" },
    { key:"price", name: "價格" },
    { key:"method", name: "付款方式" },
    { key:"status", name: "狀態" },
]