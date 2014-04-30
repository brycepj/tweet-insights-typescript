module app {

    export module models {

        export class DataByDate {

            dataSet: any;
            model: any;

            constructor(freshData) {

                this.dataSet = freshData;
                this.model = {};

                this.init();
                console.log('data by date', this.model);
            }

            init(): any {

                var freshData = this.dataSet;

                this.model = app.processors.parseDataByDate(freshData);

            }


        }
    }


}