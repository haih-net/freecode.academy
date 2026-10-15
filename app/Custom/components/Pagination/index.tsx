import type * as React from 'react'
import { useLocation } from 'react-router'
import { PaginationStyled, PageLink, PageInfo } from './styles'
export const Pagination: React.FC<{
  currentPage: number
  totalPages: number
}> = ({ currentPage, totalPages }) => {
  const { pathname, search } = useLocation()
  const href = (page: number): string => {
    const params = new URLSearchParams(search)
    if (page === 1) {
      params.delete('page')
    } else {
      params.set('page', String(page))
    }
    return pathname + (params.size ? `?${params}` : '')
  }
  if (totalPages <= 1) {
    return null
  }
  return (
    <PaginationStyled aria-label="Пагинация">
      {currentPage > 1 ? (
        <PageLink to={href(currentPage - 1)} rel="prev">
          Previous
        </PageLink>
      ) : (
        <span aria-disabled="true">Previous</span>
      )}
      <PageInfo>
        Page {currentPage} of {totalPages}
      </PageInfo>
      {currentPage < totalPages ? (
        <PageLink to={href(currentPage + 1)} rel="next">
          Next
        </PageLink>
      ) : (
        <span aria-disabled="true">Next</span>
      )}
    </PaginationStyled>
  )
}
