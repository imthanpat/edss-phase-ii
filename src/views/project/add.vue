<template>
    <v-card class="mx-auto">
        <v-toolbar color="default">
            <v-toolbar-title>Add New Project</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <p class="text-title text--primary">
                Project-Name <span class="text--red">*</span>
            </p>
            <v-text-field class="ma-5" v-model="name" :counter="255" :rules="nameRules" label="Project-Name" required></v-text-field>
            <p class="text-title text--primary">
                Device-Type
            </p>
            <v-row class="ma-12">
                <v-col cols="12" sm="4" md="4">
                    <v-checkbox v-model="ex4" label="A-Box" value="abox" hide-details>
                    </v-checkbox>
                    <v-checkbox v-model="ex4" label="W-Box" value="wbox" hide-details>
                    </v-checkbox>
                    <v-checkbox v-model="ex4" label="VA-Box" value="vabox" hide-details>
                    </v-checkbox>
                </v-col>
                <v-col cols="12" sm="4" md="4">
                    <v-checkbox v-model="ex4" label="R-Box" value="rbox" hide-details></v-checkbox>
                    <v-checkbox v-model="ex4" label="TH-Box" value="thbox" hide-details>
                    </v-checkbox>
                </v-col>
            </v-row>
            <v-col class="mt-5 mb-5" cols="12">
                <v-btn @click="submitEvent" color="success" :disabled="isSubmit">
                    submit
                </v-btn>
                <v-btn class="ml-4" @click="resetEvent">
                    Reset
                </v-btn>
            </v-col>
        </v-card-text>

        <v-expand-transition>
            <v-card v-if="reveal" class="transition-fast-in-fast-out v-card--reveal" style="height: 100%;">
                <v-card-text class="pb-0">
                    <p class="text-h4 text--primary">
                        Origin
                    </p>
                    <p>late 16th century (as a noun denoting a place where alms were distributed): from medieval Latin
                        eleemosynarius, from late Latin eleemosyna ‘alms’, from Greek eleēmosunē ‘compassion’ </p>
                </v-card-text>
                <v-card-actions class="pt-0">
                    <v-btn variant="text" color="teal-accent-4" @click="reveal = false">
                        Close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-expand-transition>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            ex4: ['red', 'indigo', 'orange', 'primary', 'secondary', 'success', 'info', 'warning', 'error', 'red darken-3', 'indigo darken-3', 'orange darken-3'],
        }
    },
}
</script>