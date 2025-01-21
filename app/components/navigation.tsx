import {
  Calculator,
  Calendar,
  LucideCalendarCog,
  LucideChartCandlestick,
  LucideDollarSign,
  LucideFolderClosed,
  LucideGalleryVerticalEnd,
  LucideNewspaper,
  LucidePiggyBank,
  Smile,
} from "lucide-react";

import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "~/components/ui/command";

const menus = [
  {
    label: "Stock Dashboard",
    icon: <LucideFolderClosed></LucideFolderClosed>,
  },
  {
    label: "Market",
    icon: <LucideChartCandlestick></LucideChartCandlestick>,
  },
  {
    label: "My Assets",
    icon: <LucideDollarSign></LucideDollarSign>,
  },
  {
    label: "News/Media",
    icon: <LucideNewspaper></LucideNewspaper>,
  },
  {
    label: "Performance",
    icon: <LucideCalendarCog></LucideCalendarCog>,
  },
  {
    label: "History",
    icon: <LucideGalleryVerticalEnd></LucideGalleryVerticalEnd>,
  },
  {
    label: "Saving Plan",
    icon: <LucidePiggyBank></LucidePiggyBank>,
  },
];

export default function Navigation() {
  return (
    // <div>
    <Command className="">
      <div className="m-4 flex items-center">
        <Logo></Logo>
        <div className="ml-2">
          <div className="font-semibold text-lg">Trading Economics</div>
          <div className="text-xs font-light">Smart way to analyze stock.</div>
        </div>
      </div>
      <CommandList>
        <CommandGroup heading="Main Menu">
          {menus.map((val) => (
            <CommandItem className="cursor-pointer" key={val.label}>
              {val.icon}
              <span>{val.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
    // </div>
  );
}

function Logo() {
  return (
    <div className="bg-black rounded-md size-10 p-2">
      <img src="/svg/remix-letter-dark.svg" alt="" />
    </div>
  );
}
