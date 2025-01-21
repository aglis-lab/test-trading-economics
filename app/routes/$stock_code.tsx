import { LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  LucideChevronRight,
  LucideTrendingDown,
  LucideTrendingUp,
} from "lucide-react";
import { HTMLAttributes, useState } from "react";
import ChartArea from "~/components/chart/chart_area";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Search } from "~/components/ui/search";
import { News } from "~/entity/news";
import { Stock } from "~/entity/stock";
import { marketCap, symbolCurrencySign as currencySign } from "~/lib/utils";
import { marketService, newsService } from "~/services/services";

const stockCountry = "mexico";

export const meta: MetaFunction = () => {
  return [
    { title: "Trading Economics" },
    { name: "description", content: "Trading Economics" },
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const stockSymbol = params.stock_code!;

  let lastDate = new Date();
  lastDate.setDate(lastDate.getDate() - 7);
  let [stocks, stock, description, history, news] = await Promise.all([
    await marketService.fetchByCountry(stockCountry),
    await marketService.get(stockSymbol),
    await marketService.description(stockSymbol),
    await marketService.history(stockSymbol, lastDate, new Date()),
    await newsService.fetch(stockCountry),
  ]);
  return {
    stocks,
    stock,
    description,
    history,
    news,
  };
}

export default function Index() {
  const { stocks } = useLoaderData<typeof loader>();

  return (
    <div className="m-4">
      <Card className="shadow-none">
        {/* Search */}
        <CardHeader className="p-0">
          <CardTitle className="px-4 py-2 mt-2">
            <Search className="max-w-xs" placeholder="Search Stock"></Search>
          </CardTitle>
          <CardDescription className="border-y py-4 flex justify-between bg-slate-50 px-8">
            <StockItem stock={stocks[0]}></StockItem>
            <div className="border-r-2 my-1"></div>
            <StockItem stock={stocks[1]}></StockItem>
            <div className="border-r-2 my-1"></div>
            <StockItem stock={stocks[2]}></StockItem>
            <div className="border-r-2 my-1"></div>
            <StockItem stock={stocks[3]}></StockItem>
            <div className="border-r-2 my-1"></div>
          </CardDescription>
        </CardHeader>

        {/* Header */}
        <StockHeader></StockHeader>

        {/* Chart */}
        <StockChart></StockChart>

        {/* Compare and News */}
        <CardContent className="grid grid-cols-2 gap-4">
          <CompareStock></CompareStock>
          <NewsStock></NewsStock>
        </CardContent>
      </Card>
    </div>
  );
}

function StockChart() {
  const { stock } = useLoaderData<typeof loader>();

  return (
    <CardContent className="grid grid-cols-8 grid-rows-1 gap-4">
      <div className="col-span-5">
        <div className="flex gap-4">
          <StockCard
            label="Close Stock"
            price={stock.Close.toPrecision(4)}
            unit={stock.unit}></StockCard>
          <StockCard
            label="Yearly Change"
            price={stock.YearlyPercentualChange.toPrecision(4)}
            unit={stock.unit}></StockCard>
          <StockCard
            label="Market Cap"
            price={marketCap(stock.MarketCap)}
            unit={stock.unit}></StockCard>
        </div>
        <div className="mt-4">
          <StockChartArea></StockChartArea>
        </div>
      </div>
      <div className="col-span-3 border rounded-lg px-3 py-2">
        <DetailStock></DetailStock>
      </div>
    </CardContent>
  );
}

function StockHeader() {
  const { stock } = useLoaderData<typeof loader>();
  let diff = stock.Close - stock.yesterday;

  return (
    <CardContent className="flex justify-between items-end pt-8">
      <div className="flex">
        <div className="border p-4 rounded-2xl">
          <img
            className="rounded-full"
            height={48}
            width={48}
            src="https://github.com/shadcn.png"
            alt=""
          />
        </div>
        <div className="ml-4">
          <div className="flex items-end my-2">
            <div className="text-3xl font-bold">{stock.Name}</div>
            <div className="ml-2 opacity-65">
              {stock.Country}: {stock.Symbol.split(":")[0]}
            </div>
          </div>
          <div className="text-sm opacity-60 font-light">
            After Normal Trading Hours:{" "}
            {`${stock.Close.toFixed(4)} ${stock.unit}`}(
            <span
              className={`${
                diff > 0 ? "text-green-500" : diff < 0 ? "text-red-500" : ""
              }`}>
              {stock.DailyPercentualChange.toFixed(4)}%
            </span>
            )
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <Button variant="outline" className="min-w-24">
          Follow
        </Button>
        <Button className="min-w-24">Buy</Button>
      </div>
    </CardContent>
  );
}

function StockItem({
  stock,
  ...props
}: { stock: Stock } & HTMLAttributes<HTMLElement>) {
  let change = stock.DailyPercentualChange;

  return (
    <div className="flex items-center gap-2" {...props}>
      <img
        className="rounded-full"
        height={24}
        width={24}
        src="https://github.com/shadcn.png"
        alt=""
      />
      <div className="text-sm text-black font-semibold">{stock.Ticker}</div>
      <div>
        {currencySign(stock.unit)}
        {stock.yesterday.toPrecision(4)}
      </div>
      {change < 0 ? (
        <LucideTrendingDown
          className="text-red-500"
          strokeWidth={2.5}
          size={16}></LucideTrendingDown>
      ) : (
        <LucideTrendingUp
          className="text-green-500"
          strokeWidth={2.5}
          size={16}></LucideTrendingUp>
      )}
      <div>
        {currencySign(stock.unit)}
        {stock.Close.toPrecision(4)}
      </div>
      <div
        className={`
          ${change > 0 ? "text-green-500" : ""}
          ${change < 0 ? "text-red-500" : ""}
        `}>
        {change.toPrecision(2)}%
      </div>
    </div>
  );
}

function NewsStock() {
  const { news } = useLoaderData<typeof loader>();

  return (
    <div className="border p-4 rounded-lg">
      <div className="flex justify-between items-end pb-4 border-b">
        <div>
          <div className="font-semibold">News</div>
          <div className="text-sm opacity-60 font-light mt-2">
            Latest updates and analysis on your stocks
          </div>
        </div>
        <Button variant={"outline"}>
          <span className="font-light">Show All</span>
          <LucideChevronRight></LucideChevronRight>
        </Button>
      </div>
      <div className="mt-4 flex flex-col gap-6">
        {news.map((val, index) => {
          return <NewsItem item={val} key={index}></NewsItem>;
        })}
      </div>
    </div>
  );
}

function NewsItem({ item }: { item: News }) {
  return (
    <a href={item.url} className="flex w-full cursor-pointer">
      {/* <img
        className="h-16 w-32 rounded mr-4"
        src="https://picsum.photos/200/300"
        alt=""
      /> */}
      <div className="w-full">
        <div className="font-light text-xs mb-1">{item.title}</div>
        <div className="flex justify-between items-center w-full">
          <div className="line-clamp-2 text-sm flex-auto">
            {item.description}
          </div>
          <div className="w-32 ml-1 shrink flex justify-end">
            <LucideChevronRight></LucideChevronRight>
          </div>
        </div>
      </div>
    </a>
  );
}

function CompareStock() {
  const { stocks } = useLoaderData<typeof loader>();

  return (
    <div className="border p-4 rounded-lg">
      <div className="flex justify-between items-end pb-4 border-b">
        <div>
          <div className="font-semibold">Compare Stock</div>
          <div className="text-sm opacity-60 font-light mt-2">
            Compare your stock with market benchmarks
          </div>
        </div>
        <Button variant={"outline"}>
          <span className="font-light">Show All</span>
          <LucideChevronRight></LucideChevronRight>
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        {stocks.slice(0, 4).map((val, index) => {
          return <CompareStockItem stock={val} key={index}></CompareStockItem>;
        })}
      </div>
    </div>
  );
}

function CompareStockItem({
  stock,
  className,
  ...props
}: { stock: Stock } & HTMLAttributes<HTMLDivElement>) {
  const change = stock.DailyPercentualChange;

  return (
    <div
      {...props}
      className={`
      border p-4 rounded-lg
    ${className || ""}`}>
      <div className="text-sm font-light">{stock.Name}</div>
      <div className="font-semibold my-2">
        {currencySign(stock.unit)}
        {stock.Close} {stock.unit}
      </div>
      <div className="text-xs font-light">
        <span className="mr-2">{stock.Ticker}</span>
        <span
          className={`
          ${change > 0 ? "text-green-500" : ""}
          ${change < 0 ? "text-red-500" : ""}
        `}>
          {stock.DailyPercentualChange}%
        </span>
      </div>
    </div>
  );
}

function StockCard({
  label,
  price,
  unit,
}: {
  label: string;
  price: string;
  unit: string;
}) {
  return (
    <div className="border rounded-lg w-full py-4 px-4 bg-slate-50">
      <div className="text-sm mb-4">{label}</div>
      <div>
        <span className="text-2xl font-bold">{price}</span>{" "}
        <span className="text-2xl font-light opacity-55">{unit}</span>
      </div>
    </div>
  );
}

function StockChartArea() {
  const { history } = useLoaderData<typeof loader>();

  const labels = ["1D", "1W", "1M", "6M", "5Y", "YTD"];
  const [label, setLabel] = useState("1D");

  return (
    <div className="p-2 border rounded-lg">
      <div className="flex">
        <div className="flex m-2 p-1 border bg-slate-50 rounded-lg">
          {labels.map((val, index) => {
            let temp = index;
            return (
              <StockChartDate
                showBorder={temp !== 0}
                selected={label === val}
                onClick={() => setLabel(val)}
                key={index}>
                {val}
              </StockChartDate>
            );
          })}
        </div>
      </div>
      <div>
        <ChartArea history={history} id="test"></ChartArea>
      </div>
    </div>
  );
}

function StockChartDate({
  selected,
  showBorder,
  className,
  children,
  ...props
}: HTMLAttributes<HTMLElement> & {
  selected: boolean;
  showBorder: boolean;
}) {
  return (
    <div
      {...props}
      className={`px-3 py-1 font-light text-sm cursor-pointer ${
        selected ? "bg-white border shadow rounded-md" : ""
      } ${showBorder ? "border-l" : ""} ${className || ""}`}>
      {children}
    </div>
  );
}

function DetailStock() {
  const { stock } = useLoaderData<typeof loader>();
  const { description } = useLoaderData<typeof loader>();

  let closePrice = `${currencySign(stock.unit)}${stock.Close.toPrecision(4)}`;
  let openPrice = `${currencySign(stock.unit)}${stock.yesterday.toPrecision(
    4
  )}`;
  let yearlyChange = `${currencySign(
    stock.unit
  )}${stock.YearlyChange.toPrecision(4)}`;
  let marketCapVal = `${currencySign(stock.unit)}${marketCap(stock.MarketCap)}`;

  return (
    <div className="p-1">
      <div className="font-semibold">Detail Stock</div>
      <div className="text-sm mt-2 opacity-60 font-light border-b pb-3">
        Comprehensive details on individual stocks
      </div>
      <div className="flex flex-col gap-6 py-4 mt-2">
        <DetailItemStock
          label="CLOSED BEFORE"
          value={closePrice}></DetailItemStock>
        <DetailItemStock
          label="DAY RANGE"
          value={`${openPrice} - ${closePrice}`}></DetailItemStock>
        <DetailItemStock
          label="YEAR CHANGE"
          value={yearlyChange}></DetailItemStock>
        <DetailItemStock
          label="MARKET CAPITALIZATION"
          value={marketCapVal}></DetailItemStock>
        <DetailItemStock
          label="COUNTRY"
          value={stock.Country}></DetailItemStock>
        <DetailItemStock
          label="SECTOR"
          value={description.Sector}></DetailItemStock>
        <DetailItemStock
          label="INDUSTRY"
          value={description.Industry}></DetailItemStock>
        <DetailItemStock
          label="SUBINDUSTRY"
          value={description.Subindustry}></DetailItemStock>
      </div>
    </div>
  );
}

function DetailItemStock({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <div className="opacity-60 font-light">{label}</div>
      <div className="font-semibold">{value}</div>
    </div>
  );
}
