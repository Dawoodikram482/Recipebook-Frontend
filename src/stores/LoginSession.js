import { defineStore } from 'pinia';
import axios from '../axios-auth';

export const useLoginSessionStore = defineStore('loginSession', {
    state: () => ({
        jwt: '',
        firstName: '',
        emailAddress: '',
    }),
    getters: {
        getFirstName: (state) => state.firstName,
        getEmailAddress: (state) => state.emailAddress,
        isLoggedIn: (state) => state.jwt !== '',
    },
    actions: {
        localLogin() {
            if (localStorage.getItem('jwt')) {
                this.jwt = localStorage.getItem('jwt');
                this.firstName = localStorage.getItem('firstName');
                this.emailAddress = localStorage.getItem('emailAddress');
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.jwt;
            }
        },
        login(username, password) {
            return new Promise((resolve, reject) => {
                axios.post("users/login", {
                    username: username,
                    password: password,
                }).then((response) => {
                    this.jwt = response.data.jwt;
                    localStorage.setItem('jwt', response.data.jwt);
                    localStorage.setItem('firstName', response.data.name);
                    localStorage.setItem('emailAddress', response.data.email);
                    this.firstName = response.data.name;
                    this.emailAddress = response.data.email;
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.jwt;
                    resolve();
                }).catch((error) => {
                    reject(error.response.data.errorMessage);
                });
            });
        },
        logout() {
            this.jwt = '';
            this.firstName = '';
            this.emailAddress = '';
            localStorage.removeItem('jwt');
            localStorage.removeItem('firstName');
            localStorage.removeItem('emailAddress');
            delete axios.defaults.headers.common['Authorization'];
        }
    },
});
