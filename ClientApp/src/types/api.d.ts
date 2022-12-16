export interface IUser {
  displayName: string;
  email: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
}

export interface ServiceResponse<T = unknown> {
  data: T;
  success: boolean;
  message: string;
}

export interface Order {}
