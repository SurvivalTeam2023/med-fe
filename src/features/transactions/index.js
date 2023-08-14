import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import FunnelIcon from "@heroicons/react/24/outline/FunnelIcon";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import SearchBar from "../../components/Input/SearchBar";
import { getTransContent } from "./tranSlice";

const TopSideButtons = ({ removeFilter, applyFilter, applySearch }) => {
  const [filterParam, setFilterParam] = useState("");
  const [searchText, setSearchText] = useState("");

  const showFiltersAndApply = (params) => {
    applyFilter(params);
    setFilterParam(params);
  };

  useEffect(() => {
    if (searchText === "") {
      removeAppliedFilter();
    } else {
      applySearch(searchText);
    }
  }, [searchText]);
  const removeAppliedFilter = () => {
    removeFilter();
    setFilterParam("");
    setSearchText("");
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
            <button onClick={() => showFiltersAndApply("EXPIRED")}>
              Expired
            </button>
          </li>

          <div className="divider mt-0 mb-0"></div>
          <li>
            <button onClick={() => removeAppliedFilter()}>Remove Filter</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

function Transactions() {
  let { trans } = useSelector((state) => state.tran);
  const [filteredTrans, setFilteredTrans] = useState([]);
  const itemsPerPage = 5; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const startIndex = (currentPage - 1) * itemsPerPage;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTransContent());
  }, []);

  useEffect(() => {
    setFilteredTrans(trans);
  }, [trans]);

  const visibleTrans = filteredTrans.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const removeFilter = () => {
    setFilteredTrans(trans);
  };

  const applyFilter = (status) => {
    let filteredTransactions = trans.filter((t) => {
      return t.status === status;
    });

    setFilteredTrans(filteredTransactions);
  };

  // Search according to name
  const applySearch = (value) => {
    let filteredTransactions = trans.filter((t) => {
      return (
        t.user.email.toLowerCase().includes(value.toLowerCase()) ||
        t.user.username.toLowerCase().includes(value.toLowerCase()) ||
        t.plan.name.toLowerCase().includes(value.toLowerCase()) ||
        t.id.toLowerCase().includes(value.toLowerCase())
      );
    });
    setFilteredTrans(filteredTransactions);
  };

  return (
    <>
      <TitleCard
        title="Recent Transactions"
        topMargin="mt-2"
        TopSideButtons={
          <TopSideButtons
            applySearch={applySearch}
            applyFilter={applyFilter}
            removeFilter={removeFilter}
          />
        }
      >
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Price</th>
                <th>Status</th>
                <th>Username</th>
                <th>Email</th>
                <th>Created Date</th>
                <th>End Date</th>
              </tr>
            </thead>
            <tbody>
              {visibleTrans?.map((l, k) => {
                return (
                  <tr key={k}>
                    <td>{l.id}</td>
                    <td>{l.plan.name}</td>
                    <td>{l.plan.cost}$</td>
                    <td>{l.status}</td>
                    <td>{l.user.username}</td>
                    <td>{l.user.email}</td>
                    <td>{moment(l.createdAt).format("DD/MM/YYYY")}</td>
                    <td>{moment(l.endDate).format("DD/MM/YYYY")}</td>
                  </tr>
                );
              })}
            </tbody>
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
              disabled={startIndex + itemsPerPage >= filteredTrans?.length}
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

export default Transactions;
