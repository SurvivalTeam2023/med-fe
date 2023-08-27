import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import { MODAL_BODY_TYPES } from "../../utils/globalConstantUtil";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import { useQuery } from "@tanstack/react-query";
import SearchBar from "../../components/Input/SearchBar";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import FunnelIcon from "@heroicons/react/24/outline/FunnelIcon";
import PencilSquareIcon from "@heroicons/react/24/outline/PencilSquareIcon";
import { getOptionsAPI } from "../../Axios/Apis/options/options";

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
        title: "Add New Option",
        bodyType: MODAL_BODY_TYPES.OPTIONS_ADD,
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

function Options() {
  const { data: option, refetch } = useQuery({
    queryKey: ["getOptionList"],
    queryFn: async () => {
      try {
        const result = await getOptionsAPI(currentPage);
        return result;
      } catch (error) {
        throw new Error(`Error fetching option: ${error.message}`);
      }
    },
  });

  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleOption, setVisibleOption] = useState([]);
  const optionData = option?.data?.items;
  const [options, setOption] = useState(optionData);
  const maxPage = option?.data?.meta?.totalPages - 1;

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
    const newVisibleOption = options?.slice();
    setVisibleOption(newVisibleOption);
  }, [options, currentPage]);

  useEffect(() => {
    setOption(optionData);
  }, [option, optionData]);

  const removeFilter = () => {
    setOption(optionData);
  };

  const applyFilter = (status) => {
    let filteredOptions = optionData.filter((t) => {
      return t.status === status;
    });

    setOption(filteredOptions);
  };

  // Search according to name
  const applySearch = (value) => {
    let filteredOptions = optionData?.filter((option) => {
      return (
        option.id.toString().includes(value.toLowerCase()) ||
        option.option.toLowerCase().includes(value.toLowerCase())
      );
    });
    setOption(filteredOptions);
  };

  const deleteCurrentLead = (data) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.OPTIONS_DELETE,
        extraObject: {
          message: `Are you sure you want to delete this Option?`,
          selectedOptionId: data.id,
        },
      })
    );
  };

  const openEditNewLead = (data) => {
    dispatch(
      openModal({
        title: "Edit Option",
        bodyType: MODAL_BODY_TYPES.OPTIONS_EDIT,
        extraObject: {
          selectedOptionId: data.id,
          option: data.option,
          status: data.status,
          point: data.points,
        },
      })
    );
  };

  return (
    <>
      <TitleCard
        title="Options List"
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
                <th>Option</th>
                <th>Question ID</th>
                <th>Created Date</th>
                <th>Status</th>
                <th>Delete</th>
                <th>Edit</th>
              </tr>
            </thead>
            {optionData ? (
              <tbody>
                {visibleOption?.map((l, index) => {
                  return (
                    <tr key={l.id}>
                      <td>{l.id}</td>
                      <td>{l.option}</td>
                      <td>{l.questionId}</td>
                      <td>{moment(l.createdAt).format("DD/MM/YYYY")}</td>
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
                            openEditNewLead(l);
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

export default Options;
