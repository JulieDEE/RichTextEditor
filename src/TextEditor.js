import React, { useState } from 'react';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import draftToHtml from 'draftjs-to-html';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChromePicker } from 'react-color';



const TextEditor = () => {

    const [content, setContent] = useState(null);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [text, setText] = useState(""); 
    const [activeButtons, setActiveButtons] = useState([
        { label: 'B', style: 'BOLD', icon: 'fas fa-bold', active: false, bloc: false },
        { label: 'I', style: 'ITALIC', icon: 'fas fa-italic', active: false, bloc: false },
        { label: 'U', style: 'UNDERLINE', icon: 'fas fa-underline', active: false, bloc: false },
        { label: 'OL', style: 'ordered-list-item', icon: 'fas fa-list-ol', active: false, bloc: true },
        { label: 'UL', style: 'unordered-list-item', icon: 'fas fa-list-ul', active: false, bloc: true },
    ]);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [color, setColor] = useState('#000000');





  
  const handleEditorChange = (newState) => {
      setEditorState(newState);

      // Update active button states
      const currentStyle = newState.getCurrentInlineStyle();
      const newActiveButtons = activeButtons.map((button) => {
          if (button.style === 'BOLD') {
              return { ...button, active: currentStyle.has('BOLD') };
          }
          if (button.style === 'ITALIC') {
              return { ...button, active: currentStyle.has('ITALIC') };
          }
          if (button.style === 'UNDERLINE') {
              return { ...button, active: currentStyle.has('UNDERLINE') };
          }
          return button;
      });
      setActiveButtons(newActiveButtons);
  };

  const handleNavButtonClick = (button) => {
        
        // set active state
        const newActiveButtons = [...activeButtons];
        const index = newActiveButtons.findIndex((b) => b.label === button.label);
        newActiveButtons[index].active = !newActiveButtons[index].active;
        setActiveButtons(newActiveButtons);

        // set style
        if (button.bloc) {
            setEditorState(RichUtils.toggleBlockType(editorState, button.style));
        } else {
            setEditorState(RichUtils.toggleInlineStyle(editorState, button.style));
        }

    }
  
  const handleColorPickerClick = () => {
      setShowColorPicker(!showColorPicker);
  };

  const handleColor = (color) => { 
    console.log(color); // #ff0000
      setEditorState(RichUtils.toggleInlineStyle(editorState, `color-${color}`))
  }


    // OnClick to save content
    const handleSaveButtonClick = () => {
        const contentState = editorState.getCurrentContent();
        const rawContentState = convertToRaw(editorState.getCurrentContent());
        const contentToHtmlString = draftToHtml(rawContentState);
        setText(contentToHtmlString); 
    };
    
    function replaceEmptyParagraphsWithNewLines(htmlString) {
    const regex = /<p><\/p>/g;
    return htmlString.replace(regex, '<br/>');
    }
  
    

  return (
    <div className='border border-gray-200 rounded-xl w-9/12 shadow-md' >
      <div className='flex  p-4 justify-between rounded-t-xl border'> 
          <div className='buttonWrap flex gap-8'>
              {activeButtons.map((button, index) => {
                      return (
                          <button onClick={() => handleNavButtonClick(button)} className={`py-1 px-3 border rounded ${button.active ? "active" : ""} `}>
                              <FontAwesomeIcon icon={button.icon} />
                          </button>
                      )
              })}
          <button onClick={handleColorPickerClick}>
              <FontAwesomeIcon icon="fas fa-palette" />
          </button>
          </div>
      </div>
         <div className="color-picker">
    {showColorPicker && (
        <ChromePicker
            color={color}
            onChange={(newColor) => {
              setColor(newColor.hex);
              handleColor(newColor.hex)
            }}
        />
    )}
</div>


      <Editor 
            editorState={editorState}
            onChange={handleEditorChange}
            style={{ borderWidth: "1px", borderColor: "black" }}
            placeholder="Contenu de l'article..."

          />

          
    </div>
  );
};

export default TextEditor;

