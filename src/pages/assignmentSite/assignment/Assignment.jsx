import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";

import AssignmentHome from "../assignmentHome/AssignmentHome";
import FolderAdminComponent from "../folderAdminComponent/FolderAdminComponent";
import FolderComponent from "../folderComponent/FolderComponent";
import Layout from '../../../components/layout/Layout';

const Assignment = () => {
  const history = useHistory();
  const { path } = useRouteMatch();

  const { isLoggedIn } = useSelector(
    (state) => ({
      isLoggedIn: state.auth.isLoggedIn,
    }),
    shallowEqual
  );
  useEffect(() => {
    if (!isLoggedIn) {
      history.push("/login");
    }
  }, [isLoggedIn]);
  return (
    <Layout>
      <Container fluid className="px-0" style={{ overflowX: "hidden" }}>
        
        <Switch>
          <Route exact path={path} component={AssignmentHome} />
          <Route
            exact
            path={`${path}/folder/admin/:folderId`}
            component={FolderAdminComponent}
          />
          <Route
            exact
            path={`${path}/folder/:folderId`}
            component={FolderComponent}
          />
          
        </Switch>
      </Container>
    </Layout>
  );
};

export default Assignment;
