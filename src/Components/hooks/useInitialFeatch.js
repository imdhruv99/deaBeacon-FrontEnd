import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getAllVerticals, getAllFunctions, getAllStages, getAllUserList, getAllTagsList, getAllDemoDayList } from "../Redux/api/commonAPI";
import { getSiteVisitStatistics } from "../Redux/api/siteStatisticsAPI";

const useInitialFetch = () => {
  const dispatch = useDispatch();

  //promise for async API call
  const getFetchAPI = async () => {
    let Promises = [];

    Promises.push(dispatch(getAllStages()));
    Promises.push(dispatch(getAllVerticals()));
    Promises.push(dispatch(getAllFunctions()));
    Promises.push(dispatch(getAllUserList()));
    Promises.push(dispatch(getAllTagsList()));
    Promises.push(dispatch(getSiteVisitStatistics()));
    Promises.push(dispatch(getAllDemoDayList()));

    await Promise.all(Promises);
  };

  useEffect(() => {
    getFetchAPI();
  }, []);

  return;
};

export default useInitialFetch;
