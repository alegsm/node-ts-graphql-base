import {User} from "../../DB/entity/User";
import {Request, Response} from 'express';
import {redis} from "../../REDIS/redis";

export const confirmEmail = async (req: Request, res: Response) => {
    const {id} = req.params;
     redis.get(id, async (err, result) => {
         if(err) {
             console.log(err);
         }
         const userId = result;
        if(userId) {
            User.update({id: userId}, {confirmed: true});
            console.log('deleting ' + id);
            await redis.del(id);
            res.send('ok');
        } else {
            res.send('invalid');
        }
    });

};
