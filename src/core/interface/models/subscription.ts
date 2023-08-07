export interface Subscription {
    items: Item[]
    meta: Meta
}

export interface Item {
    id: string
    createdAt: string
    lastUpdatedAt: string
    status: string
    endDate: string
    user: User
    plan: Plan
}

export interface User {
    id: string
    username: string
    firstName?: string
    lastName?: string
    email: string
    gender: string
    city?: string
    address?: string
    dob?: string
    status: string
    created_at: string
    lastUpdatedAt: string
}

export interface Plan {
    id: string
    name: string
    desc: string
    usageTime: number
    cost: number
    createdAt: string
    lastUpdatedAt: string
    status: string
}

export interface Meta {
    totalItems: number
    itemCount: number
    itemsPerPage: number
    totalPages: number
    currentPage: number
}
