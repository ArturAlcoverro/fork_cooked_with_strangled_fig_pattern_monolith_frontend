import { useEffect } from 'react'
import { Navbar } from '../../components/Navbar/Navbar'
import { BarChar } from './BarChart/BarChart'
import { useReports } from './useReports'
import { RankingTable } from './RankingTable/RankingTable'
import { ReactComponent as DownloadIcon } from '@assets/icons/download.svg'

const downloadCSV = (filename: string, data: Array<Record<string, any>>): void => {
  const convertToCSV = (data: Array<Record<string, any>>): string => {
    if (data.length === 0) return '';

    const header = Object.keys(data[0]).join(',');
    const rows = data.map(obj => {
      return Object.values(obj).map(value => {
        if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',');
    });

    return [header, ...rows].join('\n');
  };

  const csvContent = convertToCSV(data);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');

  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename.endsWith('.csv') ? filename : `${filename}.csv`);
  document.body.appendChild(link);

  link.click();
  document.body.removeChild(link);
}

export const DashboardPage: React.FC = () => {
  const { dishesChart, ingredientChart, dishesTable, ingredientTable } = useReports()

  return (
    <div className="h-screen flex flex-col">
      <Navbar className="flex-grow-0" activeItems="Dashboard" />
      <main className="p-5 flex-grow flex flex-col">
        <h1 className="flex-grow-0">Dashboard</h1>
        <div className="grid flex-grow w-full grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 gap-5 pt-4">
          <div className="bg-white flex min-h-[275px] flex-col rounded-lg p-4 shadow-[0_0_20px_0_rgba(202,211,235,0.37)]">
            <h3 className="pb-4 flex-grow-0">Top Dishes</h3>
            <div className="flex-grow w-full">
              <BarChar data={dishesChart} />
            </div>
          </div>
          <div className="bg-white flex min-h-[275px] flex-col rounded-lg shadow-[0_0_20px_0_rgba(202,211,235,0.37)]">
            <div className="p-4 pb-0 flex-grow-0 flex justify-between items-center">
              <h3>Dishes</h3>
              <button onClick={()=>{downloadCSV("dishes-ranking.csv", dishesTable)}} className="absolute right-7 text-white hover:bg-gray-200 focus:outline-none font-medium rounded-lg text-sm p-2 text-center inline-flex items-center">
                <DownloadIcon className="w-5 h-5" fill="var(--font-color-secondary)" />
              </button>
            </div>
            <div className="flex-grow w-full">
              <RankingTable data={dishesTable} />
            </div>
          </div>
          <div className="bg-white flex min-h-[275px] flex-col rounded-lg p-4 shadow-[0_0_20px_0_rgba(202,211,235,0.37)]">
            <h3 className="pb-4 flex-grow-0">Top Ingredients</h3>
            <div className="flex-grow w-full">
              <BarChar data={ingredientChart} />
            </div>
          </div>
          <div className="bg-white flex min-h-[275px] flex-col rounded-lg shadow-[0_0_20px_0_rgba(202,211,235,0.37)]">
            <div className="p-4 pb-0 flex-grow-0 flex justify-between items-center">
              <h3>Ingredients</h3>
              <button onClick={()=>{downloadCSV("ingredients-ranking.csv", ingredientTable)}} className="absolute right-7 text-white hover:bg-gray-200 focus:outline-none font-medium rounded-lg text-sm p-2 text-center inline-flex items-center">
                <DownloadIcon className="w-5 h-5" fill="var(--font-color-secondary)" />
              </button>
            </div>
            <div className="flex-grow w-full">
              <RankingTable data={ingredientTable} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
