"use client"

import axios, { type AxiosError, type AxiosInstance, type AxiosRequestConfig } from "axios"
import { useAuth } from "@clerk/nextjs"
import { toast } from "sonner"

interface ApiErrorResponse {
    message: string
    [key: string]: unknown
}

type ApiError = AxiosError<ApiErrorResponse>

const createApiClient = (baseURL: string): AxiosInstance => {
    const client = axios.create({
        baseURL,
        headers: { "Content-Type": "application/json" },
    })

    client.interceptors.response.use(
        (res) => res,
        (error: ApiError) => {
            const message = error.response?.data?.message || error.message || "An error occurred"
            if (error.response?.status !== 401) {
                toast.error("API Error", { description: message })
            }
            return Promise.reject(error)
        },
    )

    return client
}

export const apiClient = createApiClient(process.env.NEXT_PUBLIC_BASE_URL || "")

export const useApiClient = (): AxiosInstance => {
    const { getToken, isSignedIn } = useAuth()

    const authClient = axios.create({
        baseURL: process.env.NEXT_PUBLIC_BASE_URL,
        headers: { "Content-Type": "application/json" },
    })

    authClient.interceptors.request.use(async (config) => {
        if (isSignedIn) {
            const token = await getToken()
            if (token) config.headers.Authorization = `Bearer ${token}`
        }
        return config
    })

    authClient.interceptors.response.use(
        (res) => res,
        (error: ApiError) => {
            const message = error.response?.data?.message || error.message || "An error occurred"
            if (error.response?.status !== 401) {
                toast.error("API Error", { description: message })
            }
            return Promise.reject(error)
        },
    )

    return authClient
}

export const useFileUploadClient = (): AxiosInstance => {
    const { getToken, isSignedIn } = useAuth()

    const uploadClient = axios.create({
        baseURL: process.env.NEXT_PUBLIC_BASE_URL || "",
        headers: { "Content-Type": "multipart/form-data" },
    })

    uploadClient.interceptors.request.use(async (config) => {
        if (isSignedIn) {
            const token = await getToken()
            if (token) config.headers.Authorization = `Bearer ${token}`
        }
        return config
    })

    uploadClient.interceptors.response.use(
        (res) => res,
        (error: ApiError) => {
            const message = error.response?.data?.message || error.message || "An error occurred"
            toast.error("File Upload Error", { description: message })
            return Promise.reject(error)
        },
    )

    return uploadClient
}

export async function apiRequest<T>(client: AxiosInstance, config: AxiosRequestConfig): Promise<T> {
    try {
        const res = await client(config)
        return res.data as T
    } catch (err) {
        const error = err as ApiError
        const message = error.response?.data?.message || error.message || "An error occurred"
        throw new Error(message)
    }
}