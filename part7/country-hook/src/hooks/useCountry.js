import { useState, useEffect } from "react";

export const useCountry = (name) => {
	const [country, setCountry] = useState(null)

	useEffect(() => {
		if (!name) {
			setCountry(null)
			return
		}
		
		const fetchCountry = async () => {
			try {
				const response = await fetch(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
				if (!response.ok) {
					setCountry({ found: false })
					return
				}
				const data = await response.json()
				setCountry({ found: true, data })
			} catch (error) {
				setCountry({ found: false })
			}
		}
		fetchCountry()
	}, [name])

	return country
};

export default useCountry;