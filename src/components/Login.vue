<template>
    <v-container class="fill-height">
        <v-row class="align-center justify-center fill-height" dense>
            <v-col cols="12" sm="8" md="4" lg="4">
                <v-card elevation="0">
                    <div class="text-center">
                        <h4 class="text-h4">Enterprise Data Service</h4>
                        <h5 class="text-h5">IoT Operation Platform<v-badge color="black" content="dev-phase-ii" inline>
                            </v-badge>
                        </h5>

                    </div>
                    <v-card-text>
                        <v-form>
                            <v-text-field label="Enter your username" name="email" prepend-inner-icon="mdi-email"
                                type="email" class="rounded-0" outlined v-model="uname" @keyup.enter="auth">
                            </v-text-field>
                            <v-text-field label="Enter your password" name="password" prepend-inner-icon="mdi-lock"
                                type="password" outlined v-model="pwd" @keyup.enter="auth"></v-text-field>
                            <v-btn block color="success" @click="auth">
                                Sign In
                            </v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import LoginApi from '../services/LoginApi'
export default {
    name: "Login",
    data() {
        return {
            dialog: false,
            uname: "",
            pwd: ""
        }
    },
    methods: {
        singleMovie(id) {
            this.$router.push('/movie/' + id)
        },
        auth() {
            if (this.uname == "" || this.pwd == "") {
                this.$swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'User or Password Is Empty'
                })
            } else {
                LoginApi.AuthenEDSS({ username: this.uname, password: this.pwd })
                    .then(response => {
                        localStorage.setItem('username', this.uname);
                        localStorage.setItem('token', response.token);
                        localStorage.setItem('refreshToken', response.refreshToken);
                        localStorage.removeItem('current_pj');
                        this.$router.push('/device/all');
                    })
                    .catch(error => {
                        console.log(error)
                        this.$swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Authentication failed'
                        })
                    })
            }
        }
    }
};
</script>
 
 <style>
 </style>
 