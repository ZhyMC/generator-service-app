import { ServiceAPI } from "../api/ServiceAPI";

export interface IServiceApp{
    start(): Promise<void>;
    getAPI() : ServiceAPI;
}