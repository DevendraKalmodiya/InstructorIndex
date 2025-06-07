import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const RichTextEditor = ({ input, setInput }) => {
  // Internal state as fallback if setInput is not provided
  const [internalDescription, setInternalDescription] = useState("");
  
  // Use external input if provided, otherwise use internal state
  const description = input?.description || internalDescription;

  const handleChange = (value) => {
    // Check if setInput function exists
    if (typeof setInput === 'function') {
      setInput(prevInput => ({
        ...prevInput,
        description: value
      }));
    } else {
      // Use internal state as fallback
      setInternalDescription(value);
    }
  };

  return (
    <div>
      <textarea
        value={description}
        onChange={e => handleChange(e.target.value)}
        placeholder="Enter course description here"
        className="w-full p-2 border rounded"
        rows={6}
      />
    </div>
  );
};

// Default props to prevent errors
RichTextEditor.defaultProps = {
  input: { description: "" },
  setInput: null
};

export default RichTextEditor;