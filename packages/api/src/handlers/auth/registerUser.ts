import { axiosInstance } from "../../lib";
import { CreateUserDto } from "@chirp/dto";
import { ApiResponse } from "../../typings";
export const registerUser = async (
  payload: CreateUserDto
): Promise<ApiResponse | undefined> => {
  try {
    const response = await axiosInstance.post("/auth/register", payload);
    return response.data as ApiResponse;
  } catch (error) {
    throw new Error("Error registering user");
  }
};
