import React, { useCallback, useEffect, useRef } from 'react'
import qs from 'qs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {
  selectCategoriesId,
  selectCurrentPage,
  selectSearchValue,
  selectSortt,
  setCategoriesId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice'
import {
  fetchPizzas,
  SearchPizzaParams,
  selectPizza,
} from '../redux/slices/pizzaSlice'

import Categories from '../components/Categories'
import Sort, { list } from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Pagination from '../components/Pagination'

import { useAppDispatch } from '../redux/store'

const Home: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isSearch = useRef(false)
  const isMounted = useRef(false)

  const categoriesId = useSelector(selectCategoriesId)
  const sort = useSelector(selectSortt)
  const currentPage = useSelector(selectCurrentPage)
  const { items, status } = useSelector(selectPizza)
  const searchValue = useSelector(selectSearchValue)

  const getPizzas = async () => {
    const sortBy = sort.replace('-', '')
    const order = sort.includes('-') ? 'asc' : 'desc'
    const category = categoriesId > 0 ? `category=${categoriesId}` : ''
    const search = searchValue ? `&search=${searchValue}` : ''

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage: String(currentPage),
      })
    )

    window.scrollTo(0, 0)
  }

  const onChangeCategory = useCallback((id: number) => {
    dispatch(setCategoriesId(id))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const onChangePage = (numder: number) => {
    dispatch(setCurrentPage(numder))
  }

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sort,
        categoriesId,
        currentPage,
      })
      navigate(`?${queryString}`)
    }

    isMounted.current = true
  }, [categoriesId, sort, currentPage]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(
        window.location.search.substring(1)
      ) as unknown as SearchPizzaParams
      const sort = list.find((obj) => obj.sort === params.sortBy)

      dispatch(
        setFilters({
          searchValue: params.search,
          categoriesId: Number(params.category),
          currentPage: Number(params.currentPage),
          sort: sort || list[0],
        })
      )
      isSearch.current = true
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    window.scrollTo(0, 0)

    if (!isSearch.current) {
      getPizzas()
    }

    isSearch.current = false
  }, [categoriesId, sort, searchValue, currentPage]) // eslint-disable-line react-hooks/exhaustive-deps

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />)
  const skeleton = [...new Array(8)].map((_, index) => <Skeleton key={index} />)

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoriesId} onClickCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка (</h2>
          <p>
            К сожелению, не удалось получить пиццы. Попробуйте повторить потытку
            позже.
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === 'loading' ? skeleton : pizzas}
        </div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  )
}

export default Home
