import Papa from 'papaparse';

export function getLightData() {
	return new Promise((resolve, reject) => {
		try {
			var dataPath = require(process.env.REACT_APP_LIGHT_DATA_PATH);
			Papa.parse(dataPath, {
				header: true,
				download: true,
				skipEmptyLines: true,
				complete: results => {
					var heatmapData = [];
					for (var obj in results.data) {
						heatmapData.push({ x: results.data[obj]['lat'], y: results.data[obj]['lon'], z: results.data[obj]['nelm'] });
					}
					resolve(heatmapData);
				},
				error: (error) => {
					reject(error);
				}
			})
		} catch (error) {
			reject(error);
		}
	});
}

export function getLocationSearchData() {
	var callURL = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=Vict&types=(cities)&language=pt_BR&key=AIzaSyApif-ICGGR3ebjuVbPWwRwto9XkZpvWdc";
	return new Promise((resolve, reject) => {
		fetch(callURL)
			.then(res => res.json())
			.then(
				(result) => {
					// var newSuggestions = [];
					// for (var obj in result['predictions']) {
					// 	newSuggestions.push({ value: result['description']});
					// }
					resolve(result);
				},
				(error) => {
					reject(error);
				}
			)
	});

}

export default getLightData
