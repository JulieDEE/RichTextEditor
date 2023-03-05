
import React, { useState } from 'react';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import draftToHtml from 'draftjs-to-html';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const TextEditor = ({ text, setText }) => {
  
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    // const [text, setText] = useState(""); 

    
  // Fonction de gestion pour mettre à jour l'état de l'éditeur de texte lors de la modification du texte
  const handleEditorChange = (newState) => {
    setEditorState(newState);
  };

  // Fonction de gestion pour appliquer des styles de mise en forme à la sélection actuelle
  const handleStyleButtonClick = (style) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  // Fonction de gestion pour appliquer des styles de mise en forme à la sélection actuelle
  const handleBlockTypeButtonClick = (blockType) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  // Fonction pour enregistrer le contenu de l'éditeur de texte dans le localStorage
  const handleSaveButtonClick = () => {
      const contentState = editorState.getCurrentContent();
      const rawContentState = convertToRaw(editorState.getCurrentContent());
        const markup = draftToHtml(
        rawContentState, 
        );
    const contentStateJSON = JSON.stringify(convertToRaw(contentState));
      localStorage.setItem('content', contentStateJSON);
      setText(markup); 

    // Envoyer contentStateJSON à une base de données ou à un serveur via une requête HTTP
  };
  // Fonction pour charger le contenu de l'éditeur de texte depuis le localStorage
    const loadContent = () => {
        const rawContentState = JSON.parse(localStorage.getItem('content'));
        if (rawContentState !== null) {
        const contentState = convertFromRaw(rawContentState);
        setEditorState(EditorState.createWithContent(contentState));
        }
    };
    
 

  return (
    <div className='border border-gray-200 rounded-xl w-9/12 shadow-md' >
      <div className='flex  p-4 justify-between rounded-t-xl border'> 
          <div className='buttonWrap flex gap-8'>
            <button onClick={() => handleStyleButtonClick('BOLD')}>
              <FontAwesomeIcon icon="fa-solid fa-bold" />
              </button>
            <button onClick={() => handleStyleButtonClick('ITALIC')}>
              <FontAwesomeIcon icon="fa-solid fa-italic" />
              </button>
            <button onClick={() => handleStyleButtonClick('UNDERLINE')}>
              <FontAwesomeIcon icon="fa-solid fa-underline" />
              </button>
          </div>
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
