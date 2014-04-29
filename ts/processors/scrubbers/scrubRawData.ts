module app {

    export function scrubRawData(data) {

        var clean = data;

        for (var i = 0; i < data.length; i++) {

            var obj = clean[i];

            delete obj.contributors;
            delete obj.id;
            delete obj.id_str;
            delete obj.in_reply_to_status_id;
            delete obj.in_reply_to_status_id_str;
            delete obj.in_reply_to_user_id;
            delete obj.in_reply_to_user_id_str;
            delete obj.truncated;
            delete obj.lang;

        }

        return clean;
    }

}