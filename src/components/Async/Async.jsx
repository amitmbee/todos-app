import * as React from "react";

// constants
import { IN_PROGRESS, SUCCESS, FAILED } from "constants/loader";

// components
import Loader from "components/Loader/Loader";
import Alert from "components/Alert/Alert";


const Async = ({ uiState, onSuccess, onFailure, onProgress, error }) => {
  return (
    <React.Fragment>
      {uiState === IN_PROGRESS && onProgress()}
      {uiState === SUCCESS && onSuccess()}
      {uiState === FAILED && error && onFailure(error)}
    </React.Fragment>
  );
};

Async.defaultProps = {
  onProgress: () => <Loader />,
  onFailure: ({ message }) => <Alert message={message} />,
};

export default Async;
