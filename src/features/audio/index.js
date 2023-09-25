import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import PlusCircleIcon from "@heroicons/react/24/outline/PlusCircleIcon";
import { getNextAudioList } from "../../Axios/Apis/audio/audio";
import { useQuery } from "@tanstack/react-query";

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openAddNewLeadModal = () => {
    dispatch(
      openModal({
        title: "Add New Audio",
        bodyType: MODAL_BODY_TYPES.AUDIO_ADD_NEW,
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

function Audio() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: audio, refetch } = useQuery({
    queryKey: ["getAudioList"],
    queryFn: async () => {
      try {
        const result = await getNextAudioList(currentPage);
        return result;
      } catch (error) {
        throw new Error(`Error fetching audio: ${error.message}`);
      }
    },
  });
  const dispatch = useDispatch();
  const [visibleAudio, setVisibleAudio] = useState([]);
  const audioData = audio?.data?.items;
  const maxPage = audio?.data?.meta?.totalPages - 1;
  const [audios, setAudio] = useState(audioData);

  useEffect(() => {
    const fetchData = async () => {
      await refetch();
    };

    fetchData();
  }, [currentPage, refetch]);

  useEffect(() => {
    const newVisibleAudio = audios?.slice();
    setVisibleAudio(newVisibleAudio);
  }, [audios, currentPage]);

  useEffect(() => {
    setAudio(audioData);
  }, [audio, audioData]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const deleteCurrentLead = (data) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.AUDIO_DELETE,
        extraObject: {
          message: `Are you sure you want to delete this user?`,
          selectedAudioId: data.id,
        },
      })
    );
  };

  const AddAudioToPlaylist = (data) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.PLAYLIST_AUDIO_ADD,
        extraObject: {
          message: `Are you sure you want to delete this user?`,
          selectedAudioId: data.id,
        },
      })
    );
  };

  return (
    <>
      <TitleCard
        title="Audio List"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        {/* Leads List in table format loaded from slice after api call */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Id</th>
                <th>Audio</th>
                <th>Liked</th>
                <th>Status</th>
                <th>Delete</th>
                <th>Add into Playlist</th>
              </tr>
            </thead>
            {audioData ? (
              <tbody>
                {visibleAudio?.map((l, index) => {
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
                          </div>
                        </div>
                      </td>
                      <td>{l.liked}</td>
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
                          onClick={() => AddAudioToPlaylist(l)}
                        >
                          <PlusCircleIcon className="w-5" />
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

export default Audio;
