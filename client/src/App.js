import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import Adverts from './components/Adverts/';
// import Register from './components/Register/';
import ManageAdvert from './components/ManageAdvert/';
import DetailAdvert from './components/DetailAdvert/'
import ErrorBoundary from './components/ErrorBoundary/';
import Error404 from './components/Error404/';
import PrivateRoute from './components/PrivateRoute/';
import SignInAndSignUp from './components/SignInAndSignUp';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

export default function App({ store, ...props }) {
	return (
		<ErrorBoundary >
			<Provider store={store}>	
				<Router>
					<Switch>
						<Route exact path='/' component={Adverts} />
						<Route exact path="/reset/:token" component={ResetPassword} />
						<Route exact path='/signin' component={SignInAndSignUp} />
						<Route exact path='/forgot-password' component={ForgotPassword} />
						<PrivateRoute exact path='/advert/detail/:id' component={DetailAdvert} />
						<PrivateRoute key='add-advert' exact path='/advert/create' component={ManageAdvert} />
						<PrivateRoute key='edit-advert' exact path='/advert/edit/:id' component={ManageAdvert} />
						<Route component={Error404}/>
					</Switch>
				</Router>
			</Provider>
		</ErrorBoundary>  
	);
}


