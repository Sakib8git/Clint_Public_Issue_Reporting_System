import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";

import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import AddPlant from "../pages/Dashboard/Seller/AddPlant";
import ManageUsers from "../pages/Dashboard/Admin/ManageUser/ManageUsers";
import Profile from "../pages/Dashboard/Common/Profile";
import Statistics from "../pages/Dashboard/Common/Statistics";
import MainLayout from "../layouts/MainLayout";

import ManageOrders from "../pages/Dashboard/Seller/ManageOrders";
import MyOrders from "../pages/Dashboard/Customer/MyOrders";
import { createBrowserRouter } from "react-router";
import AllIssues from "../pages/AllIssues/AllIssues";
import IssueDetails from "../pages/IssueDetails/IssueDetails";
import MyIssues from "../pages/Dashboard/Citizen/MyIssues/MyIssues";
import ReportIssue from "../pages/Dashboard/Citizen/ReportIssue/ReportIssue";
import CitizenProfile from "../pages/Dashboard/Citizen/CityzenProfile/CitizenProfile";
import AssignedIssues from "../pages/Dashboard/Staff/AssignIssues/AssignIssues";
import StaffProfile from "../pages/Dashboard/Staff/StaffProfile/StaffProfile";
import AdminIssues from "../pages/Dashboard/Admin/AllIssues/AdminIssues";
import ManageStaff from "../pages/Dashboard/Admin/ManageStaff/ManageStaff";
import Payments from "../pages/Dashboard/Admin/Payments/Payments";
import About from "../pages/IssueDetails/About/About";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/all-issues", // ✅ new route
        element: <AllIssues />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "/issue-details/:id", // ✅ new route
        element: (
          <PrivateRoute>
            <IssueDetails />
          </PrivateRoute>
        ),
      },
      
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
      {
        path: "add-plant",
        element: (
          <PrivateRoute>
            <AddPlant />
          </PrivateRoute>
        ),
      },
      // citizen part
      {
        path: "my-issues",
        element: (
          <PrivateRoute>
            <MyIssues />
          </PrivateRoute>
        ),
      },
      {
        path: "report-issue",
        element: (
          <PrivateRoute>
            <ReportIssue />
          </PrivateRoute>
        ),
      },
      {
        path: "cityzen-profile",
        element: (
          <PrivateRoute>
            <CitizenProfile />
          </PrivateRoute>
        ),
      },
      // ----------
      // ---Staff only-----
      {
        path: "assigned-issues",
        element: (
          <PrivateRoute>
            <AssignedIssues />
          </PrivateRoute>
        ),
      },
      {
        path: "staff-profile",
        element: (
          <PrivateRoute>
            <StaffProfile />
          </PrivateRoute>
        ),
      },
      // ------
      // ---Admin only---
      {
        path: "admin-issues",
        element: (
          <PrivateRoute>
            <AdminIssues />
          </PrivateRoute>
        ),
      },

      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <ManageUsers />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-staff",
        element: (
          <PrivateRoute>
            <ManageStaff />
          </PrivateRoute>
        ),
      },
      {
        path: "payments",
        element: (
          <PrivateRoute>
            <Payments />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      // ------
      {
        path: "my-orders",
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-orders",
        element: <ManageOrders />,
      },
    ],
  },
]);
