import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Homepage from "./pages/homepage/Homepage"
import NavbarComponent from "./components/navbar/Navbar";
import Register from "./components/authentication/register/Register";
import Login from "./components/authentication/login/Login";
import Admin from "./components/authentication/admin/Admin";
import Home from "./pages/home/Home";
import Assignment from "./pages/assignmentSite/assignment/Assignment";
import ExpenseTracker from "./pages/expenseTrackerSite/expenseTracker/ExpenseTracker";
import BlogInfo from "./pages/blogInfo/BlogInfo";
import BlogSite from "./pages/blogSite/BlogSite";
import MyState from "./context/data/myState";
import CreateBlog from "./pages/createBlog/CreateBlog";
import AllBlogs from "./pages/allBlogs/AllBlogs";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <MyState>
      <Router>
        <ToastContainer position="bottom-right" />

        <NavbarComponent /> {/* Render NavbarComponent outside of Routes */}
        <Switch>
          <Route exact path="/" component={() => <Homepage />}></Route>
          <Route exact path="/login" component={() => <Login />}></Route>
          <Route exact path="/signup" component={() => <Register />}></Route>
          <Route exact path="/admin" component={() => <Admin />}></Route>
          <Route path="/home" component={Home} />
          <Route path="/dashboard" component={Assignment} />
          <Route path="/expensetracker" component={ExpenseTracker} />
          <Route path="/bloginfo/:id" component={BlogInfo} />
          <Route path="/blogsite" component={BlogSite} />
          <Route path="/createblog" component={CreateBlog} />
          <Route path="/allblogs" component={AllBlogs} />
        </Switch>
        <Toaster />
      </Router>
    </MyState>
  )
}

export default App
