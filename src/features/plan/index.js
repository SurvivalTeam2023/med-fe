import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import { MODAL_BODY_TYPES } from "../../utils/globalConstantUtil";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import { useQuery } from "@tanstack/react-query";
import PencilSquareIcon from "@heroicons/react/24/outline/PencilSquareIcon";
import SearchBar from "../../components/Input/SearchBar";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import FunnelIcon from "@heroicons/react/24/outline/FunnelIcon";
import { getPlanList } from "../../Axios/Apis/plan/plan";

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
        title: "Add New Plan",
        bodyType: MODAL_BODY_TYPES.PLAN_ADD,
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

function Plan() {
  const dispatch = useDispatch();
  const { data: plan } = useQuery({
    queryKey: ["getPlanList"],
    queryFn: async () => {
      try {
        const result = await getPlanList();
        return result;
      } catch (error) {
        throw new Error(`Error fetching plan: ${error.message}`);
      }
    },
  });
  const itemsPerPage = 5; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const planData = plan?.data;
  const [plans, setPlans] = useState(planData);
  const visiblePlans = plans?.slice(startIndex, startIndex + itemsPerPage);
  console.log("visiblePlans", visiblePlans);

  useEffect(() => {
    setPlans(planData);
  }, [planData]);

  const removeFilter = () => {
    setPlans(planData);
  };

  const applyFilter = (status) => {
    let filteredPlans = planData.filter((t) => {
      return t.status === status;
    });

    setPlans(filteredPlans);
  };

  // Search according to name
  const applySearch = (value) => {
    let filteredPlans = planData.filter((plan) => {
      return (
        plan.name.toLowerCase().includes(value.toLowerCase()) ||
        plan.desc.toLowerCase().includes(value.toLowerCase()) ||
        plan.id.toString().includes(value.toLowerCase())
      );
    });
    setPlans(filteredPlans);
  };

  const deleteCurrentLead = (data) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.PLAN_DELETE,
        extraObject: {
          message: `Are you sure you want to delete this plan?`,
          selectedPlanId: data.id,
        },
      })
    );
  };

  const openEditNewLead = (data) => {
    dispatch(
      openModal({
        title: "Edit plan",
        bodyType: MODAL_BODY_TYPES.PLAN_EDIT,
        extraObject: {
          selectedPlanId: data.id,
          name: data.name,
          desc: data.desc,
          usageTime: data.usageTime,
          cost: data.cost,
        },
      })
    );
  };

  return (
    <>
      <TitleCard
        title="Plan List"
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
                <th>Plan</th>
                <th>Description</th>
                <th>Created Date</th>
                <th>Status</th>
                <th>Delete</th>
                <th>Edit</th>
              </tr>
            </thead>
            {Array.isArray(planData) && planData.length > 0 ? (
              <tbody>
                {visiblePlans?.map((l, index) => {
                  return (
                    <tr key={l.id}>
                      <td>{l.id}</td>
                      <td>
                        {" "}
                        <div className="flex items-center space-x-3">
                          <div>
                            <div className="font-bold">{l.name}</div>
                          </div>
                        </div>
                      </td>
                      <td>{l.desc}</td>
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
              <p>No value</p>
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
              disabled={startIndex + itemsPerPage >= planData?.length}
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

export default Plan;
