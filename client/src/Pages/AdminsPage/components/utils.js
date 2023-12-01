import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";



export function useCustomHook() {
  const dispatch = useDispatch();
  const [adminPageNumm, setAdminPageNum] = useState(1);

  const getSomething = (pageNum) => {
    setAdminPageNum(pageNum)
  };

  return { getSomething , adminPageNumm};
}