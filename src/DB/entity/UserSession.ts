import {Entity, Column, BaseEntity, PrimaryGeneratedColumn} from "typeorm";


@Entity("UserSessions")
export class UserSession extends BaseEntity {

    @PrimaryGeneratedColumn("uuid") id: string;

    @Column("text") userId: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    createdAt: string;
}
