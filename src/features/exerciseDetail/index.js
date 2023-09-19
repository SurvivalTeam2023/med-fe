import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { useQuery } from "@tanstack/react-query";
import { getExercisesByIdAPI } from "../../Axios/Apis/exercise/exercise";
import { useDispatch } from "react-redux";
import { useUpdateExercise } from "../../hooks/exercise.hook";
import { showNotification } from "../common/headerSlice";

export const DetailExercise = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { mutate } = useUpdateExercise();
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

  //call api get exercise detail
  //write update exercise detail

  const exerciseContentData = exercise?.data?.content;
  const exerciseNameData = exercise?.data?.name;
  const [contentExercise, setContentExercise] = useState(exerciseContentData);

  useEffect(() => {
    setContentExercise(exerciseContentData);
  }, [exerciseContentData]);

  const handleBackClick = () => {
    console.log("Back button clicked");
  };

  const handleSaveClick = async () => {
    try {
      const payload = {
        name: exerciseNameData,
        content: contentExercise,
        status: "ACTIVE",
      };
      await mutate({ id, payload });
      dispatch(
        showNotification({
          message: "Edit Exercise Successfully!",
          status: 1,
        })
      );
    } catch (error) {
      console.error("Error editing Exercise:", error);
    }
  };

  return (
    <div className="container">
      <MDEditor
        height={200}
        value={contentExercise}
        onChange={setContentExercise}
      />
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <button
          className="btn btn-ghost"
          onClick={() => {
            console.log("cancel");
          }}
        >
          Back
        </button>
        <button
          className="btn btn-primary px-6"
          onClick={() => {
            handleSaveClick();
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};
