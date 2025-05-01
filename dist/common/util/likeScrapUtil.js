"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserImageUrl = exports.checkSingleUserImageUrl = exports.checkScrapJobPosting = exports.checkLikeCompany = void 0;
const checkLikeCompany = async (data, repository, jsonProperty, targetProperty, jobSeekerId) => {
    if (data.length > 0) {
        const companyIds = data.map((v) => keyMap(v, jsonProperty));
        const likeInfos = jobSeekerId && companyIds
            ? await repository.query(`select companyId,"likeYn" from company_like_job_seekers_job_seeker where jobSeekerId=${jobSeekerId} and companyId in (${companyIds})`)
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
exports.checkLikeCompany = checkLikeCompany;
const checkScrapJobPosting = async (data, repository, jsonProperty, targetProperty, jobSeekerId) => {
    if (data.length > 0) {
        const jobPostingIds = data.map((v) => keyMap(v, jsonProperty));
        const scrapInfos = jobSeekerId && jobPostingIds
            ? await repository.query(`select jobPostingId, "scrapYn"
       from job_posting_scrape_job_seekers_job_seeker
       where jobSeekerId = ${jobSeekerId}
         and jobPostingId in (${jobPostingIds})`)
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
exports.checkScrapJobPosting = checkScrapJobPosting;
const checkSingleUserImageUrl = async (data, repository) => {
    const userId = data.writerId;
    const users = userId
        ? await repository.query(`select imageUrl,id from User where id = (${userId})`)
        : {};
    users.map((u) => {
        data["imageUrl"] = u.imageUrl;
    });
};
exports.checkSingleUserImageUrl = checkSingleUserImageUrl;
const checkUserImageUrl = async (data, repository) => {
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
exports.checkUserImageUrl = checkUserImageUrl;
function keyMap(obj, key, def, p, undef) {
    key = key.split ? key.split(".") : key;
    for (p = 0; p < key.length; p++) {
        obj = obj ? obj[key[p]] : undef;
    }
    return obj === undef ? def : obj;
}
//# sourceMappingURL=likeScrapUtil.js.map