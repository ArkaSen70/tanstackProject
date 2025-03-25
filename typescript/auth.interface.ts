export interface IloginProps {
  id: string;
  email: string;
  password: string;
  token: string;
  message: string;
  status: number;
  data: object;
}
export interface IregisterProps {
  id: string;
  name: string;
  email: string;
  password: string;
  token: string;
  message: string;
  status: number;
}

export interface IprofileProps {
  name: string;
  email: string;
  createdAt: Date;
  token: string;
  message: string;
  status: number;
  data: object;
}

export interface IotpProps {
  email: string;
  otp: number;
  token: string;
  message: string;
  status: number;
}

export interface IupdatePasswordProps {
  user_id: string;
  password: string;
  token: string;
  message: string;
  status: number;
}

export interface loginProps extends IloginProps {
  user: IloginProps;
}

export interface registerProps extends IregisterProps {
  user: IregisterProps;
}

export interface otpProps extends IotpProps {
  user: IotpProps;
}

export interface profileProps extends IprofileProps {
  user: IprofileProps;
}

export interface updatePasswordProps extends IupdatePasswordProps {
  user: IupdatePasswordProps;
}
