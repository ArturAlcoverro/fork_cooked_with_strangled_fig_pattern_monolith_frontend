import React from 'react'
import { Bar, BarChart, CartesianGrid, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export const Barchart: React.FC<BarchartProps> = ({ dataKey, data, colors }) => {
  const getColor = (index: number): string => {
    if (index < colors.length) {
      return colors[index]
    }
    return colors[index % colors.length]
  }

  const PersonalizedBarTick = ({ x, y, payload }: any) => (
    <g transform={`translate(${x},${y})`}>
      <foreignObject x={-40} y={0} width={80} height={100}>
        <div
          style={{
            fontSize: '12px',
            wordWrap: 'break-word',
            textAlign: 'center',
          }}
        >
          {payload.value}
        </div>
      </foreignObject>
    </g>
  )

  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" interval={1} textAnchor="end" height={100} tick={<PersonalizedBarTick />} />

          <YAxis />
          <Tooltip />
          <Bar dataKey={dataKey} barSize={100}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getColor(index)} />
            ))}
          </Bar>
          <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ position: 'relative' }} />
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}

export interface BarData {
  name: string
  [key: string]: string | number
}

export interface BarchartProps {
  dataKey: string
  data: BarData[]
  colors: string[]
}
