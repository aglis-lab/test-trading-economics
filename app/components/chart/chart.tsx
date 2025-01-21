import { memo } from "react";
import loadable from "react-loadable";

const Chart = loadable({
  loader: () => import("react-apexcharts"),
  loading() {
    return <div>Loading...</div>;
  },
});

export default memo(Chart);
