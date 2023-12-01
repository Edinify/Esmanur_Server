import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as ArrowIcon } from "../../../../../assets/icons/finance/arrow-down.svg";
import { FINANCE_FILTER_ACTION_TYPE } from "../../../../../redux/actions-type";

const FinanceDropdown = ({ type }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const {    
    financeIncomeCategory,
    financeIncomeSorting,
    financeExpenseCategory,
    financeExpenseSorting,} = useSelector((state) => state.financeDateFilter);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedIncomeSort, setSelectedIncomeSort] = useState("");
  const [selectedIncomeCategory, setSelectedIncomeCategory] = useState("");
  const [selectedExpenseSort, setSelectedExpenseSort] = useState("");
  const [selectedExpenseCategory, setSelectedExpenseCategory] = useState("");

  const sortingData = [
    { key: "lowestAmount", name: "Aşağı məbləğdən" },
    { key: "highestAmount", name: "Yuxarı məbləğdən" },
    { key: "latest", name: "Yenidən köhnəyə" },
    { key: "oldest", name: "Köhnədən yeniyə" },
  ];
  const categoryData = location.pathname === "/finance/incomes" ? [
    { key: "all", name: "Bütün kateqoriyalar" },
    { key: "tuitionFees", name: "Təhsil haqqı" },
    { key: "other", name: "Digər" },
  ] : [
    { key: "all", name: "Bütün kateqoriyalar" },
    { key: "food", name: "Qida" },
    { key: "cleaningSupplies", name: "Təmizlik ləvazimatları " },
    { key: "repair", name: "Təmir" },
    { key: "lease", name: "İcarə" },
    { key: "equipment", name: "Avadanlıq" },
    { key: "other", name: "Digər" },
  ];
  const getSorting = (sortType) => {
    if(location.pathname === "/finance/incomes" ) {
      setSelectedIncomeSort(sortType);
      dispatch({
        type: FINANCE_FILTER_ACTION_TYPE.GET_INCOME_SORTING_FILTER,
        payload: {financeIncomeSorting: sortType.key},
      })
    } else if(location.pathname === "/finance/expenses") {
      setSelectedExpenseSort(sortType);
      dispatch({
        type: FINANCE_FILTER_ACTION_TYPE.GET_EXPENSE_SORTING_FILTER,
        payload: {financeExpenseSorting: sortType.key},
      })
    } else if(location.pathname === "/finance/food-ration") {
      setSelectedExpenseSort(sortType);
      dispatch({
        type: FINANCE_FILTER_ACTION_TYPE.GET_EXPENSE_SORTING_FILTER,
        payload: {financeExpenseSorting: sortType.key},
      })
    }
    setOpenDropdown(false)
  };
  const getCategory = (categoryType) => {
    if(location.pathname === "/finance/incomes" ) {
      setSelectedIncomeCategory(categoryType);
      dispatch({
        type: FINANCE_FILTER_ACTION_TYPE.GET_INCOME_CATEGORY_FILTER,
        payload: {financeIncomeCategory: categoryType.key},
      })
    } else if(location.pathname === "/finance/expenses") {
      setSelectedExpenseCategory(categoryType);
      dispatch({
        type: FINANCE_FILTER_ACTION_TYPE.GET_EXPENSE_CATEGORY_FILTER,
        payload: {financeExpenseCategory: categoryType.key},
      })
    } else if(location.pathname === "/finance/food-ration") {
      setSelectedExpenseCategory(categoryType);
      dispatch({
        type: FINANCE_FILTER_ACTION_TYPE.GET_EXPENSE_CATEGORY_FILTER,
        payload: {financeExpenseCategory: categoryType.key},
      })
    }
    setOpenDropdown(false)
  };

  useEffect(() => {
    return () => {
      dispatch({
        type: FINANCE_FILTER_ACTION_TYPE.GET_INCOME_SORTING_FILTER,
        payload: {financeIncomeSorting: ''},
      })
      dispatch({
        type: FINANCE_FILTER_ACTION_TYPE.GET_EXPENSE_SORTING_FILTER,
        payload: {financeExpenseSorting: ''},
      })
      dispatch({
        type: FINANCE_FILTER_ACTION_TYPE.GET_INCOME_CATEGORY_FILTER,
        payload: {financeIncomeCategory: ''},
      })
      dispatch({
        type: FINANCE_FILTER_ACTION_TYPE.GET_EXPENSE_CATEGORY_FILTER,
        payload: {financeExpenseCategory: ''},
      })
    }
  }, [    financeIncomeCategory,
    financeIncomeSorting,
    financeExpenseCategory,
    financeExpenseSorting])

  return (
    <div className={`global-category-dropdown finance-dropdown ${openDropdown ? "active" : ""}`}>
      <div className="dropdown-head" onClick={() => setOpenDropdown(!openDropdown)}>

        {type === "category" && location.pathname === "/finance/incomes" && <h2>{selectedIncomeCategory ? selectedIncomeCategory.name :'Bütün kateqoriyalar'}</h2>}
        {type === "sorting" && location.pathname === "/finance/incomes" && <h2> {selectedIncomeSort ? selectedIncomeSort.name :'Köhnədən yeniyə'}</h2>}

        {type === "category" && location.pathname === "/finance/expenses" && <h2>{selectedExpenseCategory ? selectedExpenseCategory.name :'Bütün kateqoriyalar'}</h2>}
        {type === "sorting" && location.pathname === "/finance/expenses" && <h2> {selectedExpenseSort ? selectedExpenseSort.name :'Köhnədən yeniyə'}</h2>}

        {type === "category" && location.pathname === "/finance/food-ration" && <h2>{selectedExpenseCategory ? selectedExpenseCategory.name :'Bütün kateqoriyalar'}</h2>}
        {type === "sorting" && location.pathname === "/finance/food-ration" && <h2> {selectedExpenseSort ? selectedExpenseSort.name :'Köhnədən yeniyə'}</h2>}
        
        
        <div
          
          className="arrow-icon"
        >
          <ArrowIcon />
        </div>
      </div>

      <div className="dropdown-body">
        {type === "category" && (
          <ul>
            {categoryData.map((item, index) => (
              <li key={index} onClick={() => getCategory(item)}>
                {item.name}
              </li>
            ))}
          </ul>
        )}

        {type === "sorting" && (
          <ul>
            {sortingData.map((item, index) => (
              <li key={index} onClick={() => getSorting(item)}>
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FinanceDropdown;
