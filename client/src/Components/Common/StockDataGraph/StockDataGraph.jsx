import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
import dayjs from 'dayjs';
import ClipLoader from 'react-spinners/ClipLoader';

Chart.register(...registerables);

const StockDataGraph = () => {
    const [stockData, setStockData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const chartRef = useRef(null);
    const [chartType, setChartType] = useState('line');
    const [symbol, setSymbol] = useState('AAPL');
    const [timeframe, setTimeframe] = useState('1day'); // Default to daily
    const [currentMonth, setCurrentMonth] = useState(dayjs().month(9).startOf('month')); // Set to October
    const symbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN'];

    const fetchStockData = async () => {
        const apiKey = 'a9T73fCcpk3PTVXK4lKssMjTXhrBL5UF';
        const url = `https://financialmodelingprep.com/api/v3/historical-chart/${timeframe}/${symbol}?apikey=${apiKey}`;

        try {
            setLoading(true);
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();
            console.log(data); // Log fetched data for debugging

            let filteredData;

            if (timeframe === '1month') {
                // Filter for the last 10 months
                filteredData = data.filter(item => {
                    const itemDate = dayjs(item.date);
                    return itemDate.isAfter(currentMonth.subtract(10, 'month')) && itemDate.isSame(currentMonth, 'month');
                });
            } else if (timeframe === '1year') {
                // Filter for the last year
                filteredData = data.filter(item => {
                    const itemDate = dayjs(item.date);
                    return itemDate.isAfter(currentMonth.subtract(1, 'year'));
                });
            } else {
                // For '1hour' and '1day', use existing filtering
                filteredData = data.filter(item => {
                    const itemDate = dayjs(item.date);
                    return itemDate.isSame(currentMonth, 'month') && itemDate.year() === currentMonth.year();
                });
            }

            console.log(filteredData); // Log filtered data for debugging

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

    useEffect(() => {
        if (loading || error || stockData.length === 0) return;

        const ctx = chartRef.current.getContext('2d');
        const labels = stockData.map(item => dayjs(item.date).toDate());
        const values = stockData.map(item => item.close || 0);

        const myChart = new Chart(ctx, {
            type: chartType,
            data: {
                labels: labels,
                datasets: [{
                    label: 'Stock Price',
                    data: values,
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    fill: chartType === 'line',
                    barPercentage: 0.8,
                    categoryPercentage: 1.0,
                    maxBarThickness: 50,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        type: 'time',
                        grid: { display: false },
                        ticks: { color: '#ffffff' },
                    },
                    y: {
                        beginAtZero: false,
                        grid: { color: '#444444' },
                        ticks: { color: '#ffffff' }
                    }
                }
            }
        });

        return () => myChart.destroy();
    }, [stockData, chartType, loading, error]);

    const handleSymbolChange = (e) => setSymbol(e.target.value);
    const handleChartTypeChange = (e) => setChartType(e.target.value);
    const handleTimeframeChange = (newTimeframe) => {
        setTimeframe(newTimeframe);
        setCurrentMonth(dayjs().month(9).startOf('month')); // Reset to October when changing timeframe
    };

    const handleMonthChange = (direction) => {
        let newDate;
        if (timeframe === '1year') {
            newDate = direction === 'prev' ? currentMonth.subtract(1, 'year') : currentMonth.add(1, 'year');
        } else {
            newDate = direction === 'prev' ? currentMonth.subtract(1, 'month') : currentMonth.add(1, 'month');
        }
        setCurrentMonth(newDate.startOf('month'));
    };

    if (loading) return (
        <div className='flex bg-black justify-center items-center h-screen'>
            <span className='colorText'> <ClipLoader color="#ffffff" loading={loading} size={50} /> WalFord Capiltals</span>            
        </div>
    );
    if (error) return <div className="text-red-500 text-center">{error}</div>;

    return (
        <div className='h-screen w-full overflow-hidden bg-gray-900'>
            <div className="w-full h-full p-6 bg-cyan-800 bg-opacity-30 backdrop-blur-lg shadow-lg text-white flex flex-col">
                <div className='flex justify-between mb-4'>
                    <h2 className='text-lg font-semibold'>Stock Data Graph</h2>
                    <select value={symbol} onChange={handleSymbolChange} className='bg-gray-800 text-white rounded p-2'>
                        {symbols.map((sym) => (
                            <option key={sym} value={sym}>{sym}</option>
                        ))}
                    </select>
                    <select value={chartType} onChange={handleChartTypeChange} className='bg-gray-800 text-white rounded p-2 ml-2'>
                        <option value="line">Line</option>
                        <option value="bar">Bar</option>
                    </select>
                </div>
                <div className='flex space-x-2 mb-4'>
                    <button onClick={() => handleTimeframeChange('1hour')} className='bg-gray-800 text-white rounded p-2'>Hourly</button>
                    <button onClick={() => handleTimeframeChange('1day')} className='bg-gray-800 text-white rounded p-2'>Daily</button>
                    {/* <button onClick={() => handleTimeframeChange('1month')} className='bg-gray-800 text-white rounded p-2'>Monthly</button> */}
                    {/* <button onClick={() => handleTimeframeChange('1year')} className='bg-gray-800 text-white rounded p-2'>Yearly</button> */}
                </div>
                <div className="flex space-x-2 mb-4">
                    <button onClick={() => handleMonthChange('prev')} className='bg-gray-800 text-white rounded p-2'>Previous</button>
                    <button onClick={() => handleMonthChange('next')} className='bg-gray-800 text-white rounded p-2'>Next</button>
                    <span className='self-center text-white'>{currentMonth.format('MMMM YYYY')}</span>
                </div>
                <div className="relative">
                    <canvas ref={chartRef} className='w-full h-[80vh] lg:h-[65vh]'></canvas>
                </div>
            </div>
        </div>
    );
};

export default StockDataGraph;
