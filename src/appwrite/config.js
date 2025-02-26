import conf from '../conf/conf.js'
import { Client, ID, Databases, Storage, Query } from "appwrite";


export class Service {
    client = new Client()
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.APPWRITE_URL)
            .setProject(conf.PROJECT_ID)
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client)
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                conf.DATABASE_ID,
                conf.COLLECTION_ID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Creating Post: ", error);

        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.DATABASE_ID,
                conf.COLLECTION_ID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Failed to update: ", error);

        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.DATABASE_ID,
                conf.COLLECTION_ID,
                slug,
            )
            return true
        } catch (error) {
            console.log("Failed to delete: ", error);
            return false
        }
    }

    async getPost(slug) {
        try {
            const response = await this.databases.listDocuments(
                conf.DATABASE_ID,
                conf.COLLECTION_ID,
                [
                    Query.equal("slug", slug) // Query documents where slug matches
                ]
            );
    
            if (response.documents.length === 0) {
                throw new Error("Post not found");
            }
    
            return response.documents[0]; // Return the first matching document
        } catch (error) {
            console.log("Get post Failed: ", error);
            return null;
        }
    }
    

    async getAllPost(query = [Query.equal("status", "active")]) {
        try {
            await this.databases.listDocuments(
                conf.DATABASE_ID,
                conf.COLLECTION_ID,
                query
            )
            return true
        } catch (error) {
            console.log("Get all post Failed: ", error);
            return false
        }
    }

    async uploadFile(file) {
        try {
            await this.bucket.createFile(
                conf.BUCKET_ID,
                ID.unique(),
                file
            )
            return true
        } catch (err) {
            console.log("File uploading error: ", err);
            return false
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.BUCKET_ID,
                fileId,
            )
            return true
        } catch (err) {
            console.log("File deleting error: ", err);
            return false
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.BUCKET_ID,
            fileId
        )
    }


}

const service = new Service()

export default service;