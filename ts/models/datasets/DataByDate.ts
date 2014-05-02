module app {

    export module models {

        export class DataByDate {

            dataSet: any;
            model: any;

            constructor(freshData) {

                this.dataSet = freshData;
                this.model = null;

                this.init();
                console.log('data by date of arrays', this.model);
            }

            init(): any {

                var freshData = this.dataSet;

                this.model = app.processors.parseDataByDate(freshData);

            }


        }
    }


}