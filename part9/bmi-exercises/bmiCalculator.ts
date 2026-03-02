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

try {
  console.log(calculateBmi(180, 74)); 
} catch (error: unknown) {
  let errorMessage = "Something went wrong: ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}



