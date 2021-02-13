
import { IServiceApp } from "./IServiceApp";
import { AppConfig } from "./ServiceAppConfig";
import { AppContext } from "./AppContext";
import { ServiceAPI } from "../api/ServiceAPI";

export class ServiceApp implements IServiceApp{
    private context? : AppContext;
    private api? : ServiceAPI;
    
    private config : AppConfig;
    
    constructor(config : AppConfig){
        this.config = config;

    }
    private initContext(){

        this.context = {

        };
    }
    async start(): Promise<void> {
        this.initContext();
        this.initAPI();

        setInterval(()=>{
            console.log(`Hello world! The config of the app: `, this.config);
        },1000);
    }
    private initAPI(){
        this.api = new ServiceAPI(this.context as AppContext);
    }
    getAPI() : ServiceAPI{
        return this.api as ServiceAPI;
    }
    
}