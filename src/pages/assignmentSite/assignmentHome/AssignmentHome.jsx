import {
    faFileImage,
    faFileAlt,
    faFileAudio,
    faFileVideo,
    faFolder,
  } from '@fortawesome/free-solid-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import React, { useEffect, useState } from 'react';
  import { Col, Row, Table } from 'react-bootstrap';
  import { shallowEqual, useDispatch, useSelector } from 'react-redux';
  import { useHistory } from 'react-router-dom';
  import { Button } from '@material-tailwind/react';
  import {
    getAdminFiles,
    getAdminFolders,
    getUserFiles,
    getUserFolders,
  } from '../../../redux/actionCreators/filefoldersActionCreators.js';
  import SubNav from '../SubNav.js/index.jsx';
  
  const AssignmentHome = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [isPart1Active, setIsPart1Active] = useState(true);

    const { isLoading, adminFolders, allUserFolders, userId, allUserFiles, user } =
      useSelector(
        (state) => ({
          isLoading: state.filefolders.isLoading,
          adminFolders: state.filefolders.adminFolders,
          allUserFolders: state.filefolders.userFolders,
          allUserFiles: state.filefolders.userFiles,
          userId: state.auth.userId,
          user: state.auth.user,
        }),
        shallowEqual
      );
  
    const userFolders =
      allUserFolders &&
      allUserFolders.filter((folder) => folder.data.parent === '');
  
    const createdUserFiles =
      allUserFiles &&
      allUserFiles.filter(
        (file) => file.data.parent === '' && file.data.url === ''
      );

    const uploadedUserFiles =
      allUserFiles &&
      allUserFiles.filter(
        (file) => file.data.parent === '' && file.data.url !== ''
      );

    const countFilesInFolder = (folderId) => {
      if (!allUserFiles) {
        return 0; // Return 0 if allUserFiles is null or undefined
      }
      return allUserFiles.filter(file => file.data.parent === folderId).length;
    };

    const togglePart = () => {
      setIsPart1Active(!isPart1Active);
    };
  
    useEffect(() => {
      if (isLoading && !adminFolders) {
        dispatch(getAdminFolders());
        dispatch(getAdminFiles());
      }
      if (!userFolders) {
        dispatch(getUserFiles(userId));
        dispatch(getUserFolders(userId));
      }
    }, [dispatch, isLoading]);
  
    if (isLoading) {
      return (
        <Row>
          <Col md="12">
            <h1 className="text-center my-5">Fetching folders...</h1>
          </Col>
        </Row>
      );
    }
  
    return (
      <>
        <div style={{ display: isPart1Active ? 'block' : 'none' }}>
          <SubNav currentFolder="root folder" />
          {adminFolders && adminFolders.length > 0 && (
            <>
              <p className="text-center border-bottom py-2">All Folders</p>
              <Row style={{ height: 'auto' }} className="pt-2 pb-4 px-5">
                {adminFolders.map(({ data, docId }) => (
                  <Col
                    onDoubleClick={() =>
                      history.push(`/dashboard/folder/admin/${docId}`)
                    }
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
                    className="border h-1000 d-flex align-items-center justify-content-around flex-column py-1 rounded-2">
                    <FontAwesomeIcon
                      icon={faFolder}
                      className="mt-3"
                      style={{ fontSize: '3rem' }}
                    />
                    <p className="text-center mt-3">{data.name}</p>
                    <p>Due Date: {data.formattedDueDate}</p>
                  </Col>
                ))}
              </Row>
            </>
          )}
          {uploadedUserFiles && uploadedUserFiles.length > 0 && (
            <>
              <p className="text-center border-bottom py-2">Uploaded Files</p>
              <Row
                md="2"
                style={{ height: 'auto' }}
                className="pt-2  gap-2 pb-4 px-5">
                {uploadedUserFiles.map(({ data, docId }) => (
                  <Col
                    onDoubleClick={() => history.push(`/dashboard/file/${docId}`)}
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
                      icon={
                        data.name
                          .split('.')
                          [data.name.split('.').length - 1].includes('png') ||
                        data.name
                          .split('.')
                          [data.name.split('.').length - 1].includes('jpg') ||
                        data.name
                          .split('.')
                          [data.name.split('.').length - 1].includes('jpeg') ||
                        data.name
                          .split('.')
                          [data.name.split('.').length - 1].includes('svg') ||
                        data.name
                          .split('.')
                          [data.name.split('.').length - 1].includes('gif')
                          ? faFileImage
                          : data.name
                              .split('.')
                              [data.name.split('.').length - 1].includes('mp4') ||
                            data.name
                              .split('.')
                              [data.name.split('.').length - 1].includes('mpeg')
                          ? faFileVideo
                          : data.name
                              .split('.')
                              [data.name.split('.').length - 1].includes('mp3')
                          ? faFileAudio
                          : faFileAlt
                      }
                      className="mt-3"
                      style={{ fontSize: '3rem' }}
                    />
                    <p className="text-center mt-3">{data.name}</p>
                    <p>Submitted by: {data.yourName}</p>
                    <p>Submitted date: {data.createdAt}</p>
                  </Col>
                ))}
              </Row>
            </>
          )}
        </div>

        <div style={{ display: !isPart1Active ? 'block' : 'none' }}>
          <div className="container mx-auto px-4 py-10 max-w-7xl my-5">
            <div className="relative overflow-x-auto shadow-md sm:rounded-xl">
              {/* table  */}
              <table className="w-full border-2 border-white shadow-md text-sm text-left text-gray-500 dark:text-gray-400" >
                {/* thead  */}
                <thead style ={{ background: 'rgba(30,41,59,255)', color: 'white' }} className="text-xs ">
                  <tr>
                    <th style={{ background: 'rgba(30,41,59,255)', color: 'white'  }} scope="col" className="px-6 py-3">No.</th>
                    <th style={{ background: 'rgba(30,41,59,255)', color: 'white'  }} scope="col" className="px-6 py-3">Folder Name</th>
                    <th style={{ background: 'rgba(30,41,59,255)', color: 'white'  }} scope="col" className="px-6 py-">Number of Submitted Files</th>
                  </tr>
                </thead>
                <tbody>
                  {adminFolders.slice(0).reverse().map(({ data, docId }, index) => (
                    <tr key={docId} className=" border-b-2" >
                      <td style={{ color: 'black' }} className="px-6 py-4">{index + 1}</td>
                      <td style={{ color: 'black' }} className="px-6 py-4">{data.name}</td>
                      <td style={{ color: 'black' }} className="px-6 py-4">{countFilesInFolder(docId)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {user.data.name !== "Admin" && (
        <div style={{ marginTop: '250px'}}>
        <hr style={{ borderTop: '1px solid black', margin: '20px 0' }}/>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
            <Button
              onClick={togglePart}
              style={{ background: 'rgba(30, 41, 59, 255)', color: 'white' }}
              className='px-8 py-2'
            >
              {isPart1Active ? 'Show Table' : 'Show Folder'}
            </Button>
          </div>
        </div>
        )}
      </>
    );
  };
  
  export default AssignmentHome;
  