"use client";

import React from "react";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  loading:boolean
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete Confirmation",
  message = "Are you sure you want to delete this item? This action cannot be undone.",
  loading
}) => {
  if (!isOpen) return null;


  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity animate-fadeIn">
      {/* Background overlay to close modal */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all border border-gray-100 animate-scaleUp">
        
        {/* Icon and Title */}
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:h-10 sm:w-10">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </div>
          
          <div className="mt-0 text-left">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              {title}
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500 leading-relaxed">
                {message}
              </p>
            </div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="mt-6 flex flex-row gap-3 justify-end">
          <button
            disabled={loading}
            type="button"
            onClick={onClose}
            className="inline-flex w-full justify-center rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-colors duration-200 sm:w-auto"
          >
            Cancel
          </button>
          <button
            disabled={loading}
            type="button"
            onClick={onConfirm}
            className="inline-flex w-full justify-center rounded-xl disabled:bg-red-400 bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 transition-colors duration-200 sm:w-auto"
          >
            {loading?'Deleting...':'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;