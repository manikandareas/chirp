import { CreateUserDto } from "@chirp/dto";
import { ApiResponse } from "../../typings";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
});

export const registerUser = async (
  payload: Omit<CreateUserDto, "bio">
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
    return false;
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
    return false;
  }
};
