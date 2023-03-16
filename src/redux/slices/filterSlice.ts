import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export enum SortPropertyEnum {
  RATING_DESC = 'rating',
  RATING_ASC = '-rating',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
  TITLE_DESC = 'title',
  TITLE_ASC = '-title',
}

export type Sort = {
  name: string
  sort: SortPropertyEnum
}

export interface FilterSliceState {
  searchValue: string
  categoriesId: number
  currentPage: number
  sort: Sort
}

const initialState: FilterSliceState = {
  searchValue: '',
  categoriesId: 0,
  currentPage: 1,
  sort: {
    name: 'популярные',
    sort: SortPropertyEnum.RATING_DESC,
  },
}

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoriesId(state, action: PayloadAction<number>) {
      state.categoriesId = action.payload
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.sort = action.payload.sort
      state.currentPage = Number(action.payload.currentPage)
      state.categoriesId = Number(action.payload.categoriesId)
    },
  },
})

export const selectSort = (state: RootState) => state.filter.sort

export const selectCategoriesId = (state: RootState) =>
  state.filter.categoriesId
export const selectSortt = (state: RootState) => state.filter.sort.sort
export const selectCurrentPage = (state: RootState) => state.filter.currentPage
export const selectSearchValue = (state: RootState) => state.filter.searchValue

export const {
  setCategoriesId,
  setSort,
  setCurrentPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions

export default filterSlice.reducer
