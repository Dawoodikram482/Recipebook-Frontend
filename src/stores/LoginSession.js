import {defineStore} from 'pinia'
import axios from '../axios-auth'

export const useLoginSessionStore = defineStore('loginSession', {
    state: () => ({
        jwt: '',
        firstName: '',
        emailAddress: '',
    }),
    getters: {
        isLoggedIn: (state) => state.jwt !== '',
        getFirstName: (state) => state.firstName,
        getEmailAddress: (state) => state.username,
    },
    actions: {
        localLogin() {
            if (localStorage['jwt']) {
                this.jwt = localStorage['jwt'];
                this.firstName = localStorage['firstName'];
                this.username = localStorage['username'];
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
                    localStorage['username'] = response.data.name;
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage['jwt'];
                    resolve();
                }).catch((error) => {
                    reject(error.response.data.errorMessage);
                })
            });
        },
        logout() {
            this.jwt = '';
            this.firstName = '';
            localStorage.removeItem('jwt');
            localStorage.removeItem('firstName');
            localStorage.removeItem('emailAddress');
            delete axios.defaults.headers.common['Authorization'];
        }
    },
})