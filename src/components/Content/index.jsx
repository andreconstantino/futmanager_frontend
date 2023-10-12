import { Card } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function Content() {
    return(
        <div className="block bg-gray-100 w-full min-h-screen p-5">
            <Card className="w-full h-full flex flex-col">
                <Outlet/>    
            </Card>
        </div>
    )
}