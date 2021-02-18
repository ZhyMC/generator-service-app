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

    this.generate_source = (await this.prompt({
      type:"confirm",
      name:"generate_source",
      message:"要生成默认服务程序源码吗？",
      default:false
    })).generate_source
  }
  default(){
    this.destinationRoot(this.serv_name);
  }

  writing() {

    this.conflicter.force=true;
    let data = {
      service_name : this.serv_name,
      service_short_name : this.serv_short_name,
      org_name : this.org_name,
      expose_port : this.expose_port
    };

    this.fs.copyTpl(this.templatePath("./bin/**/*"),this.destinationPath("./bin"),data);
    this.fs.copyTpl(this.templatePath("./scripts/**/*"),this.destinationPath("./scripts"),data);
    this.fs.copyTpl(this.templatePath("./test/**/*"),this.destinationPath("./test"),data);

    if(this.generate_source)
      this.fs.copyTpl(this.templatePath("./src/**/*"),this.destinationPath("./src"),data);

    if(this.fs.exists(this.destinationPath("./package.json"))){
      const package_obj = this.fs.readJSON(this.templatePath("./package.json"));
      
      this.fs.extendJSON(this.destinationPath("./package.json"),{config:package_obj.config});
      this.fs.extendJSON(this.destinationPath("./package.json"),{scripts:package_obj.scripts});  
      this.fs.extendJSON(this.destinationPath("./package.json"),{devDependencies:package_obj.devDependencies});  
      this.fs.extendJSON(this.destinationPath("./package.json"),{dependencies:package_obj.dependencies});  
      
    }else{
      this.fs.copyTpl(this.templatePath("./package.json"),this.destinationPath("./package.json"));
    }

    this.fs.copyTpl(this.templatePath(".mocharc.json"),this.destinationPath(".mocharc.json"),data);
    this.fs.copyTpl(this.templatePath("Dockerfile"),this.destinationPath("Dockerfile"),data);
    this.fs.copyTpl(this.templatePath("Jenkinsfile"),this.destinationPath("Jenkinsfile"),data);
    this.fs.copyTpl(this.templatePath("LICENSE"),this.destinationPath("LICENSE"),data);
    this.fs.copyTpl(this.templatePath("tsconfig.json"),this.destinationPath("tsconfig.json"),data);
    this.fs.copyTpl(this.templatePath("README.md"),this.destinationPath("README.md"),data);
    this.fs.copyTpl(this.templatePath(".release-it.js"),this.destinationPath(".release-it.js"),data);
    this.fs.copyTpl(this.templatePath(".gitignore"),this.destinationPath(".gitignore"),data);
    this.fs.copyTpl(this.templatePath(".npmignore"),this.destinationPath(".npmignore"),data);
    this.fs.copyTpl(this.templatePath(".dockerignore"),this.destinationPath(".dockerignore"),data);

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
