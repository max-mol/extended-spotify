import { Link as MuiLink, LinkProps as MuiLinkProps } from "@mui/material";

interface LinkProps extends MuiLinkProps {
  href: string;
}

const Link = ({ href, ...props }: LinkProps) => {
  return <MuiLink href={href} {...props} />;
};

export default Link;
