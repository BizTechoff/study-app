import { createPostgresConnection } from 'remult/postgres';
import { remultExpress } from 'remult/remult-express';
import { Lesson } from '../app/lesson/lesson';
import { SignInController } from '../app/users/SignInController';
import { UpdatePasswordController } from '../app/users/UpdatePasswordController';
import { User } from '../app/users/user';


export const api = remultExpress({
    entities: [User, Lesson],
    controllers: [SignInController, UpdatePasswordController],
    getUser: request => request.session!['user'],
    dataProvider: async () => {
        if (process.env['NODE_ENV'] === "production")
            return createPostgresConnection({ configuration: "heroku" })
        return undefined;
    }
});
