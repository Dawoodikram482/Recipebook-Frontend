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
            if (localStorage['jwt']) {
                this.jwt = localStorage['jwt'];
                this.firstName = localStorage['firstName'];
                this.emailAddress = localStorage['emailAddress'];
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage['jwt'];
            }
        },
        login(username, password) {
            return new Promise((resolve, reject) => {
                axios.post("users/login", {
                    username: username,
                    password: password,
                }).then((response) => {
                    this.jwt = response.data.jwt;
                    localStorage['jwt'] = response.data.jwt;
                    localStorage['firstName'] = response.data.name;
                    localStorage['emailAddress'] = response.data.email;
                    this.firstName = response.data.name;
                    this.emailAddress = response.data.email;
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage['jwt'];
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
