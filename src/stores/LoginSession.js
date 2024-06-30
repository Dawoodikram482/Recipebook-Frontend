import { defineStore } from 'pinia';
import axios from '../axios-auth';

export const useLoginSessionStore = defineStore('loginSession', {
    state: () => ({
        jwt: '',
        firstName: '',
        emailAddress: '',
        role: '',
    }),
    getters: {
        getFirstName: (state) => state.firstName,
        getEmailAddress: (state) => state.emailAddress,
        isLoggedIn: (state) => state.jwt !== '',
        getRole: (state) => state.role
    },
    actions: {
        localLogin() {
            if (localStorage.getItem('jwt')) {
                this.jwt = localStorage.getItem('jwt');
                this.firstName = localStorage.getItem('firstName');
                this.emailAddress = localStorage.getItem('emailAddress');
                this.role = localStorage.getItem('role');
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
                    localStorage.setItem('role', response.data.role);
                    this.firstName = response.data.name;
                    this.emailAddress = response.data.email;
                    this.role = response.data.role;
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
