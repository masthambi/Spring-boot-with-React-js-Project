import axios from "axios"

const REST_API_BASE_URL='http://localhost:8080/api/batchs';

export const listOfBatchs = () =>axios.get(REST_API_BASE_URL);  

export const createBatch = (batch) => {
    return axios.post(REST_API_BASE_URL, batch, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

export const getBatch=(batchId)=>axios.get(REST_API_BASE_URL + '/' + batchId);

export const UpdateBatch = (batchId, batch) => axios.put(REST_API_BASE_URL + '/' + batchId, batch);
        
export const deleteBatch=(batchId)=> axios.delete(REST_API_BASE_URL + '/'+ batchId);






  


