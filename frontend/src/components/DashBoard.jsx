
import UsersCount from './UsersCount'
import Report from './Report'
import Navbar from './Navbar'




const DashBoard = () => {

    
    return (
        <>
            <div>
                <Navbar/>
                <div className="flex overflow-hidden bg-white pt-16">
                    <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"></div>
                    <div id="main-content" className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
                        <main>
                            <div className="pt-6 px-4">

                                <UsersCount/>
                                <div className="grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-4">
                                    <Report/>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashBoard