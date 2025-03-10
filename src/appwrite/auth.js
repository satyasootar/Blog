import conf from '../conf/conf.js'
import { Client, Account, ID } from "appwrite";

export class Authservice {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.APPWRITE_URL)
            .setProject(conf.PROJECT_ID)
        this.account = new Account(this.client)
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                return this.login({ email, password })
            } else {
                return userAccount
            }
        } catch (error) {
            console.error("Create account error:", error);
            throw error
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(
                email,
                password
            )
        } catch (error) {
            console.error("Login error:", error);
            throw error
        }
    }

    async getCurrentUser() {
        try {
            const session = await this.account.getSession('current');
            if (session) {
                return await this.account.get()
            }
        } catch (error) {
            console.error("Get user error:", error);
        }
        return null;
    }

    async logOut() {
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log("Log our error: ", error)
        }
    }
}

const authService = new Authservice();
export default authService