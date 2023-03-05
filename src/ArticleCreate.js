import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextEditor from './TextEditor';
import { useState, useEffect } from 'react';
import { Tooltip,  } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'



const ArticleCreate = () => {

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
        <div className=" w-full flex justify-center items-center mt-20">
            <div className="bg-white w-10/12  shadow-xl  rounded-2xl mb-44">
                <div className="border-b border-zinc-200 flex items-center justify-between py-10 px-14">
                    <p className='text-3xl '>Nouvel Article </p>
                    <div className="flex gap-8">
                        <div className='flex gap-2'>
                            <button className='py-2 px-4 rounded-2xl preview flex items-center justify-center gap-2'>
                                <FontAwesomeIcon icon="fas fa-eye" />
                                Visualiser
                            </button>
                            <button className='py-2 px-4 rounded-2xl save flex items-center justify-center gap-2'>
                                <FontAwesomeIcon icon="fas fa-save" />
                                Sauvegarder
                            </button>
                        </div>
                        <button className="py-2 px-4 rounded-2xl flex items-center justify-center gap-2 text-white publish">
                            <FontAwesomeIcon icon="fas fa-check" />
                            Publier
                        </button>
                    </div>
                </div>
                <div className='flex flex-col py-6 px-14'>
                    <div className='flex items-center gap-2 text-xl mb-4'>
                        <FontAwesomeIcon icon="fas fa-info-circle" />
                        <h2>Informations</h2>
                    </div>

                    <div className='flex flex-col gap-4'>
                        <div>
                            <h4 className='text-lg'>Titre *</h4>
                            <p className=' text-sm italic text-gray-400'>250 caractères max</p>
                        </div>
                        <input type="text" placeholder="Titre de l'article..." className='w-9/12 p-4 shadow-md rounded-lg border border-gray-200' />
                    </div>

                    <div className='flex flex-col gap-4 mt-8'>
                        <h4 className='text-lg'>Description *</h4>
                        <TextEditor />
                    </div>

                    <div className='flex flex-col gap-4 mt-8'>
                        <h4 className='text-lg'>Image *</h4>
                        {image ? (
                            <div className="flex items-center w-9/12 border border-dashed border-gray-200 rounded-lg p-4  ">
                                <div className='w-full h-full relative showCover'>
                                    <img src={image} alt="article image" className='w-full h-full object-cover' />
                                    <div className='imageFilter'>
                                        <div>
                                            <button data-tooltip-content="Modifier l'image" data-tooltip-id="image-btn" className='py-2 px-6 rounded edit relative'>
                                                <label htmlFor="file-upload2" className='absolute top-0 left-0 w-full h-full cursor-pointer'></label>
                                                <FontAwesomeIcon icon="fas fa-image" />
                                            </button>
                                            <Tooltip id="image-btn" place="top" />
                                            <div className="hidden">
                                                <input
                                                id="file-upload2"
                                                type="file"
                                                className="sr-only cursor-pointer"
                                                onChange={handleFileChange}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <button onClick={() => setImage(false)} data-tooltip-content="Supprimer l'image" data-tooltip-id="trash-btn" className='py-2 px-6 rounded trash'>
                                                <FontAwesomeIcon icon="fas fa-trash" />
                                            </button>
                                            <Tooltip id="trash-btn" place="top" />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center w-9/12 h-30 border border-dashed border-gray-200 rounded-lg p-4 ">
                                <div className=" rounded flex items-center justify-between  w-full">
                                    <div className='flex items-center gap-6'>
                                        <div className=' bg-gray-100 rounded-lg flex justify-center items-center p-4'>
                                            <FontAwesomeIcon icon="fas fa-image" />
                                        </div>
                                        <div>
                                            <p className='text-gray-500'>Choisissez une image pour illustrer l'article</p>
                                            <p className='text-gray-400'> JPG, PNG, GIF (600 x 400px)</p>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="file-upload" className=" cursor-pointer py-2 px-4 rounded-2xl upload flex items-center justify-center gap-2 text-gray-500 ">
                                            Insérer votre image
                                        </label>
                                    </div>
                                </div>
                                <div className="hidden">
                                    <input
                                    id="file-upload"
                                    type="file"
                                    className="sr-only cursor-pointer"
                                    onChange={handleFileChange}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )




}

export default ArticleCreate; 