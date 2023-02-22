import React from "react";
import ReactDOM from "react-dom";
import "./ImageModal.css";

const ImageModal = ({ image, isShown, close }) =>
  isShown
    ? ReactDOM.createPortal(
        <>
          <div className="modal-overlay" />
          <div
            className="modal-wrapper"
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
          >
            <div className="modal">
              <div className="modal-header">
                <button
                  type="button"
                  className="modal-close-button"
                  data-dismiss="modal"
                  aria-label="close"
                  onClick={close}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <p>{image?.user?.name}</p>
            </div>
          </div>
        </>,
        document.body
      )
    : null;

export default ImageModal;
