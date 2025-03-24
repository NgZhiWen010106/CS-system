import { faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import {
  getAdminFiles,
  getAdminFolders,
} from '../../../redux/actionCreators/filefoldersActionCreators.js';
import SubNav from '../SubNav.js/index.jsx';

const FolderAdminComponent = () => {
  const { folderId } = useParams();

  const { files, folders, isLoading } = useSelector(
    (state) => ({
      folders: state.filefolders.adminFolders,
      files: state.filefolders.adminFiles,
      isLoading: state.filefolders.isLoading,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (isLoading && (!folders || !files)) {
      dispatch(getAdminFolders());
      dispatch(getAdminFiles());
    }
  }, [dispatch, isLoading]);
  const adminFiles =
    files && files.filter((file) => file.data.parent === folderId);

  const currentFolder =
    folders && folders.find((folder) => folder.docId === folderId);
  if (isLoading) {
    return (
      <Row>
        <Col md="100">
          <h1 className="text-center my-5">Fetching data...</h1>
        </Col>
      </Row>
    );
  }
  return (
    <>
      <SubNav currentFolder={currentFolder} />
      <Row>
        <Col md="12">
          <p className="text-center border-bottom py-2">Uploaded Files</p>
          <div className="d-flex flex-wrap justify-content-start align-items-start pt-2  gap-2 pb-4 px-5">
            {!files ? (
              <h1 className="text-center">Fetching Files....</h1>
            ) : (
              adminFiles.map(({ data, docId }) => (
                <Col
                  onDoubleClick={() => {
                    if (data.url) {
                      window.open(data.url, '_blank');
                    } else {
                      alert('File not present');
                    }
                  }}
                  onClick={(e) => {
                    if (e.currentTarget.classList.contains('text-white')) {
                      e.currentTarget.style.background = '#fff';
                      e.currentTarget.classList.remove('text-white');
                      e.currentTarget.classList.remove('shadow-sm');
                    } else {
                      e.currentTarget.style.background = '#017bf562';
                      e.currentTarget.classList.add('text-white');
                      e.currentTarget.classList.add('shadow-sm');
                    }
                  }}
                  key={docId}
                  md={2}
                  className="border h-1000 mr-2 d-flex align-items-center justify-content-around flex-column py-1 rounded-2">
                  <FontAwesomeIcon
                    icon={faFile}
                    className="mt-3" 
                    style={{ fontSize: '3rem' }}
                  />
                  <p className="text-center mt-3">{data.name}</p>
                  <p>Submitted by: {data.yourName}</p>
                  <p>Submitted date: {data.createdAt}</p>
                </Col>
              ))
            )}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default FolderAdminComponent;
