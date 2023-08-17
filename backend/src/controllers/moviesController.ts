import { Request, Response } from "express";
import genreOptions from "../model/genre.js";
import { Movie } from "../model/movie.js";

export const getMovies = (async (req: Request, res: Response) => {
    try {
        let page: number = req.query.page ? Number(req.query.page) - 1 : 0;
        let limit: number = req.query.limit ? Number(req.query.limit) : 5;
        let search = req.query.search || "";
        let sort: any = req.query.sort || "rating";
        let genre: string[] = [];

        if (req.query.genre === 'All') {
            genre = [...genreOptions];
        } else if (typeof req.query.genre === 'string') {
            genre = req.query.genre.split(",");
        }

        const sortParam = req.query.sort as string;
        sort = sortParam ? sortParam.split(",") : [sort];

        let sortBy: [string, "asc" | "desc"] = [sort[0], sort[1] || "asc"];

        if (sort[1]) {
            sortBy[sort[0]] = sort[1];
        } else {
            sortBy[sort[0]] = "asc";
        }

        const moviesQuery = Movie.find({ name: { $regex: search, $options: "i" } });

        if (genre.length > 0) {
            moviesQuery.where("genre").in(genre);
        }

        const movies = await moviesQuery
            .sort([sortBy])
            .skip(page * limit)
            .limit(limit);

        const total = await Movie.countDocuments({
            name: { $regex: search, $options: "i" },
            ...(genre.length > 0 && { genre: { $in: genre } }),
        });

        const response = {
            total,
            page: page + 1,
            limit,
            genres: genreOptions,
            movies
        };
        res.status(200).json(response);

    } catch (error) {
        console.log(error)
        res.status(500).json({ err: error });
    }
});

//insert movies
export const insertMovies = (async (req: Request, res: Response) => {
    try {
        const movies = req.body;
        const docs = await Movie.insertMany(movies);
        res.status(201).json(docs);

    } catch (error) {
        res.status(500).json({ err: error });
    }
});

//get movies count
export const movieCount = (async (req:Request, res : Response)=>{
    try {
        const getAllMovieCount : number = await Movie.find({}).count();
        res.status(200).json({count : getAllMovieCount})
    } catch (error) {
        res.status(500).json({err:error})
        
    }
})

//get genres count
export const genresCount = (async(req:Request, res : Response) =>{
    try {
        const getGenreCount : number = genreOptions.length;
        res.status(200).json({count : getGenreCount})
    } catch (error) {
        res.status(500).json({err:error})
        
    }
})

export const genrePercentage = async(req : Request, res : Response) => {
    try {
        const movies = await Movie.aggregate([
            {
              $unwind: "$genre"
            },
            {
              $group: {
                _id: "$genre",
                count: { $sum: 1 }
              }
            },
            {
              $sort: { count: -1 } // Sort genres by movie count in descending order
            },
            {
              $group: {
                _id: null,
                totalMovies: { $sum: "$count" },
                genres: { $push: "$$ROOT" }
              }
            },
            {
              $unwind: "$genres"
            },
            {
              $project: {
                genre: "$genres._id",
                percentage: { $multiply: [{ $divide: ["$genres.count", "$totalMovies"] }, 100] }
              }
            }
          ])
          res.status(200).json(movies)
    } catch (error) {
        console.log(error)
        res.status(500).json({err:error})
        
    }
}
