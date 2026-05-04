export type Role = "biller" | "manager" | "admin" | "inventory" | "";

export interface AuthUser {
  user_id: number | string;
  username: string;
  role: Role;
}

export interface MedicineMaster {
  med_id: number | string;
  medName: string;
  brand: string;
}

export interface StockItem {
  med_id?: number | string;
  medId?: number | string;
  medName: string;
  brand: string;
  qty: number;
  price: number;
}

export interface BillDetail {
  user_id: number | string;
  bill_no: number | string;
  med_id: number | string;
  medicinename: string;
  brand: string;
  unitPrice: number;
  qty: number;
  billAmt: number;
}

export interface LoginHistoryRow {
  username: string;
  login_date: string;
  login_time: string;
  logout_date: string;
  logout_time: string;
}

export interface SalesReportRow {
  bil_no: number | string;
  date: string;
  medName: string;
  qty: number;
  amt: number;
}

export interface BillerDashItem {
  day: "Today" | "Yesterday" | string;
  amt: number;
}

export interface ManagerDashResp {
  todaySaleVal: number;
  totalInventryVal: number;
  dailySaleArr: { weekDay: string; dailyVal: number }[];
  monthlysaleArr: { months: string; monthVal: number }[];
  todaySalePerfArr: { userName: string; amount: number }[];
  currentMnthPerfArr: { userName: string; amount: number }[];
}

export interface ApiEnvelope<T> {
  status: "S" | "E" | string;
  errMsg?: string;
  [key: string]: unknown;
  data?: T;
}
