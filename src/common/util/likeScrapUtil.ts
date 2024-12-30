import { Repository } from "typeorm/repository/Repository";
import { UserGroupEnums } from "../constants/UserGroupEnums";

export const checkLikeCompany = async (
  data: any,
  repository: Repository<any>,
  jsonProperty: string[],
  targetProperty: string[],
  jobSeekerId: number
) => {
  if (data.length > 0) {
    // 좋아요 여부
    const companyIds = data.map((v) => keyMap(v, jsonProperty));
    const likeInfos =
      jobSeekerId && companyIds
        ? await repository.query(
            `select companyId,"likeYn" from company_like_job_seekers_job_seeker where jobSeekerId=${jobSeekerId} and companyId in (${companyIds})`
          )
        : [];

    data.map((item) => {
      keyMap(item, targetProperty)["likeYn"] = "N";

      likeInfos.map((likeCompany) => {
        if (keyMap(item, jsonProperty) === likeCompany.companyId) {
          keyMap(item, targetProperty)["likeYn"] = "Y";
        }
      });
    });
  }
};
export const checkScrapJobPosting = async (
  data: any,
  repository: Repository<any>,
  jsonProperty: string[],
  targetProperty: string[],
  jobSeekerId: number
) => {
  if (data.length > 0) {
    const jobPostingIds = data.map((v) => keyMap(v, jsonProperty));
    const scrapInfos =
      jobSeekerId && jobPostingIds
        ? await repository.query(
            `select jobPostingId, "scrapYn"
       from job_posting_scrape_job_seekers_job_seeker
       where jobSeekerId = ${jobSeekerId}
         and jobPostingId in (${jobPostingIds})`
          )
        : [];
    data.map((item) => {
      keyMap(item, targetProperty)["scrapYn"] = "N";

      scrapInfos.map((scrapJobPosting) => {
        if (keyMap(item, jsonProperty) === scrapJobPosting.jobPostingId) {
          keyMap(item, targetProperty)["scrapYn"] = "Y";
        }
      });
    });
  }
};

export const checkHeartStarProfile = async (
  data: any,
  repository: Repository<any>,
  jsonProperty: string[],
  targetProperty: string[],
  companyId: number,
  type: UserGroupEnums
) => {
  if (data.length > 0) {
    // 좋아요 여부
    const jobSeekerProfileIds = data.map((v) => keyMap(v, jsonProperty));
    const heartInfos =
      companyId && jobSeekerProfileIds
        ? await repository.query(
            `select jobSeekerProfileId,"heartYn" from CompanyToJobSeekerProfileMapping where companyId=${companyId} and type='${type}' and jobSeekerProfileId in (${jobSeekerProfileIds})`
          )
        : [];

    data.map((item) => {
      const heartOrStarYn = type === UserGroupEnums.HEART ? "heartYn" : "starYn";
      keyMap(item, targetProperty)[heartOrStarYn] = "N";

      heartInfos.map((heartJobSeekerProfile) => {
        if (keyMap(item, jsonProperty) === heartJobSeekerProfile.jobSeekerProfileId) {
          keyMap(item, targetProperty)[heartOrStarYn] = "Y";
        }
      });
    });
  }
};

export const checkSingleUserImageUrl = async (data: any, repository: Repository<any>) => {
  const userId = data.writerId;
  const users = userId
    ? await repository.query(`select imageUrl,id from User where id = (${userId})`)
    : {};
  users.map((u) => {
    data["imageUrl"] = u.imageUrl;
  });
};
export const checkUserImageUrl = async (data: any, repository: Repository<any>) => {
  if (data.length > 0) {
    const userIds = data.map((u) => u.writerId).join(",");
    const users = userIds
      ? await repository.query(`select imageUrl,id from User where id in (${userIds})`)
      : [];

    data.map((item) => {
      users.map((u) => {
        if (item.writerId === u.id) {
          item["imageUrl"] = u.imageUrl;
        }
      });
    });
  }
};
function keyMap(obj, key, def?, p?, undef?) {
  key = key.split ? key.split(".") : key;

  for (p = 0; p < key.length; p++) {
    obj = obj ? obj[key[p]] : undef;
  }
  return obj === undef ? def : obj;
}
