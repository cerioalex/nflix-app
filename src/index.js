import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     errorElement: <NotFoundPage />,
//     children: [
//       {
//         path: "/",
//         element: <Home />,
//         children: [
//           {
//             path: "/:movieId",
//             element: <Details />,
//           },
//         ],
//       },
//       {
//         path: "/profiles",
//         element: <ProfilesPage />,
//       },
//       // {
//       //   path: "/:movieId",
//       //   element: <Details />,
//       // },
//     ],
//   },
//   // {
//   //   path: "/:movieId",
//   //   element: <Details />,
//   // },
//   // {
//   //   path: "/profiles",
//   //   element: <ProfilesPage />,
//   //   // this part here is where you can navigate to a child page but can still maintain a portion of a parent page
//   //   children: [
//   //     {
//   //       path: "/profiles/:profileId",
//   //       element: <ProfilePage />,
//   //     },
//   //   ],
//   // },
//   // {
//   //   path: "/profiles/:profileId",
//   //   element: <ProfilePage />,
//   // },
// ]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
