import { EntityRepository, Repository } from "typeorm";
import { SurveyUser } from "../entities/Survey_User";

@EntityRepository(SurveyUser)
class SurveyUserRepository extends Repository<SurveyUser>{

}

export { SurveyUserRepository }