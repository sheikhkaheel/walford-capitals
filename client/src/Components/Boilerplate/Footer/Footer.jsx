export default function Footer() {
    return (
        <footer className="text-white bg-stone-100">
            <div className="rounded-t-[3rem] flex lg:flex-row flex-col py-8 px-2 lg:py-16 lg:px-12 lg:h-[30rem]" style={{ backgroundColor: '#333333' }}>
                <div className="lg:w-1/2 flex flex-col px-4 justify-center">
                    <div className="pb-8 flex justify-between w-[20rem]">
                        <img className="w-20 h-10 mt-1.5" src=".../../../Logo.png" alt="" />
                        <div>
                            <div className="flex justify-between lg:w-52">
                                <h2 className="text-[1.25rem] work-sans-semibold">Walford Capitals</h2>
                            </div>
                            <p className="text-[.8rem]">smart investment made easy</p>
                        </div>
                    </div>

                    <div className="text-gray-400 text-[.9rem] leading-[1.4rem] lg:w-[28rem] pb-10">
                        Walford Capitals is a stock analytics platform powered by AI. It helps investors to pick the best stocks, optimize their portfolios, and make smart data-driven investment decisions.
                    </div>

                    <div className="flex lg:flex-row flex-col items-center gap-4 text-gray-400">
                        <div className="flex flex-col lg:w-56">
                            <div className="flex">
                                {/* <div>flag</div> */}
                                <div className="font-bold">BCN</div>
                            </div>
                            <div className="text-[.82rem] leading-6">
                                <span className="font-bold">Walford Capitals, LLC </span> Via Augusta 200, 3rd Floor
                                08021, Barcelona, Spain
                            </div>
                        </div>

                        <div className="flex lg:flex-row flex-col lg:w-48">
                            <div className="flex">
                                {/* <div>flag</div> */}
                                <div className="font-bold">NYC</div>
                            </div>
                            <div className="text-[.82rem] leading-6">
                                <span className="font-bold">Walford Capitals, S.L. </span>
                                655 3rd Avenue Suite 1830
                                New York, USA
                            </div>
                        </div>
                    </div>


                </div>

                <div className="lg:w-1/2 py-4 lg:py-0">
                    <div className="lg:h-28 lg:pl-20 flex gap-2 text-gray-400">
                        <input type="checkbox" className="rounded-sm mt-1 bg-gray-300" />
                        <p className="work-sans-normal text-sm">
                            If you would like us to no longer continue to stop not sending you special deals and offers every week, please indicate  you are inclined to yes by not checking the box
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}