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
import { useQuery } from "@tanstack/react-query";
import { getPlaylistList } from "../../Axios/Apis/playlist/playlist";

const TopSideButtons = () => {
  const dispatch = useDispatch();

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
      <button
        className="btn px-6 btn-sm normal-case btn-primary"
        onClick={() => openAddNewLeadModal()}
      >
        Add New
      </button>
    </div>
  );
};

function Playlist() {
  const dispatch = useDispatch();
  const itemsPerPage = 5; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const {
    data: playlist,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getPLaylistList"],
    queryFn: async () => {
      try {
        const result = await getPlaylistList();
        return result;
      } catch (error) {
        throw new Error(`Error fetching genre: ${error.message}`);
      }
    },
  });
  const startIndex = (currentPage - 1) * itemsPerPage;
  const playlistData = playlist?.data?.items;
  const visibleLeads = playlistData?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const deleteCurrentLead = (index) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete this user?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.LEAD_DELETE,
          index,
        },
      })
    );
  };

  return (
    <>
      <TitleCard
        title="Playlist List"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
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
                <th></th>
              </tr>
            </thead>
            <tbody>
              {visibleLeads?.map((l, index) => {
                const leadIndex = startIndex + index;
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
                        onClick={() => deleteCurrentLead(index)}
                      >
                        <TrashIcon className="w-5" />
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
              disabled={startIndex + itemsPerPage >= playlistData?.length}
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
