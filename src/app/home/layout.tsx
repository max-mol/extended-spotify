"use client";

import Link from "@/components/ui/Link";
import { Tabs, TabProps as MuiTabProps, Tab, Box } from "@mui/material";
import { usePathname } from "next/navigation";

const tabs = [
  {
    path: "/home",
    tab: "home",
    label: "Home",
  },
  {
    path: "/home/profile",
    tab: "profile",
    label: "Profile",
  },
];

interface TopMenuTabProps extends MuiTabProps {
  path: string;
}

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const tabValue = tabs.find((tab) => tab.path === pathname)?.tab;

  const TopMenuTab = ({ path, ...rest }: TopMenuTabProps) => {
    return (
      <Link href={path} color="white" underline="none">
        <Tab
          sx={{
            color: "white",
            textTransform: "none",
            fontWeight: 700,
            fontSize: "18px",
          }}
          {...rest}
        />
      </Link>
    );
  };

  return (
    <Box m={2}>
      <Tabs value={tabValue} sx={{ mb: 2 }}>
        {tabs.map(({ path, label, tab }) => (
          <TopMenuTab key={tab} path={path} value={tab} label={label} />
        ))}
      </Tabs>
      {children}
    </Box>
  );
}
