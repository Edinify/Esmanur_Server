import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux"
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import authReducer from "./reducers/authReducer";
import { changePasswordReducer } from "./reducers/changePasswordReducer";
import datePickerReducer from "./reducers/datepickerReducer";
import { dropdownReducer } from "./reducers/dropdownReducer";
import { dropdownNameErrReducer } from "./reducers/dropdownNameErrReducer";
import { userReducer } from "./reducers/userReducer";
import { paginationPageNumberReducer } from "./reducers/paginationPageNumberReducer";
import { teacherPaginationReducer } from "./reducers/teachersPaginationReducer";
import { adminPaginationReducer } from "./reducers/adminsPaginationReducer";
import {  searchValuesReducer } from "./reducers/searchValuesReducer";
import { StudentsPaginationReducer } from "./reducers/studentsPaginationReducer";
import { coursesPaginationReducer } from "./reducers/coursesPaginationReducer";
import { salaryPaginationReducer } from "./reducers/salaryPaginationReducer";
import { dashBoardreducer } from "./reducers/dashboardReducer";
import forgotPasswordReducer from "./reducers/forgetPasswordReducer";
import { expensesReducer } from "./reducers/expensesPaginationReducer";
import { foodRationReducer } from "./reducers/foodRationPaginationReducer";
import { uniformsReducer } from "./reducers/uniformsPaginationReducer";
import { allCoursesReducer } from "./reducers/allCoursesReducer";
import { incomeReducer } from "./reducers/incomeReducer";
import { funcComponentReducer } from "./reducers/funcComponentReducer";
import { coursesModalReducer } from "./reducers/coursesModalReducer";
import { studentsModalReducer } from "./reducers/studentsModalReducer";
import { teachersModalReducer } from "./reducers/teachersModalReducer";
import { adminsModalReducer } from "./reducers/adminsModalReducer";
import {expensesModalReducer} from "./reducers/expensesModalReducer"
import { foodRationModalReducer } from "./reducers/foodRationModalReducer";
import { uniformsModalReducer } from "./reducers/uniformsModalReducer";
import { incomesModalReducer } from "./reducers/incomesModalReducer";
import { sidebarOpenReducer } from "./reducers/sidebarOpenReducer";
import { stimulationTypeReducer } from "./reducers/stimulationTypeReducer";
import { bonusPaginationReducer } from "./reducers/bonusPagionationReducer";
import { bonusModalReducer } from "./reducers/bonusModalReducer";
import { finePaginationReducer } from "./reducers/finePaginationReducer";
import {fineModalReducer} from "./reducers/fineModalReducer"
import { financeFilterReducer } from "./reducers/financeFilterReducer";
import { fineFilterReducer } from "./reducers/fineReducer";
import { teacherBonusReducer } from "./reducers/teacherBonusReducer";
import { financeReducer } from "./reducers/financeReducer";
import { teacherStatusReducer } from "./reducers/teacherStatusReducer";
import { studentStatusReducer } from "./reducers/studentStatusReducer";
import { branchesModalReducer } from "./reducers/branchesModalReducer";
import { branchesReducer } from "./reducers/branchesReducer";
import { teachersCategoryReducer } from "./reducers/teachersCatergoryReducer";
import { studentPaymentModalReducer } from "./reducers/studentPaymentModalReducer";
import { studentPaymentsPaginationReducer } from "./reducers/studentPaymentsPaginationReducer";

const initialState={};
const reducers = combineReducers({
teachersPagination:teacherPaginationReducer,
adminsPagination:adminPaginationReducer,
coursesPagination:coursesPaginationReducer,
studentsPagination:StudentsPaginationReducer,
auth:authReducer,
changePass:changePasswordReducer,
salaryPagination:salaryPaginationReducer,
datepicker:datePickerReducer,
dropdownName:dropdownReducer,
dropdownNameError:dropdownNameErrReducer,
user:userReducer,
pageNumber:paginationPageNumberReducer,
searchValues:searchValuesReducer,
dashboardData:dashBoardreducer,
financeData: financeReducer,
forgetPassword:forgotPasswordReducer,
expensesData:expensesReducer,
foodRationData: foodRationReducer,
allCourses:allCoursesReducer,
incomes:incomeReducer,
funcComponent:funcComponentReducer,
coursesModal: coursesModalReducer,
studentsModal: studentsModalReducer,
teachersModal: teachersModalReducer,
adminsModal: adminsModalReducer,
expensesModal:expensesModalReducer,
foodRationModal: foodRationModalReducer,
incomesModal:incomesModalReducer,
bonusModal:bonusModalReducer,
fineModal:fineModalReducer,
openSidebar:sidebarOpenReducer,
bonusData:bonusPaginationReducer,
fineData:finePaginationReducer,
stimulationType:stimulationTypeReducer,
financeDateFilter: financeFilterReducer,
fineCategory:fineFilterReducer,
teacherBonus:teacherBonusReducer,
teacherStatus:teacherStatusReducer,
studentStatus:studentStatusReducer,
branchesModal: branchesModalReducer,
teachersCategory: teachersCategoryReducer,
branchesData:branchesReducer,
uniformModal: uniformsModalReducer,
uniformsData: uniformsReducer,
studentPaymentModal: studentPaymentModalReducer, 
studentPaymentsData: studentPaymentsPaginationReducer
})
// test

const store = createStore(
reducers,
initialState,
composeWithDevTools(applyMiddleware(thunk))

)
export default store;