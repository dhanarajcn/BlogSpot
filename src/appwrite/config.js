import conf from "../config-variable/conf";
import { Client,ID,Databases,Storage,Query } from "appwrite";

export class Service{
  client = new Client();
  databases;
  buckets;
  constructor(){
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.buckets = new Storage(this.client);
  }

  async createPost({title,slug,content,featuredImage,status,userId}){
    try{
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId
        }
      );
    }catch(error){
      console.log("App Write Service :: createPost :: error",error);
    }
  }
  async updatePost(slug,{title,content,featuredImage,status}){
    try{
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    }catch(error){
      console.log("App Write Service :: updatePost :: error",error);
    }
  }

  async deletePost(slug){
    try{
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    }catch(error){
      console.log("App Write Service :: deletePost :: error",error);
      return false;
    }
  }

  async getPost(slug){
    try{
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      )
    }catch(error){
      console.log("App Write Service :: getPost :: error",error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status","active")]){
    try{
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries,
      )
    }catch(error){
      console.log("App Write Service :: getPosts :: error",error);
      return false;
    }
  }

  //file upload service
  async uploadFile(file){
    try{
      return await this.buckets.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file,
      )
    }catch(error){
      console.log("App Write Service :: uploadFile :: error",error);
      return false;
    }
  }

  async deleteFile(fileId){
    try{
      return await this.buckets.deleteFile(
        conf.appwriteBucketId,
        fileId,
      )
    }catch(error){
      console.log("App Write Service :: deleteFile :: error",error);
      return false;
    }
  }

  getFilePreview(fileId){
    return this.buckets.getFilePreview(
      conf.appwriteBucketId,
      fileId,
    );
  }


}



const service = new Service();

export default service;