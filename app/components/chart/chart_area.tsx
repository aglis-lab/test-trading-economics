import { HTMLAttributes, useEffect, useRef, useState } from "react";
import { StockHistory } from "~/entity/stock";
import dayjs from "dayjs";
import { parseDate } from "~/lib/utils";

export default function ChartArea({
  history,
  ...props
}: { history: StockHistory[] } & HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const data: { x: number; y: number }[] = [];
    for (const item of history) {
      data.push({
        x: parseDate(item.Date).getTime(),
        y: item.Close,
      });
    }

    ref.current.querySelectorAll("*").forEach((child) => child.remove());
    let chart = new ApexCharts(ref.current, {
      series: [
        {
          name: "Stock Price",
          data: data,
        },
      ],
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      chart: {
        id: "area-datetime",
        type: "area",
        height: 320,
        zoom: {
          autoScaleYaxis: true,
        },
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        type: "datetime",
        // min: data[0].x,
        // max: data[data.length - 1].x,
        // tickAmount: 6,
      },
      tooltip: {
        x: {
          format: "dd MMM yyyy",
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 100],
        },
      },
    });

    chart.render();
  }, [history]);

  return <div {...props} ref={ref}></div>;
}
