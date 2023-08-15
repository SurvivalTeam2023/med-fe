import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import { getLeadsContent } from "./leadSlice";
import { MODAL_BODY_TYPES } from "../../utils/globalConstantUtil";
import PencilSquareIcon from "@heroicons/react/24/outline/PencilSquareIcon";
import SearchBar from "../../components/Input/SearchBar";

const TopSideButtons = ({ applySearch }) => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    applySearch(searchText);
  }, [searchText]);

  const openAddNewLeadModal = () => {
    dispatch(
      openModal({
        title: "Add New User",
        bodyType: MODAL_BODY_TYPES.LEAD_ADD_NEW,
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
      <button
        className="btn px-6 btn-sm normal-case btn-primary"
        onClick={() => openAddNewLeadModal()}
      >
        Add New
      </button>
    </div>
  );
};

function Leads() {
  const { leads } = useSelector((state) => state.lead);
  const dispatch = useDispatch();
  const itemsPerPage = 5; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);
  const [userInfo, setuserInfo] = useState(leads);

  useEffect(() => {
    setuserInfo(leads);
  }, [leads]);

  const applySearch = (value) => {
    const searchedUser = leads.filter((user) => {
      const userFullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      const authorFullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      const userEmail = user.email.toLowerCase();

      return (
        userFullName.includes(value.toLowerCase()) ||
        authorFullName.includes(value.toLowerCase()) ||
        userEmail.includes(value.toLowerCase()) ||
        user.id.toString().includes(value.toLowerCase())
      );
    });

    setuserInfo(searchedUser);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleLeads = userInfo?.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    dispatch(getLeadsContent());
  }, []);

  const openEditNewLead = (data) => {
    dispatch(
      openModal({
        title: "Edit User",
        bodyType: MODAL_BODY_TYPES.LEAD_EDIT,
        extraObject: {
          selectedLeadId: data.id,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          city: data.city,
          address: data.address,
          dob: data.dob,
        },
      })
    );
  };

  return (
    <>
      <TitleCard
        title="Users List"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons applySearch={applySearch} />}
      >
        {/* Leads List in table format loaded from slice after api call */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Id</th>
                <th>Username</th>
                <th>Email </th>
                <th>First Name </th>
                <th>Last Name </th>

                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {visibleLeads.map((l, index) => {
                const leadIndex = startIndex + index;
                return (
                  <tr key={l.id}>
                    <td>{l.id}</td>
                    <td>{l.username}</td>
                    <td>{l.email}</td>
                    <td>{l.firstName}</td>
                    <td>{l.lastName}</td>

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

                    <td>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => {
                          openEditNewLead(l.id);
                        }}
                      >
                        <PencilSquareIcon className="w-5" />
                      </button>
                    </td>
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
              disabled={startIndex + itemsPerPage >= leads.length}
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

export default Leads;
