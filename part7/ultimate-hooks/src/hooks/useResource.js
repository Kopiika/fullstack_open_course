import { useState, useEffect } from 'react'
import axios from 'axios'

const useResource = (baseUrl) => {
	const [resources, setResources] = useState([])
 
	useEffect(() => {
	  axios.get(baseUrl)
		.then(response => {
		  setResources(response.data)
		})
	}, [baseUrl])
 
	const create = (resource) => {
	  axios.post(baseUrl, resource)
		.then(response => {
		  setResources(prev => prev.concat(response.data))
		})
	}

	/*const update = (id, resource) => {
	  axios.put(`${baseUrl}/${id}`, resource)
		.then(response => {
		  setResources(prev => prev.map(r => r.id !== id ? r : response.data))
		})
	}*/
 
	const service = {
	  create
	  //update
	}
 
	return [
	  resources, service
	]
 }

 export default useResource