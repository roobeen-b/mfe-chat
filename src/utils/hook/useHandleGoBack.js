import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

export const useHandleGoBack = () => {
  const navigate = useNavigate();
  const [hasHistory, setHasHistory] = useState(false);

  const handleGoBack = () => {
    if (hasHistory) {
      navigate(-1);
    } else {
      navigate("/app");
    }
  };

  useEffect(() => {
    setHasHistory(window.history.length > 1);
  }, []);

  return { hasHistory, handleGoBack };
};
