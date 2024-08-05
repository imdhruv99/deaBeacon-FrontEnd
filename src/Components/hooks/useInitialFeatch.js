import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getAllCategory, getAllFunctions, getAllStages } from "../Redux/api/comonAPI";

const useInitialFeatch = () => {
  const dispatch = useDispatch();

  //prommise for async API call
  const getFetchAPI = async () => {
    let Promises = [];

    Promises.push(dispatch(getAllStages()));
    Promises.push(dispatch(getAllCategory()));
    Promises.push(dispatch(getAllFunctions()));

    await Promise.all(Promises);
  };

  useEffect(() => {
    getFetchAPI();
  }, []);

  return;
};

export default useInitialFeatch;
