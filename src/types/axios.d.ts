import type { AxiosRequestConfig as OriginalAxiosRequestConfig } from "axios";

declare module "axios" {
  export interface AxiosRequestConfig extends OriginalAxiosRequestConfig {
    useFormData?: boolean;
    isAuth?: boolean;
    isResponseType?: boolean;
    validateToken?: string;
  }
}
