import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string
    title: string
    price: number
  }>()
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://63ee06b05e9f1583bdba9ac5.mockapi.io/items/` + id
        )
        setPizza(data)
      } catch (error) {
        alert('Произошла ошибка!')
        navigate('/')
      }
    }
    fetchPizza()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (!pizza) {
    return <>Загрузка...</>
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="d" />
      <h2>{pizza.title}</h2>
      <p>{pizza.price}</p>
      <Link to="/">
        <button className="button button--outline button--add">
          <span>Назад</span>
        </button>
      </Link>
    </div>
  )
}

export default FullPizza
