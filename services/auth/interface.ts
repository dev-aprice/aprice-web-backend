export interface UserAttributes {
  id?: number
  name: string
  last_name?: string | null
  email?: string | null
  password: string
  token?: string | null
  token_expire?: string | null
  created_at?: Date
  updated_at?: Date
}
