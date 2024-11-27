export interface MenuItem {
  label: string;
  icon?: string;
  routerLink?: string[];
  url?: string[];
  target?: string;
  badge?: string;
  items?: MenuItem[];
  separator?: boolean;
  routerLinkActiveOptions?: {
    paths?: string;
    queryParams?: string;
    matrixParams?: string;
    fragment?: string;
  };
}
