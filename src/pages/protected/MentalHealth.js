import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import MentalHealth from "../../features/mentalHealth";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Mental Health" }));
  }, []);

  return <MentalHealth />;
}

export default InternalPage;
