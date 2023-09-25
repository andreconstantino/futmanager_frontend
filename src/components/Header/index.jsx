import User from "../Header/User"


export default function Header(){
    return (
        <div className=" bg-white h-16 w-full shadow-md flex justify-end">
              <div className="p-3">
                <User />
              </div>
        </div>
    )
}