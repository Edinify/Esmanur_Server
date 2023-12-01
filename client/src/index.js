import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./globalComponents/DropdownName/dropdownName.css"
import "./assets/css/utilities.css"
import "./assets/css/globalCategoryDropdown.css"
import "./assets/css/createUpdateModal.css"
import "./assets/css/loading.css"
import "./assets/css/pagination.css"
import "./assets/css/details.css"
import "./assets/css/sidebar.css";
import "./assets/css/header.css";
import "./assets/css/mainTableModals.css"
import "./assets/css/pages/dashboardPage.css";
import "./assets/css/pages/financePage.css";
import "./assets/css/pages/loginPage.css";
import "./assets/css/pages/tablePage.css";
import "./assets/css/pages/salaryPage.css";
import "./assets/css/pages/stimulationPage.css";
import "./assets/css/pages/branchesPage.css";


import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
  <Provider store={store}>
    <App />
    </Provider>
  </BrowserRouter>
);
