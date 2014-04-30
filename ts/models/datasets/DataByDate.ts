module app {

    export module models {

<<<<<<< HEAD
        
=======
>>>>>>> 8e268130f50828c1832e61bf5f6ba4bb85ab429c
        export class DataByDate {

            dataSet:any;
            model:any;
<<<<<<< HEAD
=======

            constructor(freshData) {

                this.dataSet = freshData;
                this.model = {};

                this.init();
                console.log(this.model);
            }

            init():any {

                var freshData = this.dataSet;

                this.model = app.processors.parseDataByDate(freshData);

            }
>>>>>>> 8e268130f50828c1832e61bf5f6ba4bb85ab429c

            constructor(freshData) {

                this.dataSet = freshData;
                this.model = {};

                this.init();
                console.log(this.model);
            }

            init():any {

                var freshData = this.dataSet;

                this.model = app.processors.parseDataByDate(freshData);



        }

}
    }


}