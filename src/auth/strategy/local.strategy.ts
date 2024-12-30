import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "modules/user/entities/user.entity";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {
    super({
      usernameField: "email",
      passwordField: "password",
    });
  }

  async validate(email: string): Promise<any> {
    const user = await this.userRepository
      .createQueryBuilder("users")
      .where("email=:email", { email: email })
      .getOne();

    if (!user) throw new UnauthorizedException();
    return user;
  }
}
