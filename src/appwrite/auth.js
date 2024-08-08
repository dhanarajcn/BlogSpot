import conf from '../config-variable/conf';
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor(){
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({email,password,name}){
    try{
      const userAccount = await this.account.create(ID.unique(),email,password,name);
      if(userAccount){
        return this.login(email,password);
      }else{
        return userAccount;
      }
    }catch(error){
      throw error;
    }
  }

  async login({email,password}){
    try{
      return await this.account.createEmailPasswordSession(email,password);
    }catch(error){
      throw error;
    }
  }

  async logout(){
    try{
      await this.account.deleteSessions();
    }catch(error){
console.log("AppWrite Service :: logout :: error",error);
    }
  }

  async getCurrentUser(){
    try{
      return await this.account.get();
    }catch(error){
      console.log("AppWrite Service:: getCurrentUSer",error);
    }

    return null;
  }

}

const authService = new AuthService();

export default authService;