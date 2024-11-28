export default function Footer() {
    return (
        <footer className="text-white bg-stone-100">
            <div className="rounded-t-[3rem] py-16 px-12 h-[30rem]" style={{ backgroundColor: '#333333' }}>
                <div className="w-1/2">
                    <div className="pb-8 flex justify-between w-[20rem]">
                        <img className="w-20 h-10 mt-1.5" src=".../../../Logo.png" alt="" />
                        <div>
                            <div className="flex justify-between w-52">
                                <h2 className="text-[1.25rem] work-sans-semibold">Walford Capitals</h2>
                            </div>
                            <p className="text-[.8rem]">smart investment made easy</p>
                        </div>
                    </div>

                    <div className="text-gray-400 text-[.9rem] leading-[1.4rem] w-[28rem] pb-10">
                        Danelfin is a stock analytics platform powered by AI. It helps investors to pick the best stocks, optimize their portfolios, and make smart data-driven investment decisions.
                    </div>

                    <div className="flex gap-4 text-gray-400">
                        <div className="flex flex-col w-56">
                            <div className="flex">
                                {/* <div>flag</div> */}
                                <div className="font-bold">BCN</div>
                            </div>
                            <div className="text-[.82rem] leading-6">
                                <span className="font-bold">Walford Capitals, LLC </span> Via Augusta 200, 3rd Floor
                                08021, Barcelona, Spain
                            </div>
                        </div>

                        <div className="flex flex-col w-48">
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

                <div className="w-1/2">

                </div>
            </div>
        </footer>
    )
}