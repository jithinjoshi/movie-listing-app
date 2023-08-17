import axios from "./axiosInstance"

export function getMovies(page, sort, filterGenre, search) {
    return new Promise((resolve, reject) => {
        axios.get(`/movie/?page=${page}&sort=${sort?.sort},${sort?.order
            }&genre=${filterGenre.toString()}&search=${search}`).then((data) => {
                resolve(data)
            }).catch((err) => {
                reject(err)
            })

    })


}

export function getMoviesCount() {
    return new Promise((resolve, reject) => {
        axios.get('/movie/getmoviesCount').then((data) => {
            resolve(data)
        }).catch((err) => {
            reject(err)
        })
    })
}

export function getGenresCount() {
    return new Promise((resolve, reject) => {
        axios.get('/movie/genresCount').then((data) => {
            resolve(data)
        }).catch((err) => {
            reject(err)
        })

    })


}

export function getUserCount() {
    return new Promise((resolve, reject) => {
        axios.get('/auth/getUsers').then((data) => {
            resolve(data)
        }).catch((err) => {
            reject(err)
        })

    })


}

export function getGenrePercentage(){
    return new Promise((resolve,reject) =>{
        axios.get('/movie/genrePercentage').then((data)=>{
            resolve(data)
        }).catch((err)=>{
            reject(err)
        })
    })
}

export function logoutUser() {
    return new Promise((resolve, reject) => {
        axios.get('/auth/signout').then((data) => {
            resolve(data)
        }).catch((err) => {
            reject(err)
        })
    })
}