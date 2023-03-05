import './App.scss';
import Toggle from './Toggle';
import Ribbon from './Ribbon';
import TextEditor from './TextEditor';
import Article from './Article';
import { useState, useEffect } from 'react';
import Editor from './Editor';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBold, faUnderline, faItalic, faCheck, faSave, faEye, faInfoCircle, faImage, faTrash, faListOl, faListUl, faPalette } from '@fortawesome/free-solid-svg-icons';
import ArticleCreate from './ArticleCreate';
library.add(faBold, faUnderline, faItalic, faCheck, faSave, faEye, faInfoCircle, faImage, faTrash, faListOl, faListUl, faPalette);


function App() {

  return (
    <div className='wrapper'>
        <ArticleCreate />
    </div>
  );
}

export default App;
