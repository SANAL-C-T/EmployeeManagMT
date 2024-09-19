import "./App.css";
import SignUp from "./Page/Common/SignUp";
import Userhome from "./Page/UserSide/UserHomePage";
import UserEdit from "./Page/UserSide/UserEditPage";
import Adminhome from "./Page/Adminside/AdminHomePage";
import AdminEdit from "./Page/Adminside/AdminEditPage";
import AdminCreate from "./Page/Adminside/AdminAddPage";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Components/Protector/pro";
import AdminDashpage from "./Page/Adminside/AdminDashpage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public route */}
        <Route path="/" element={<SignUp />} />

        {/* User routes accessible to user  */}
        <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
          <Route path="/homepage" element={<Userhome />} />
          <Route path="/EditMyProfile" element={<UserEdit />} />
        </Route>

        {/* Admin routes only accessible to admin users */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/AdminHome" element={<Adminhome />} />
          <Route path="/AdminEdit" element={<AdminEdit />} />
          <Route path="/AdminCreate" element={<AdminCreate />} />
          <Route path="/AdminDash" element={<AdminDashpage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
