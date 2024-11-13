import "./home.css"
import { tabs } from "./tabs"
import React, { useState } from 'react'
import Image from "../../assets/logo-nobg.png"

export default function Home() {
    return (<VerticalTabs tabs={tabs} />)
}

const VerticalTabs = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(0);
    const handleClick = (index) => { setActiveTab(index); };
    return (
        <div className="vertical-tabs text-lg">
            <div className="tab-list bg-purple-100">
                <div className="justify-between">
                    <div className="w-full px-3.5 py-7">
                        <img src={Image} alt="" className="w-full h-12" />
                    </div>
                    <div className="py-7">
                        {tabs.map((tab, index) => (
                            <div key={index} className={`tab-item p-5 hover:bg-purple-300 ${index === activeTab ? 'active bg-purple-500 border-r-8 border-purple-600 font-bold' : ''}`} onClick={() => handleClick(index)}>
                                <span className="tab-icon">{tab.icon}</span>
                                <span className="tab-text px-2">{tab.label}</span>
                            </div>

                        ))}
                    </div>
                    <div></div>
                </div>
            </div>
            <div className="tab-content">{tabs[activeTab].content}</div>
        </div>
    );
};