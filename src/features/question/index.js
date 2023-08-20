import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import { useQuery } from "@tanstack/react-query";
import { getQuestionListNextPage } from "../../Axios/Apis/question/question";
import SearchBar from "../../components/Input/SearchBar";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import FunnelIcon from "@heroicons/react/24/outline/FunnelIcon";

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
        title: "Add New Question",
        bodyType: MODAL_BODY_TYPES.QUESTION_ADD_NEW,
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

function Question() {
  const { data: question, refetch } = useQuery({
    queryKey: ["getQuestionList"],
    queryFn: async () => {
      try {
        const result = await getQuestionListNextPage(currentPage);
        return result;
      } catch (error) {
        throw new Error(`Error fetching question: ${error.message}`);
      }
    },
  });
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleQuestion, setVisibleQuestion] = useState([]);
  const questionData = question?.data?.items;
  const [questions, setQuestion] = useState(questionData);
  const maxPage = question?.data?.meta?.totalPages - 1;
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  useEffect(() => {
    const fetchData = async () => {
      await refetch();
    };

    fetchData();
  }, [currentPage, refetch]);

  useEffect(() => {
    const newVisibleQuestion = questions?.slice();
    setVisibleQuestion(newVisibleQuestion);
  }, [questions, currentPage]);

  useEffect(() => {
    setQuestion(questionData);
  }, [question, questionData]);

  const removeFilter = () => {
    setQuestion(questionData);
  };

  const applyFilter = (status) => {
    let filteredQuestions = questionData.filter((t) => {
      return t.status === status;
    });

    setQuestion(filteredQuestions);
  };

  // Search according to name
  const applySearch = (value) => {
    let filteredQuestions = questionData?.filter((question) => {
      return (
        question.id.toString().includes(value.toLowerCase()) ||
        question.question.toLowerCase().includes(value.toLowerCase())
      );
    });
    setQuestion(filteredQuestions);
  };

  const deleteCurrentLead = (data) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.GENRE_DELETE,
        extraObject: {
          message: `Are you sure you want to delete this user?`,
          selectedGenreId: data.id,
        },
      })
    );
  };

  return (
    <>
      <TitleCard
        title="Mental Health List"
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
                <th>Question</th>
                <th>Created Date</th>
                <th>Status</th>
                <th>Delete</th>
              </tr>
            </thead>
            {questionData ? (
              <tbody>
                {visibleQuestion?.map((l, index) => {
                  return (
                    <tr key={l.id}>
                      <td>{l.id}</td>
                      <td>{l.question}</td>
                      <td>{moment(l.createdDate).format("DD/MM/YYYY")}</td>
                      <td>{l.status}</td>
                      <td>
                        <button
                          className="btn btn-square btn-ghost"
                          onClick={() => deleteCurrentLead(index)}
                        >
                          <TrashIcon className="w-5" />
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
              onClick={() => {
                handlePageChange(currentPage - 1);
              }}
            >
              Previous
            </button>
            <button
              className="btn btn-primary"
              disabled={currentPage > maxPage}
              onClick={() => {
                handlePageChange(currentPage + 1);
              }}
            >
              Next
            </button>
          </div>
        </div>
      </TitleCard>
    </>
  );
}

export default Question;
