import React from 'react'

const Dashboard = () => {
    return (
        <div className='dashboard px-10 bg-[#f7f6fb]'>

            <div className="dashboard__container bg-[#1e1655] -mx-10 px-10">
                <h1 className='text-4xl text-white py-10'>Good Morning, Abhi</h1>
            </div>

            <div className="widgets__container bg-none relative">
                <div className="cards w-full flex flex-row gap-x-10 absolute -top-10">

                    <div className="w-40 h-60 bg-[#d1eee8]"></div>

                    <div className="w-40 h-60 bg-[#d1eee8]"></div>

                    <div className="w-40 h-60 bg-[#d1eee8]"></div>

                    <div className="w-40 h-60 bg-[#d1eee8]"></div>
                </div>
            </div>

            <div className="graphs__container">

            </div>

        </div>
    )
}

export default Dashboard