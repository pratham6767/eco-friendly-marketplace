import { Schema, model } from "mongoose";

// Define the RatingAndReview schema
const ratingAndReviewSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "User",
	},
	rating: 
	{ 
		type: Number, 
		min: 1, 
		max: 5, 
		required: true 
	},
	review: {
		type: String,
		required: true,
	},
	product: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "products",
	},
	review_date: 
	{ 
		type: Date,
		default: Date.now 
	}
});
export default model("RatingAndReview",ratingAndReviewSchema);

