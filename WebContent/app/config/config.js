require.config({
    baseUrl: "",
    paths: {
        "jquery": "lib/jquery-3.1.1.min",
        "jquery-validate": "lib/jquery.validate.min",
        "underscore": "lib/underscore.min",
        "text": "lib/text.min"
    },
    urlArgs: "version=" + (new Date()).getTime()
});