import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import { showNotification } from "../common/headerSlice";
import { getGenreList } from "../../Axios/Apis/genre/genre";
import { useQuery } from "@tanstack/react-query";
import PencilSquareIcon from "@heroicons/react/24/outline/PencilSquareIcon";
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
        title: "Add New Genre",
        bodyType: MODAL_BODY_TYPES.GENRE_ADD_NEW,
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

function Genre() {
  const dispatch = useDispatch();
  const { data: genre } = useQuery({
    queryKey: ["getGenreList"],
    queryFn: async () => {
      try {
        const result = await getGenreList();
        return result;
      } catch (error) {
        throw new Error(`Error fetching genre: ${error.message}`);
      }
    },
  });
  const itemsPerPage = 5; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const genreData = genre?.data;
  const [genres, setGenres] = useState(genreData);
  const visibleGenres = genres?.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setGenres(genreData);
  }, [genreData]);

  const removeFilter = () => {
    setGenres(genreData);
  };

  const applyFilter = (status) => {
    let filteredGenres = genreData.filter((t) => {
      return t.status === status;
    });

    setGenres(filteredGenres);
  };

  // Search according to name
  const applySearch = (value) => {
    let filteredGenres = genreData.filter((genre) => {
      return (
        genre.name.toLowerCase().includes(value.toLowerCase()) ||
        genre.desc.toLowerCase().includes(value.toLowerCase()) ||
        genre.id.toString().includes(value.toLowerCase())
      );
    });
    setGenres(filteredGenres);
  };

  const deleteCurrentLead = (data) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.GENRE_DELETE,
        extraObject: {
          message: `Are you sure you want to delete this Genre?`,
          selectedGenreId: data.id,
        },
      })
    );
  };

  const openEditNewLead = (data) => {
    dispatch(
      openModal({
        title: "Edit Genre",
        bodyType: MODAL_BODY_TYPES.GENRE_EDIT,
        extraObject: {
          selectedGenreId: data.id,
          name: data.name,
          desc: data.desc,
          image: data.image,
          status: data.status,
          emotion: data.emotion,
        },
      })
    );
  };

  return (
    <>
      <TitleCard
        title="Genre List"
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
                <th>Genre</th>
                <th>Emotion</th>
                <th>Created Date</th>
                <th>Status</th>
                <th>Delete</th>
                <th>Edit</th>
              </tr>
            </thead>
            {Array.isArray(genreData) && genreData.length > 0 ? (
              <tbody>
                {visibleGenres?.map((l, index) => {
                  const leadIndex = startIndex + index;
                  return (
                    <tr key={l.id}>
                      <td>{l.id}</td>
                      <td>
                        {" "}
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img src={l.image} alt="Avatar" />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{l.name}</div>
                          </div>
                        </div>
                      </td>
                      <td>{l.emotion}</td>
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
              disabled={startIndex + itemsPerPage >= genreData?.length}
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

export default Genre;
