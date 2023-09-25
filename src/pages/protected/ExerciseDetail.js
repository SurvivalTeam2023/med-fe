import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import { DetailExercise } from "../../features/exerciseDetail";
import { getExercisesByIdAPI } from "../../Axios/Apis/exercise/exercise";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

function InternalPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data: exercise } = useQuery({
    queryKey: ["getExerciseList"],
    queryFn: async () => {
      try {
        const result = await getExercisesByIdAPI(id);
        return result;
      } catch (error) {
        throw new Error(`Error fetching exercise: ${error.message}`);
      }
    },
  });

  const exerciseNameData = exercise?.data?.name;

  useEffect(() => {
    dispatch(setPageTitle({ title: exerciseNameData }));
  }, [exerciseNameData]);

  return <DetailExercise />;
}

export default InternalPage;
