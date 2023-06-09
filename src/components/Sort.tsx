import React, { memo, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  selectSort,
  setSort,
  SortPropertyEnum,
} from '../redux/slices/filterSlice'

type SortItem = {
  name: string
  sort: SortPropertyEnum
}

export const list: SortItem[] = [
  { name: 'популярные ↑', sort: SortPropertyEnum.RATING_DESC },
  { name: 'популярные ↓', sort: SortPropertyEnum.RATING_ASC },
  { name: 'цена ↑', sort: SortPropertyEnum.PRICE_DESC },
  { name: 'цена ↓', sort: SortPropertyEnum.PRICE_ASC },
  { name: 'алфавиту ↑', sort: SortPropertyEnum.TITLE_DESC },
  { name: 'алфавиту ↓', sort: SortPropertyEnum.TITLE_ASC },
]

const SortPopup: React.FC = memo(() => {
  const dispatch = useDispatch()
  const sort = useSelector(selectSort)
  const sortRef = useRef<HTMLDivElement>(null)

  const [open, setOpen] = useState(false)

  const onClickItem = (obj: SortItem) => {
    dispatch(setSort(obj))
    setOpen(false)
  }

  const [isActive, setIsActive] = useState(false)

  const onClickSort = () => {
   setOpen(!open)
   setIsActive(!isActive)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      let path =
        sortRef.current && event.composedPath().includes(sortRef.current)
      if (!path) {
         setOpen(false)
         setIsActive(false)
      }
    }

    document.body.addEventListener('click', handleClickOutside)

    return () => {
      document.body.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          className={isActive ? 'rotated' : ''}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => onClickSort()}>{sort.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul onClick={() => setIsActive(!isActive)}>
            {list.map((obj, index) => (
              <li
                key={index}
                onClick={() => onClickItem(obj)}
                className={sort.sort === obj.sort ? 'active' : ''}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
})

export default SortPopup
