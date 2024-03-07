import {useState} from 'react'

export default function Navigator() {
    const [modeswitch,setMode] = useState(true)
    return(
        <nav className=" flex flex-row h-20 w-screen bg-black align-middle p-5 justify-center">
            <h1 className=" text-white font-gloock" onClick={()=>setMode(prev =>!prev)}>
                <div  className="text-[60px] mt-[-25px] mx-[-12px]">
                {modeswitch ? "MOVIES":"GAMES"}
                </div>
                </h1>
        </nav>
    )
}