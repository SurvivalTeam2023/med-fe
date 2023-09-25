import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import MarkdownEditor from "../../features/markdown/ViewDetailExerciseModalBody";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Markdown" }));
  }, []);

  return <MarkdownEditor />;
}

export default InternalPage;
