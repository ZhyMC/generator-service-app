const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

function getShortName(name){
  let splits = name.split(".");
  return splits[splits.length-1];
}

module.exports = class extends Generator {

  async prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`欢迎你来到 Wyatt风格 服务项目 生成器!`)
    );

    this.serv_name = (await this.prompt({
      type:"input",
      name:"serv_name",
      message:"新的项目服务名要叫什么？",
      validate:(x)=>(!!x)
    })).serv_name;
    
    this.serv_short_name = getShortName(this.serv_name);

    this.org_name = (await this.prompt({
      type:"input",
      name:"org_name",
      message:"你的组织名是？（用于构建Docker镜像）",
      validate:(x)=>(!!x)
    })).org_name;

    this.expose_port = (await this.prompt({
      type:"input",
      name:"expose_port",
      message:"服务暴露的端口是？",
      validate:(x)=>(!!x)
    })).expose_port;

  }
  default(){
    this.destinationRoot(this.serv_name);
  }

  writing() {
    let data = {
      service_name : this.serv_name,
      service_short_name : this.serv_short_name,
      org_name : this.org_name,
      expose_port : this.expose_port
    };

    this.fs.copyTpl(this.templatePath("**/*"),this.destinationPath("./"),data);
    this.fs.copyTpl(this.templatePath(".*"),this.destinationPath("./"),data);
  }
  
  async install() {
    this.spawnCommandSync("npm",["install"]);
    
    this.spawnCommandSync("git",["init"]);
    this.spawnCommandSync("git",["add","-A"]);
    this.spawnCommandSync("git",["commit","-m","feat: init project"]);
    this.spawnCommandSync("git",["checkout","-b","dev"]);

    let request = await this.prompt({
      type:"confirm",
      name:"vscode",
      message:"现在使用 VSCODE 打开项目吗？",
      default:false
    });

    if(request.vscode){
      this.spawnCommandSync("code",["."]);
    }

  }

};
