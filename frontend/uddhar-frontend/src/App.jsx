import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Login from "./authentication/pages/Login";
import DashboardNavbar from "./shared/components/DashboardNavbar";
import CoordinatorDashboard from "./coordinator/pages/CoordinatorDashboard";
import {Navbar, Landing} from "./public/Public";
import Login from "./authentication/pages/Login";
import ForgetPass from "./authentication/pages/ForgetPass";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Navbar>
                <Landing />
              </Navbar>
            }
          />
          <Route
            path="/dashboard/coordinator"
            element={
              <DashboardNavbar>
                <CoordinatorDashboard />
              </DashboardNavbar>
            }
          />
          <Route
            path="/sign-in"
            element={
              <Navbar>
                <Login />
              </Navbar>
            }
          />
          <Route path="/password-recovery" element={<ForgetPass />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
