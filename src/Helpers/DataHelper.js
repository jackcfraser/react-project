import Papa from 'papaparse';

class DataHelper {
	static getLightData() {
		try {
			console.log(process.env.REACT_APP_LIGHT_DATA_PATH);
			var dataPath = require(process.env.REACT_APP_LIGHT_DATA_PATH);
			console.log(dataPath);
			Papa.parse(dataPath, {
				header: true,
				download: true,
				skipEmptyLines: true,
				complete: this.onLightDataReady
			})
		} catch(error) {
			console.log(error);
		}
	}

	static onLightDataReady(result) {
		console.log("light data is ready");
		var heatmapData = [];
		for (var obj in result.data) {
			heatmapData.push({ x: result.data[obj]['lat'], y: result.data[obj]['lon'], z: result.data[obj]['nelm'] });
		}
		return heatmapData;
	}
}

export default DataHelper
