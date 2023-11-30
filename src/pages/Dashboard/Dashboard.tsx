import { Table } from '@components/Table2/Table'
import { Navbar } from '../../components/Navbar/Navbar'

import '../../styles/tailwind.css'
import { useEffect, useRef, useState } from 'react'
import { BarData, Barchart } from '@components/Barchart/Barchart'
import styles from './Dashboard.module.scss'
import { CSVLink } from 'react-csv'

export const Dashboard: React.FC = () => {
  const [ingredientsRankingData, setIngredientsRankingData] = useState<BackendIngredientRankingEndpointResponse>({
    title: '',
    data: [],
  })
  const [dishsesRankingData, setDishesRankingData] = useState<BackendDishRankingEndpointResponse>({
    title: '',
    data: [],
  })
  const csvLinkIngredientsRef = useRef<any>(null)
  const csvLinkDishesRef = useRef<any>(null)
  const headers = ['Id', 'Name', 'Count Quantity', 'Rank Number']
  const baseUrl = import.meta.env.VITE_BACKEND_API_URL
  const [topRanking, setTopRanking] = useState(5)
  const startValue = 5
  const toValue = useRef(100)
  const incrementDishRankingChartBars = 1
  const array = Array.from(
    { length: (toValue.current - startValue) / startValue + incrementDishRankingChartBars },
    (_, index) => startValue + index * startValue,
  ).filter((value) => value % 10 !== startValue || value === startValue)

  interface BackendIngredientRankingEndpointResponse {
    title: string
    data: {
      id: number
      name: string
      count_quantity: number
      rank_number: number
    }[]
  }

  interface BackendDishRankingEndpointResponse {
    title: string
    data: {
      id: number
      name: string
      sum_quantity: number
      rank_number: number
    }[]
  }

  interface DishBarchartData {
    data: BarData[]
  }

  const fetchData = async () => {
    try {
      const [ingredientsResponse, dishesResponse] = await Promise.all([
        fetch(baseUrl + '/reports/ingredientsRanking', {
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        }),
        fetch(baseUrl + `/reports/dishesRanking?pageSize=${topRanking}`, {
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        }),
      ])

      const ingredientsJson = (await ingredientsResponse.json()) as BackendIngredientRankingEndpointResponse
      const dishesJson = (await dishesResponse.json()) as BackendDishRankingEndpointResponse

      ingredientsJson.data.sort((a, b) => a.rank_number - b.rank_number)

      setIngredientsRankingData(ingredientsJson)
      setDishesRankingData(dishesJson)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [topRanking])

  const handleButtonClick = (value: number) => {
    setTopRanking(value)
  }

  const getFormattedDateTime = (baseFileName: string, ref: any) => {
    const dateTime = new Date()
    const day = dateTime.getDate().toString().padStart(2, '0')
    const month = (dateTime.getMonth() + 1).toString().padStart(2, '0')
    const year = dateTime.getFullYear().toString()
    const hours = dateTime.getHours().toString().padStart(2, '0')
    const minutes = dateTime.getMinutes().toString().padStart(2, '0')
    const seconds = dateTime.getSeconds().toString().padStart(2, '0')
    const formattedDateTime = `${day}_${month}_${year}_${hours}_${minutes}_${seconds}`

    if (ref.current) {
      const link = ref.current.link as HTMLAnchorElement
      link.setAttribute('download', `${baseFileName}_${formattedDateTime}.csv`)
    }
  }

  return (
    <>
      <Navbar activeItems="Dashboard" />
      <main style={{ width: '100vw', height: '100vh' }} className='p-5'>
        <h1>Dashboard</h1>
        <h2 className="mt-4">Ingredients Ranking</h2>
        <div className="m-0 mx-4 lg:mx-8 xl:mx-12 mt-12">
          <Table
            headers={headers}
            rows={
              {
                headers:
                  ingredientsRankingData.title === 'ingredientsRanking'
                    ? ['Id', 'Name', 'Count Quantity', 'Rank Number']
                    : [],
                rows: ingredientsRankingData.data.map((item: any) => ({
                  rowCells: [
                    { cellValue: item.id.toString() },
                    { cellValue: item.name },
                    { cellValue: item.count_quantity },
                    { cellValue: item.rank_number },
                  ],
                })),
              }.rows
            }
          ></Table>
        </div>
        <div className="m-0 mx-4 lg:mx-8 xl:mx-12 mt-6">
          <CSVLink
            data={ingredientsRankingData.data}
            className={'px-4 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm'}
            filename={`ingredients_ranking.csv`}
            onClick={() => getFormattedDateTime('ingredients_ranking', csvLinkIngredientsRef)}
            ref={csvLinkIngredientsRef}
          >
            Download CSV
          </CSVLink>
        </div>
        <h2 className="mt-4">Top {topRanking} Dishes Ranking</h2>
        <div className={`${styles.styles}`} style={{ width: '100%', height: '100%' }}>
          <div className={`p-0 m-0 mx-4 lg:mx-8 xl:mx-12 mt-12 ${styles.barchart_container}`}>
            <Barchart
              dataKey="sum_quantity"
              data={(dishsesRankingData as DishBarchartData).data}
              colors={['#FF9999', '#9999FF', '#99FF99', '#FFFF99', '#FF99FF']}
            ></Barchart>
          </div>
          <div className="m-0 mx-4 lg:mx-8 xl:mx-12 mt-6 flex flex-wrap justify-center">
            {array.map((value) => (
              <button
                key={value}
                className="m-2 px-4 py-2 rounded-md bg-white text-gray-700 hover:bg-gray-200"
                onClick={() => handleButtonClick(value)}
              >
                {value}
              </button>
            ))}
          </div>

          <div className="m-0 mx-4 lg:mx-8 xl:mx-12 mt-6">
            <CSVLink
              data={dishsesRankingData.data.map((item: any) => ({
                id: item.id,
                name: item.name,
                sum_quantity: item.sum_quantity,
                rank_number: item.rank_number,
              }))}
              className={'px-4 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm'}
              filename={`dishes_ranking.csv`}
              onClick={() => getFormattedDateTime('dishes_ranking', csvLinkDishesRef)}
              ref={csvLinkDishesRef}
            >
              Download CSV
            </CSVLink>
          </div>
        </div>
      </main>
    </>
  )
}
