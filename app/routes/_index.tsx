import { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/react";

const stockSymbol = "FRES:LN";

export const loader: LoaderFunction = () => {
  return redirect(`/${stockSymbol}`);
};

export default function Index() {
  return <p>Loading...</p>;
}
