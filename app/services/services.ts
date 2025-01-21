import { http } from "./http";
import { MarketService } from "./market";
import { NewsService } from "./news";

export const marketService = new MarketService(http)
export const newsService = new NewsService(http)
