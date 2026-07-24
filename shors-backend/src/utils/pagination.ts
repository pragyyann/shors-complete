export const getPaginationOptions = (page?: number, limit?: number) => {
  const pageNumber = page || 1;
  const pageSize = limit || 10;
  const skip = (pageNumber - 1) * pageSize;

  return { skip, take: pageSize };
};

export const getPaginationMeta = (totalItems: number, page: number, limit: number) => {
  const totalPages = Math.ceil(totalItems / limit);
  return {
    totalItems,
    currentPage: page,
    totalPages,
    limit,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
};
