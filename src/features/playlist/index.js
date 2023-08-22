import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import { MODAL_BODY_TYPES } from "../../utils/globalConstantUtil";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import { useQuery } from "@tanstack/react-query";
import { getPlaylistList } from "../../Axios/Apis/playlist/playlist";
import PencilSquareIcon from "@heroicons/react/24/outline/PencilSquareIcon";
import FunnelIcon from "@heroicons/react/24/outline/FunnelIcon";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import SearchBar from "../../components/Input/SearchBar";

import PlusCircleIcon from "@heroicons/react/24/outline/PlusCircleIcon";

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
        title: "Add New Playlist",
        bodyType: MODAL_BODY_TYPES.PLAYLIST_ADD_NEW,
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
          className="btn px-6 btn-sm normal-case btn-primary mt-2"
          onClick={() => openAddNewLeadModal()}
        >
          Add New
        </button>
      </div>
    </div>
  );
};

function Playlist() {
  const { data: playlist, refetch } = useQuery({
    queryKey: ["getPLaylistList"],
    queryFn: async () => {
      try {
        const result = await getPlaylistList(currentPage);
        return result;
      } catch (error) {
        throw new Error(`Error fetching genre: ${error.message}`);
      }
    },
  });
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [visiblePlaylist, setVisiblePlaylist] = useState([]);

  const playlistData = playlist?.data?.items;
  const [playlists, setPlaylists] = useState(playlistData);
  const maxPage = playlist?.data?.meta?.totalPages - 1;

  useEffect(() => {
    const fetchData = async () => {
      await refetch();
    };

    fetchData();
  }, [currentPage, refetch]);

  useEffect(() => {
    const newVisiblePlaylist = playlists?.slice();
    setVisiblePlaylist(newVisiblePlaylist);
  }, [playlists, currentPage]);

  useEffect(() => {
    setPlaylists(playlistData);
  }, [playlistData]);

  const removeFilter = () => {
    setPlaylists(playlistData);
  };

  const applyFilter = (status) => {
    let filteredTransactions = playlistData.filter((t) => {
      return t.status === status;
    });

    setPlaylists(filteredTransactions);
  };

  const applySearch = (value) => {
    let searchedPlaylists = playlistData.filter((playlist) => {
      return (
        playlist.name.toLowerCase().includes(value.toLowerCase()) ||
        playlist.author.firstName.toLowerCase().includes(value.toLowerCase()) ||
        playlist.author.lastName.toLowerCase().includes(value.toLowerCase()) ||
        playlist.id.toString().includes(value.toLowerCase())
      );
    });
    setPlaylists(searchedPlaylists);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const deleteCurrentLead = (data) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.PLAYLIST_DELETE,
        extraObject: {
          message: `Are you sure you want to delete this user?`,
          selectedPlaylistId: data.id,
        },
      })
    );
  };

  const AddAudioToPlaylist = (data) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.AUDIO_PLAYLIST_ADD,
        extraObject: {
          message: `Are you sure you want to delete this user?`,
          selectedPlaylistId: data.id,
        },
      })
    );
  };

  const openEditNewLead = (data) => {
    dispatch(
      openModal({
        title: "Edit Playlist",
        bodyType: MODAL_BODY_TYPES.PLAYLIST_EDIT,
        extraObject: {
          selectedPlaylistId: data.id,
          name: data.name,
          description: data.description,
          imageUrl: data.imageUrl,
          status: data.status,
        },
      })
    );
  };

  return (
    <>
      <TitleCard
        title="Playlists"
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
                <th>Playlist</th>
                <th>Updated Date </th>
                <th>Status </th>
                <th>Delete</th>
                <th>Edit</th>
                <th>Add into Playlist</th>
              </tr>
            </thead>
            <tbody>
              {visiblePlaylist?.map((l, index) => {
                return (
                  <tr key={l.id}>
                    <td>{l.id}</td>
                    <td>
                      {" "}
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={l.imageUrl} alt="Avatar" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{l.name}</div>
                          <div className="font">
                            {l.author.lastName} {l.author.firstName}
                          </div>
                        </div>
                      </div>
                    </td>
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
                    <td>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => AddAudioToPlaylist(l)}
                      >
                        <PlusCircleIcon className="w-5" />
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
              disabled={currentPage > maxPage}
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

export default Playlist;
