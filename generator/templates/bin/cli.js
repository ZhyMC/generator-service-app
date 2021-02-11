const meow = require("meow");
const path = require("path");
const fs = require("fs");
const { ServiceApp, AppDefaultConfig } = require("../lib/index");

const cli = meow(`
    <%= service_name %>

    Options:
        --init : initialize a default json config file
        --config, -c : specified a config path

`,{
    flags:{
        init:{
            type:"boolean"
        },
        config:{
            type:"string",
            alias:"c"
        }
    }
});

const config_file = cli.flags.config || "config.json";

if(cli.flags.init){
    fs.writeFileSync(config_file,JSON.stringify(AppDefaultConfig,"\t",2));
}else if(cli.flags.config){
    const config = JSON.parse(fs.readFileSync(cli.flags.config).toString());
    const app = new ServiceApp(config);
    app.start();
}else{
    cli.showHelp();
}