import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import ClipLoader from 'react-spinners/ClipLoader';
import { FaSort } from 'react-icons/fa';

const StockDataTable = () => {
    const [stockData, setStockData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [symbol, setSymbol] = useState('AAPL');
    const [timeframe, setTimeframe] = useState('1day');
    const [currentMonth, setCurrentMonth] = useState(dayjs().month(9).startOf('month'));  // Default to October
    const symbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN'];

    const fetchStockData = async () => {
        const apiKey = 'a9T73fCcpk3PTVXK4lKssMjTXhrBL5UF';
        const url = `https://financialmodelingprep.com/api/v3/historical-chart/${timeframe}/${symbol}?apikey=${apiKey}`;

        try {
            setLoading(true);
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();

            let filteredData = [];

            if (timeframe === '1year') {
                // When timeframe is '1year', get all data for the year
                filteredData = data.filter(item => {
                    const itemDate = dayjs(item.date);
                    return itemDate.year() === currentMonth.year();
                });
            } else {
                // For other timeframes (daily, hourly, monthly), filter by the current month and year
                filteredData = data.filter(item => {
                    const itemDate = dayjs(item.date);
                    return itemDate.isSame(currentMonth, 'month') && itemDate.year() === currentMonth.year();
                });
            }

            const formattedData = filteredData.map(item => ({
                date: item.date,
                open: item.open,
                low: item.low,
                high: item.high,
                close: item.close,
            }));

            setStockData(formattedData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStockData();
        const intervalId = setInterval(fetchStockData, 60 * 60 * 1000); // Update every hour
        return () => clearInterval(intervalId);
    }, [symbol, timeframe, currentMonth]);

    const handleSymbolChange = (e) => setSymbol(e.target.value);

    const handleTimeframeChange = (newTimeframe) => {
        setTimeframe(newTimeframe);
        setCurrentMonth(dayjs().month(9).startOf('month')); // Reset to October when changing timeframe
    };

    const handleMonthChange = (direction) => {
        let newDate;
        if (timeframe === '1year') {
            // For '1year' timeframe, move to the previous or next year
            newDate = direction === 'prev' ? currentMonth.subtract(1, 'year') : currentMonth.add(1, 'year');
        } else {
            // For other timeframes, move by months (prev/next month)
            newDate = direction === 'prev' ? currentMonth.subtract(1, 'month') : currentMonth.add(1, 'month');
        }
        setCurrentMonth(newDate.startOf('month'));
    };

    const sortData = (key) => {
        const sortedData = [...stockData].sort((a, b) => a[key] - b[key]);
        setStockData(sortedData);
    };

    if (loading) return <div className='flex justify-center items-center h-screen'><ClipLoader color="#ffffff" loading={loading} size={50} /></div>;
    if (error) return <div className="text-red-500 text-center">{error}</div>;

    return (
        <div className='h-screen w-full overflow-hidden bg-gray-900'>
            <div className="w-full h-full p-6 bg-cyan-800 bg-opacity-30 backdrop-blur-lg shadow-lg text-white flex flex-col">
                <div className='flex justify-between mb-4'>
                    <h2 className='text-lg font-semibold'>Stock Data Table</h2>
                    <select value={symbol} onChange={handleSymbolChange} className='bg-gray-800 text-white rounded p-2'>
                        {symbols.map((sym) => (
                            <option key={sym} value={sym}>{sym}</option>
                        ))}
                    </select>
                </div>
                <div className='flex space-x-2 mb-4'>
                    <button onClick={() => handleTimeframeChange('1hour')} className='bg-gray-800 text-white rounded p-2'>Hourly</button>
                    <button onClick={() => handleTimeframeChange('1day')} className='bg-gray-800 text-white rounded p-2'>Daily</button>
                    <button onClick={() => handleTimeframeChange('1month')} className='bg-gray-800 text-white rounded p-2'>Monthly</button>
                    <button onClick={() => handleTimeframeChange('1year')} className='bg-gray-800 text-white rounded p-2'>Yearly</button>
                </div>
                <div className="flex space-x-2 mb-4">
                    <button onClick={() => handleMonthChange('prev')} className='bg-gray-800 text-white rounded p-2'>Previous</button>
                    <button onClick={() => handleMonthChange('next')} className='bg-gray-800 text-white rounded p-2'>Next</button>
                    <span className='self-center text-white'>{currentMonth.format('MMMM YYYY')}</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-gray-800 rounded-lg">
                        <thead>
                            <tr>
                                <th className="py-2 text-left px-4 text-gray-300 cursor-pointer" onClick={() => sortData('date')}>Date <FaSort /></th>
                                <th className="py-2 text-left px-4 text-gray-300 cursor-pointer" onClick={() => sortData('open')}>Open <FaSort /></th>
                                <th className="py-2 text-left px-4 text-gray-300 cursor-pointer" onClick={() => sortData('high')}>High <FaSort /></th>
                                <th className="py-2 text-left px-4 text-gray-300 cursor-pointer" onClick={() => sortData('low')}>Low <FaSort /></th>
                                <th className="py-2 text-left px-4 text-gray-300 cursor-pointer" onClick={() => sortData('close')}>Close <FaSort /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {stockData.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-800">
                                    <td className="py-2 px-4 text-gray-200">
                                        {/* Display full date format (MM/DD/YYYY) for daily or monthly views */}
                                        {dayjs(item.date).format('MM/DD/YYYY')}
                                    </td>
                                    <td className="py-2 px-4 text-gray-200">{item.open.toFixed(2)}</td>
                                    <td className="py-2 px-4 text-gray-200">{item.high.toFixed(2)}</td>
                                    <td className="py-2 px-4 text-gray-200">{item.low.toFixed(2)}</td>
                                    <td className="py-2 px-4 text-gray-200">{item.close.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StockDataTable;
