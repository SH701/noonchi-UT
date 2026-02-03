import { axios } from "@/api/common";
import { AxiosError } from "axios";

export async function apiFetch<T>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  try {
    const res = await axios({
      url,
      method: (options.method as string) || "GET",
      data: options.body ? JSON.parse(options.body as string) : undefined,
      headers: options.headers as Record<string, string>,
    });

    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = error.response?.data;
      const errorMessage =
        errorData?.message ||
        errorData?.error ||
        `API Error: ${error.response?.status || 500}`;

      throw new Error(errorMessage);
    }
    throw error;
  }
}
