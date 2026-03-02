interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseInput {
  dailyExercises: number[];
  target: number;
}

// Arguments parsing
const parseArguments = (args: string[]): ExerciseInput => {
	if (args.length < 4) {
		throw new Error("Not enough arguments");
	}

	const target = Number(args[2]);
  if (isNaN(target)) {
    throw new Error("Target value is not a number!");
  }
	
	const dailyExercises = args.slice(3).map(arg => {
		if (isNaN(Number(arg))) {
			throw new Error("Provided values were not numbers!");
		}
		return Number(arg);
	});

	return {
		dailyExercises,
		target
	};
};

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
	const { dailyExercises, target } = parseArguments(process.argv);
	const result = calculateExercises(dailyExercises, target);
	console.log(result);
} catch (error: unknown) {
	let errorMessage = "Something went wrong.";
	if (error instanceof Error) {
		errorMessage += " Error: " + error.message;
	}
	console.log(errorMessage);
}

module.exports = { calculateExercises };
