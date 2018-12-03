﻿/// <reference path="vue.js" />
/// <reference path="vue-resource.js" />

const Yearly = {
    template: "#yearly",
    created: function () {
        this.fetchData();
        bus.$on("manifestChanged", () => this.fetchData());
    },
    data: function () {
        let currentYear = new Date().getFullYear();
        return {
            start: currentYear - 3,
            end: currentYear,
            yearly: [],
            pageIndex: 1,
            pageSize: 10,
            total: 0,
            pageSizes: [10, 20, 50, 100]
        }
    },
    methods: {
        fetchData: function () {
            this.yearlys = [];
            this.$http.get(SERVER_URL + "/yearly/paged", {
                params: {
                    start: this.start,
                    end: this.end,
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize
                }
            })
                .then(response => {
                    this.total = response.body.count;
                    this.yearly = response.body.items;
                })
                .catch(response => this.$alert(response.body, "年消费清单", { type: "error" }));
        },
        sizeChange: function (pageSize) {
            this.pageSize = pageSize;
            this.fetchData();
        },
        pageIndexChange: function (pageIndex) {
            this.pageIndex = pageIndex;
            this.fetchData();
        }
    }
}