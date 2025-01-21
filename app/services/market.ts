import { Axios } from "axios";
import { Stock, StockDescription, StockHistory } from "~/entity/stock";

export class MarketService {
    constructor(private http: Axios) { }

    async fetchByCountry(country: string): Promise<Stock[]> {
        const resp = await this.http.get(`/markets/stocks/country/${country}`)
        const data = JSON.parse(resp.data) as Stock[]

        return data.slice(0, data.length - 1)
    }

    async get(code: string): Promise<Stock> {
        const resp = await this.http.get(`/markets/symbol/${code}`)

        return (JSON.parse(resp.data))[0]
    }

    async description(code: string): Promise<StockDescription> {
        const resp = await this.http.get(`/markets/stockdescriptions/symbol/${code}`)
        return JSON.parse(resp.data)[0]
    }

    async intraday(code: string, firstDate: Date, lastDate: Date): Promise<StockHistory[]> {
        const resp = await this.http.get(`/markets/historical/${code}`, {
            params: {
                d1: firstDate.toISOString(),
                d2: lastDate.toISOString(),
            }
        })

        const data = JSON.parse(resp.data) as StockHistory[]
        return data.slice(0, data.length - 1)
    }

    async history(code: string, firstDate: Date, lastDate: Date): Promise<StockHistory[]> {
        const resp = await this.http.get(`/markets/historical/${code}`, {
            // params: {
            //     d1: firstDate.toISOString(),
            //     d2: lastDate.toISOString(),
            // }
        })

        const data = JSON.parse(resp.data) as StockHistory[]
        return data.slice(0, data.length - 1)
    }
}
