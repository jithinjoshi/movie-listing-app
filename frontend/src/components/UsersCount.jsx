import { useEffect, useState } from "react"
import { getGenresCount, getMoviesCount, getUserCount } from "../api/endPoints";

const UsersCount = () => {
    const [users,setUsers] = useState(0);
    const [movies,setMovies] = useState(0);
    const [genres,setGenres] = useState(0)

    useEffect(()=>{
        getMoviesCount().then((count)=>{
            setMovies(count?.data?.count)
        }).catch((err)=>{
            return err
        });

        getGenresCount().then((count)=>{
            setGenres(count?.data?.count)
        }).catch((err)=>{
            return err;
        });

        getUserCount().then((count)=>{
            setUsers(count?.data?.count)
        }).catch((err)=>{
            return err;
        })


    },[])
  return (
    <>
        <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                                    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">{movies}</span>
                                                <h3 className="text-base font-normal text-gray-500">Movies</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">{genres}</span>
                                                <h3 className="text-base font-normal text-gray-500">Genres</h3>
                                            </div>
                                        </div>
                                    </div> 
                                    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">{users}</span>
                                                <h3 className="text-base font-normal text-gray-500">Users</h3>
                                            </div>
                                        </div>
                                    </div>

                                    

                                </div>
    </>
  )
}

export default UsersCount