import { useState } from "react";


const Toggle = () => {

    const [currentInterval, setCurrentInterval] = useState("1-month");
    const [active, setActive] = useState(false);

    const intervals = [
        "1-month", 
        "1-year",
    ]


    return <>
    
        <div className="flex justify-center	 lg:p-0 ">
            <div className={`toggle-container ${active ? "active" : ""}  `}>
                {intervals.map((interval, idx) => {
                    return (
                        <div className="btn">
                            <button key={idx} type="button" onClick={() => {
                                setCurrentInterval(interval)
                                setActive(!active)
                            }}>
                                {interval}
                            </button>
                        </div>
                    
                    )
                })}
            </div>
        </div>

  
    
    </>
}

export default Toggle;