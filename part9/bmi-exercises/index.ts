import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
const PORT = 3003;
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
	const height = Number(req.query.height);
	const weight = Number(req.query.weight);
	if (!req.query.height || !req.query.weight) {
		return res.status(400).json({ error: "Missing height or weight query parameter" });
	}
	if (isNaN(height) || isNaN(weight)) {
		return res.status(400).json({ error: "Height and weight must be numbers" });
	}
	try {
		const bmi = calculateBmi(height, weight);
		return res.json({
			height,
			weight,
			bmi
		});
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error(error.message);
		}
		return res.status(500).json({ error: "An unexpected error occurred" });
	}
});

app.post("/exercises", (req, res) => {
	const { daily_exercises, target } = req.body as any;
	if (target === undefined || daily_exercises === undefined) {
    return res.status(400).json({ error: "parameters missing" });
  }
	if (
    typeof target !== "number" ||
    !Array.isArray(daily_exercises) ||
    !daily_exercises.every((exercise) => typeof exercise === "number")
  ) {
    return res.status(400).json({ error: "malformatted parameters" });
  }
	
	try {
		const result = calculateExercises(daily_exercises, target);
		return res.json(result);
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error(error.message);
		}
		return res.status(500).json({ error: "An unexpected error occurred" });
	}
});


	
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
