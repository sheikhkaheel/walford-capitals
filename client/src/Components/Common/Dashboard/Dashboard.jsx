import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import Nav from "../../Boilerplate/Nav/Nav";
import 'animate.css';
import './Dashboard.css';

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend);

export default function Dashboard() {
    const stockData = {
        companyName: "Tech Innovations Inc.",
        ticker: "TII",
        price: "$150.00",
        change: "+2.50 (+1.69%)",
    };

    const profitLossData = [50, 30, 70, 90, 40, 80, 60];
    const lastValue = profitLossData[profitLossData.length - 1];
    const lineColor = lastValue > 0 ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)';

    const data = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: 'Profit/Loss',
                data: profitLossData,
                borderColor: lineColor,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: false,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                display: false,
                grid: {
                    display: false,
                },
            },
            y: {
                display: false,
                grid: {
                    display: false,
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
            },
        },
    };

    return (
        <div className="h-screen w-full overflow-hidden dashboard relative">
            <Nav />
            <div className="h-[85.9vh] flex items-center justify-center">
                <div className="flex flex-col lg:flex-row z-10 w-full justify-around px-4 lg:px-8 py-8 space-y-4 lg:space-y-0 lg:space-x-4">
                    {/* Graph Card */}
                    <div className="w-full lg:w-1/3 lg:mx-2 mb-4 lg:mb-0 bg-slate-700 bg-opacity-30 rounded-2xl backdrop-blur-lg p-6 shadow-lg slideright">
                        <div className="h-full transition-all text-white flex flex-col justify-between group hover:scale-105">
                            <h2 className="text-lg mb-4 font-semibold text-center">{stockData.companyName} ({stockData.ticker})</h2>
                            <div className="flex flex-col items-center mb-2">
                                <span className="text-xl">{stockData.price}</span>
                                <span className={`text-sm ${stockData.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                                    {stockData.change}
                                </span>
                            </div>
                            <div className="h-28 w-full pr-4 mb-4 mt-2">
                                <Line data={data} options={options} />
                            </div>
                            <Link to="/graph" className="mt-4 w-full">
                                <hr className="" />
                                <div className="pt-4 text-right font-bold text-teal-700 transition-all group-hover:text-white">
                                    View All
                                    <i className="fa-solid fa-chevron-right ml-3 px-2 py-1 transition-all group-hover:scale-125 group-hover:ml-4 bg-teal-300 rounded-md group-hover:bg-teal-700 group-hover:text-white"></i>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Another Section Card */}
                    <div className="w-full lg:w-1/3 lg:mx-2 mb-4 lg:mb-0 backdrop-blur-lg animate__animated rounded-2xl animate__fadeInRight overflow-hidden">
                        <div className="h-full transition-all bg-slate-700 bg-opacity-30  p-6 shadow-lg text-white  flex flex-col justify-between group hover:scale-105">
                            <h2 className="text-lg font-semibold text-center">Another Section</h2>
                            <div className="flex flex-col items-center mb-2">
                                <p className="text-sm">Additional information can go here.</p>
                            </div>
                            <Link to="/table" className="mt-4 w-full">
                                <hr className="" />
                                <div className="pt-4 text-right font-bold text-teal-700 transition-all group-hover:text-white">
                                    View All
                                    <i className="fa-solid fa-chevron-right ml-3 px-2 py-1 transition-all group-hover:scale-125 group-hover:ml-4 bg-teal-300 rounded-md group-hover:bg-teal-700 group-hover:text-white"></i>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
