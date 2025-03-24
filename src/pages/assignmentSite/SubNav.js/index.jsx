import React from 'react';
import { Col } from 'react-bootstrap';
import CreateFile from '../../createFile/CreateFile';
import CreateFolder from "../../createFolder/CreateFolder";
import UploadFile from "../../uploadFile/UploadFile";
import BreadCrum from '../BreadCrum.js/index.jsx';

const SubNav = ({ currentFolder }) => {
  return (
    <Col
      md={12}
      className={'d-flex align-items-center px-5 pt-3 justify-content-between'}>
      {currentFolder && currentFolder !== 'root folder' ? (
        <>
          <BreadCrum currentFolder={currentFolder} />
          <div className="ml-auto col-md-5 d-flex justify-content-end">
            <UploadFile currentFolder={currentFolder} />
            &nbsp;
            <CreateFolder currentFolder={currentFolder} />
          </div>
        </>
      ) : (
        <>
          <p>Root</p>
          <div className="ml-auto col-md-5 d-flex justify-content-end">
            <UploadFile currentFolder={currentFolder} />
            &nbsp;
            <CreateFolder currentFolder={currentFolder} />
          </div>
        </>
      )}
    </Col>
  );
};

export default SubNav;
