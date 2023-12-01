import axios from 'axios'

 const MENTOR_BASE_REST_API_URL ="http://localhost:8080/api/mentor";

 class MentorService {

    getAllMentors(){

        return axios.get(MENTOR_BASE_REST_API_URL)
    }

    createMentor(mentor){
        return axios.post(MENTOR_BASE_REST_API_URL , mentor)
    }

    getMentorById(id){
        return axios.get(MENTOR_BASE_REST_API_URL+'/'+id);
    }
     updateMentor(id, mentor){
        return axios.put(MENTOR_BASE_REST_API_URL + '/' +id,mentor)
     }

     deleteMentor(id){
        return axios.delete(MENTOR_BASE_REST_API_URL + '/' +id)
     }
    
 }

 export default new MentorService();