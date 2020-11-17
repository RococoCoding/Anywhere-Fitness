import axios from 'axios';

export const axiosWithAuth =() => {
    const token = localStorage.getItem('token');

    return axios.create({
        headers: {
            Authorization: token, //OR Authorization: `Bearer ${token}`, // have to check api

        },
    });
};
