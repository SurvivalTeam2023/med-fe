import { useEffect } from "react";
import { MODAL_BODY_TYPES } from "../utils/globalConstantUtil";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../features/common/modalSlice";
import AddLeadModalBody from "../features/leads/components/AddLeadModalBody";
import ConfirmationModalBody from "../features/common/components/ConfirmationModalBody";
import EditLeadModalBody from "../features/leads/components/EditLeadModalBody";
import AddGenreModalBody from "../features/genre/components/AddGenreModalBody";
import AddPlaylistModalBody from "../features/playlist/components/AddPlaylistModalBody";
import EditGenreModalBody from "../features/genre/components/EditGenreModalBody";
import EditPlaylistModalBody from "../features/playlist/components/EditPlaylistModalBody";
import DeletePlaylistModalBody from "../features/playlist/components/DeletePlaylistModalBody";
import DeleteGenreModalBody from "../features/genre/components/DeleteGenreModalBody";
import AddMentalHealthModalBody from "../features/mentalHealth/components/AddMentalHealthModalBody";
import EditMentalHealthModalBody from "../features/mentalHealth/components/EditMentalHealthModalBody";
import DeleteMentalHealthModalBody from "../features/mentalHealth/components/DeleteMentalHealthModalBody";
import AddQuestionModalBody from "../features/question/components/AddQuestionModalBody";
import AddAudioModalBody from "../features/audio/components/AddAudioModalBody";
import DeleteAudioModalBody from "../features/audio/components/DeleteAudioModalBody";
import AddPlaylistToAudioModalBody from "../features/audio/components/AddPlaylistToAudioModalBody";
import AddAudioToPlaylistModalBody from "../features/playlist/components/AddAudioToPlaylistModalBody";

function ModalLayout() {
  const { isOpen, bodyType, size, extraObject, title } = useSelector(
    (state) => state.modal
  );
  const dispatch = useDispatch();

  const close = (e) => {
    dispatch(closeModal(e));
  };

  return (
    <>
      {/* The button to open modal */}

      {/* Put this part before </body> tag */}
      <div className={`modal ${isOpen ? "modal-open" : ""}`}>
        <div className={`modal-box  ${size === "lg" ? "max-w-5xl" : ""}`}>
          <button
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => close()}
          >
            ✕
          </button>
          <h3 className="font-semibold text-2xl pb-6 text-center">{title}</h3>

          {/* Loading modal body according to different modal type */}
          {
            {
              [MODAL_BODY_TYPES.LEAD_ADD_NEW]: (
                <AddLeadModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.LEAD_EDIT]: (
                <EditLeadModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.GENRE_ADD_NEW]: (
                <AddGenreModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.GENRE_EDIT]: (
                <EditGenreModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.PLAYLIST_ADD_NEW]: (
                <AddPlaylistModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.MENTALHEALTH_ADD_NEW]: (
                <AddMentalHealthModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.PLAYLIST_EDIT]: (
                <EditPlaylistModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.CONFIRMATION]: (
                <ConfirmationModalBody
                  extraObject={extraObject}
                  closeModal={close}
                />
              ),
              [MODAL_BODY_TYPES.PLAYLIST_DELETE]: (
                <DeletePlaylistModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.GENRE_DELETE]: (
                <DeleteGenreModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.MENTALHEALTH_EDIT]: (
                <EditMentalHealthModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.MENTALHEALTH_DELETE]: (
                <DeleteMentalHealthModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.QUESTION_ADD_NEW]: (
                <AddQuestionModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.AUDIO_ADD_NEW]: (
                <AddAudioModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.AUDIO_DELETE]: (
                <DeleteAudioModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.PLAYLIST_AUDIO_ADD]: (
                <AddPlaylistToAudioModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.AUDIO_PLAYLIST_ADD]: (
                <AddAudioToPlaylistModalBody
                  closeModal={close}
                  extraObject={extraObject}
                />
              ),
              [MODAL_BODY_TYPES.DEFAULT]: <div></div>,
            }[bodyType]
          }
        </div>
      </div>
    </>
  );
}

export default ModalLayout;
