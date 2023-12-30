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

export const checkAvailabilityEmail = async (
  email: string
): Promise<boolean> => {
  const url = "/auth/checkAvailability";
  try {
    const response = await axiosInstance.get(`${url}?email=${email}`);

    if ((response.data as ApiResponse).statusCode !== 200) {
      return false;
    }
    return true;
  } catch (error) {
    throw new Error("Error checking email");
  }
};

export const checkAvailabilityUsername = async (
  username: string
): Promise<boolean> => {
  const url = "/auth/checkAvailability";
  try {
    const response = await axiosInstance.get(`${url}?username=${username}`);

    if ((response.data as ApiResponse).statusCode !== 200) {
      return false;
    }
    return true;
  } catch (error) {
    throw new Error("Error checking username");
  }
};
