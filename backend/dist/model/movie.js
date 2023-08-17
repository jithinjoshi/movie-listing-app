import mongoose from "mongoose";
const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    genre: {
        type: [String],
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
});
export const Movie = mongoose.model('Movie', movieSchema);
//# sourceMappingURL=movie.js.map