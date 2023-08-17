import mongoose, { Document } from "mongoose";

interface MovieDocument extends IMOvies, Document {}


const movieSchema = new mongoose.Schema<MovieDocument>({
    name : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    year : {
        type : Number,
        required : true
    },
    genre : {
        type: [String],
        required : true
    },
    rating : {
        type : Number,
        required : true
    }
}
)

export const Movie = mongoose.model<MovieDocument>('Movie', movieSchema)