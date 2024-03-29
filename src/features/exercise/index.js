import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openMarkdownModal, openModal } from "../common/modalSlice";
import { MODAL_BODY_TYPES } from "../../utils/globalConstantUtil";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import { useQuery } from "@tanstack/react-query";
import SearchBar from "../../components/Input/SearchBar";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import FunnelIcon from "@heroicons/react/24/outline/FunnelIcon";
import PencilSquareIcon from "@heroicons/react/24/outline/PencilSquareIcon";
import InformationCircleIcon from "@heroicons/react/24/outline/InformationCircleIcon";
import PlusCircleIcon from "@heroicons/react/24/outline/PlusCircleIcon";
import {
  getExercisesAPI,
  getExercisesByIdAPI,
} from "../../Axios/Apis/exercise/exercise";
import { useNavigate } from "react-router-dom";
import { Routing } from "../../constants/routing";

const TopSideButtons = ({ removeFilter, applyFilter, applySearch }) => {
  const dispatch = useDispatch();

  const [filterParam, setFilterParam] = useState("");
  const [searchText, setSearchText] = useState("");

  const showFiltersAndApply = (params) => {
    applyFilter(params);
    setFilterParam(params);
  };

  const removeAppliedFilter = () => {
    removeFilter();
    setFilterParam("");
    setSearchText("");
  };

  useEffect(() => {
    if (searchText === "") {
      removeAppliedFilter();
    } else {
      applySearch(searchText);
    }
  }, [searchText]);

  const openAddNewLeadModal = () => {
    dispatch(
      openModal({
        title: "Add New Exercise",
        bodyType: MODAL_BODY_TYPES.EXERCISES_ADD,
      })
    );
  };

  return (
    <div className="inline-block float-right">
      <SearchBar
        searchText={searchText}
        styleClass="mr-4"
        setSearchText={setSearchText}
      />
      {filterParam !== "" && (
        <button
          onClick={() => removeAppliedFilter()}
          className="btn btn-xs mr-2 btn-active btn-ghost normal-case"
        >
          {filterParam}
          <XMarkIcon className="w-4 ml-2" />
        </button>
      )}
      <div className="dropdown dropdown-bottom dropdown-end">
        <div className="flex items-center">
          <label tabIndex={0} className="btn btn-sm btn-outline">
            <FunnelIcon className="w-5 mr-2" />
            Filter
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 text-sm shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <button onClick={() => showFiltersAndApply("ACTIVE")}>
                Active
              </button>
            </li>
            <li>
              <button onClick={() => showFiltersAndApply("INACTIVE")}>
                Inactive
              </button>
            </li>

            <div className="divider mt-0 mb-0"></div>
            <li>
              <button onClick={() => removeAppliedFilter()}>
                Remove Filter
              </button>
            </li>
          </ul>
        </div>

        <button
          className="btn px-6 btn-sm normal-case btn-primary"
          onClick={() => openAddNewLeadModal()}
        >
          Add New
        </button>
      </div>
    </div>
  );
};

function Exercises() {
  const { data: exercise } = useQuery({
    queryKey: ["getMentalHealthList"],
    queryFn: async () => {
      try {
        const result = await getExercisesAPI();
        return result;
      } catch (error) {
        throw new Error(`Error fetching audio: ${error.message}`);
      }
    },
  });
  const dispatch = useDispatch();
  const itemsPerPage = 5; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const exerciseData = exercise?.data;
  const [exercises, setExercises] = useState(exerciseData);
  const visibleExercises = exercises?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  useEffect(() => {
    setExercises(exerciseData);
  }, [exerciseData]);

  const removeFilter = () => {
    setExercises(exerciseData);
  };

  const applyFilter = (status) => {
    let filteredTransactions = exerciseData.filter((t) => {
      return t.status === status;
    });

    setExercises(filteredTransactions);
  };

  // Search according to name
  const applySearch = (value) => {
    let filteredExercises = exerciseData.filter((exercise) => {
      return (
        exercise.name.toLowerCase().includes(value.toLowerCase()) ||
        exercise.description.toLowerCase().includes(value.toLowerCase()) || // Changed "desc" to "description"
        exercise.id.toString().includes(value.toLowerCase())
      );
    });
    setExercises(filteredExercises);
  };

  const deleteCurrentLead = (data) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.EXERCISES_DELETE,
        extraObject: {
          message: `Are you sure you want to delete this Mental Health?`,
          type: MODAL_BODY_TYPES.EXERCISES_DELETE,
          selectedExerciseId: data.id,
        },
      })
    );
  };

  const handleOnlickEdit = (exercise) => {
    const { id } = exercise;

    navigate(`${Routing.EXERCISE}/${id}`);
  };

  return (
    <>
      <TitleCard
        title="Exercise List"
        topMargin="mt-2"
        TopSideButtons={
          <TopSideButtons
            applySearch={applySearch}
            applyFilter={applyFilter}
            removeFilter={removeFilter}
          />
        }
      >
        {/* Leads List in table format loaded from slice after api call */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Created Date</th>
                <th>Status</th>
                <th>Delete</th>
                <th>Edit</th>
              </tr>
            </thead>
            {exerciseData ? (
              <tbody>
                {visibleExercises?.map((l, index) => {
                  const leadIndex = startIndex + index;
                  return (
                    <tr key={l.id}>
                      <td>{l.id}</td>
                      <td>{l.name}</td>
                      <td>{moment(l.createdDate).format("DD/MM/YYYY")}</td>
                      <td>{l.status}</td>
                      <td>
                        <button
                          className="btn btn-square btn-ghost"
                          onClick={() => deleteCurrentLead(l)}
                        >
                          <TrashIcon className="w-5" />
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-square btn-ghost"
                          onClick={() => {
                            handleOnlickEdit(l);
                          }}
                        >
                          <PencilSquareIcon className="w-5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            ) : (
              <p> No Value</p>
            )}
          </table>
          <div className="flex justify-center mt-4">
            <button
              className="btn btn-primary mr-2"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
            <button
              className="btn btn-primary"
              disabled={startIndex + itemsPerPage >= exerciseData?.length}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </TitleCard>
    </>
  );
}

export default Exercises;
