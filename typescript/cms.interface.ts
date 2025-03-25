export interface IallListProps {
    _id: string;
    image: string;
    name: string;
    price: number;
    category: string;
    description: string;
    status: number;
    data: string;
  }

  export interface listProps extends IallListProps {
    user: IallListProps;
  }

  export interface IcreateProps {
    token: string;
    message: string;
    status: number;
    name: string;
    price: number;
    description: string;
    category: string;
    user?: Record<string, any>;
  }

  export interface createProps extends IcreateProps {
    data: IcreateProps;
  }

  export interface IupdateProps {
    token: string;
    message: string;
    status: number;
    _id: string;
    name: string;
    price: number;
    description: string;
    category: string;
    user?: Record<string, any>;
  }

  export interface updateProps extends IupdateProps {
    user: IupdateProps;
  }

  export interface IdeleteProps {
    token: string;
    message: string;
    status: number;
    _id: string;
    name: string;
    price: number;
    description: string;
    category: string;
    user?: Record<string, any>;
  }

  export interface deleteProps extends IdeleteProps {
    user: IdeleteProps;
  }

  export interface IdetailsProps {
    _id: string;
    image: string;
    name: string;
    price: number;
    category: string;
    description: string;
    status: number;
    data: string;
  }

  export interface detailsProps extends IdetailsProps {
    user: IdetailsProps;
  }

  export interface Product {
    _id: string;
    name: string;
    description: string;
    category: string;
    price: number;
  }