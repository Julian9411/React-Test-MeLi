export interface IBreadcrumbData {
  label: string;
  to: string;
}

export interface IBreadcrumb {
  links: IBreadcrumbData[] | IBreadcrumbData;
}