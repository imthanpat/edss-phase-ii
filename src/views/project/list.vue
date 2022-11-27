<template>
    <EasyDataTable :rows-per-page=5 :rows-items=[5,10,25,100] :headers="headers" :items="items" alternating />
</template>

<script>
import EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import ProjectApi from '../../services/ProjectApi'

export default {
    components: {
        EasyDataTable
    },
    data() {
        return {
            headers: [
                { text: "Project", value: "name", sortable: true},
                { text: "Device(s)", value: "cnt" , sortable: true},
                { text: "Last Modify/By", value: "lastupdate", sortable: true },
                { text: "Create Date/By", value: "createdate" , sortable: true},
                { text: "Action", value: "indicator.height" },
            ],
            items: [],
        }
    },
    mounted() {
        ProjectApi.PhpProjectList()
            .then(response => {
                response.data.forEach(ele => {
                    var usercreate = ele.usercreate != null ? ele.usercreate + ' ' : '';
                    var lastupdateuser = ele.lastupdateuser != null ? ele.lastupdateuser + ' ' : '';
                    ele.createdate = new Date(ele.createdate) == 'Invalid Date' ? '' : usercreate + new Date(ele.createdate).toLocaleString();
                    ele.lastupdate = new Date(ele.lastupdate) == 'Invalid Date' ? '' : lastupdateuser + new Date(ele.lastupdate).toLocaleString();
                });
                this.items = response.data;
            })
            .catch(err => {
                console.log(err);
                const e = err.response.data;
                if ((e.status == 401) && (e.errorCode == 11)) {
                    this.$swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: e.message
                    })
                    this.$router.push('/login');
                }
            })
    }
}
</script>