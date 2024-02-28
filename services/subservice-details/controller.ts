import SubServiceDetail from './model'

export const createSubServiceDetail = async (subservicesDetails: any) => {
  const detail = await SubServiceDetail.create(subservicesDetails)
  return detail
}
