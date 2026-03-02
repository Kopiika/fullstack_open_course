const calculateBmi = (height: number, weight: number): string => {
	const heightInMeters = height / 100;
	const bmi = weight / (heightInMeters * heightInMeters);

	if (bmi < 18.5) {
		return "Underrange";
	} else if (bmi >= 18.5 && bmi < 24.9) {
		return "Normal range";
	} else if (bmi >= 25 && bmi < 29.9) {
		return "Overrange";
	} else if (bmi >= 30) {
		return 'Obese';
	} else {
		return 'Invalid input';
	}
};


// Arguments parsing
// The first two elements of process.argv are the path to the node executable and the path to the script file, so we start from index 2

const args = process.argv.slice(2);
if (args.length < 2) {
  console.log("Please provide both height and weight as arguments.");
  process.exit(1);
} else if (args.length > 2) 

try {
  const height: number = Number(process.argv[2]);
	const weight: number = Number(process.argv[3]);
	if (isNaN(height) || isNaN(weight)) {
    throw new Error("Provided values were not numbers!");
	}
	console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = "Something went wrong: ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}

module.exports = { calculateBmi };


