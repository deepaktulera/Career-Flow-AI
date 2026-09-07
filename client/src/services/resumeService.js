import api from "./axios";

export async function showResumes(){
    try{
        const responce = await api.get("/resume");
        return responce.data
    }
    catch (error){
        return error.message
    }
}

export async function showMyResume(id){
    try{
        const responce = await api.get(`/resume/${id}`)
        return responce.data
    }
    catch(error){
        return error
    }
}

export async function createResume(data){
    try{
        const responce = await api.post("/resume/create" , data)
        return responce
    }
    catch(error){
        return error
    }
}

export async function updateResume(id , data){
    try{
        const responce = await api.patch(`/resume/${id}` , data)
        return responce
    }
    catch(error){
        return error
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