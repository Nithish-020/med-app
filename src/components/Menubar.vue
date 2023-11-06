<template>
    <div>
        <v-app-bar dense flat class="primary elevation-1 align-center">
            <v-flex>
                <v-chip class="white--text primary d-flex align-center" elevation="0">
                    <v-icon class="pr-2 white--text" size="20">mdi-medical-bag</v-icon>
                    <span class="subtitle-2">MEDAPP</span>
                </v-chip>
            </v-flex>
            <!--* Clock  -->
            <v-flex>
                <v-btn dense color="black" rounded disabled>
                    <Clock class="mt-4"/>
                </v-btn>                
            </v-flex>
            <v-flex>
                <div class="d-none d-lg-block">
                    <v-flex class="d-flex justify-space-between align-center mr-2 justify-md-space-between">
                        <v-chip disable dense>
                            <v-icon left color="black">
                                mdi-account-circle
                            </v-icon>
                            <span class="font-weight-bold ">{{ $store.state.temporary.username }}</span>
                        </v-chip>
                        <v-btn v-show="stockView" to="/stockview" small rounded class="mx-5">
                            <v-icon size="15" class="mr-1">mdi-file-find</v-icon>
                            Stock View
                        </v-btn>
                        <v-btn v-show="billEntry" to="/billentry" small rounded class="mx-5">
                            <v-icon size="15" class="mr-1">mdi-cart</v-icon>
                            Bill billEntry
                        </v-btn>
                        <v-btn v-show="dashboard" to="/dashboard" small rounded class="mx-5">
                            <v-icon size="15" class="mr-1">mdi-view-dashboard</v-icon>
                            Dashboard
                        </v-btn>
                        <v-btn v-show="stockEntry" to="/stockentry" small rounded class="mx-5">
                            <v-icon class="mr-1" size="15">mdi-table-edit</v-icon>
                            Stock Entry
                        </v-btn>
                        <v-btn v-show="salesReport" to="/salesreport" small rounded class="mx-5">
                            <v-icon size="15" class="mr-1">mdi-file-chart</v-icon>
                            Sales Report
                        </v-btn>
                        <v-btn v-show="addUser" to="/adduser" small rounded class="mx-5">
                            <v-icon size="15" class="mr-1">mdi-account-edit</v-icon>
                            Add User
                        </v-btn>
                        <v-btn v-show="loginHistory" to="/loginhistory" small rounded class="mx-5">
                            <v-icon size="15" class="mr-1">mdi-history</v-icon>
                            Login History
                        </v-btn>
                        <v-btn small rounded @click="dialog = !dialog">
                            <v-icon class="mr-1" size="15">mdi-logout</v-icon>
                            Logout
                        </v-btn>

                    </v-flex>
                </div>
            </v-flex>
            <!--TODO Drop Down menu -->
            <v-flex class="d-flex justify-end" lg2>
                <div class="d-lg-none">
                    <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn color="primary" elevation="0" v-bind="attrs" v-on="on" icon>
                                <v-icon class="white--text pa-10">mdi-menu</v-icon>
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
                                <v-list-item-title class="d-flex align-center">
                                    <v-icon size="18" left>{{ link.icon }}</v-icon>
                                    {{ link.text }}
                                </v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                                <v-btn small color="warning" rounded @click="dialog = !dialog">
                                    <v-icon class="mr-1" size="15">mdi-logout</v-icon>
                                    Logout
                                </v-btn>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </div>
            </v-flex>
        </v-app-bar>

        <v-dialog v-model="dialog" width="400" persistent>
            <v-card width="400">
                <v-card-text class="d-flex justify-space-between align-center pa-10">
                    <span class="text-subtitle-1 black--text">You want to Logout ?</span>
                    <v-btn @click="dialog = !dialog" class="red white--text" small>Cancel</v-btn>
                    <v-btn @click="logout" color="primary" small>Sure</v-btn>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import Clock from "./Clock.vue";
import Eventservice from "../services/EventServices"
export default {
    name: "menubar",
    data() {
        return {
            stockView: false,
            billEntry: false,
            dashboard: false,
            stockEntry: false,
            salesReport: false,
            addUser: false,
            loginHistory: false,
            dialog: false,
            show: false,
            response: "",
            log_out: {
                user_id: 0
            },
            links: []
        }
    },
    methods: {
        logout() {
            this.log_out.user_id = this.$store.state.temporary.user_id;
            Eventservice.Logout(this.log_out)
                .then((response) => {
                    this.response = response.data.Status
                })
                .catch((error) => {
                    console.log(error)
                });
            this.$store.commit("setStore", {
                user_id: "",
                username: "",
                role: "",
            })

            this.dialog = !this.dialog
            this.$router.push("/");
        },
        roledisp() {
            this.links = [];
            if (this.role == "biller") {
                this.hide();
                this.billEntry = true;
                this.dashboard = true;
                this.stockView = true;
                this.links.push(
                    { icon: 'mdi-view-dashboard', text: 'Dashboard', route: '/dashboard' },
                    { icon: 'mdi-file-find', text: 'Stock View', route: '/stockview' },
                    { icon: 'mdi-cart', text: 'Bill Entry', route: '/billentry' },
                )
            }
            if (this.role == "manager") {
                this.hide();
                this.dashboard = true;
                this.stockView = true;
                this.stockEntry = true;
                this.salesReport = true;
                this.links.push(
                    { icon: 'mdi-view-dashboard', text: 'Dashboard', route: '/dashboard' },
                    { icon: 'mdi-file-find', text: 'Stock View', route: '/stockview' },
                    { icon: 'mdi-table-edit', text: 'Stock Entry', route: '/stockentry' },
                    { icon: 'mdi-file-chart', text: 'Sales Report', route: '/salesreport' },
                )
            }
            if (this.role == "admin") {
                this.hide();
                this.addUser = true,
                    this.loginHistory = true;
                this.dashboard = true;
                this.links.push(
                    { icon: 'mdi-view-dashboard', text: 'Dashboard', route: '/dashboard' },
                    { icon: 'mdi-account-edit', text: 'Add User', route: '/adduser' },
                    { icon: 'mdi-history', text: 'Login History', route: '/loginhistory' }
                )
            }
            if (this.role == "inventory") {
                this.hide();
                this.dashboard = true;
                this.stockView = true;
                this.stockEntry = true;
                this.links.push(
                    { icon: 'mdi-view-dashboard', text: 'Dashboard', route: '/dashboard' },
                    { icon: 'mdi-file-find', text: 'Stock View', route: '/stockview' },
                    { icon: 'mdi-table-edit', text: 'Stock Entry', route: '/stockentry' },
                )
            }
        },
        hide() {
            this.stockView = false;
            this.billEntry = false;
            this.dashboard = false;
            this.stockEntry = false;
            this.salesReport = false;
            this.addUser = false;
            this.loginHistory = false;
        },

    },
    props: {
        role: String
    },
    watch: {
        role: function () {
            if (this.role != "") {
                this.roledisp()

            } else if (this.role == "") {
                this.$router.push("/")
            }
        }
    },
    components: {
        Clock
    }
}
</script>