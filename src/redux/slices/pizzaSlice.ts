import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../store'

type PizzaItem = {
  id: string
  title: string
  price: number
  imageUrl: string
  sizes: number[]
  types: number[]
  rating: number
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export type SearchPizzaParams = {
  sortBy: string
  order: string
  category: string
  search: string
  currentPage: string
}

export const fetchPizzas = createAsyncThunk<PizzaItem[], SearchPizzaParams>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { sortBy, order, category, search, currentPage } = params
    const { data } = await axios.get<PizzaItem[]>(
      `https://63ee06b05e9f1583bdba9ac5.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
    return data
  }
)

interface PizzaSliceState {
  items: PizzaItem[]
  status: Status
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
}

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING
      state.items = []
    })
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = Status.SUCCESS
    })
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR
      state.items = []
    })
  },
})

export const selectPizza = (state: RootState) => state.pizza

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer
