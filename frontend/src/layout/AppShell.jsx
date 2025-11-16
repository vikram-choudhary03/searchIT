import { Navbar } from "../components/Navbar";
import Sidebar from "../components/Sidebar";



export default function AppShell ({children}){

    return (
        <div className="min-h-screen flex">

            <Sidebar/>
            <div className="flex-1 flex flex-col">
                <Navbar/>
                <main className="p-6 w-full overflow-auto">{children}</main>
            </div>
        </div>
    )
}