import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import RealEstate from "./realEstate.entity";

@Entity("categories")
class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", unique: true, length: 45 })
  name: string;

  @OneToMany(() => RealEstate, (r) => r.category)
  realEstate: RealEstate[];
}

export default Category;
