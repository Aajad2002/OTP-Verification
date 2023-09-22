import React, { useState } from 'react'
import Table from './table';
import LineChart from './LineChart';
import Filter from './Filter';

const Upload = () => {
    const [fileContent, setFileContent] = useState('');
    const [{ topWords, topCoOccurrences, word, data }, setContent] = useState({})
    const [preview, setPreview] = useState(false)
    const [file, setFile] = useState(null)
    const [change, setChange] = useState(true)
    const handleFileChange = (e) => {
        const files = e.target.files[0];
        setFile(files);
        if (files) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const text = event.target.result;
                console.log('File content:', text); // Add this line for debugging
                setFileContent(text);
                setPreview(true)
            };

            reader.readAsText(files, 'UTF-8');
        }
    }


    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('https://txt-file-reader.onrender.com/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setContent(data);
                setChange(false); // Assuming you want to update the 'change' state
                console.log(data);
            } else {
                alert('File upload failed.');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('An error occurred while uploading the file.');
        }
    };
    return (

        <div>
            {
                change ? <div className='flex items-center justify-center flex-col  min-h-[100vh] '>
                    <div className="flex items-center justify-center md:w-1/2 w-[80%]">
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                            <div className="flex flex-col items-center justify-center px-4 pt-5 pb-6">
                                <svg className="w-8 h-8 mb-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500">Text files only (e.g., .txt)</p>
                            </div>
                            <input id="dropzone-file" type="file" className="hidden" accept=".txt" onChange={handleFileChange} />
                        </label>
                    </div>
                    {preview ? <div className="p-4 bg-white shadow-md rounded-lg m-4 md:w-1/2 w-full">
                        <h2 className="text-center text-xl font-bold mb-2">File Preview</h2>
                        <p className='text-justify'>{fileContent}</p>
                    </div> : ""}

                    <button type="button" onClick={handleSubmit} className="text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600  focus:outline-none dark:focus:ring-blue-800">Upload</button>
                </div > : <div className='flex md:flex-row flex-col w-full' >
                    <div className="p-4 bg-white shadow-md rounded-lg m-4 md:w-1/2 w-full">
                        <h2 className="text-center text-xl font-bold mb-2">Uploaded file</h2>
                        <p className='text-justify'>{data}</p>
                    </div>
                    <div className='md:w-1/2 py-8 w-full px-4'>
                        <div className='w-full'>
                            <Filter data={word} />
                        </div>

                        <div className='flex justify-between md:flex-row flex-col w-full px-0 md:px-6' >
                            <Table data={topWords} caption={"Top 5 mostly occurred"} />
                            <Table data={topCoOccurrences} caption={"Top 5 mostly co-occurred words"} />
                        </div>
                        <div>
                            <LineChart words={word} />

                        </div>
                    </div>
                </div>
            }

        </div>
    )
}

export default Upload