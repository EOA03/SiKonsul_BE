const userModel = require("../models/userModel");
const { successResponse, errorResponse } = require("../utils/response");

exports.getLawyersBySpecialization = async (req, res) => {
  const { userId } = req.user;
  try {
    const { specializationId } = req.params;
    const { search, page, limit, orderBy } = req.query;
    const user = await userModel.findUserById(userId);
    const userIsPremium = user.isPremium;

    const result = await userModel.findLawyersBySpecialization({
      specializationId,
      search,
      page,
      limit,
      orderBy,
      isPremium: userIsPremium,
    });

    if (result.lawyers.length === 0) {
      return errorResponse(res, "No lawyers found for the given criteria", 404);
    }

    return successResponse(res, "Lawyers fetched successfully", result, 200);
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Server error during get lawyer by specialization", 500);
  }
};

exports.getLawyerProfileById = async (req, res) => {
  try {
    const { lawyerId } = req.params;

    const lawyer = await userModel.findLawyerById(lawyerId);

    if (!lawyer) {
      return res.status(404).json({ message: "Lawyer not found." });
    }

    return successResponse(res, "Lawyer profile fetched successfully", { lawyer });
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Server error while fetching lawyer profile", 500);
  }
};


