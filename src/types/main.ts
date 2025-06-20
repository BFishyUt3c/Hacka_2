export interface CategorySummary {
  readonly id: string;
  readonly name: string;
  readonly total: number;
  readonly percentage: number;
}

export interface ExpenseDetail {
  readonly id: string;
  readonly amount: number;
  readonly date: string; 
  readonly description: string;
}

export interface Goal {
  readonly id: string;
  readonly month: number;
  readonly year: number;
  readonly targetAmount: number;
  readonly currentAmount: number;
  readonly createdAt?: string;
  readonly updatedAt?: string;
}

export interface ApiResponse<T> {
  readonly status: number;
  readonly message: string;
  readonly data: T;
}
