import { Outlet } from "react-router"

export default function Section(){
    return(
        <div className="bg-gray-100 w-full h-screen">
            <Outlet />
        </div>
    )
}