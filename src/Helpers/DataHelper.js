import Papa from 'papaparse';

class DataHelper {
	static getLightData() {
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
}

export default DataHelper
