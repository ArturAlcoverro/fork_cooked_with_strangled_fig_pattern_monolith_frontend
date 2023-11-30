import { StructureField, Table } from '@components/Table/Table'

const structure: StructureField[] = [
  {
    datakey: 'position',
    title: 'Rank',
    align: 'start',
    format: (value: any) => "#" + value,
  },
  {
    datakey: 'name',
    title: 'Name',
    align: 'start',
  },
  {
    datakey: 'quantity',
    title: 'Quantity',
    align: 'end',
  },
]

export const RankingTable: React.FC<RankingTableProps> = ({data}) => {
  return <Table structure={structure} data={data} defaultSortIndex={0} />
}

interface RankingTableProps {data: any}
