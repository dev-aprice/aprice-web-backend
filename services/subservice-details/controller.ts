import { ISubserviceDetail } from './interface'
import SubServiceDetail from './model'

export const createSubServiceDetail = async (subservicesDetails: any) => {
  const detail = await SubServiceDetail.create(subservicesDetails)
  return detail
}

export const updateDetailSubservices = async (
  subserviceDetail: ISubserviceDetail,
  id_subservice: number
): Promise<void> => {
  try {
    const { id } = subserviceDetail

    if (id) {
      await SubServiceDetail.update(subserviceDetail, {
        where: { id, id_subservice },
      })
    } else {
      await SubServiceDetail.create({ ...subserviceDetail, id_subservice })
    }
  } catch (error) {
    console.error('Error updating subservice details:', error)
    throw new Error('Error updating subservice details')
  }
}
