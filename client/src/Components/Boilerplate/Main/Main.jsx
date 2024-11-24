import React, { useEffect, useRef, useState } from "react";
import './Main.css';
import ThreeDComponent from '../../Common/ThreeDComponent/ThreeDComponent';
import Nav from "../Nav/Nav";
import 'animate.css';
import { Carousel } from 'flowbite-react';

export default function Main() {
    const cursorRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [animate, setAnimate] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        { id: 1, owner: 'Garret S. - USA', description: "Danelfin is an extraordinary tool for checking out new investment ideas or to browse for new prospects. I have found more than a few big winners by browsing the top-ranked AI Scores, stocks I didn't find specifically mentioned on any other service. I routinely check the scores of my portfolio to know when to consider exiting an existing position or opening a new one." },
        { id: 2, owner: 'Guy R. - UK', description: "This an exceptionally powerful tool that allows one to understand what really drives a stock, generating actionable investment ideas often in surprising and counterintuitive ways, all presented clearly and coherently. The stellar performance of Danelfin's recommendations speaks for itself." },
        { id: 3, owner: 'Mario G. - Italy', description: "Danelfin AI can scout a comprehensive set of stocks and provides crucial information to support the decision-making process, which corroborate whatever short or long strategy you have in mind. I’ve checked Danelfin’s recommendations against my portfolio to know the results attest to its accuracy and outstanding performance. Of all the platforms I have evaluated, Danelfin is by far the most accurate and intuitive one." },
    ];

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
        <div style={{ backgroundColor: '#233253' }}>
            {/* Landing Page */}
            <div className="bg min-h-screen rounded-b-[3rem] overflow-hidden">
                <Nav />
                <main className="flex flex-col overflow-hidden lg:justify-around md:flex-row lg:flex-row">
                    <div className={`z-20 animate__animated animate__fadeInLeft md:h-full lg:h-screen text-white h-1/2 pt-8 px-4 md:w-2/3 lg:pt-16 lg:w-[80%] border}`}>
                        <h2 className="work-sans-regular lg:text-[3.5rem] lg:pt-12 leading-[4.1rem] text-4xl h-60 font-bold">
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

                    <div className="lg:w-[50%] w-auto md:h-screen lg:h-screen animate__animated animate__fadeInRight">
                        <ThreeDComponent />
                    </div>

                    <div
                        ref={cursorRef}
                        className={`cursor `}
                        style={{ transform: isHovering ? 'scale(6)' : 'scale(1)' }}
                    ></div>

                    <div className="socialLinks text-white flex flex-col h-40 absolute justify-around right-2 px-2 text-xl top-72 lg:top-96">
                        <i className="fa-brands fa-linkedin-in"></i>
                        <i className="fa-brands fa-instagram"></i>
                        <i className="fa-brands fa-twitter"></i>
                        <i className="fa-brands fa-facebook-f"></i>
                    </div>
                </main>
            </div>

            {/* AI Section */}
            <div className="text-white min-h-[30rem] flex flex-row items-center">
                <div className="w-3/5 pl-40 pr-16">
                    <h2 className="work-sans-bold text-[2.5rem] pb-4 font-bold">AI-Powered Stock Picking</h2>
                    <p className="work-sans-normal text-[1.2rem] pb-4">
                        Invest with the odds in your favor. Get unique insights, boost your portfolios, and make smart data-driven investment decisions.
                    </p>
                    <div className="flex flex-row">
                        <div className="flex flex-col work-sans-semibold justify-around h-[8rem] w-[34%] text-[1rem] font-bold mr-2">
                            <div><i className="fa-solid fa-star pr-2 text-blue-500 text-[.8rem]"></i>Popular stocks:</div>
                            <div><i className="fa-solid fa-medal pr-2 text-blue-500 text-[.8rem]"></i>Stocks ranking:</div>
                            <div><i className="fa-solid fa-images pr-2 text-blue-500 text-[.8rem]"></i>ETFs ranking:</div>
                            <div><i className="fa-solid fa-bullseye pr-2 text-blue-500 text-[.8rem]"></i>Trade Ideas:</div>
                        </div>
                        <div className="work-sans-normal text-[.9rem] py-1 underline">
                            <table>
                                <tbody>
                                    <tr className="flex flex-row w-[22rem] pb-2">
                                        <td className="px-3">Apple</td>
                                        <td className="items border-r border-l px-3">Tesla</td>
                                        <td className="items px-3 border-r">Amazon</td>
                                        <td className="items px-3 border-r">Microsoft</td>
                                        <td className="pl-3">Alphabet</td>
                                    </tr>
                                    <tr className="flex pb-2">
                                        <td className="px-3">USA</td>
                                        <td className="items px-3 border-r border-l">Europe</td>
                                    </tr>
                                    <tr className="px-3 pb-2 block">
                                        <td>USA</td>
                                    </tr>
                                    <tr className="px-3 block">
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
            <div className="relative h-[24rem] w-full bg-white">
                <Carousel indicators={false}
                    onSlideChange={(index) => setCurrentSlide(index)}
                    leftControl={
                        <div className="absolute left-20 top-1/2 transform -translate-y-1/2 cursor-pointer">
                            <span className="bg-white border-black text-black px-4 py-3 rounded-full border">
                                <i className="fa-solid fa-angle-left"></i>
                            </span>
                        </div>
                    }
                    rightControl={
                        <div className="absolute right-20 top-1/2 transform -translate-y-1/2 cursor-pointer">
                            <span className="bg-white border-black text-black px-4 py-3 border rounded-full">
                                <i className="fa-solid fa-angle-right"></i>
                            </span>
                        </div>
                    }
                >
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className="w-dvw h-[24rem] flex flex-col justify-center items-center px-44 text-black bg-white"
                        >
                            <h2 className="work-sans-bold text-2xl pb-6 text-[2.4rem] text-sky-600 font-bold">
                                What Our Users Say
                            </h2>
                            <p className="work-sans-normal pb-4 text-center">{slide.description}</p>
                            <h4 className="work-sans-bold font-bold text-gray-600">{slide.owner}</h4>
                        </div>
                    ))}
                </Carousel>

                {/* Custom Navigation Dots */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)} // Change slide on click
                            className={`h-3 w-3 mb-8  rounded-full ${currentSlide === index ? "bg-blue-500" : "bg-gray-300"
                                }`}
                        ></button>
                    ))}
                </div>
            </div>
            {/* Carousel */}

            {/* Data Analyzed */}
            <div className="h-[30rem] py-12">
                <div className="w-1/2 pl-32 pr-4">
                    <h2 className="work-sans-semibold text-[2.2rem] pb-4 font-bold text-white">Data Analyzed to Calculate the AI Score</h2>
                    <div className="flex flex-row text-sky-600 pb-4">
                        <div>
                            <div className="work-sans-bold text-[1.5rem] font-bold">+900</div>
                            <div>Daily indicators per stock.</div>
                        </div>
                        <div className="border-r items border-t-0 border-b-0 border-l pl-4 border">
                            <div className="work-sans-bold text-[1.5rem] font-bold">+10,000</div>
                            <div>Daily features per stock.</div>
                        </div>
                        <div className="pl-4">
                            <div className="work-sans-bold text-[1.5rem] font-bold">+5 Billion</div>
                            <div>Features used to learn.</div>
                        </div>
                    </div>
                    <div className="text-gray-100">+600 technical, 150 fundamental, and 150 sentiment daily indicators per stock, processed into more than +10,000 daily features by our Artificial Intelligence.</div>
                    <button className="mt-12 py-3 px-7 rounded-lg font-bold bg-sky-600 text-white">How it Works</button>
                </div>
            </div>
            {/* Data Analyzed */}

            {/* Use Cases */}
            <div className="bg-stone-100 py-12">
                <h2 className="work-sans-bold text-[2.2rem] text-center text-sky-600">Use Cases</h2>

                <div className="flex flex-row pb-2">

                    <div className="w-1/2 pl-28 pt-28 pr-16">
                        <h4 className="text-sky-600 work-sans-bold text-[1.5rem] pb-4">Pick the Winners. Avoid the Losers</h4>
                        <div className="leading-6 pb-6 text-gray-800">Since 2017, US-listed stocks with the highest AI Score (10/10) outperformed the market by +14.69% on average after 3 months (annualized alpha), while stocks with the lowest AI Score (1/10) underperformed the market by -37.38% on average (annualized alpha).</div>
                        <h5 className="text-sky-700">See Today's Top Stock <i className="fa-solid fa-angle-right"></i> </h5>
                    </div>

                    <div className="py-12 px-10">
                        <div className="border-black bg-white w-[30rem] rounded-md h-[22rem]"></div>
                    </div>
                </div>

                <div className="flex flex-row pb-2">
                    <div className="w-1/2 pl-28 pt-28 pr-16">
                        <h4 className="text-sky-600 work-sans-bold text-[1.5rem] pb-4">Pick the Winners. Avoid the Losers</h4>
                        <div className="leading-6 pb-6 text-gray-800">Since 2017, US-listed stocks with the highest AI Score (10/10) outperformed the market by +14.69% on average after 3 months (annualized alpha), while stocks with the lowest AI Score (1/10) underperformed the market by -37.38% on average (annualized alpha).</div>
                        <h5 className="text-sky-700">See Today's Top Stock <i className="fa-solid fa-angle-right"></i> </h5>
                    </div>

                    <div className="py-12 px-10">
                        <div className="border-black bg-white w-[30rem] rounded-md h-[22rem]"></div>
                    </div>
                </div>

                <div className="flex flex-row pb-2">
                    <div className="w-1/2 pl-28 pt-28 pr-16">
                        <h4 className="text-sky-600 work-sans-bold text-[1.5rem] pb-4">Pick the Winners. Avoid the Losers</h4>
                        <div className="leading-6 pb-6 text-gray-800">Since 2017, US-listed stocks with the highest AI Score (10/10) outperformed the market by +14.69% on average after 3 months (annualized alpha), while stocks with the lowest AI Score (1/10) underperformed the market by -37.38% on average (annualized alpha).</div>
                        <h5 className="text-sky-700">See Today's Top Stock <i className="fa-solid fa-angle-right"></i> </h5>
                    </div>

                    <div className="py-12 px-10">
                        <div className="border-black bg-white w-[30rem] rounded-md h-[22rem]"></div>
                    </div>
                </div><div className="flex flex-row pb-2">
                    <div className="w-1/2 pl-28 pt-28 pr-16">
                        <h4 className="text-sky-600 work-sans-bold text-[1.5rem] pb-4">Pick the Winners. Avoid the Losers</h4>
                        <div className="leading-6 pb-6 text-gray-800">Since 2017, US-listed stocks with the highest AI Score (10/10) outperformed the market by +14.69% on average after 3 months (annualized alpha), while stocks with the lowest AI Score (1/10) underperformed the market by -37.38% on average (annualized alpha).</div>
                        <h5 className="text-sky-700">See Today's Top Stock <i className="fa-solid fa-angle-right"></i> </h5>
                    </div>

                    <div className="py-12 px-10">
                        <div className="border-black bg-white w-[30rem] rounded-md h-[22rem]"></div>
                    </div>
                </div>


                <div className="flex flex-row pb-2">
                    <div className="w-1/2 pl-28 pt-28 pr-16">
                        <h4 className="text-sky-600 work-sans-bold text-[1.5rem] pb-4">Pick the Winners. Avoid the Losers</h4>
                        <div className="leading-6 pb-6 text-gray-800">Since 2017, US-listed stocks with the highest AI Score (10/10) outperformed the market by +14.69% on average after 3 months (annualized alpha), while stocks with the lowest AI Score (1/10) underperformed the market by -37.38% on average (annualized alpha).</div>
                        <h5 className="text-sky-700">See Today's Top Stock <i className="fa-solid fa-angle-right"></i> </h5>
                    </div>

                    <div className="py-12 px-10">
                        <div className="border-black bg-white w-[30rem] rounded-md h-[22rem]"></div>
                    </div>
                </div>

                <div className="flex flex-row pb-2">
                    <div className="w-1/2 pl-28 pt-28 pr-16">
                        <h4 className="text-sky-600 work-sans-bold text-[1.5rem] pb-4">Pick the Winners. Avoid the Losers</h4>
                        <div className="leading-6 pb-6 text-gray-800">Since 2017, US-listed stocks with the highest AI Score (10/10) outperformed the market by +14.69% on average after 3 months (annualized alpha), while stocks with the lowest AI Score (1/10) underperformed the market by -37.38% on average (annualized alpha).</div>
                        <h5 className="text-sky-700">See Today's Top Stock <i className="fa-solid fa-angle-right"></i> </h5>
                    </div>

                    <div className="py-12 px-10">
                        <div className="border-black bg-white w-[30rem] rounded-md h-[22rem]"></div>
                    </div>
                </div>

                <div className="flex justify-center">
                    <button className="bg-sky-600 py-3 text-[1.1rem] px-5 rounded-lg work-sans-regular text-gray-100 ">Join for Free and Create Your First Portfolio</button>
                </div>

            </div>
            {/* Use Cases */}

            {/* About AI */}
            <div className="bg-white py-12">
                <h2 className="work-sans-bold text-[2.2rem] text-center text-sky-600 px-36 pb-6">
                    Nobody can predict the future, but our Artificial Intelligence puts the odds in your favor
                </h2>
                <div className="text-black text-center px-32">
                    <p>It is impossible to predict perfectly which stocks will beat the market, as stock prices and market behavior can be affected by multiple unpredictable events and forces. But we work hard to continuously improve our Artificial Intelligence capacity to detect trends, learn from past events, and achieve the highest possible alpha success rate.</p>
                    <p className="pt-6">Our data demonstrate that our AI models successfully separate, on average, the stocks that beat the market in the next 3 months from those that don't.</p>
                </div>
            </div>
            {/* About AI */}

            <div className="bg-stone-100 py-10">
                <h2 className="work-sans-bold px-48 text-[2.2rem] text-center text-sky-600">Start Making Smarter Investment Decisions</h2>
                <p className="pb-6 pl-56 text-[1rem]">Our AI-powered stock analytics platform will help you pick the best stocks and optimize your portfolios' performance.</p>
                <div className="flex justify-center">
                    <button className="bg-sky-600 py-3 text-[1.1rem] px-5 rounded-lg work-sans-normal text-gray-100 ">Start Now</button>
                </div>
            </div>



        </div>
    );
}
