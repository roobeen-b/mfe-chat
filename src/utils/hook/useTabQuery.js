import { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router";

export const useTabQuery = ({ val, list }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const tabVal = searchParams.get("tab");

  const handleCurrentActiveTabIndex = () => {
    if (!tabVal) return 0;
    if (Array.isArray(list)) {
      return list.findIndex((item) => item === tabVal);
    } else {
      return Object.keys(list).findIndex((item) => item === tabVal);
    }
  };

  const isValidTabVal = (v) =>
    Array.isArray(list) ? list.includes(v) : Object.keys(list).includes(v);

  const changeUrl = (t) => {
    const activeTab = isValidTabVal(tabVal) ? tabVal : val;
    if (t === activeTab && activeTab === tabVal) return;

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("tab", t);
    setSearchParams(newSearchParams);
  };

  useEffect(() => {
    if (!isValidTabVal(tabVal)) {
      changeUrl(val);
    }
  }, [tabVal, location.pathname]);

  const onTabChange = (t) => {
    changeUrl(t);
  };

  return {
    onTabChange,
    activeTabIndex: handleCurrentActiveTabIndex(),
    activeTab: tabVal || val,
  };
};
