export enum USER_ROLE {
    ADMIN = 'ADMIN',
    PUBLIC = 'PUBLIC'
}

const UserRoleNames = new Map<string, string>([
    // These are the option display names
    [USER_ROLE.ADMIN, 'Admin'],
    [USER_ROLE.PUBLIC, 'Public']
]);


export class User {
    public id: number;
    public username: string;
    public password: string;
    public role: any;	        // Comes from JSON binding as a string 'ADMIN', 'PUBLIC'

    public static getUserRoleNames() {
        return UserRoleNames;
    }

}
