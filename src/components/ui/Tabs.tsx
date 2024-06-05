import { Tabs as MuiTabs, Tab as MuiTab } from "@mui/material";
import { ChangeEvent, ReactNode } from "react";

export type MuiTabType = {
  key: string;
  label: string;
  ["data-cy"]: string;
  component?: ReactNode;
};

interface TabsProps {
  tabs: MuiTabType[];
  currentTabIndex: number;
  onTabChange: (e: ChangeEvent<{}>, value: any) => void;
}

const Tabs = ({ tabs, currentTabIndex, onTabChange }: TabsProps) => {
  return (
    <MuiTabs value={currentTabIndex} onChange={onTabChange}>
      {tabs.map(({ key, label, ...extra }) => (
        <MuiTab key={key} label={label} {...extra} />
      ))}
    </MuiTabs>
  );
};

export default Tabs;
