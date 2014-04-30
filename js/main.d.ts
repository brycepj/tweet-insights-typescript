/// <reference path="../ts/lib/jquery.d.ts" />
/// <reference path="../ts/lib/underscore.d.ts" />
/// <reference path="../ts/lib/backbone.d.ts" />
/// <reference path="../ts/lib/moment.d.ts" />
/// <reference path="../ts/lib/highcharts.d.ts" />
declare module app {
}
declare module app {
    module util {
        function initModels(): void;
    }
}
declare module app {
}
declare module app {
    module models {
        class DataByDate {
            public dataSet: any;
            public model: any;
            constructor(freshData: any);
            public init(): any;
        }
    }
}
declare module app {
    module models {
        class DataByHour {
        }
    }
}
declare module app {
    module models {
        class DataByWeekday {
        }
    }
}
declare module app {
    module models {
    }
}
declare module app {
    function scrubRawData(data: any): any;
}
declare module app {
    module processors {
        function parseDataByDate(freshData: any): any[];
    }
}
