import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useSelector, useDispatch } from "react-redux";
import { DocumentText_Action } from "../Actions/CreateDocumentActions";

function DocumentEditor() {
  let Text = useSelector((state) => state.CreateDocumentReducer.text);
  const [stateText, setText] = useState(Text);
  const dispatch = useDispatch();
  const ViewDocument = useSelector(
    (state) => state.CreateDocumentReducer.viewDocument
  );
  useEffect(() => {
    dispatch(DocumentText_Action(stateText));
    return () => {
      console.log("unmount from editor");
    };
  }, [stateText]);

  return (
    <div>
      {ViewDocument ? (
        <div className="editor">
          <CKEditor
            editor={ClassicEditor}
            data={stateText}
            disabled
            readOnly={true}
          />
        </div>
      ) : (
        <div className="editor">
          <CKEditor
            editor={ClassicEditor}
            data={stateText}
            onChange={(event, editor) => {
              const data = editor.getData();
              setText(data);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default DocumentEditor;
