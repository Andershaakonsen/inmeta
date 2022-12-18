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

export interface Order {
  id: string;
  addressFrom: string;
  addressTo: string;
  serviceType: string;
  phoneNumber: string;
  email: string;
  date: Date;
  note: string;
  customerId: string;
}

export interface ServiceResponse<T = unknown> {
  data: T;
  success: boolean;
  message: string;
}

export interface Order {}
