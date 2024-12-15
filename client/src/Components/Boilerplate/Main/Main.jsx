import { useEffect, useRef, useState } from "react";
import { Brain, PieChart, ShieldCheck, Users } from 'lucide-react'
import './Main.css';
import ThreeDComponent from '../../Common/ThreeDComponent/ThreeDComponent';
import Nav from "../Nav/Nav";
import 'animate.css';
import Footer from "../Footer/Footer";

export default function Main() {
    const cursorRef = useRef(null);
    const [, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [, setAnimate] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    const handlePrev = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const slides = [
        { id: 1, owner: 'Garret S. - USA', description: "Danelfin is an extraordinary tool for checking out new investment ideas or to browse for new prospects. I have found more than a few big winners by browsing the top-ranked AI Scores, stocks I didn't find specifically mentioned on any other service. I routinely check the scores of my portfolio to know when to consider exiting an existing position or opening a new one." },
        { id: 2, owner: 'Guy R. - UK', description: "This an exceptionally powerful tool that allows one to understand what really drives a stock, generating actionable investment ideas often in surprising and counterintuitive ways, all presented clearly and coherently. The stellar performance of Danelfin's recommendations speaks for itself." },
        { id: 3, owner: 'Mario G. - Italy', description: "Danelfin AI can scout a comprehensive set of stocks and provides crucial information to support the decision-making process, which corroborate whatever short or long strategy you have in mind. I’ve checked Danelfin’s recommendations against my portfolio to know the results attest to its accuracy and outstanding performance. Of all the platforms I have evaluated, Danelfin is by far the most accurate and intuitive one." },
    ];

    // Automatic sliding
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 4000); // Change slide every 3 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    useEffect(() => {
        const handleMouseMove = (event) => {
            const cursorSize = 18; // Assuming the cursor width and height are both 18px
            setMousePosition({ x: event.clientX, y: event.clientY });
            if (cursorRef.current) {
                cursorRef.current.style.left = `${event.clientX - cursorSize / 2}px`;
                cursorRef.current.style.top = `${event.clientY - cursorSize / 2}px`;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Trigger the animation when the component mounts
        setAnimate(true);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div style={{ backgroundColor: '#333333' }}>
            {/* Landing Page */}
            <div className="bg min-h-screen rounded-b-2xl lg:rounded-b-[3rem] overflow-hidden">
                <Nav />
                <main className="flex flex-col md:flex-col relative overflow-hidden lg:justify-around lg:flex-row">
                    <div className={`lg:relative z-20 animate__animated animate__fadeInLeft md:h-full lg:h-screen text-white h-1/2 pt-40 px-4 md:w-3/4 lg:pt-16 lg:w-[80%]}`}>
                        <div className="lg:absolute lg:bottom-[18%]">
                            <h2 className="work-sans-regular md:text-[3.6rem] lg:text-[3.5rem] lg:pt-12 leading-[4.1rem] text-4xl h-60 font-bold">
                                Where Vision Meets Precision: Redefining Wealth with Technology
                            </h2>
                            <div
                                onMouseEnter={() => setIsHovering(true)}
                                onMouseLeave={() => setIsHovering(false)}
                                className="lg:leading-[2rem] lg:text-[1.2rem] lg:w-3/4 text-sm mt-4 text-zinc-400 lg:font-extralight"
                            >
                                Outperform the NIFTY 50 at scale, and build more reliable investment strategies.
                            </div>
                            <div className="mt-8 flex gap-4">
                                <button
                                    className="rounded-full py-3 transition hover:bg-lime-700 hover:text-white px-6 text-sm text-gray-800 bg-white"
                                >
                                    Request a Demo
                                </button>

                                <button
                                    className="rounded-full py-3 px-6 transition hover:bg-lime-700 text-sm text-white bg-transparent border border-gray-800 flex items-center"
                                >
                                    <i className="fa-solid fa-arrow-right text-xs pl-2 pr-3"></i> Go to Docs
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-[50%] w-auto md:h-screen lg:h-screen animate__animated animate__fadeInRight">
                        <ThreeDComponent />
                    </div>

                    <div
                        ref={cursorRef}
                        className={`cursor `}
                        style={{ transform: isHovering ? 'scale(6)' : 'scale(1)' }}
                    ></div>
                    <div className="socialLinks text-white flex flex-col h-40 absolute justify-around right-2 px-2 text-xl bottom-[86%] lg:bottom-[15%]">
                        <i className="fa-brands fa-linkedin-in"></i>
                        <i className="fa-brands fa-instagram"></i>
                        <i className="fa-brands fa-twitter"></i>
                        <i className="fa-brands fa-facebook-f"></i>
                    </div>
                </main>
            </div>

            {/* AI Section */}
            <div className="text-white min-h-[30rem] py-8 lg:py-0 flex flex-row items-center">
                <div className="lg:w-3/5 lg:pl-40 px-4 lg:pr-16">
                    <h2 className="work-sans-bold text-[2.5rem] pb-4 font-bold">AI-Powered Stock Picking</h2>
                    <p className="work-sans-normal text-[1.2rem] pb-4">
                        Invest with the odds in your favor. Get unique insights, boost your portfolios, and make smart data-driven investment decisions.
                    </p>
                    <div className="flex flex-col lg:flex-row">
                        <div className="flex mb-4 lg:mb-0 flex-col work-sans-semibold justify-around h-[8rem] lg:w-[34%] lg:text-[1rem] font-bold mr-2">
                            <div><i className="fa-solid fa-star pr-2 text text-[.8rem]"></i>Popular stocks:</div>
                            <div><i className="fa-solid fa-medal pr-2 text text-[.8rem]"></i>Stocks ranking:</div>
                            <div><i className="fa-solid fa-images pr-2 text text-[.8rem]"></i>ETFs ranking:</div>
                            <div><i className="fa-solid fa-bullseye pr-2 text text-[.8rem]"></i>Trade Ideas:</div>
                        </div>
                        <div className="work-sans-normal text-[.9rem] py-1 underline">
                            <table>
                                <tbody>
                                    <tr className="flex text-sm lg:flex-row w-auto lg:w-[22rem] pb-2">
                                        <td className="pr-2 lg:px-3">Apple</td>
                                        <td className="items border-r border-l px-3">Tesla</td>
                                        <td className="items px-3 border-r">Amazon</td>
                                        <td className="items px-3 border-r">Microsoft</td>
                                        <td className="lg:pl-3">Alphabet</td>
                                    </tr>
                                    <tr className="flex pb-2">
                                        <td className="pr-2 lg:px-3">USA</td>
                                        <td className="items px-3 border-r border-l">Europe</td>
                                    </tr>
                                    <tr className="pr-2 lg:px-3 pb-2 block">
                                        <td>USA</td>
                                    </tr>
                                    <tr className="pr-2 lg:px-3 block">
                                        <td>USA</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {/* /AI Section */}

            {/* Carousel */}
            <div className="relative overflow-hidden lg:h-[24rem] w-full bg-white">
                <div className="flex transition-transform duration-500 ease-in-out"
                    style={{
                        transform: `translateX(-${currentSlide * 100}%)`,
                    }}
                >
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-full h-[33rem] lg:h-[24rem] flex flex-col justify-center items-center px-8 lg:px-44 text-black bg-white"
                            style={{ flexBasis: "100%" }} // Ensures each slide takes full width
                        >
                            <h2 className="work-sans-bold text-2xl pb-6 text-center text-[2.4rem] font-bold darkText">
                                What Our Users Say
                            </h2>
                            <p className="work-sans-normal pb-4 text-center">{slide.description}</p>
                            <h4 className="work-sans-bold font-bold text-gray-600">{slide.owner}</h4>
                        </div>
                    ))}
                </div>

                {/* Left and Right Controls */}
                <div
                    className="absolute left-20 z-30 hidden lg:block top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={handlePrev}
                >
                    <span className="bg-white border-black text-black px-4 py-3 rounded-full border">
                        <i className="fa-solid fa-angle-left"></i>
                    </span>
                </div>
                <div
                    className="absolute right-20 z-30 hidden lg:block top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={handleNext}
                >
                    <span className="bg-white border-black text-black px-4 py-3 border rounded-full">
                        <i className="fa-solid fa-angle-right"></i>
                    </span>
                </div>

                {/* Custom Navigation Dots */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`h-3 w-3 rounded-full ${currentSlide === index ? "bg-gray-700" : "bg-gray-300"
                                }`}
                        ></button>
                    ))}
                </div>
            </div>
            {/* Carousel */}

            {/* Data Analyzed */}
            <div className="lg:h-[30rem] px-3 lg:py-12 py-8">
                <div className="lg:w-1/2 lg:pl-32 lg:pr-4">
                    <h2 className="work-sans-semibold text-[2.2rem] pb-4 font-bold text-white">Data Analyzed to Calculate the AI Score</h2>
                    <div className="flex flex-row text pb-8 lg:pb-4">
                        <div>
                            <div className="work-sans-bold lg:text-[1.5rem] text-[1.2rem] font-bold">+900</div>
                            <div>Daily indicators per stock.</div>
                        </div>
                        <div className="border-r items border-t-0 border-b-0 border-l lg:pl-4 pl-2 border">
                            <div className="work-sans-bold lg:text-[1.5rem] text-[1.2rem] font-bold">+10,000</div>
                            <div>Daily features per stock.</div>
                        </div>
                        <div className="lg:pl-4 pl-2">
                            <div className="work-sans-bold lg:text-[1.5rem] text-[1.2rem] font-bold">+5 Billion</div>
                            <div>Features used to learn.</div>
                        </div>
                    </div>
                    <div className="text-gray-100">+600 technical, 150 fundamental, and 150 sentiment daily indicators per stock, processed into more than +10,000 daily features by our Artificial Intelligence.</div>
                    <button className="mt-12 py-3 lg:px-7 px-4 rounded-lg font-bold bg-gray-500 text-white">How it Works</button>
                </div>
            </div>
            {/* Data Analyzed */}

            {/* Use Cases */}
            <div className="bg-stone-100 py-4 lg:py-12">
                <h2 className="work-sans-bold text-[2.2rem] text-center darkText">Use Cases</h2>

                <div className="flex flex-col lg:flex-row pb-2">

                    <div className="lg:w-1/2 px-4 lg:pl-28 pt-8 lg:pt-16 pr-16">
                        <h4 className="darkText work-sans-bold lg:text-[1.5rem] text-[1.2rem] pb-4">Outperforming NIFTY 50</h4>
                        <div className="leading-6 pb-6 text-[.9rem] text-gray-800">We leverage AI to revolutionize investing. Our AI-powered strategies aim to consistently beat the Nifty 50 with our expected 25-30% returns by identifying undervalued stocks, mitigating risk through portfolio optimization, and capitalizing on market inefficiencies.  Additionally, we prioritize ethical and sustainable investing practices, ensuring long-term value creation.  By employing advanced algorithms and machine learning techniques, we analyze vast datasets, identify market trends, and make informed investment decisions. This data-driven approach allows us to uncover hidden opportunities and avoid potential pitfalls.</div>
                        <h5 className="darkText">See Today's Top Stock <i className="fa-solid fa-angle-right"></i> </h5>
                    </div>

                    <div className="lg:py-12 p-4 lg:px-10">
                        <div className="border-black bg-white p-4 flex justify-center lg:w-[30rem] rounded-md h-[22rem]">
                            <img className="h-full" src="../../../../services-graph.jpg" alt="" />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:pb-2">
                    <div className="lg:w-1/2 px-4 lg:pl-28 pt-10 pr-16">
                        <h4 className="darkText work-sans-bold lg:text-[1.5rem] text-[1.2rem] pb-4">Short-term high frequency trading
                        </h4>
                        <div className="leading-6 text-[.9rem] pb-6 text-gray-800">
                            <p>In the fast-paced world of finance, high-frequency trading (HFT) has revolutionized how markets operate. By leveraging sophisticated algorithms and powerful computing capabilities, HFT firms can execute trades in milliseconds, often capitalizing on minute price fluctuations. Now, with the AI, HFT is entering a new era of efficiency and profitability.
                            </p>
                            <p>
                                Our AI models are expected to yield a 45% return. trained on vast datasets of historical market data, can identify patterns and trends that are imperceptible to human traders. These models can quickly adapt to changing market conditions, enabling HFT firms to make split-second decisions with greater accuracy and speed. By automating various aspects of the trading process, AI can significantly reduce human error and reaction time, leading to higher returns.
                            </p>
                        </div>
                        <h5 className="darkText">See Today's Top Stock <i className="fa-solid fa-angle-right"></i> </h5>
                    </div>

                    <div className="lg:py-12 p-4 lg:px-10">
                    <div className="border-black bg-white p-4 flex justify-center lg:w-[30rem] rounded-md h-[22rem]">
                            <img className="h-full" src="../../../../high-frequency.jpg" alt="" />
                        </div>
                    </div>
                </div>

                <div className="flex justify-center">
                    <button className="text pt-3 text-[1.1rem] px-5 rounded-lg work-sans-regular text-gray-100 ">Join for Free and Create Your First Portfolio</button>
                </div>


            </div>
            {/* Use Cases */}

            {/* Services */}

            <div >
                <div className=" flex work-sans-bold text-white">
                    <div className="lg:px-32 px-4 py-12">
                        <h2 className="text-[2.2rem] pb-10">Services</h2>

                        <div className="flex items-start space-x-4 py-2 lg:pl-6">
                            <Brain className="h-6 w-6 mt-1 text-primary" />
                            <div className="space-y-2">
                                <h3 className="text-[1.3rem] font-bold">AI-Powered Investments</h3>
                                <p className="text-sm text-muted-foreground">
                                    Explain how AI identifies high-return opportunities.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4 py-2 lg:pl-6">
                            <PieChart className="h-6 w-6 mt-1 text-primary" />
                            <div className="space-y-2">
                                <h3 className="text-[1.3rem] font-bold">Portfolio Diversification</h3>
                                <p className="text-sm text-muted-foreground">
                                    Stocks, bonds, real estate, and alternative investments.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4 py-2 lg:pl-6">
                            <ShieldCheck className="h-6 w-6 mt-1 text-primary" />
                            <div className="space-y-2">
                                <h3 className="text-[1.3rem] font-bold">Risk Management</h3>
                                <p className="text-sm text-muted-foreground">
                                    Your innovative approach to balancing risks and returns.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4 py-2 lg:pl-6">
                            <Users className="h-6 w-6 mt-1 text-primary" />
                            <div className="space-y-2">
                                <h3 className="text-[1.3rem] font-bold">Customized Solutions</h3>
                                <p className="text-sm text-muted-foreground">
                                    Services tailored to retail and institutional investors.
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* <div className="lg:py-12 w-1/2 p-4 lg:px-10">
                        <div className="border-black bg-white p-4 flex justify-center lg:w-[30rem] rounded-md h-[22rem]">
                            <img className="h-full" src="../../../../services-graph.jpg" alt="" />
                        </div>
                    </div> */}
                </div>
            </div>

            {/* Services */}

            {/* About AI */}
            <div className="bg-white py-12">
                <h2 className="work-sans-bold text-[1.8rem] lg:text-[2.2rem] text-center darkText lg:px-36 pb-8 lg:pb-6">
                    Nobody can predict the future, but our Artificial Intelligence puts the odds in your favor
                </h2>
                <div className="text-black text-center lg:px-32">
                    <p>It is impossible to predict perfectly which stocks will beat the market, as stock prices and market behavior can be affected by multiple unpredictable events and forces. But we work hard to continuously improve our Artificial Intelligence capacity to detect trends, learn from past events, and achieve the highest possible alpha success rate.</p>
                    <p className="pt-6">Our data demonstrate that our AI models successfully separate, on average, the stocks that beat the market in the next 3 months from those that don't.</p>
                </div>
            </div>
            {/* About AI */}

            <div className="bg-stone-100 px-4 py-10">
                <h2 className="work-sans-bold pb-4 lg:pb-0 lg:px-48 text-[1.8rem] lg:text-[2.2rem] lg:text-center darkText">Start Making Smarter Investment Decisions</h2>
                <p className="lg:pb-6 lg:pl-56 text-[1rem]">Our AI-powered stock analytics platform will help you pick the best stocks and optimize your portfolios' performance.</p>
                <div className="flex lg:justify-center pt-4 lg:pt-0">
                    <button className="bg-gray-700 py-3 text-[1.1rem] px-5 rounded-lg work-sans-normal text-white ">Start Now</button>
                </div>
            </div>

            {/* Footer  */}
            <Footer />
            {/* Footer  */}

        </div>
    );
}
