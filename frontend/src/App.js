import {Provider} from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import store from './Components/Store/index'
import Dashboard from './Components/Dashboard'
import Auth from './Components/Auth/Auth'
import StaffAuth from './Components/StaffAuth/StaffAuth';
import CustomerDashboard from './Components/CustomerDashboard/CustomerDashboard';

import CreditCard from './Components/CreditCard/CreditCard';

const App = ()=> {
  let routes;

  
    routes = (
      <Routes>
        <Route path="/login"  element={<Auth/>} />
        <Route path="/"  element={<CustomerDashboard/>} />
        <Route path="/staff" element={<Dashboard />} />
        <Route path='/staff/login' element={<StaffAuth />} />
      </Routes>
      
    );
  
  return (
    <Provider store={store}>
    <Router>
    
    {routes}
    </Router>
    </Provider>
  );
}

export default App;
