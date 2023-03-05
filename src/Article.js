import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { useState } from 'react';
import draftToHtml from 'draftjs-to-html';
import test from "./images/test.png"


const Article = ({text, setText}) => {

    function replaceEmptyParagraphsWithNewLines(htmlString) {
        const regex = /<p><\/p>/g;
        return htmlString.replace(regex, '<br/>');
    }
  
  const [image, setImage] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };



  return (
    <div className='w-1/2 border-2 border-stone-500 p-4 rounded'>
      <div>
        {image ? (
          <div className=' bg-red-200 w-full h-80 rounded-t overflow-hidden'>
            <img src={image} className="h-full w-full cover" alt="article image" />
          </div>
        ) : (
          <div className="flex justify-center items-center w-full h-60 border border-dashed border-slate-400 rounded ">
              <div className=" bg-gray-300 p-6 rounded flex justify-center items-center cursor-pointer">
                  <label htmlFor="file-upload" className="text-center cursor-pointer">
                    Insérer votre image
                  </label>
                  <div className="flex justify-center items-center">
                    <input
                      id="file-upload"
                      type="file"
                      className="sr-only cursor-pointer"
                      onChange={handleFileChange}
                    />
                  </div>
              </div>
        </div>
      )}
      </div>
      <div className=' bg-slate-600 p-4'>
        <h2 className='text-center font-bold'>Titre de l'article </h2>
      </div>
      <div className=' bg-white p-4'>
        <div dangerouslySetInnerHTML={{ __html: replaceEmptyParagraphsWithNewLines(text) }}></div>
      </div>
      </div>
  );
};

export default Article;
