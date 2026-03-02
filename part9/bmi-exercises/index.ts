import express from "express";
import { calculateBmi } from "./bmiCalculator";

const app = express();
const PORT = 3003;

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
	} catch (error) {
		return res.status(500).json({ error: "An unexpected error occurred" });
	}
});
	

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
