import {Song} from "./song";
export class User {
    constructor(public id?: string,
                public username?: string,
                public email?: string,
                public firstName?: string,
                public lastName?: string,
                public password?: string,
                public favorites?: Array<Song>,
                public admin?: boolean) {
    }
}
