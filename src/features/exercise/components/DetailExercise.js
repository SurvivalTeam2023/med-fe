import { useParams } from "react-router-dom";

export const DetailExercise = () => {
  const { id } = useParams();
  console.log("id", id);
  return <></>;
};
