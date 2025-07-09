import {
  createBrowserRouter
} from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import Coverage from "../Pages/Coverage/Coverage";
import SendParcel from "../Pages/SendParcel/SendParcel";
import PrivateRoute from "../Routes/PrivateRoute/PrivateRoute";
import DashboardLayout from "../Layouts/DashBoardLayout";
import MyParcels from "../Pages/Dashboard/MyParcels/Myparcels";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import Track from "../Pages/Dashboard/Track/Track";
import BeRider from "../Pages/Dashboard/BeRider/BeRider";
import PendingRiders from "../Pages/Dashboard/Riders/PendingRiders";
import ActiveRiders from "../Pages/Dashboard/Riders/ActiveRiders";
import ManageAdmin from "../Pages/Dashboard/manageAdmin";
import Forbidden from "../Pages/ForbiddenPage/Forbidden";
import AdminRoutes from "../Routes/AdminRoutes/AdminRoutes";
import AssignRider from "../Pages/Dashboard/AssignRider/AssignRider";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: 'coverage',
        Component: Coverage,
        loader: () => fetch('./serviceCenter.json')
      },
      {
        path: 'sendParcel',
        loader: () => fetch('./serviceCenter.json'),
        element: <PrivateRoute><SendParcel></SendParcel></PrivateRoute>

      },
      {
        path: 'be-rider',
        loader: () => fetch('./serviceCenter.json'),
        element: <PrivateRoute><BeRider></BeRider></PrivateRoute>
      },
      {
        path: 'forbidden',
        Component: Forbidden
      },
    ]
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'register',
        Component: Register
      }
    ]
  },
  {
    path: "dashboard",
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      {
        path: 'myparcels',
        element: <MyParcels></MyParcels>
      },
      {
        path: 'payment/:parcelId',
        element: <PrivateRoute><Payment></Payment></PrivateRoute>
      },
      {
        path: 'payment-history',
        element: <PrivateRoute><PaymentHistory></PaymentHistory></PrivateRoute>
      },
      {
        path: 'track',
        element: <PrivateRoute><Track></Track></PrivateRoute>
      },
      {
        path: 'pending-riders',
        element: <AdminRoutes><PendingRiders></PendingRiders></AdminRoutes>
      },
      {
        path: 'active-riders',
        element:<AdminRoutes><ActiveRiders></ActiveRiders></AdminRoutes> 
      },
      {
        path: 'assign-rider',
        element:<AdminRoutes><AssignRider></AssignRider></AdminRoutes> 
      },
      {
        path: 'admin',
        element: <AdminRoutes><ManageAdmin></ManageAdmin></AdminRoutes>
      }
    ]
  }
]);
