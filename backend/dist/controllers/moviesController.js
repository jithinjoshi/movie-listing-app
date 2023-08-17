var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import genreOptions from "../model/genre.js";
import { Movie } from "../model/movie.js";
export const getMovies = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let page = req.query.page ? Number(req.query.page) - 1 : 0;
        let limit = req.query.limit ? Number(req.query.limit) : 5;
        let search = req.query.search || "";
        let sort = req.query.sort || "rating";
        let genre = [];
        if (req.query.genre === 'All') {
            genre = [...genreOptions];
        }
        else if (typeof req.query.genre === 'string') {
            genre = req.query.genre.split(",");
        }
        const sortParam = req.query.sort;
        sort = sortParam ? sortParam.split(",") : [sort];
        let sortBy = [sort[0], sort[1] || "asc"];
        if (sort[1]) {
            sortBy[sort[0]] = sort[1];
        }
        else {
            sortBy[sort[0]] = "asc";
        }
        const moviesQuery = Movie.find({ name: { $regex: search, $options: "i" } });
        if (genre.length > 0) {
            moviesQuery.where("genre").in(genre);
        }
        const movies = yield moviesQuery
            .sort([sortBy])
            .skip(page * limit)
            .limit(limit);
        const total = yield Movie.countDocuments(Object.assign({ name: { $regex: search, $options: "i" } }, (genre.length > 0 && { genre: { $in: genre } })));
        const response = {
            total,
            page: page + 1,
            limit,
            genres: genreOptions,
            movies
        };
        res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ err: error });
    }
}));
//insert movies
export const insertMovies = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movies = req.body;
        const docs = yield Movie.insertMany(movies);
        res.status(201).json(docs);
    }
    catch (error) {
        res.status(500).json({ err: error });
    }
}));
//get movies count
export const movieCount = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAllMovieCount = yield Movie.find({}).count();
        res.status(200).json({ count: getAllMovieCount });
    }
    catch (error) {
        res.status(500).json({ err: error });
    }
}));
//get genres count
export const genresCount = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getGenreCount = genreOptions.length;
        res.status(200).json({ count: getGenreCount });
    }
    catch (error) {
        res.status(500).json({ err: error });
    }
}));
export const genrePercentage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movies = yield Movie.aggregate([
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
        ]);
        res.status(200).json(movies);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ err: error });
    }
});
//# sourceMappingURL=moviesController.js.map