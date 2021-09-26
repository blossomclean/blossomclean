import React from 'react';
import PropTypes from 'prop-types';

const UploadFile = ({ id, fileName, onUpload }) => {
  return (
    <div className="input-group">
      <div className="upload">
        <label className="upload-button" htmlFor={id}>
          {fileName}
          <input
            accept=".doc,.docx,.pdf,.png, .jpg, .jpeg"
            id={id}
            type="file"
            name={id}
            onChange={onUpload}
          />
        </label>
      </div>
    </div>
  );
};

export default UploadFile;
UploadFile.propTypes = {
  id: PropTypes.string.isRequired,
  fileName: PropTypes.string,
  onUpload: PropTypes.func.isRequired,
};
