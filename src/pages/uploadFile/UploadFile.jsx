import React, { useState } from "react";
import { faFileUpload, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Button, Form, Modal, ProgressBar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { storage } from "../../API/firebase";
import { addFileUser } from "../../redux/actionCreators/filefoldersActionCreators";

const UploadFile = ({ currentFolder }) => {
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [progress, setProgress] = useState(0);
  const [yourName, setYourName] = useState(""); // State for yourName
  const [createdAt, setCreatedAt] = useState(""); // State for createdAt

  const dispatch = useDispatch();
  const { userId, userFiles, user } = useSelector(
    (state) => ({
      userId: state.auth.userId,
      userFiles: state.filefolders.userFiles,
      user: state.auth.user,
    }),
    shallowEqual
  );

  const handleFileSubmit = (e) => {
    e.preventDefault();
    if (!file) return toast.dark("Please add file name!");
    const fileExtension = file.name.split(".").reverse()[0];
    const allowedExtensions = [
      "html",
      "php",
      "js",
      "jsx",
      "txt",
      "xml",
      "css",
      "c",
      "cpp",
      "java",
      "cs",
      "py",
      "json",
      "ppt",
      "pptx",
      "docx",
      "png",
      "jpg",
      "jpeg",
      "gif",
      "svg",
      "mp3",
      "mp4",
      "webm",
      "pdf",
    ];

    if (allowedExtensions.indexOf(fileExtension) === -1) {
      return toast.dark(`File with extension ${fileExtension} not allowed!`);
    }
    const filteredFiles =
      currentFolder === "root folder"
        ? userFiles.filter(
            (file) =>
              file.data.parent === "" &&
              file.data.name === fileName.split("\\").reverse()[0]
          )
        : userFiles.filter(
            (file) =>
              file.data.parent === currentFolder.docId &&
              file.data.name === fileName.split("\\").reverse()[0]
          );
    if (filteredFiles.length > 0)
      return toast.dark("This is alredy present in folder");

    const uploadFileRef = storage.ref(`files/${userId}/${file.name}`);

    uploadFileRef.put(file).on(
      "state_change",
      (snapshot) => {
        const newProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(newProgress);
      },
      (error) => {
        return toast.error(error.message);
      },
      async () => {
        const url = await uploadFileRef.getDownloadURL();
        if (currentFolder === "root folder") {
          dispatch(
            addFileUser({
              createdAt: createdAt, // Store createdAt value
              uid: userId,
              parent: "",
              data: "",
              yourName: yourName, // Use yourName state here
              name: file.name,
              url: url,
              path: [],
            })
          );
          setFile("");
          setProgress(0);
          setShowModal(false);
          return;
        }

        const path =
          currentFolder.data.path.length > 0
            ? [
                ...currentFolder.data.path,
                { id: currentFolder.docId, name: currentFolder.data.name },
              ]
            : [{ id: currentFolder.docId, name: currentFolder.data.name }];

        dispatch(
          addFileUser({
            createdAt: createdAt, // Store createdAt value
            uid: userId,
            parent: currentFolder.docId,
            data: "",
            name: file.name,
            yourName: yourName, // Use yourName state here
            url: url,
            path: path,
          })
        );
        setFile("");
        setProgress(0);
        setShowModal(false);
        return;
      }
    );
  };

  const handleModalOpen = () => {
    // Get only the date portion (YYYY-MM-DD) of the current date
    const currentDate = new Date().toISOString().split("T")[0];
    // Set the createdAt state to the current date
    setCreatedAt(currentDate);
    // Set yourName state with user's name
    if (user && user.data && user.data.name) {
      setYourName(user.data.name);
    }
    // Show the modal
    setShowModal(true);
  };

  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header>
          <Modal.Title>
            {progress && progress !== 100
              ? "Uploading..."
              : progress === 100
              ? "Uploaded"
              : "Upload File"}
          </Modal.Title>
          <Button
            variant="white"
            style={{ cursor: "pointer" }}
            onClick={() => setShowModal(false)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        </Modal.Header>
        <Modal.Body>
          {progress && progress !== 100 ? (
            <ProgressBar now={progress} label={`${progress}%`} />
          ) : progress === 100 ? (
            <h2>File Uploaded Successfully</h2>
          ) : (
            <Form onSubmit={handleFileSubmit} encType="multipart/form-data">
              <Form.Group controlId="formYourName" className="my-2">
                <Form.Control
                  type="text"
                  value={yourName}
                  readOnly
                  className="mb-4"
                />
              </Form.Group>
              <Form.Group controlId="formCurrentDate" className="my-2">
                <Form.Label>Current Date</Form.Label>
                <Form.Control
                  type="text"
                  value={createdAt}
                  readOnly
                  className="mb-4"
                />
              </Form.Group>
              <Form.Group controlId="formBasicFolderName" className="my-2">
                <input
                  type="file"
                  className="file"
                  onChange={(e) => {
                    setFileName(e.target.value);
                    setFile(e.target.files[0]);
                  }}
                  custom="true"
                />
              </Form.Group>
              <Form.Group controlId="formBasicFolderSubmit" className="mt-5">
                <Button
                  type="submit"
                  className="form-control"
                  variant="primary"
                >
                  Upload File
                </Button>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
      </Modal>
      <Button
        onClick={handleModalOpen} // Open modal with handleModalOpen
        variant="outline-dark"
        className="border-1 d-flex align-items-center justify-content-between rounded-2"
      >
        <FontAwesomeIcon icon={faFileUpload} />
        &nbsp; Upload File
      </Button>
    </>
  );
};

export default UploadFile;
