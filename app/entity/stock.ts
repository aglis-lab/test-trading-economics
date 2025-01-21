export interface Stock {
    Symbol: string
    Ticker: string
    Name: string
    Country: string
    Date: string
    Type: string
    decimals: number
    state: string
    Last: number
    Close: number
    CloseDate: string
    MarketCap: number
    URL: string
    Importance: number
    DailyChange: number
    DailyPercentualChange: number
    WeeklyChange: number
    WeeklyPercentualChange: number
    MonthlyChange: number
    MonthlyPercentualChange: number
    YearlyChange: number
    YearlyPercentualChange: number
    YTDChange: number
    YTDPercentualChange: number
    day_high: number
    day_low: number
    yesterday: number
    lastWeek: number
    lastMonth: number
    lastYear: number
    startYear: number
    ISIN: string
    unit: string
    frequency: string
    LastUpdate: string
}

export interface StockDescription {
    Symbol: string
    Name: string
    Description: string
    Country: string
    Sector: string
    Industry: string
    Subindustry: string
}

export interface StockHistory {
    Symbol: string
    Date: string
    Open: number
    High: number
    Low: number
    Close: number
}
