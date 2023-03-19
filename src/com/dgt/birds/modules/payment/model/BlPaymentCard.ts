/* eslint-disable */

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "bln_payment_card" })
export default class BlPaymentCard
{

    @PrimaryGeneratedColumn({ type: "bigint" })
     id: string;

    @Column({ name: "user_email", type: "varchar" })
    userEmail: string;

    @Column({ name: "user_id", type: "varchar" })
    userId: string;

    @Column({ name: "card_no", type: "varchar" })
    cardNo: string;

    @Column({ name: "expiry_date", type: "varchar" })
    expiryDate: string;

    @Column({ name: "card_cvv", type: "varchar" })
    cvv: string;

    @Column({ name: "card_type", type: "varchar" })
    cardType: string;

    @Column({ name: "created_at", type: "datetime" })
    createdDate: Date;

    @Column({ name: "updated_at", type: "datetime" })
    updatedAt: Date;

}