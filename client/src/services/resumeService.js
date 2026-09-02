import api from "./axios";

export async function showResumes(){
    try{
        const resumes = await api.get("/resume");
        return resumes.data
    }
    catch (error){
        throw error
    }
}

export async function deleteResume(id){
    try{
        const responce = await api.delete(`/resume/${id}`)
        return responce
    }
    catch(error){
        throw error
    }
}