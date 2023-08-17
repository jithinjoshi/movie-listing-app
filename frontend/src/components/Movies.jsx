import { useEffect, useState } from "react";
import { getMovies } from "../api/endPoints";
import Navbar from "./Navbar";
import { Table } from "./Table";
import Filter from "./Filter";
import Nodata from "./NoData";
import Sort from "./Sort";

const Movies = () => {
    const [obj, setObj] = useState({});
    const [sort, setSort] = useState({ sort: "rating", order: "desc" });
    const [filterGenre, setFilterGenre] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    useEffect(() => {
        getMovies(page, sort, filterGenre?.length > 0 ? filterGenre : 'All', search?.length > 0 ? search : '').then((data) => {
            setObj(data)
        }).catch((err) => {
            console.log(err)
        })
    }, [sort, filterGenre, page, search])
    return (





        <div className="flex flex-wrap">

            <Navbar setSearch={setSearch} />
            <div className="w-full md:w-1/4 p-4">
                <Filter filterGenre={filterGenre}
                    genres={obj.genres ? obj.genres : []}
                    setFilterGenre={(genre) => setFilterGenre(genre)} />

                <div className="pt-5">
                    <Sort sort={sort} setSort={(sort) => setSort(sort)} />
                </div>

            </div>

            <div className="w-full md:w-3/4 p-4">
                {
                    obj?.data?.movies.length > 0 ? <Table obj={obj?.data?.movies} page={page} limit={obj.limit ? obj.limit : 0} total={obj.total ? obj.total : 0} setPage={(page) => setPage(page)} /> : <Nodata />
                }

            </div>
        </div>
    )
}

export default Movies