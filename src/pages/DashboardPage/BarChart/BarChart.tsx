import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import './BarChart.scss'
import React from 'react'

const items = [
  { datakey: "value", color: '#17A34A' },
  { datakey: "value", color: '#22C55D' },
  { datakey: "value", color: '#49DE80' },
  { datakey: "value", color: '#87EFAC' },
  { datakey: "value", color: '#BBF7D0' },
]


const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label}`}</p>
        <p className="value">{`Value: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

export const BarChar: React.FC<BarCharProps> = ({data}) => {
  return (
    <ResponsiveContainer className="chart" width="100%" height="99%">
      <BarChart
        margin={{ top: 10, right: 10, bottom: 10 }}
        data={data}
      >
        <CartesianGrid vertical={false} />
        <Tooltip content={<CustomTooltip/>}/>
        <YAxis tick={{ fill: '#5E5E5E' }} stroke="transparent" tickLine={false} width={40} tickCount={5} label={{ fontSize: '12px' }} />
        <XAxis dataKey="name" hide={true}/>

          <Bar
            label={{ position: 'centerTop', className: 'label' }}
            dataKey="value"
            name='Value'
          >
            {items.map((item, index) => (
              <Cell key={`cell-${index}`} fill={item.color} />
            ))}
          </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

interface BarCharProps {
  data: {
    name: string
    value: number
  }[]
}
