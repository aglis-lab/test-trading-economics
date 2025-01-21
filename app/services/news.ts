import { Axios } from "axios";
import { News } from "~/entity/news";

export class NewsService {
    constructor(private http: Axios) { }

    async fetch(country: string): Promise<News[]> {
        const limit = 3
        const resp = await this.http.get(`/news/country/${country}`, {
            params: {
                limit: limit
            }
        })

        const data = (JSON.parse(resp.data) as any[]).slice(0, limit) as News[]
        for (let index = 0; index < data.length; index++) {
            data[index].url = `https://tradingeconomics.com${data[index].url}`
        }

        return data
    }
}