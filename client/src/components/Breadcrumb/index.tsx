import { Breadcrumbs } from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";
import { IBreadcrumb, IBreadcrumbData } from "./breadcrumb.props";

export const Breadcrumb: FC<IBreadcrumb> = ({ links }) => {
  return (
    <Breadcrumbs separator=">">
      {Array.isArray(links) ? (
        links.map((link: IBreadcrumbData) => (
          <Link key={link.to} to={link.to}>{link.label}</Link>
        ))
      ) : (
        <Link to={links.to}>{links.label}</Link>
      )}
    </Breadcrumbs>
  );
};
