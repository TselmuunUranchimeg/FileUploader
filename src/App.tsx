import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import axiosDefault from "./Extras/axios";

interface FileListInterface {
    list: FileList | null;
}

const FileList = ({ list }: FileListInterface) => {
    if (!list) {
        return (
            <div className = "hidden"></div>
        )
    }

    const files = [...list];

    return (
        <div className = "flex flex-col w-full">
            {files.map((val, ind) => {
                return (
                    <div key = {ind} className = "w-full">
                        <p className = "text-center font-medium">{ind + 1}. {val.name}</p>
                    </div>
                )
            })}
        </div>
    )
}

function App() {
    const [fileList, setFiles] = useState<FileList | null>(null);

    const uploadFiles = async (e: ChangeEvent<HTMLInputElement>) => {
        setFiles(e.target.files);
    }

    const sendFile = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            if (fileList) {
                const formData = new FormData();
                const files = [...fileList];
                files.forEach(file => {
                    formData.append("files", file, file.name);
                });
                const res = await axiosDefault.post("/upload", formData);
                if (res.status < 300) {
                    alert("Successfull saved files.");
                    setFiles(null);
                    const input = document.getElementById("files") as HTMLInputElement;
                    input.value = "";
                }
                return;
            }
            alert("There are no files to upload!");
        }
        catch (e) {
            if (axios.isAxiosError(e)) {
                console.log(e.message);
                alert("Something has gone wrong with the server, please wait a few minutes.");
            }
        }
    }

    return (
        <div className = "w-screen h-screen bg-black text-white flex flex-col">
            <h1 className = "text-blue-500 text-4xl font-bold text-center mt-[10%]">
                File uploader project
            </h1>
            <form 
                onSubmit = {async e => await sendFile(e)}
                className = "w-full flex flex-col box-border pt-10 justify-center items-center"
            >
                <input 
                    id = "files"
                    type = "file" 
                    placeholder = "Upload your file here"
                    onChange = {async (e) => await uploadFiles(e)}
                    multiple 
                    name = "files"
                    className = "block w-4/5 text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-10"
                />
                <FileList list = { fileList }/>
                <div className = "w-full flex justify-center mt-10">
                    <button 
                        type = "submit"
                        className = "bg-blue-500 text-xl font-bold py-[0.4rem] px-5"
                    >
                        Upload
                    </button>
                </div>
            </form>
        </div>
    );
}

export default App;
