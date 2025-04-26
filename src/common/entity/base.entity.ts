import { Column, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "created_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp", nullable: true })
  updatedAt: Date;

  @Column({ name: "deleted_at", type: "timestamp", nullable: true })
  deletedAt: Date;
}
