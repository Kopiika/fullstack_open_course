export const calculateBmi = (height: number, weight: number): string => {
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

// (require.main === module) means that the script is being run if the file is launched directly → execute CLI code; if the file is imported → CLI code is NOT executed.
	if (require.main === module) {
    try {
      const args = process.argv.slice(2);

      if (args.length !== 2) {
        throw new Error("Please provide height and weight");
      }

      const height = Number(args[0]);
      const weight = Number(args[1]);

      if (isNaN(height) || isNaN(weight)) {
        throw new Error("Provided values were not numbers!");
      }

      console.log(calculateBmi(height, weight));
    } catch (error: unknown) {
      let message = "Something went wrong: ";
      if (error instanceof Error) {
        message += error.message;
      }
      console.log(message);
    }
  }


