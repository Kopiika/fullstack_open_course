interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (dailyExercises: number[], target: number): Result => {
	const periodLength = dailyExercises.length;
	const trainingDays = dailyExercises.filter(d => d > 0).length;
	const totalHours = dailyExercises.reduce((sum, day) => sum + day, 0);
	const average = totalHours / periodLength;
	const success = average >= target;

	let rating: number;
	let ratingDescription: string;

	if (average >= target) {
		rating = 3;
		ratingDescription = "Great job! You've met your target.";
	} else if (average >= target * 0.75) {
		rating = 2;
		ratingDescription = "Not bad, but there's room for improvement.";
	} else {
		rating = 1;
		ratingDescription = "You need to work harder to meet your target.";
	}

	return {
		periodLength,
		trainingDays,
		success,
		rating,
		ratingDescription,
		target,
		average
	};
};
 
try {
	console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
} catch (error: unknown) {
	let errorMessage = "Something went wrong.";
	if (error instanceof Error) {
		errorMessage += " Error: " + error.message;
	}
	console.log(errorMessage);
}