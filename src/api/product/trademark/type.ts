export interface ResponseData {
    code: number,
    message: string,
    ok: string
}
export interface trademark {
    "id"?: number,
    "tmName": string,
    "logoUrl": string
}
export type Records = trademark[];
export interface trademarkResData extends ResponseData {
    data: {
        "records": Records,
        "total": number,
        "size": number,
        "current": number,
        "orders": [],
        "optimizeCountSql": boolean,
        "hitCount": boolean,
        "countId": null,
        "maxLimit": null,
        "searchCount": boolean,
        "pages": number
    }
}