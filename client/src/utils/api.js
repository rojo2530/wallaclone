import axios from 'axios';

let axiosConfig = {
  withCredentials: false,
}

const API_URL = '/apiv1';
const LIMIT = 5;

function buildEndPoint(filter) {
	const endPointBase = `${API_URL}/anuncios?limit=${LIMIT}`;
	let endPoint  = endPointBase;
	const { name, tag, type, priceMin, priceMax } = filter;

	if (name) {
		endPoint = `${endPointBase}&name=${name}`;
	} 

	if (tag && tag !== 'all') {
			endPoint = `${endPoint}&tag=${tag}`;
	}

	if (type && type === 'buy') {
		endPoint = `${endPoint}&venta=false`;
	} else if (type && type === 'sell') {
		endPoint = `${endPoint}&venta=true`;
	}

	const queryPrice = getQueryPrice(priceMin, priceMax);
	endPoint = `${endPoint}${queryPrice}`
	return endPoint;

}

function getQueryPrice(priceMin, priceMax) {
	let query = '';
	if (!priceMin && !priceMax) {
		return query;
	} else if (priceMin && !priceMax) {
		query = `&price=${priceMin}-`;
	} else if (priceMin && priceMax) {
		query = `&price=${priceMin}-${priceMax}`;
	} else if (!priceMin && priceMax) {
		query = `&price=-${priceMax}`;
	}
	return query;
}

const api = () => {
	return {
		getAdverts: (filter, page = 1) => {
			//No me deja el eslint y lo tengo que poner con let en vez de const
			// const skip = (page - 1) * LIMIT;
			let endPoint = buildEndPoint(filter);
			if (page !== 0) {
				endPoint = `${endPoint}&start=${page}`;
			}
			return axios.get(endPoint)
				.then(response => response.data)
				.catch(err => {
					throw err;
				});
		},
		getTags: () => {
			const endPoint = `${API_URL}/tags`;
			return axios.get(endPoint)
				.then(response => response.data.results)
				.catch(err => {
					throw err;
				});
		},
		createAdvert: (advert) => {
			const endPoint = `${API_URL}/anuncios`;
			return axios({
				method: 'post',
				url: endPoint,
				data: advert
			}).then(res => res.data)
				.catch(err => {
					throw err;
				});

		},
		getAdvertDetail: id => {
			const endPoint = `${API_URL}/anuncios/${id}`;
			return axios.get(endPoint)
				.then(response => response.data.result)
				.catch(err => {
					throw err;
				})
		}, 
		updateAdvert: (id, advert) => {
			const endPoint = `${API_URL}/anuncios/${id}`;
			return axios({
				method: 'put',
				url: endPoint,
				data: advert
			}).then(res => res)
				.catch(err => {
					throw err;
				})
		},
		registerUser: user => {
			const endPoint = `${API_URL}/register`
			return axios({
				method: 'post',
				url: endPoint,
				data: user
			}).then(res => res.data)
				.catch(err => {
					throw err;
				});
		},
		login: user => {
			const endPoint = `${API_URL}/login`
			return axios.post(
				endPoint,
				user,
				axiosConfig
			).then(res => res.data)
			.catch(err => {
				throw err;
			});
		},
		checkToken: () => {
			const endPoint = `${API_URL}/checkToken`;
			return axios.get(endPoint)
				.then(response => response.data.result)
				.catch(err => {
					throw err;
				})
		},
		forgotPassword: email => {
			const endPoint = `${API_URL}/usuario/forgotPassword`;
			return axios.post(
				endPoint,
				email,
			).then(res => res.data)
			.catch(err => {
				throw err;
			});
		},
		resetPassword: resetPasswordToken => {
			const endPoint = `${API_URL}/usuario/reset`;
			return axios.get(endPoint, {
				params: {
					resetPasswordToken
				}
			}).then(res => res.data)
				.catch(err => {
					throw err;
				})
		},
		updatePassword: (user) => {
			const endPoint = `${API_URL}/usuario/updatePassword`;
			return axios.put(
				endPoint,
				user
			).then(res => res.data)
			.catch(err => {
				throw err;
			});
		},
		logout: () => {
			const endPoint = `${API_URL}/logout`;
			return axios.get(endPoint)
				.then(response => response.data.result)
				.catch(err => {
					throw err;
				})
			} 
	};
};

export default api;