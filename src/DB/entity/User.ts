import {Entity, Column, BaseEntity, PrimaryGeneratedColumn, BeforeInsert} from "typeorm";
import * as bcrypt from "bcryptjs";


@Entity("Users")
export class User extends BaseEntity {

    @PrimaryGeneratedColumn("uuid") id: string;

    @Column("varchar", {length: 255}) email: string;

    @Column("text") password: string;

    @Column("boolean", {default: true}) confirmed: boolean;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    createdAt: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}
