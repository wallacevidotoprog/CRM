export type ApiResponse = {
  message?: string;
  data?: any;
  ok: boolean;
  pagination?: PaginationData;
};

export type PaginationData = {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};
